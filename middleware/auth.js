let jwt = require('jsonwebtoken');
let helper = require('../scripts/helpers');
var log4js = require('log4js');
var logger = log4js.getLogger("JWTAuth");
logger.level = 'debug';
var helper = require('../helpers/helper');


const verify = function (req, res, next){
    if(req.headers.authorization === null){
        logger.error("Auth token not available");
        return res.status(401).json(helper.getErrorMessage("Auth token not available"))
    }else {
        logger.debug("HEADER "+ JSON.stringify(req.headers))
    }

    let header = req.headers.authorization.substring(7);

    try {
        logger.debug("\n\n ================\n\n%s\n\n=================\n\n",header);

        jwt.verify(header, helper.secretKey , function(err, verify) {
            if(err){
                logger.error(err)
                return res.status(401).json(helper.getErrorMessage(err))
            }else{
                console.log(verify)
                req.username = verify.username;
                req.orgname = 'org1';
                return next();
            }
        });
    }catch(error){
        logger.error(error+" Token Received "+header);
        return res.status(401).json(helper.getErrorMessage("Auth token failed or invalid"))
    }
}

module.exports = verify;
