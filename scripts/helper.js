var log4js = require('log4js');
const nodemailer = require("nodemailer");
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

var sendEmail = async (sendto, message, ref) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'bithela@2019', 
      pass: 'noreplybithela@kesholabs.com'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"AionVote Support 👻" support@kesholans.com', // sender address
    to: `${sendto}`, // list of receivers
    subject: `${ref} ✔`, // Subject line
    text: `${message}`, // plain text body
    html: "<b>Hello world?</b>" // html body
  });

    logger.debug("Message sent: %s", info.messageId);
    logger.debug("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    if(info.messageId){
        return "Message Sent";
    }

    return "Message Failed";
}

exports.getLogger = getLogger;
exports.getErrorMessage = getErrorMessage;
exports.getSuccessMessage = getSuccessMessage;
exports.sendEmail = sendEmail;