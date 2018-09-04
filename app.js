const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const session = require('express-session');
const cors = require('cors')
const request = require('request');
const settings = require('./config/settings');

// mlab connection 
const mongoUri = settings.databaseUrl;
// mongoose mlab connection
mongoose.connect(mongoUri, {
  useMongoClient: true
});
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const index = require('./routes/index');
const users = require('./routes/users');
const home = require('./routes/home');
const tasks = require('./routes/tasks');
const interests = require('./routes/interests');
const bitcoin = require('./routes/bitcoin');
const moneyNews = require('./routes/moneyNews');
const posts = require('./routes/posts');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: settings.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 180 * 60 * 1000 }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/home', home);
app.use('/tasks', tasks);
app.use('/interests', interests);
app.use('/bitcoin', bitcoin);
app.use('/moneyNews', moneyNews);
app.use('/posts', posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
