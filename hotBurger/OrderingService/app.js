/**************** ORDERING SERVICE ******************************
*																*
*	Author: Charles Redding										*
*	Git:	https://github.com/carj69/CEN4053-Project-1.git		*
*	email:	car69@students.uwf.edu							*
*																*
****************************************************************/

const express = require("express");
const morgan = require("morgan");
const json = require("morgan-json");
const fs = require("fs");

let app = express();
let logStream = fs.createWriteStream("./log.json", {flags: "a"});
const logFormat = json({
	Date: ":date[web]",
	Method: ":method",
	Route: ":url",
	Status: ":status"
});

//sets open port
app.set("port", 80);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: logStream}));

/*	this is the version page */
app.get("/version", function(req, res) {
	res.send("This is version 1 of the HotBurger service");
});

/*	This is the menu page */
app.get("/getmenu", function (req, res) {
    res.send("<p>Hotdog: $20<p\><p>Hamburger: $35<p\><p>Soda: $4<p\><p>Cookie: $6<p\>");
});

/*	This is the purchase page	*
*  								*
*  /purchase/<item>/<quantity>	*/
app.all("/purchase/:item/:quantity", (req, res) => {
	// read in the orders.json file
    let data = fs.readFileSync("./orders.json", "utf8");
	// orders is declared has the json object
    orders = JSON.parse(data);

    // update the quantity of the item sent in the json file
    orders.forEach(item => {
      // Check to make sure the item exists
      if (item.name === req.params.item) {
        item.quantity += parseInt(req.params.quantity, 10);
      }
    });

    // update orders.json file with amount ordered to keep track of total purchases made
    fs.writeFileSync("./orders.json", JSON.stringify(orders));

    res.send(`Order made for ${req.params.quantity} of ${req.params.item}`);
});

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