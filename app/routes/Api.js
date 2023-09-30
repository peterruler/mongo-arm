const express = require("express");
const Project = require("../models/project.js");
const Issue = require("../models/issue.js");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Projects

router.get("/projects", function (req, res) {
  Project.find(function (err, doc) {
    if (!err) {
      res.status(200).json(doc);
    } else {
      res.status(500).json(err);
    }
  });
});

router.post("/projects", function (req, res) {
  const project_id = uuidv4();
  const newProject = new Project({
    id: project_id,
    client_id: project_id,
    title: req.body.title,
    active: true,
  });
  newProject.save(function (err) {
    if (err || req.body.title == "") {
      res.status(500).json("undefined");
    } else {
      res
        .status(200)
        .json({
          id: project_id,
          client_id: project_id,
          title: req.body.title,
          active: true,
        });
    }
  });
});

router.delete("/projects", function (req, res) {
  const id = req.body.id;
  Project.deleteOne({ id: id }, function (err) {
    if (err || id == "" || typeof id === "undefined") {
      res.status(500).json("undefined");
    } else {
      res.status(200).json(id);
    }
  });
});

router.get("/projects/:id", function (req, res) {
  const id = req.params.id;
  Project.find({ id: id }, function (err, doc) {
    if (!err) {
      res.status(200).json(doc);
    } else {
      res.status(500).json(err);
    }
  });
});

// Issues

router.get("/projects/:project_id/issues", function (req, res) {
  const project_id = req.params.project_id;
  Issue.find(function (err, doc) {
    if (!err) {
      res.status(200).json(doc);
    } else {
      res.status(500).json(err);
    }
  });
});

router.post("/projects/:project_id/issues", function (req, res) { 
  const project_id = req.params.project_id;
  const client_id = uuidv4();
  const newIssue = new Issue({
    id: client_id,
    client_id: client_id,
    project_id: project_id,
    done: false,
    title: req.body.title,
    due_date: req.body.due_date,
    priority: req.body.priority,
  });
  newIssue.save(function (err) {
    if (err || req.body.title == "") {
      res.status(500).json("undefined");
    } else {
      res
        .status(200)
        .json({
          id: client_id,
          client_id: client_id,
          project_id: project_id,
          done: false,
          title: req.body.title,
          due_date: req.body.due_date,
          priority: req.body.priority,
        });
    }
  });
});

router.delete("/projects/:project_id/issues/:id", function (req, res) {
  const project_id = req.params.project_id;
  const client_id = req.params.id;
  Issue.deleteOne({ client_id: client_id }, function (err) {
    if (
      err ||
      project_id == "" ||
      typeof project_id === "undefined" ||
      client_id == "" ||
      typeof client_id === "undefined"
    ) {
      res.status(500).json("undefined");
    } else {
      res.status(200).json(client_id);
    }
  });
});

router.put("/projects/:project_id/issues/:client_id", function (req, res) {
  const project_id = req.params.project_id;
  const client_id = req.params.client_id;
  Issue.find({ client_id: client_id }, function (err, doc) {
    if (!err) {
      const jsonWhere = { _id: doc[0]._id };
      const jsonBody = { done: req.body.done }; // hier mehr properties anfügen, um mehr upzudaten
      Issue.updateOne(jsonWhere, jsonBody, function (err, resUpdate) {
        if (err) {
          res.status(500).json("undefined");
        } else {
          res
            .status(200)
            .json({
              id: client_id,
              client_id: client_id,
              project_id: project_id,
              done: req.body.done,
              title: req.body.title,
              due_date: req.body.due_date,
              priority: req.body.priority,
            });
        }
      });
    }
  });
});

// Super Trump Animals

const animalSwitch = (animalId) => {
  let animal = {};
  switch (animalId) {
    case "1":
      animal = {
        id: 1,
        name: "Elefant",
        image: "placeholder.png",
        size: 3.3,
        weight: 6000,
        age: 70,
        offspring: 1,
        speed: 40,
      };
      break;
    case "2":
      animal = {
        id: 2,
        name: "Flusspferd",
        image: "placeholder.png",
        size: 1.5,
        weight: 1800,
        age: 50,
        offspring: 1,
        speed: 30,
      };
      break;
    case "3":
      animal = {
        id: 3,
        name: "Nashorn",
        image: "placeholder.png",
        size: 1.9,
        weight: 2300,
        age: 50,
        offspring: 1,
        speed: 50,
      };
      break;
    case "4":
      animal = {
        id: 4,
        name: "Krokodil",
        image: "placeholder.png",
        size: 5.2,
        weight: 1000,
        age: 70,
        offspring: 60,
        speed: 29,
      };
      break;
    case "5":
      animal = {
        id: 5,
        name: "Wiesel",
        image: "Hase.png",
        size: 11,
        weight: 22,
        age: 23,
        offspring: 24,
        speed: 52,
      };
      break;
    default:
      animal = {
        id: 1,
        name: "Elefant",
        image: "placeholder.png",
        size: 3.3,
        weight: 6000,
        age: 70,
        offspring: 1,
        speed: 40,
      };
  }
  return animal;
};

router.get("/animals/:id", function (req, res) {
  const animal = animalSwitch(req.params.id);
  res.status(200).json(animal);
});

router.put("/animals/:id", function (req, res) {
  const animal = animalSwitch(req.params.id);
  res.status(200).json(animal);
});

router.get("/animals", function (req, res) {
  const animals = [
    {
      id: 1,
      name: "Elefant",
      image: "placeholder.png",
      size: 3.3,
      weight: 6000,
      age: 70,
      offspring: 1,
      speed: 40,
    },
    {
      id: 2,
      name: "Flusspferd",
      image: "placeholder.png",
      size: 1.5,
      weight: 1800,
      age: 50,
      offspring: 1,
      speed: 30,
    },
    {
      id: 3,
      name: "Nashorn",
      image: "placeholder.png",
      size: 1.9,
      weight: 2300,
      age: 50,
      offspring: 1,
      speed: 50,
    },
    {
      id: 4,
      name: "Krokodil",
      image: "placeholder.png",
      size: 5.2,
      weight: 1000,
      age: 70,
      offspring: 60,
      speed: 29,
    },
    {
      id: 5,
      name: "Wiesel",
      image: "Hase.png",
      size: 11,
      weight: 22,
      age: 23,
      offspring: 24,
      speed: 52,
    },
  ];
  res.status(200).json(animals);
});

module.exports = router;
