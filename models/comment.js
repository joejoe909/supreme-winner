// Dependencies
// =============================================================
// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");
// var sequelize = require("../config/config.json");

// Creates a "Chirp" model that matches up with DB
module.exports = function (sequelize, DataTypes) {

    var Comment = sequelize.define("comment", {
      author: {type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }},
      body:{type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }},
      created_at: {type: DataTypes.DATE}
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.User, {  //this is still in question
          
            foregnKey: {

                allowNull: false
            }
        });
    };

    return Comment;
}
// Syncs with DB
// Makes the Chirp Model available for other files (will also create a table)

// Comment.sync();
// module.exports = Comment;