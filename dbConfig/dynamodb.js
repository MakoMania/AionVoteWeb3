var mongoose = require('mongoose');
var log4js = require('../scripts/helper');
var logger = log4js.getLogger("MONGODB_CONNECTION");
logger.level = 'debug';

const DBName = 'AionVote';
const DBUser = 'admin';
const DBPassword = 'team12340';
// const MONGODB_URI = `mongodb://${DBUser}:${DBPassword}@165.22.94.162:27017/${DBName}?authSource=admin`;
const MONGODB_URI = `mongodb://localhost:27017/${DBName}`;

module.exports = {
	 dbConnection () {	
		mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function(err) {
			if (err) {
				logger.error('MongoDB connection error: ' + err);
				process.exit(1);
			}else{
				logger.debug("MongoDB Connected Successfully")
			}
		});
	}
}
