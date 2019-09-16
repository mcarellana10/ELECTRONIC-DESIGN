//sniffer
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var mensaje;
server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});
server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    mensaje = msg.toString("utf8");
    console.log(mensaje);
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
      var sql = "INSERT INTO momlamtable (message) VALUES ?";
      var values=[ 
        [ mensaje]
      ];
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });


});
server.on('listening', () => {
    const address = server.address();
    //console.log(`server listening ${address.address}:${address.port}`);
});
server.bind(41570, '172.31.20.138');
// Prints: server listening 0.0.0.0:41234

//base de datos




// server 
const express = require('express');
const app = express();
var hbs = require('express-hbs');
const path = require('path');
const port = process.env.PORT || 3000;
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views'
}));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

// static files 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'MOMLAM'
    });
});

app.get('/coord', (req, res) => {
    res.json(`${mensaje}`);
});
app.get('/plana', (req, res) => {
    res.render('coor', {});
});

app.get('/mapa', (req, res) => {
    res.render('mapa', {});
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});