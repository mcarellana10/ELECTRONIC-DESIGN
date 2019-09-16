var mysql = require('mysql');

var con = mysql.createConnection({
  host: "momlamrds.c5fjjdasiyv7.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "momlammariaca",
  database: "momlamdb"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE momlamtable (idmsg int, message VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });