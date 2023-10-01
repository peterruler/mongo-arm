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

module.exports = router;
