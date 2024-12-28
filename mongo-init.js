db = db.getSiblingDB('myFirstDatabase'); // Switch to your database
db.createUser({
  user: "myUser",
  pwd: "myPassword",
  roles: [
    { role: "readWrite", db: "myFirstDatabase" }
  ]
});
