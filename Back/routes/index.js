var express = require('express');
var router = express.Router();
var fs = require('fs')

router.post('/', function(req, res, next) {
  var data = req.body;
  var Procedure = data.procedurenum;
  var Cost = Number(data.Cost);
  var State = data.State;
  var Gender = data.Gender;
  var Age = Number(data.Age);
  console.log(data)
  console.log(State)
  console.log(Gender)

  var output = [Procedure, Cost, State, Gender, Age]

  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database("data.db");

  db.run('INSERT INTO entries(proc_id, datetime, price, age, gender, state) VALUES (?, datetime("now", "localtime"), ?, ?, ?, ?)', [Procedure, Cost, Age, Gender, State]);

  var sql = "SELECT procedures.proc_id, procedures.name, entries.datetime, entries.price, entries.age, entries.gender, entries.state FROM procedures INNER JOIN entries ON procedures.proc_id = entries.proc_id;"
  var params = []
  console.log("reached here")

  db.all(sql, params, (err, rows) => {
      /*if (err) {
        res.status(400).json({"error":err.message});
        return;
      }*/

      /*res.json({
          "message":"success",
          "data":rows
      })*/

      dict = {"data": rows}
      console.log(dict)
      var dictstring = JSON.stringify(dict)
      fs.writeFile("../Front/jsonFiles/set1.json", dictstring, function(err, result) {
          if(err) console.log('error', err);
      });

    });

  db.close()
  res.redirect("http://127.0.0.1:5501/Front/website/html/post.html")
  
});

module.exports = router;
