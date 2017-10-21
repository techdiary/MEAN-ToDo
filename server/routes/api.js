const express= require('express');
const router = express.Router();
const config = require('/home/l33t/Documents/practise/mean/meanAlpha/config.js');

var DB = require('../db');
var uri = "mongodb://aayush24:xxxxxx@meanbeta-shard-00-00-sshqm.mongodb.net:27017,meanbeta-shard-00-01-sshqm.mongodb.net:27017,meanbeta-shard-00-02-sshqm.mongodb.net:27017/users?ssl=true&replicaSet=MEANbeta-shard-0&authSource=admin";


router.get( '/', (req, res) => {
  var testObject = {
    AppName: "MongoAlpha",
    "Version": 1.0
  }

  res.json(testObject);
} );

router.get('/config',(req, res, next) => {
  res.json(config.client)
});

router.get(/^\/todo\/(\w+)$/, (req, res, next) => {
  var todoid = req.params[0];

  //Request from client for single doc of collection using id

  /*Response will contain
  * {
  *   success: boolean
  *   data: object
  *   error: string
  * }*/
  var database = new DB;

  database.connect(uri)
    .then(
      () => {
        return database.getTodo(todoid);
      })
    .then(
      (obj) => {
        return {
          "success": true,
          "data": obj,
          "error": ""
        }
      },
      (err) => {
        console.log(`Error getting #{id}: ` + err.message );
        return {
          "success": false,
          "data": undefined,
          "error": "Error getting given id" + err.message
        };
      })
    .then(
      (resultObject) => {
        database.close();
        res.json(resultObject);
      }
    )
});
//READ
router.get('/todos', (req, res, next) => {
//  Request from client to give  arrays To-Do object

//  Response will contain:
//   {
//     success: boolean,
//     data: Object<Array>,
//     error: string
//   }
  var database = new DB;

  database.connect(uri)
    .then(
      () => {
        return database.allTodos() //
      })
    .then(
      (arr) => {
        return {
          "success": true,
          "data": arr,
          "error": ""
        };
      },
      (err) => {
        console.log('Failed to get all Todos:' + err);
        return {
          "success": false,
          "data": undefined,
          "error": "Failed to get all todos" + err
        };
      })
    .then(
      (resultObject) => {
        database.close();
        res.json(resultObject);
      }
    )

});

//CREATE
router.post('/todo', (req, res) => {
  /*Request from client to Insert new document,
    the request should be of the form

  {
    title: string,
    description: string;
  }

  The response will contain

  {
    success: boolean;
    error: string;
  }

  */

  var requestBody = req.body;
  var database = new DB;

  database.connect(uri)
    .then(
      () => {
        return database.createTodo(requestBody.title, requestBody.description)
      })
    .then(
      () => {
        return {
          "success": true,
          "error": ""
        }
      },
      (err) => {
        console.log(err);
        return {
          "success": false,
          "err": err
        }
      }
    )
    .then(
      (resultObject) => {
        database.close();
        res.json(resultObject);
      }
    )
});
//UPDATE
router.post(/^\/todo\/(\w+)\/title$/, (req, res) => {
  var todoid = req.params[0];
//  REQUEST
  /*
  {
   dataChange: string
  }
  */
//  RESPONSE
  /*
   {
    success: boolean
    error: string
   }
  * */
  let requestBody = req.body;
  let database = new DB;


  database.connect(uri)
    .then(
      () => {
        return database.updateTodoTitle(todoid, requestBody.dataChange)
      })
    .then(
      () => {
        return {
          "success": true,
          "error": ""
        }
      },
      (err) => {
        console.log("Could not update document: " + err);
        return {
          "success": false,
          "error": "Could not update document:" + err
        }
      })
    .then(
      (resultObject) => {
        database.close();
        res.json(resultObject);
      }
    )
});
router.post(/^\/todo\/(\w+)\/description$/, (req, res) => {
  var todoid = req.params[0];
//  REQUEST
  /*
  {
   dataChange: string
  }
  */
//  RESPONSE
  /*
   {
    success: boolean
    error: string
   }
  * */
  let requestBody = req.body;
  let database = new DB;


  database.connect(uri)
    .then(
      () => {
        return database.updateTodoDesc(todoid,requestBody.dataChange)
      })
    .then(
      () => {
        return {
          "success": true,
          "error": ""
        }
      },
      (err) => {
        console.log("Could not update document: " + err);
        return {
          "success": false,
          "error": "Could not update document:" + err
        }
      })
    .then(
      (resultObject) => {
        database.close();
        res.json(resultObject);
      }
    )
});

//DELETE
router.delete(/^\/todo\/(\w+)$/, (req, res, next) => {
//  Request from client is to delete the give to-do by _id
    var todoid = req.params[0];
// Response will contain
  /*  {
        success: boolean
        error: string
       }
  */

  let database = new DB;

  database.connect(uri)
    .then(
      () => {
        return database.deleteTodo(todoid);
      })
    .then(
      (bool) => {
        return {
          "success": bool,
          "error": ""
        }
      },
      (err) => {
        console.log("Error Deleting todo:" + err.message);
        return {
          "success": false,
          "error": "Error deleting todo: " + err.message
        }
      })
    .then(
      (resultObject) => {
        database.close();
        res.json(resultObject);
      }
    )

});

module.exports = router;
