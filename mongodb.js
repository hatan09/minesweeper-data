const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@minesweeper.jxy1z.mongodb.net/minesweeperdata?retryWrites=true&w=majority";


const MongoObject = {
    resultArray : 0,
    
    getAllUsers : function(callback){
      MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
          if (err) throw err;
          var dbo = db.db("minesweeperdata");
          dbo.collection("users").find({}).toArray((err, resultArray) => {
            if(err) throw err;
            db.close();
            callback(resultArray);
          })
        });
    },

    findById : function(id, callback){
      MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        var dbo = db.db("minesweeperdata");
        var query = { id: id };
        dbo.collection("users").find(query).toArray((err, resultArray) => {
          if(err) throw err;
          db.close();
          callback(resultArray);
        })
      });
    },

    findByUsername : function(username, callback){
      MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        var dbo = db.db("minesweeperdata");
        var query = { username: username };
        dbo.collection("users").find(query).toArray((err, resultArray) => {
          if(err) throw err;
          db.close();
          callback(resultArray);
        })
      });
    },

    addUser : function(data, callback){
        MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
            if (err) throw err;
            // var dbo = db.db("minesweeperdata");
            // var myobj = data;
            // var user = this.findByUsername(data.username);
            // console.log(user);
            dbo.collection("users").insertOne(myobj, (err, res) => {
              if (err) throw err;
              console.log("1 document inserted");
            });
            dbo.collection("users").find({id: data.id}).toArray((err, resultArray) => {
              if(err) throw err;
              db.close();
              callback(resultArray);
            });
        });
    },

    updateUser : function(id, obj, callback){
      MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        let query = {id : id};
        let newValues = { $set: obj};
        var dbo = db.db("minesweeperdata");
        dbo.collection("users").updateOne(query, newValues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });
        dbo.collection("users").find({id: id}).toArray((err, resultArray) => {
          if(err) throw err;
          db.close();
          callback(resultArray);
        });
    });
    },

    deleteUser : function(data){

    },

    // checkUsername : new Promise(){

    // },
}

module.exports = MongoObject;
