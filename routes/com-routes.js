// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// const passport = require("../config/passport");

var db = require("../models/");

// Routes
// =============================================================
module.exports = function(app) {

    // Get all chirps
    app.get("/api/all", function(req, res) {
  
      // Finding all Comments, and then returning them to the user as JSON.
      db.Comment.findAll({}).then(function(results) {
        // results are available to us inside the .then
        res.json(results);
      });
  
    });
  
    // Add a comment
    app.post("/api/new", function(req, res) {
  
      console.log("Comment Data:");
      console.log(req.body);
  
      Comment.User.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
      }).then(function(res) {
        // `results` here would be the newly created comment
        res.end();
      });
  
    });
  
  };
