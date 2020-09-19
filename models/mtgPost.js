module.exports = function (sequelize, DataTypes) {
    let Post = sequelize.define("mtgPosts", {         //table name

        hasCard:{
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
        name: {                                //card related data 
            type: DataTypes.STRING,
            validate: {
                hasCard: true
            }
        },
        type: {
            type: DataTypes.STRING,
            validate: {
                hasCard: true
            }
        },
        cmc: {
            type: DataTypes.STRING,
            validate: {
                hasCard: true
            }
        },
        power: {
            type: DataTypes.STRING,
            validate: {
                hasCard: true
            }
        },
        toughness: {
            type: DataTypes.STRING,
            validate: {
                hasCard: true
            }
        },
        loyalty: {
            type: DataTypes.STRING,
            validate: {
                hasCard: true
            }
        }
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, {  //this is still in question
          
            foregnKey: {

                allowNull: false
            }
        });
    };

    return Post;
}