
// Dependencies
// =============================================================
// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");
// var sequelize = require("../config/config.json");

// Creates a "Comment" model that matches up with DB
module.exports = function (sequelize, DataTypes) {

    var Comments = sequelize.define("Comments", {
      author: {
            type: DataTypes.STRING,
            allowNull: false,
           },
      body:{
          type: DataTypes.STRING,
          allowNull: false,
      },
      mtgPostId:{
          type: DataTypes.INTEGER,
          allowNull: false,
      }
    //   created_at: {
    //       type: DataTypes.DATE,
    //       defaultValue: NOW,
    //     }
    });

    Comments.associate = function (models) {
        Comments.belongsTo(models.mtgPosts, {  //this is still in question
          
            foregnKey: {

                allowNull: false
            }
        });
    };

    return Comments;
}
// Syncs with DB
// Makes the Comments Model available for other files (will also create a table)

// Comment.sync();
// module.exports = Comment;