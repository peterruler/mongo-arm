const express = require("express");
const router = express.Router();


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
  
  router.get("/:id", function (req, res) {
    const animal = animalSwitch(req.params.id);
    res.status(200).json(animal);
  });
  
  router.put("/:id", function (req, res) {
    const animal = animalSwitch(req.params.id);
    res.status(200).json(animal);
  });
  
  router.get("/", function (req, res) {
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