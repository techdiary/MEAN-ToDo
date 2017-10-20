
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

function DB() {
  this.db = null;  //The MongoDB database connection
}


DB.prototype.connect = function(uri) {

  // Connect to the database specified by the connect string / uri

  // Trick to cope with the fact that "this" will refer to a different
  // object once in the promise's function.
  var _this = this;

  return new Promise(function(resolve, reject) {
    if (_this.db) {
      // Already connected
      resolve();
    } else {
      var __this = _this;

      // Many methods in the MongoDB driver will return a promise
      // if the caller doesn't pass a callback function.
      MongoClient.connect(uri)
        .then(
          function(database) {

            // The first function provided as a parameter to "then"
            // is called if the promise is resolved successfuly. The
            // "connect" method returns the new database connection
            // which the code in this function sees as the "database"
            // parameter
            console.log("Successfully connected")
            // Store the database connection as part of the DB object so
            // that it can be used by subsequent method calls.

            __this.db = database;

            // Indicate to the caller that the request was completed succesfully,
            // No parameters are passed back.

            resolve();
          },
          function(err) {

            // The second function provided as a parameter to "then"
            // is called if the promise is rejected. "err" is set to
            // to the error passed by the "connect" method.

            console.log("Error connecting: " + err.message);

            // Indicate to the caller that the request failed and pass back
            // the error that was returned from "connect"

            reject(err.message);
          }
        )
    }
  })
};

DB.prototype.close = function() {

  // Close the database connection. This if the connection isn't open
  // then just ignore, if closing a connection fails then log the fact
  // but then move on. This method returns nothing – the caller can fire
  // and forget.

  if (this.db) {
    this.db.close()
      .then(
        function() {},
        function(error) {
          console.log("Failed to close the database: " + error.message)
        }
      )
  }
};

DB.prototype.getTodo = function(id) {
  var _this = this;
  //Convert id to ObjectId to query using _id
  var o_id = new ObjectId(id);
  return new Promise( function (resolve, reject) {
    _this.db.collection('todos', function (err, collection) {
      if (err){
        console.log("Could not access collection: " + err.message);
        reject(err.message);
      }
      else {
        //Return the object by using find
        doc = collection.findOne( {_id: o_id});
        resolve(doc)
      }
    })
  })
};

DB.prototype.allTodos = function() {
  var _this = this

  return new Promise( function (resolve, reject) {
    _this.db.collection('todos', function(err, collection){
      if (err){
        console.log("Could not access collection: " + err.message);
        reject(err.message);
      }
      else {
      //  Create a cursor from find()

        let cursor = collection.find();
        console.log('cursor to be iterated')

      //  Iterate over cursor to access each document in the result

        cursor.toArray( (err, docArray) => {
          if (err) {
            console.log('Error reading from cursor' + err.message);
            reject(err.message)
          }
          else {
            resolve(docArray);
          }
        })
      }
    })
  })
};

DB.prototype.createTodo = function (title, desc) {

//  Return true if successfully done
  var _this = this;

  return new Promise( function (resolve, reject) {

    _this.db.collection('todos', function (err, collection) {
      if (err){
        console.log("Could not locate collection" + err);
        reject(err);
      }
      else {
        collection.updateOne(
          { title: title.toString()},
          { $set: { description: desc.toString()},
            $currentDate: {lastModified: true},
          },
          { upsert: true}
          )
          .then(
            function () {
              resolve(1);
            },
            function (err) {
              console.log("InsertOne failed: " + err)
              reject(err);
            }
          )
      }
    });

  });
};

DB.prototype.deleteTodo = function(id) {
  let _this = this;
  let o_id = new ObjectId(id);

  return new Promise( function ( resolve, reject) {
    _this.db.collection('todos', function (err, collection) {
      if(err){
        console.log("Error connection to collection" + err.message);
        reject(err.message);
      }
      else{
      //  Delete the object by using deleteOne
      result = collection.deleteOne( { _id: o_id});
      resolve(result["acknowledged"]);
      }
    })
  })
}

DB.prototype.updateTodoTitle = function(id, dataChange){
  let _this = this;
  let o_id = new ObjectId(id);

  return new Promise( function (resolve, reject) {
    _this.db.collection('todos', function (err, collection) {
      if(err){
        console.log("Error connection to collection" + err.message);
        reject(err.message);
      }
      else {
        result = collection.updateOne(
          { _id: o_id},
          { $set: { title: dataChange } });
        resolve(result["modifiedCount"]);
      }
    })
  })
  };
DB.prototype.updateTodoDesc = function(id, dataChange){
  let _this = this;
  let o_id = new ObjectId(id);

  return new Promise( function (resolve, reject) {
    _this.db.collection('todos', function (err, collection) {
      if(err){
        console.log("Error connection to collection" + err.message);
        reject(err.message);
      }
      else {
        result = collection.updateOne(
          { _id: o_id},
          { $set: { description: dataChange } });
        resolve(result["modifiedCount"]);
      }
    })
  })
  };

//
module.exports = DB;

