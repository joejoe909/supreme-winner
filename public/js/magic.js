$(document).ready(function () {
    let hasCard = false;
    let mtgCard = Object.create(card);
    let mtgPosting = Object.create(card);
    
    function addHTag(item, property){
        let insert = $("<h4>" + property + item + "</h4><br>");
       if(item !== undefined) $("#postHldr").append(insert);
        
    }

    function addtopostcard(){
        $("#postHldr").html("");
        if(!(mtgCard.imageUrl===""))
        { 
            mtgCard.hasCard = true;
            let imgCrd = $("<img>").attr('src', mtgCard.imageUrl);
            $("#postHldr").append(imgCrd);
        }
        addHTag(mtgCard.name, "Name:");
        addHTag(mtgCard.type, "Type:");
        addHTag(mtgCard.cmc, "CMC:");
        addHTag(mtgCard.power, "Power:");
        addHTag(mtgCard.toughness, "Toughness:");
        addHTag(mtgCard.loyalty, "Loyalty:");
      
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
                addtopostcard();
                
            });         
    };


    // send an AJAX POST-request with jQuery
    $("#mkPost").on("click", function () {
        console.log("mkpost click");
        mtgCard.usrtxt = $("#postBx").val().trim();
        console.log("making post with object...")
        $.post("/api/addPost", mtgCard, function(){
                                     
        }); 
    });

    $("#addCard").on("click", function () {
        let cardName = prompt("Type in the Name of your Card.");
        console.log(cardName);
        console.log("addCard click");
        getCard(cardName);  
    });
});

let card = {
    hasCard: false,
    usrtxt: "",
    name: "",
    type: "",
    cmc: "",
    power:"",
    toughness:"",
    loyalty:"",
    imageUrl: "",
    blankCard: function(){
        this.name = "";
        this.imageUrl = "";
        this.type = "";
        this.cmc = "";
        this.power = "";
        this.toughness = "";
        this.loyalty = "";
        this.usrtxt = "";
    }  
}
