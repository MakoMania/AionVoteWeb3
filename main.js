var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let config = require('dotenv').config();
var cors = require('cors');
var https = require('https');
var fs = require('fs');
const mongodb = require('./dbConfig/dynamodb');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger/swagger.json');

var index = require('./routes/index');



const startApp = async () =>{
  var app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  /*ENABLE CORS*/
  app.use(cors());
  await mongodb.dbConnection();
  
  /*ROUTES*/
  app.use('/admin.portal/', index);
  // swagger-ui
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  // set our port
  var port = 7900;        
  
  // var server = https.createServer(options, app);
  
  // START THE SERVER
  app.listen(port);
  console.log('Magic happens on port ' + `http://localhost:${port}`);
}
startApp();


module.exports = app;
