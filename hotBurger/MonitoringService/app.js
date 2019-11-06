/**************** MONITORING SERVICE ****************************	
*																*
*	Author: Charles Redding										*
*	Git:	https://github.com/carj69/CEN4053-Project-1.git		*
*	email:	car69@students.uwf.edu.com							*
*																*
****************************************************************/

const express = require("express");
const morgan = require("morgan");
const json = require("morgan-json");
const fs = require("fs");

let app = express();
let logStream = fs.createWriteStream("./logs.json", {flags: "a"});
const logFormat = json({
	Date: ":date[web]",
	Method: ":method",
	Route: ":url",
	Status: ":status"
});

// sets open port
app.set("port", 80);

/* ############# Monitoring services ################# */
const data = fs.readFileSync("./orders.json", "utf8");
const orders = JSON.parse(data);

/* Total revenue */
app.get("/gettotal", (req, res) => {
	let total = 0;
	// Sum the totals
	orders.forEach(item => { 
		total += item.quantity * item.price; 
	});
    console.log(total);
    //Add all the quantities.
    res.send(`\$${total}`);
});

/* Top selling object */
app.get("/gettopseller", (req, res) => {
	let bestSeller = orders[0];
	// Checks each item to find one with most sales
	orders.forEach(item => {
		if (item.quantity > bestSeller.quantity) {
			bestSeller = item;
		}
	});
	res.send(bestSeller);
});

/* Top requested object */
app.get("/getrequestcount", (req, res) => {
    let i;
    let count = 0;
    fs.createReadStream("logs.json")
		.on("data", function(chunk) {
			for (i = 0; i < chunk.length; ++i) 
				if (chunk[i] == 10) 
					count++;
			})
		.on("end", () => {
        res.send(count.toString(10));
		});
  });

/* Most recent request status */
app.get("/getlastrequeststatus", (req, res) => {
	// Last entry should be at line 1
    readLastLines.read("logs.json", 1).then(result => {
		let jsonResult = JSON.parse(result);
		res.send(jsonResult.Status);
	});
});

/* Most recent request time */
app.get("/getlastrequesttime", (req, res) => {
	// Last entry should be at line 1
    readLastLines.read("logs.json", 1).then(result => {
		let jsonResult = JSON.parse(result);
		res.send(jsonResult.Date);
	});
});
/* ###################################################### */

/* Error Catches */

// 404 catch-all handler
app.use((req, res, next) => {
	res.status(404);
	res.send("404 - route not found.");
});

/* Listen to port */
app.listen(app.get("port"), function() {
	console.log(
		"Express started on http://localhost/:" +
		app.get("port") +
		"; press Ctrl-C to terminate."
	);
});