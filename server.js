var env = require('dotenv').config();
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// mongoose.connect('mongodb://localhost/Surfspot_Project'); 

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./config/passport')(passport);

  app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

var routes = require('./config/routes');
app.use(routes);

//YOU WERE MISSING THIS FUNCTION????????
app.get('/', function homepage(req,res){
	res.sendFile(__dirname + '/views/index.ejs');
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port 3000 or somethign like that.");
});