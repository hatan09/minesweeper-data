const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@minesweeper.jxy1z.mongodb.net/minesweeperdata?retryWrites=true&w=majority";


const MongoObject = {
    resultArray : 0,
    
    getAllUsers : function(callback){
        MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
            if (err) throw err;
            var dbo = db.db("example0");
            dbo.collection("users").find({}).toArray((err, resultArray) => {
              if(err) throw err;
              callback(resultArray);
            })
          });
    },

    findUserById : function(id, callback){

    },

    addUser : function(data){
        MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
            if (err) throw err;
            var dbo = db.db("example0");
            var myobj = data;
            dbo.collection("users").insertOne(myobj, (err, res) => {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
        });
    },

    updateUser : function(data){

    },

    deleteUser : function(data){

    },
}

module.exports = MongoObject;
