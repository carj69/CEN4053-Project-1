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
const app = express();
const fs = require("fs");
const data = fs.readFileSync("./orders.json", "utf8");

let logStream = fs.createWriteStream("./logs.json", { flags: "a" });

const logFormat = json({
	Date: ":date[web]",
	Method: ":method",
	Route: ":url",
    Status: ":status",
    Response: ":res[content-length]",
    Response_time: ":response-time ms"
});

// sets open port
app.set("port", 81);

app.use(
    morgan(logFormat, { stream: logStream })
);

/* ############# Monitoring services ################# */

/* Total revenue */
app.get("/gettotal", (req, res) => {
    let total = 0;
    orders = JSON.parse(file);

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
    orders = JSON.parse(file);
    let bestSeller = orders[0];

	// Checks each item to find one with most sales
	orders.forEach(item => {
        if (item.quantity * topSeller.price > bestSeller.quantity * topSeller.price) {
			bestSeller = item;
		}
	});
    res.send(`${topSeller.name} sold ${topSeller.quantity}`);
});

/* Top requested object */
app.get("/getrequestcount", (req, res) => {
    let count = 0;
    let logs = fs.createReadStream("logs.json")
		.on("data", function(chunk) {
			for (i = 0; i < chunk.length; ++i) 
				if (chunk[i] == 10) 
					count++;
			})
		.on("end", () => {
            res.send(`We have had ${count} requests`);
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
    const readLastLines = require("read-last-lines");
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