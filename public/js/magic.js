$(document).ready(function () {
    let cardName = 'Sol Ring';
    // send an AJAX POST-request with jQuery
   
  
    $("#mkPost").on("click", function () {
        console.log("mkpost click");

    });

    $("#addCard").on("click", function () {
        console.log("addCard click");
        $.get("/api/card/"+ cardName)
        // on success, run this callback
        .then(function (data) {
         // log the data we found
         console.log(data);

        });
    });
    
   
});