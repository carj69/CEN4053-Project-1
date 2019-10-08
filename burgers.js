const express = require('express');

let app = express();

//morgan logging stuff

app.set("port", 80);

/*this is the version page*/
app.get('/version', function(req, res) {
res.send('This is version 0 of the HotBurger service');
});

/*this is the log page*/
app.get('/logs', function(req, res) {

res.send('');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});