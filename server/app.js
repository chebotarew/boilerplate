const express = require('express');
const compression = require('compression');
const expressStatusMonitor = require('express-status-monitor');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet')
const lusca = require('lusca')
const path = require('path')
const bodyParser = require('body-parser')
const Router = require('./routes')

const app = express();
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));

require('./models');
console.log(path.join(__dirname, 'static'))
app.use( express.static(path.join(__dirname, 'static'), { maxAge: 31557600000 }));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.secretWord,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.uriDB,
    autoReconnect: true,
  })
}));
// кросдоменный запрос
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(helmet())
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use('/', Router)
app.use('*', (req, res) => res.sendFile(__dirname+'/static/index.html'));



app.use((req, res, next) => {
  res
    .status(404)
    .json({ err: '404', message: 'no found this route' });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ err: '500', message: err.message });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, function() {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
} else {
  module.exports = app;
}
