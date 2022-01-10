const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "./config.env" });
const sec = process.env.JWT_SECRET;
const express = require("express");

// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// GET ALL RECORDS
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result)
      res.json(result);
    });
});


// GET ONE RECORD
recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    const sessionExpires = Date.now() + 4320000;
    let myQuery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("records")
        .findOne(myQuery, function (err, result) {
            if (err){
                throw err
            } else {
                const userJwt = {
                    id: result._id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    horses: result.horses
                    }
                const userToken = jwt.sign(userJwt, sec, {expiresIn: '12h'})
            
                res.cookie('boarder', userToken, { expires: new Date(sessionExpires) })
                res.status(200).send({
                    id: result._id.toString(),
                    user: userJwt,
                    message: 'Login successful!',
                    status: true,
                  })
            }
        });
  });


// ADD RECORD
recordRoutes.route("/record/add").post(function (req, res) {
    let db_connect = dbo.getDb();
    console.log(req.body)
    let boarder = {
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      password: req.body.password,
    };

    db_connect.collection("records").insertOne(boarder, function (err, result) {
      if (err) {
          throw err
      } else {
        const userJwt = {
            id: boarder._id,
            firstName: boarder.first,
            lastName: boarder.last,
            email: boarder.email,
            password: boarder.password
        }
        
        // Success new user registered!
            res.status(200).send({
                user: userJwt,
                message: `New user was successfully registered in the database.`,
                status: true
        })};
      })
})

// UPDATE RECORD
recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId( req.params.id )};
    let newValues = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      },
    };
    db_connect
      .collection("records")
      .updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
  });

// DELETE RECORD
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId( req.params.id )};
    db_connect.collection("records").deleteOne(myQuery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.status(obj);
    });
  });

module.exports = recordRoutes;