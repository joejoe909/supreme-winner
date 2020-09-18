const mtg = require("mtgsdk");
const express = require("express");
const app = express();
const PORT = 8080;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('What card are you looking for?', name1 => {
    readline.close();
    mtg.card.where({ name: name1 }).then((results) => {
        console.log(results);
    });
});

app.listen(PORT,()=>{
    console.log('server running at http://localhost${PORT}/')
});