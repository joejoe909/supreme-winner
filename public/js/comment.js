$(document).ready(() => {
$.get("/api/all", function(data) {

  
  if (data.length !== 0) {
    
    for (var i = 0; i < data.length; i++) {
      
        var row = $("<div>");
        row.addClass("com-list");
        row.append("<p>" + data[i].author + " commented.. </p>");
        row.append("<p>" + data[i].body + "</p>");
        row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");
        $("#comment-area").prepend(row);
      }
    }
  });
  
  // When user comments (clicks addBtn)
  $("#comment-submit").on("click", function(event) {
    event.preventDefault();
  
    // Make a newComment object
    var newComment = {
      author: $("#author").val().trim(),
      body: $("#comment-box").val().trim(),
      // created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    };
  
    console.log(newComment);
  
    // Send an AJAX POST-request with jQuery
    $.post("/api/new", newComment)
    // On success, run the following code
    .then(function() {
      
      var row = $("<div>");
      row.addClass("com-list");
      
      row.append("<p>" + newComment.author + " comments: </p>");
      row.append("<p>" + newComment.body + "</p>");
      row.append("<p>At " + moment(newComment.created_at).format("h:mma on dddd") + "</p>");
      
      $("#comment-area").prepend(row);
      
    });
    
    // Empty each input box by replacing the value with an empty string
    $("#author").val("");
    $("#comment-box").val("");
  });

});