var db = require("../models");
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
        db.mtgPost.create(req.body.mtgCard).then(function(mtgCard) {
            console.log("post called mtgPost looks like...");
            console.log(mtgCard);
            res.json(mtgCard);
        });
    });


}