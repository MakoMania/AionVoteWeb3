var express = require('express');
var router = express.Router();
const helper = require('../scripts/helper');
const logger = helper.getLogger('AdminPOrtal-Ctrl')
const web3Conn = require('../scripts/web3Integration'); 
const User = require('../model/user');

/* ADMIN PORTAL */

/**
 * TODO:
 * Signup Admins
 * Verifications
 * Wallet integration
 */

//  /admin.portal/signup
router.post('/signup', async (req, res, next) => {
  // req.assert('username', 'Name cannot be blank').notEmpty();
  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('email', 'Email cannot be blank').notEmpty();
  // req.assert('password', 'Password must be at least 4 characters long').len(4);
  // req.sanitize('email').normalizeEmail({ remove_dots: false });
 
  // // Check for validation errors    
  // var errors = req.validationErrors();
  // if (errors) { return res.status(400).send(helper.getErrorMessage(errors)); }

  const user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.username = req.body.username;

  User.findOne({"email":req.body.email},{"username":req.body.username}, (error, data)=>{
    if(error) throw error;
    if(data){
      return res.send(helper.getErrorMessage('User Already Exists'))
    }

   user.save((error, saved) => {
      if(error) throw error;
        return res.send(helper.getSuccessMessage('Created Successfully'));
    });
  }) 
});

//  /admin.portal/verify
router.post('/verify', (req, res, next) => {
  User.findOne({"email": req.body.email}, {"isActive": false},async (error, auth) => {
    if(error) throw error;
    const email = await helper.sendEmail(req.body.email, req.body.message, req.body.ref);
    return res.send(helper.getSuccessMessage(email));
  });
});

//  /admin.portal/addproposal
router.post('/addproposal', async (req, res, next) => {
  const contractRes = await web3Conn.addContractType(req.body.contract, req.body.type);
  res.send(helper.getSuccessMessage(contractRes));
});

//  /admin.portal/addpoll
router.get('/addpoll', (req, res, next) => {
  web3Conn.master();
});

  //  /admin.portal/editpool
router.get('/editpool', (req, res, next) => {
  User.findOneAndUpdate({"email": req.params.email}, {"isActive": true}, (error, auth) => {
    if(error) throw error;
      return res.send({
        "success":true,
        "data":auth
      })
  });

});

  //  /admin.portal/hidepool
router.get('/hidepool', (req, res, next) => {
  User.findOneAndUpdate({"email": req.params.email}, {"isActive": true}, (error, auth) => {
    if(error) throw error;
      return res.send({
        "success":true,
        "data":auth
      })
  });
 
});

module.exports = router;
