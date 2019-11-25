/**************** ORDERING SERVICE ******************************
*																*
*	Author: Charles Redding										*
*	Git:	https://github.com/carj69/CEN4053-Project-1.git		*
*	email:	car69@students.uwf.edu							    *
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
    Status: ":status",
    Response: ":res[content-length]",
    Response_time: ":response-time ms"
});

//sets open port
app.set("port", 80);

// Routing Middleware.
app.use(
	morgan(logFormat, {
        stream: logStream
	})
);

/* Landing page */
app.get("/", (req, res) => {
    res.send("Welcome to HotBurger.");
});

/*	this is the version page */
app.get("/version", (req, res) => {
	res.send("This is version 1.0 of the HotBurger service");
});

/*	This is the menu page */
app.get("/getmenu", (req, res) => {
    res.send("<p>Hotdog: $20<p\><p>Hamburger: $35<p\><p>Soda: $4<p\><p>Cookie: $6<p\>");
});

/*	This is the purchase page	        *
*  								        *
*  Format: /purchase/<item>/<quantity>	*/
app.all("/purchase/:item/:quantity", (req, res) => {

    var q = 0;
    axios.post(`/getcount/${req.params.item}`)
        .then((response) => {
            q = response;
        });

    if (parseInt(q, base) < parseInt(req.params.quantity), base) {
        res.send("There is not enough inventory");
    }

	// read in the orders.json file
    let data = fs.readFileSync("./orders.json", "utf8");
	// orders is declared has the json object
    orders = JSON.parse(data);

    // update the quantity of the item sent in the json file
    orders.forEach(product => {
        // Check to make sure the item exists
        if (product.name === req.params.item) {
            product.quantity += parseInt(req.params.quantity, 10);
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