module.exports = function (sequelize, DataTypes) {
    let Post = sequelize.define("mtgPosts", {         //table name
         hasCard: {
             type: DataTypes.BOOLEAN,
             defaultValue: false
         },
        usrTxt: {                                    //text a user can post 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        cardName: {                                //card related data 
            type: DataTypes.STRING,
            validate: {
                hasCard: true
            }
        },
        cardType: {
            type: DataTypes.STRING,
            validate: {
                hasCard: true
            }
        },
        cardCMC: {
            type: DataTypes.INTEGER,
            validate: {
                hasCard: true
            }
        },
        cardTypeSel: {
            type: DataTypes.STRING,
            validate: {
                hasCard: true
            }
        },
    });
    Post.associate = function (models) {
        Post.belongsTo(models.User, {  //this is still in question
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Post;
}