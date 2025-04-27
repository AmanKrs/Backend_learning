// const express =require('express')// for default and not using es6
// require("dotenv").config();// for default and not using es6

import express from "express"; //WE USES ES6 MODULE
import "dotenv/config"; //WE USES ES6 MODULE

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

let usersList = [];
let nextID = 1;

app.listen(port, () => {
  console.log(`server is started at ${port}...`);
});

//create
app.post("/", (req, res) => {
  const { name, age, address } = req.body;
  const user = {
    id: nextID + Math.floor(Math.random() * 1000),
    name,
    age,
    address,
  };
  usersList.push(user);
  res.status(201).send({ data: user });
});

//read
app.get("/user", (req, res) => {
  res.status(200).send({ data: usersList });
});
app.get("/user/:id", (req, res) => {
  //   const userlog = usersList.filter((elem) => elem.id === parseInt(req.params.id));
  const userlogged = usersList.find(
    (elem) => elem.id === parseInt(req.params.id)
  );
  if (!userlogged) {
    res.status(404).send({ data: "user not found" });
  } else {
    res.status(200).send({ data: userlogged });
  }
});

//update
app.put("/user/:id", (req, res) => {
  const { name, age, address } = req.body;
  console.log(req.params);
  console.log(name, age, address);
  const userlogged = usersList.find(
    (elem) => elem.id === parseInt(req.params.id)
  );
  console.log(userlogged);
  userlogged.name = name;
  userlogged.age = age;
  userlogged.address = address;
  if (!userlogged) {
    res.status(404).send({ data: "user not found" });
  } else {
    res.status(201).send({ data: userlogged });
  }
});

//delete
app.delete("/user/:id", (req, res) => {
  const delUserIdx = usersList.findIndex(
    (elem) => elem.id === parseInt(req.params.id)
  );

  usersList.splice(delUserIdx, 1);
  if (delUserIdx < 0) {
    res.status(404).send({ data: "user not found" });
  } else {
    res.status(204).send({ data: usersList, msg: "user deleted" });
  }
});
