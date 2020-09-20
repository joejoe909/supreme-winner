const db = require("../models");
const mtg = require("mtgsdk");

module.exports = function (app) {
    //Route for making a MTG request this will 
    app.get("/api/card/:cardName", function (req, res) {
        if (req.params.cardName) {
            let cn = req.params.cardName
            mtg.card.where({ name: cn }).then((results) => {
                res.json(results);
            })

        }
    });

    app.post("/api/addPost", function (req, res) {
        db.mtgPosts.create({
            hasCard: req.body.hasCard,
            usrTxt: req.body.usrTxt,
            name: req.body.name,
            type: req.body.type,
            cmc: req.body.cmc,
            power: req.body.power,
            toughness: req.body.toughness,
            loyalty: req.body.loyalty,
            imageUrl: req.body.imageUrl
        
        }).then(function(mtgCard) {
            console.log("post called mtgPost looks like...");
            console.log(req.body);
            res.json(mtgCard);
        });
    });


}