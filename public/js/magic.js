$(document).ready(function () {

    let hasCard = false;
    let mtgCard = Object.create(card);
    let mtgPosting = Object.create(card);
    let postCommentId = [];

    //this builds a comment component
    function commentCpnt(id) {

        let sbmtButton = $("<button> Submit </button>");
        sbmtButton.attr("id", "comment-submit_" + id);
        sbmtButton.attr("class", "btn btn-lg pull-right comSub_");

        let txtArComment = $("<textarea>").attr("class", "form-control");
        txtArComment.attr("id", "comment-box_" + id);
        txtArComment.attr("placeholder", "Enter Comment Here!");
        txtArComment.attr("rows", "3");

        let pComment = $("<p> Comment: </p>");

        let inptName = $("<input>").attr("class", "form-control");
        inptName.attr("id", "author_" + id);
        inptName.attr("placeholder", "Enter Your Name");

        let pName = $("<p> Name: </p>");
        let col8 = $("<div>").attr("class", "col-sm-8 col-sm-offset-2");

        col8.append(pName);
        col8.append(inptName);
        col8.append(pComment);
        col8.append("<br>");
        col8.append(txtArComment);
        col8.append(sbmtButton);
        //////////////////////

        let commentArea = $("<div>").attr("class", "container");
        commentArea.attr("id", "comment-area" + id);
        let inrH2 = $("<h2> Comments <h2>");
        let inrCol8 = $("<div>").attr("class", "col-sm-8 col-sm-offset-2");
        let innerRow = $("<div>").attr("class", "row");
        innerRow.append(inrCol8);
        innerRow.append(inrH2);
        innerRow.append("<hr>");
        innerRow.append(commentArea);

        let row = $("<div>").attr("class", "row");
        row.attr("id", "row_" + id);
        row.append(col8);
        row.append(innerRow);
        return row;
    }

    //this will add an image to our post content holder
    function addImg(imgUrl, id) {
        let imgCrd = $("<img>").attr('src', imgUrl);
        imgCrd.attr("id", "img_"+id);
        return imgCrd;
    }
    
    //this add <h4> tags to our content holder.
    function addConHTag(item, property, id) {
        let insert = $("<h4>" + property + item + "</h4><br>");
        insert.attr("id", "htag" +"_" + property + "_" + id)
        return insert;

    }

    function postBuilder(id) { //this will hold a single post
        let row = $("<div>").attr("class", "row");
        //id will be assigend with sql data, here is where we will append our card data and user post
        let postCont = $("<div>").attr("class", "postCont");
        postCont.attr("id", "postCont" + id);
        row.append(postCont);

        let cardBody = $("<div>").attr("class", "card-body");
        cardBody.attr("id", "cardBody"+id);
        cardBody.append(row);
        let card = $("<div>").attr("class", "card");
        card.append(cardBody);

        let li = $("<li>").attr("class", "aPost");
        li.attr("id", "li_" +id);
        li.append(card);
    
        return li;
    }

    //this is used for displaying card data before a user posts.
    function addHTag(item, property){
        let insert = $("<h4>" + property + item + "</h4><br>");
       if(item !== undefined) $("#postHldr").append(insert);
        
    }

    //prepending to the post board same as getAllPost but we're not dealing with an array
    function prependPost(data){
        let post = postBuilder(data.id);
        if(data.imageUrl !== ""){
            let postImg = addImg(data.imageUrl, data.id);
            post.append(postImg);
        }
        if(data.hasCard){
            //adding content to
            let postName = addConHTag(data.name, "Name:", data.id);
            let postType = addConHTag(data.type, "Type:", data.id);
            let postCMC = addConHTag(data.cmc, "CMC:", data.id);
            let postPower = addConHTag(data.power, "Power:", data.id);
            let postToughness = addConHTag(data.toughness, "Toughness:", data.id);
            let postLoyalty = addConHTag(data.loyalty, "Loyalty:", data.id);

            post.append(postName);
            post.append(postType);
            post.append(postCMC);
            post.append(postPower);
            post.append(postToughness);
            post.append(postLoyalty);
        }
        let postTxt = addConHTag(data.usrTxt, "User Posted:", data.id);
        post.append(postTxt);

        let commentCmp = commentCpnt(data.id); //create the comment component.
        post.append(commentCmp);
        $("#postBrd").prepend(post);
    }

    

       
    
    //same as prepend post but this time we're dealing with an array.
    function getAllPosts(){
        $.get("/api/allPosts")
            // on success, run this callback
            .then((data) => {
                console.log(data)
                postComment();
                for(i = 0; i < data.length; i++){    
                    let post = postBuilder(data[i].id);
                    // commentPostId.push(data[i].id);
                    if (data[i].imageUrl !== "") {
                       let postImg = addImg(data[i].imageUrl, data[i].id);
                       post.append(postImg);
                    }
                    if(data[i].hasCard)
                    {
                        
                        //adding content to
                       let postName = addConHTag(data[i].name, "Name:", data[i].id);
                       let postType = addConHTag(data[i].type, "Type:", data[i].id);
                       let postCMC = addConHTag(data[i].cmc, "CMC:", data[i].id);
                       let postPower = addConHTag(data[i].power, "Power:", data[i].id);
                       let postToughness = addConHTag(data[i].toughness, "Toughness:", data[i].id);
                       let postLoyalty = addConHTag(data[i].loyalty, "Loyalty:", data[i].id);
                      
                       post.append(postName);
                       post.append(postType);
                       post.append(postCMC);
                       post.append(postPower);
                       post.append(postToughness);
                       post.append(postLoyalty);
                        
                    }
                    let postTxt = addConHTag(data[i].usrTxt, "User Posted:", data[i].id);
                    post.append(postTxt);
                    
                     let commentCmp = commentCpnt(data[i].id); //create the comment component.
                    post.append(commentCmp);
                    $("#postBrd").prepend(post);
                }
                $(".comSub_").on("click", function(event) {
                    event.preventDefault();
                   let subBtn = $(this).attr("id");
                //    let comment = "";
                   $("." + subBtn).val();
                    let comment = {
                       author: $(this).siblings("input").val(),
                       body: $(this).siblings("textarea").val(),
                    //    mtgPostId: $(this).attr("id")
                   }
                   $.post("/api/comments",comment)
                   .then(function(data){
                       console.log(data);
                   })
                   
                   
                   console.log($(this).siblings("input").val())
                   console.log($(this).siblings("textarea").val())
                   alert("click")     
                   
                })
                
            }); 
            
        }
        


        function postComment(){

            $.get("/api/comments", function(data){
                console.log(data)
                console.log(postCommentId.lastIndexOf())
                
                if (data.length !== 0) {
    
                    for (var i = 0; i < data.length; i++) {
                let comRow = $("<div>");
                comRow.addClass("comRow-list");
                comRow.append("<p>" + data[i].author + " commented... </p>")
                comRow.append("<p>" + data[i].body + "</p>")
                $("#comment-area" + postComment.lastIndexOf()).append(comRow)
                    }
                }
            })
        }
        
    function clearPostHldr(){
        $("#postHldr").html("");
        $("#postBx").val("");
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
        $.post("/api/addPost", mtgCard, function(){ 
            
        }).then((data) => {
            //make and call prependPost();
            console.log("line 191 mkpost:");
            console.log(data);
            prependPost(data);
            commentPostId.push(data.id);
            clearPostHldr();
        });
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









