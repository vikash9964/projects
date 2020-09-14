'user strict';

/*const mysql = require('mysql');
var config = require('./config');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.username,
  password : config.db.password,
  database : config.db.database,
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;*/

// DB connection
var MONGODB_URL = "mongodb://localhost:27017/myDatabase";
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);		
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
var dbConn = mongoose.connection;

//module.exports = dbConn;