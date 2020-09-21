function commentCpnt(){}

function commentCpnt(){
let sbmtButton = $("<button>").textContent("Submit");
sbmtButton.attr("id", "comment-submit");
sbmtButton.attr("class", "btn btn-lg pull-right");

let txtArComment = $("<textarea>").attr("class", "form-control");
txtArComment.attr("id", "comment-box");
txtArComment.attr("placeholder", "Enter Comment Here!");
txtArComment.attr("rows", "3");

let pComment = $("<p>").textContent("Comment:");

let inptName = $("<input>").attr("class", "form-control");
inptName.attr("id", "author");
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

let commentArea = $("<div>").attr("id", "comment-area");
let inrH2 = $("<h2>").textContent("Comments");
let inrCol8 = $("<div>").attr("class", "col-sm-8 col-sm-offset-2");
let innerRow = $("<div>").attr("class", "row");
innerRow.append(inrCol8);
innerRow.append(inrH2);
innerRow.append("<hr>");
innerRow.append(commentArea);

let row = $("<div>").attr("class", "row");
row.append(col8);
row.append(innerRow);
}

module.exports = commentCpnt;