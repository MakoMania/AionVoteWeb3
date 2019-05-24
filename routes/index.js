var express = require('express');
var router = express.Router();
const web3 = require('../scripts/web3Integration'); 
const User = require('../model/user');

/* ADMIN PORTAL */

/**
 * TODO:
 * Signup Admins
 * Verifications
 * Wallet integration
 */

//  /admin.portal/signup
router.get('/signup', (req, res, next) => {

  const user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.username = req.body.username;

  await user.save((error, saved) => {
    if(error) throw error;

    return res.send({
      "success":true,
      "data":saved
    })
  });
 
});

//  /admin.portal/authenticate
router.get('/authenticate/{email}', (req, res, next) => {

  User.findOneAndUpdate({"email": req.params.email}, {"isActive": true}, (error, auth) => {
    if(error) throw error;

    return res.send({
      "success":true,
      "data":auth
    })
  });
 
});

//  /admin.portal/addpoll
router.get('/addpoll', (req, res, next) => {

  User.findOneAndUpdate({"email": req.params.email}, {"isActive": true}, (error, auth) => {
    if(error) throw error;

    return res.send({
      "success":true,
      "data":auth
    })
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
