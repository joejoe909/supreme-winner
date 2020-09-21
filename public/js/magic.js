$(document).ready(function () {
    // let pstBuilder = Object.create(postBuilder);
    let hasCard = false;
    let mtgCard = Object.create(card);
    let mtgPosting = Object.create(card);

    //this builds a comment component
    function commentCpnt(id) {
        let sbmtButton = $("<button>").textContent("Submit");
        sbmtButton.attr("id", "comment-submit" + id);
        sbmtButton.attr("class", "btn btn-lg pull-right");

        let txtArComment = $("<textarea>").attr("class", "form-control");
        txtArComment.attr("id", "comment-box" + id);
        txtArComment.attr("placeholder", "Enter Comment Here!");
        txtArComment.attr("rows", "3");

        let pComment = $("<p>").textContent("Comment:");

        let inptName = $("<input>").attr("class", "form-control");
        inptName.attr("id", "author" + id);
        inptName.attr("placeholder", "Enter Your Name");

        let pName = $("<p>").textContent("Name:");
        let col8 = $("<div>").attr("class", "col-sm-8 col-sm-offset-2");

        col8.append(pName);
        col8.append(inptName);
        col8.append(pComment);
        col8.append("<br>");
        col8.append(txtArComment);
        col8.append(sbmtButton);
        ////////////////////////

        let commentArea = $("<div>").attr("id", "comment-area" + id);
        let inrH2 = $("<h2>").textContent("Comments");
        let inrCol8 = $("<div>").attr("class", "col-sm-8 col-sm-offset-2");
        let innerRow = $("<div>").attr("class", "row");
        innerRow.append(inrCol8);
        innerRow.append(inrH2);
        innerRow.append("<hr>");
        innerRow.append(commentArea);

        let row = $("<div>").attr("class", "row");
        row.attr("id", "row" + id);
        row.append(col8);
        row.append(innerRow);
        $("#postBrd").append(row);
    }

    //this will add an image to our post content holder
    function addImg(imgUrl, id) {
        let imgCrd = $("<img>").attr('src', imgUrl);
        $("#postCont" +id).append(imgCrd);
    }
    
    //this add <h4> tags to our content holder.
    function addConHTag(item, property, id) {
        let insert = $("<h4>" + property + item + "</h4><br>");
        if (item !== undefined) $("#postCont"+ id).append(insert);

    }

    function postBuilder(id) { //this will hold a single post
        let row = $("<div>").attr("class", "row");
        //id will be assigend with sql data, here is where we will append our card data and user post
        let postCont = $("<div>").attr("class", "postCont");
        postCont.attr("id", "postCont" + id);
        row.append(postCont);

        let cardBody = $("<div>").attr("class", "card-body");
        cardBody.append(row);
        let card = $("<div>").attr("class", "card");
        card.append(cardBody);

        let li = $("<li>").attr("class", "aPost");
        li.attr("id", "li" +id);
        li.append(card);
        $("#postBrd").prepend(li);
    }


    function addHTag(item, property){
        let insert = $("<h4>" + property + item + "</h4><br>");
       if(item !== undefined) $("#postHldr").append(insert);
        
    }

    function getAllPosts(){
        $.get("/api/allPosts")
            // on success, run this callback
            .then((data) => {
                console.log(data)
                for(i = 0; i < data.length; i++){    
                    postBuilder(data[i].id);
                    if (data[i].imageUrl !== "") {
                        addImg(data[i].imageUrl, data[i].id);
                    }
                    if(data[i].hasCard)
                    {
                        
                        //adding content to
                        addConHTag(data[i].name, "Name:", data[i].id);
                        addConHTag(data[i].type, "Type:", data[i].id);
                        addConHTag(data[i].cmc, "CMC:", data[i].id);
                        addConHTag(data[i].power, "Power:", data[i].id);
                        addConHTag(data[i].toughness, "Toughness:", data[i].id);
                        addConHTag(data[i].loyalty, "Loyalty:", data[i].id);
                        
                    }
                    addConHTag(data[i].usrTxt, "User Posted:", data[i].id);
                //    commentCpnt(data[i].id); //create the comment component.
                }
                
            });  

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
                console.log("mtcCard.imageUrl is type of:" + typeof(mtgCard.imageUrl));
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
    $("#mkPost").on("click", function (e) {
        e.preventDefault();
        console.log("mkpost click");
        testEmpty = $("#postBx").val().trim()
        if(testEmpty === '')
        {
            alert("You need to add text to the post in order to publish.");
            return;
        }
        mtgCard.usrTxt = $("#postBx").val().trim();
        console.log("making post with object...")
        $.post("/api/addPost", mtgCard, function(){ }); 
        location.reload();
    });

    $("#addCard").on("click", function (e) {
        e.preventDefault();
        let cardName = prompt("Type in the Name of your Card.");
        console.log(cardName);
        console.log("addCard click");
        getCard(cardName);  
        
    });

    //get all posts once page is loaded.
    getAllPosts();
});

let card = {
    hasCard: false,
    usrTxt: "",
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
        this.usrTxt = "";
    }  
}



    //using jQuery module pattern
    let postBuilder = { //this will hold a single post
        buildElements: function(){
        row = $("<div>").attr("class", "row");
        //id will be assigend with sql data, here is where we will append our card data and user post
        let postCont = $("<div>").attr("class", "postCont");
        row.append(postCont);

        let cardBody = $("<div>").attr("class", "card-body");
        cardBody.append("row");
        let card = $("<div>").attr("class", "card");
        card.append(cardBody);
            
        let li = $("<li>").attr("class", "aPost");
        li.append(card);
        },

        addHTag:function (item, property) {
            let insert = $("<h4>" + property + item + "</h4><br>");
            if (item !== undefined) $(this.postCont).append(insert);
        },

        addImg: function(imgUrl) {
            let imgCrd = $("<img>").attr('src', imgUrl);
            $(this.postCont).append(imgCrd);
        }
    };







