module.exports = function (sequelize, DataTypes) {
    let Post = sequelize.define("mtgPosts", {         //table name
        hasCard: false,
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
        Post.belongsTo(models.user, {  //this is still in question
            foregnKey: {
                allowNull: false
            }
        });
    };
    return Post;
}