const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Item One", "Item Two", "Item Three"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function(req, res) {

    const day = date.getDate();

    res.render('list', {listTitle: day, newListItems: items});
});

app.post("/", (req, res) => {
 
    const item = req.body.newItem;

    if (item !== "") {

        if (req.body.list === "Work") {
            workItems.push(item);
            res.redirect("/work");
        } else {
            items.push(item);
            res.redirect("/");
        }
    } else {

        if (req.body.list === "Work") {
            workItems.push();
            res.redirect("/work");
        } else {
            items.push();
            res.redirect("/");
        }
    }
     
});


app.get("/work", (req, res) => {
    res.render('list', {listTitle: "Work list", newListItems: workItems});
});


app.get("/about", (req, res) => {
    res.render("about");
});


app.listen(3000, (req, res) => {
    console.log("Server started on port 3000");  
}); 

 