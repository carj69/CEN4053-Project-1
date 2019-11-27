const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const json = require("morgan-json");
const axios = require("axios");

let logStream = fs.createWriteStream("./log.json", {flags: "a"});
const format = json({
	Date: ":date[web]",
	Method: ":method",
	Route: ":url",
	Status: ":status",
	Response: ":res[content-length]",
	Response_time: ":response-time ms"
});

const base = 10;
const time = 4000;
const maxQuantity = 40;
const numItems = 4;
//sets open port
app.set("port", 82);

// Routing Middleware.
app.use(
	morgan(logFormat, {
        stream: logStream
	})
);


/*	reads .json file on what is available to the customer	*/
/*	get request to view what is available					*/
app.get("/getcount/:item", (req, res) => {
    let file = fs.readFileSync("./OrderingHarness/availability.json", "utf8");
    avl = JSON.parse(file);
    var quantityAvl;

    avl.forEach(i => {
        if(i.name === req.params.item){
            quantityAvl = i.quantity;
        }
    });
    res.send(quantityAvl);
});

/*	reads .json file on what is available to the customer						*/
/*	makes changes to the file accoring to what and how much the purchase was	*/
app.post("/setcount/:item/:quantity", (req, res) => {
    let file = fs.readFileSync("./OrderingHarness/availability.json", "utf8");
    avl = JSON.parse(file);

    avl.forEach(i => {
        if(i.name === req.params.item){
            i.quantity = parseInt(req.params.quantity, base);
        }
    });

});


/*	reads .json file on what is available to the customer		*/
/*	makes a post request to purchase a random item and quantity	*/
function timedRequest(){
    let file = fs.readFileSync("./OrderingHarness/availability.json", "utf8");
    item = JSON.parse(file);
    let randItem = Math.floor(Math.random() * NumItems);
    var quantity = Math.floor(Math.random() * maxQuantity);

    axios.post(`/purchase/${item[randItem]}/${quantity}`);
}

/*	Failsafe if connection takes too long	*/
setTimeout(timedRequest, time);

// 404 catch-all handler
app.use((req, res, next) => {
	res.status(404);
	res.send("404 - route not found.");
});

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost/:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});