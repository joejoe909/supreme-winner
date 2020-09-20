module.exports = function (sequelize, DataTypes) {
    let mtgPosts = sequelize.define("mtgPosts", {         //table name
        hasCard:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }, 
        usrTxt: {                                    //text a user can post 
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {                                //card related data 
            type: DataTypes.STRING,
            allowNull: true,
         
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
         
        },
        cmc: {
            type: DataTypes.STRING,
            allowNull: true,
          
        },
        power: {
            type: DataTypes.STRING,
            allowNull: true,
         
        },
        toughness: {
            type: DataTypes.STRING,
            allowNull: true,
      
        },
        loyalty: {
            type: DataTypes.STRING,
            allowNull: true,
   
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
         
        }
    });

    mtgPosts.associate = function (models) {
        mtgPosts.belongsTo(models.User, {  //this is still in question
          
            foregnKey: {

                allowNull: false
            }
        });
    };

    return mtgPosts;
}