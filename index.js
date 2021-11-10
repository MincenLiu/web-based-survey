const express = require('express');
const { read } = require('fs');
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool, Client } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
//const bodyParser = require('body-parser');

// var pool = new Pool({
//     user: 'jovttytttjkoaw',
//     host: 'ec2-52-23-45-36.compute-1.amazonaws.com',
//     database: 'de369o7l6fqn9p',
//     password: '77d7812505f2328350b04d9fb5bb45ade034c24a216d4ac59682c55fcce5941b',
//     port: 5432,
//     });
var timeNow = new Date();
const app = express();
//app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname, 'build'))); 
 app.use(express.json());
// app.use(express.urlencoded({
//   extended: trueß
// }));
//app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.post('/answer',async (req,res)=>{
  //  var postData = JSON.parse(req.body);
  console.log(req.body);
const client = await pool.connect();
var result = await client.query('INSERT INTO answer (id, time, survey, question, answer, date) VALUES ("'+ req.body.id+'","'+ req.body.time+'","'+req.body.survey+'","'+req.body.question +'","'+req.body.answer+'",'+"10)"
);
//pool.end();
 client.release();
    res.send('WWWWWÍ');
});ß
// app.get('/answer',function(req,res){
//      console.log(req.id);
//     //pool.query('INSERT INTO answer (id, Time, survey, question, answer, date) VALUES ("'+ req.body.id+'","'+ req.body.time+'","'+req.body.survey+'","'+req.body.question +'","'+req.body.answer+'",'+"10)", (err, res) => {
//        // console.log(err, res);
//      //   pool.end();
//        // res.send('WWWWWÍ');
//         // });
// });
app.post('/', function(req, res) { res.sendFile(path.join(__dirname + '/build/index.html')); });



app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
