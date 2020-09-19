$(document).ready(function () {
    let hasCard = false;
    let mtgCard = Object.create(card);
    
    function addHTag(item, property){
        let insert = $("<h4>" + property + item + "</h4><br>");
       if(item !== undefined) $("#postHldr").append(insert);
        
    }


    function addtopostcard(mtgPost){
        console.log("addtopostcard");
        console.log(mtgPost);
        $("#postHldr").html(""); 
        let imgCrd = $("<img>").attr('src', mtgPost.imageUrl);
        $("#postHldr").append(imgCrd);
        addHTag(mtgPost.name, "Name:");
        addHTag(mtgPost.type, "Type:");
        addHTag(mtgPost.cmc, "CMC:");
        addHTag(mtgPost.power, "Power:");
        addHTag(mtgPost.toughness, "Toughness:");
        addHTag(mtgPost.loyalty, "Loyalty:")
    };
    
     
    function getCard(cardSrch){
       mtgCard.blankCard();
        $.get("/api/card/" + cardSrch)
            // on success, run this callback
            .then((data)=> {
                // log the data we found
                console.log(data);
                mtgCard.name = data[0].name;
                mtgCard.imageUrl = data[0].imageUrl;
                mtgCard.type = data[0].type;
                mtgCard.cmc = data[0].cmc;
                mtgCard.power = data[0].power;
                mtgCard.toughness = data[0].toughness;
                mtgCard.loyalty = data[0].loyalty              
                console.log(mtgCard);
                addtopostcard(mtgCard);
                mtgCard.blankCard();
            });         
    };


    // send an AJAX POST-request with jQuery
    $("#mkPost").on("click", function () {
        console.log("mkpost click");

    });

    $("#addCard").on("click", function () {
        let cardName = prompt("Type in the Name of your Card.");
        console.log(cardName);
        console.log("addCard click");
        getCard(cardName);  
    });
});

let card = {
    name: "",
    imageUrl: "",
    type: "",
    cmc: "",
    power:"",
    toughness:"",
    loyalty:"",
    blankCard: function(){
        this.name = "";
        this.imageUrl = "";
        this.type = "";
        this.cmc = "";
        this.power = "";
        this.toughness = "";
        this.loyalty = "";
    }  
}
