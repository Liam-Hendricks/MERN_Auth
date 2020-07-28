//importing requirements
const express = require('express');
const path = require('path');

const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require("passport");
const cors =require('cors');
const db = require("./config/keys").mongoURI;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(helmet());
app.use(passport.initialize());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



require("./config/passport")(passport);
require('./routes/login.js')(app);
require('./routes/register.js')(app);
const todoRoutes = require('./routes/todo.routes');
app.use('/api',todoRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose.Promise = global.Promise;
mongoose.connect(db,{useNewUrlParser:true});

mongoose.connection.on('error', function() {
	console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})



const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port localhost:${port} !`));
