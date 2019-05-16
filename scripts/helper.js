var log4js = require('log4js');
var logger = log4js.getLogger('Helper');
logger.level = 'debug';

var getLogger = function(moduleName) {
    var logger = log4js.getLogger(moduleName);
    logger.level = 'debug';
    return logger;
};

var getErrorMessage = function (field) {
    var response = {
        success: false,
        message: field + ' field is missing or Invalid in the request'
    };
    return response;
};

var getSuccessMessage = function (field) {
    var response = {
        success: true,
        message: field
    };
    return response;
};

exports.getLogger = getLogger;
exports.getErrorMessage = getErrorMessage;
exports.getSuccessMessage = getSuccessMessage;