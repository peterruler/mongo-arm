const express = require("express");
const Bookings = require("../models/bookings.js");

const router = express.Router();

router.get("/", function (req, res) {
  Bookings.find(function (err, doc) {
    if (!err) {
      res.status(200).json(doc);
    } else {
      res.status(500).json(err);
    }
  });
});

function formatDate (inputDateString) {
  const inputDate = new Date(inputDateString);
  const year = inputDate.getUTCFullYear();
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getUTCDate()).padStart(2, "0");
  const formattedDateString = `${year}-${month}-${day}`;
  return formattedDateString;
}

router.get("/:id", function (req, res) {
  const id = req.params.id;
  Bookings.find({ id: id }, function (err, doc) {
    if (!err) {

      let json = {};
      const resStartDate = formatDate(doc[0].startDate);
      const resEndDate = formatDate(doc[0].endDate);

      json.id = doc[0].id;
      json.name = doc[0].name;
      json.roomNumber = doc[0].roomNumber;
      json.startDate = resStartDate;
      json.endDate = resEndDate;

      res.status(200).json(json);
    } else {
      res.status(500).json(err);
    }
  });
});

router.post("/", function (req, res) {
  const newBooking = new Bookings({
    id: req.body.id,
    name: req.body.name,
    roomNumber: req.body.roomNumber,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });
  newBooking.save(function (err) {
    if (err || req.body.name == "" || req.body.name.length > 80) {
      res.status(500).json("undefined");
    } else {
      res.status(200).json({
        id: req.body.id,
        name: req.body.name,
        roomNumber: req.body.roomNumber,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      });
    }
  });
});

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  Bookings.deleteOne({ id: id }, function (err) {
    if (err || id == "" || typeof id === "undefined") {
      res.status(500).json("undefined");
    } else {
      res.status(200).json(id);
    }
  });
});

router.put("/", function (req, res) {
  const id = req.body.id;
  Bookings.find({ id: id }, function (err, doc) {
    if (!err) {
      const jsonWhere = { _id: doc[0]._id };
      const jsonBody = { 
        id: req.body.id,
        name: req.body.name,
        roomNumber: req.body.roomNumber,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
       }; // hier mehr properties anfügen, um mehr upzudaten
      Bookings.updateOne(jsonWhere, jsonBody, function (err, resUpdate) {

        if (err) {
          res.status(500).json("undefined");
        } else {
          res
            .status(200)
            .json({
              id: req.body.id,
              name: req.body.name,
              roomNumber: req.body.roomNumber,
              startDate: req.body.startDate,
              endDate: req.body.endDate,
            });
        }
      });
    }
  });
});

module.exports = router;
