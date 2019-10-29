const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

let logStream = fs.createWriteStream("./log.txt", {flags: "a"});
let app = express();

app.set("port", 80);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: logStream}));
 
app.get("/version", function(req, res) {
	res.send("This is version 0 of the HotBurger service");
});
app.get("/logs", function(req, res) {
	let r = fs.readFileSync("./log.txt", "UTF8");
	res.send(r);
});
 
 
app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost/:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
