const db = require("../models");
const mtg = require("mtgsdk");

module.exports = function (app) {

    // Route for getting all MTG Posts
    app.get("/api/allPosts", function (req, res) {
        let query = {};
        if (req.query.author_id) {
            query.AuthorId = req.query.author_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Post.findAll({
            where: query,
            include: [db.Author]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

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
            imageUrl: req.body.imageUrl,
        }).then(function(mtgCard) {
            console.log("post called mtgPost looks like...");
            console.log(req.body);
            res.json(mtgCard);
        });
    });


}