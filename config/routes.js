var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
var surfController = require('../controllers/surf');


function authenticatedUser(req, res, next) {
    // If the user is authenticated, then we continue the execution
    if (req.isAuthenticated()) return next();
    // Otherwise the request is always redirected to the home page
    res.redirect('/');
  }




router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)

//Logged in routes?

router.route('/surfspots')
  .get(authenticatedUser, surfController.getSurfMap) //somethingController.getYourSurfMap)

router.route('/surfspots')
  .post(surfController.postSurfSpot)

router.route('/api/surfspots')
  .get(surfController.getAllSpots)

router.route('/api/surfspots/:id')
  .put(surfController.editSpot)

router.route('/api/surfspots/:id')
  .delete(surfController.deleteSpot)


module.exports = router