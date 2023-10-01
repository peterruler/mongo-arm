const express = require("express");
const router = express.Router();

// tests

// plus

router.get("/plus", function (req, res) {
  const y = req.query.y;
  const x = req.query.x;
  const rst = parseInt(x) + parseInt(y);
  res.status(200).json({ result: rst});
});

// minus

router.post("/minus", function (req, res) {
 
  const x = req.body.x;
  const y = req.body.y;
  const rst = parseInt(x) - parseInt(y);
  res.status(200).json({ result: rst });
});

// echo vector

router.put("/echo", function (req, res) {
  const rnd = Math.ceil(Math.random() * 10);
  let arr = [];
  for (let i = 0; i < rnd; i++) {
    let hot = Math.random() < 0.5;
    arr.push({ hot: hot });
  }
  res.status(200).json(arr);
});

// echo an issue

router.post("/echo", function (req, res) {
 
  const json = {
    done: true,
    due_date: "2023-09-30T18:47:43.830Z",
    title: "test",
    updated_at: "2023-09-30T18:47:43.830Z",
    project_client_id: "string",
    priority: "3",
    id: 0,
    client_id: "test",
    project_id: 0,
    created_at: "2023-09-30T18:47:43.830Z",
  };

  res.status(200).json(json);
});

module.exports = router;
