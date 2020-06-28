const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

require('./config/db')()

app.use(express.json({ extended: false }))

// Express Session
app.use(session({
  secret: 'secret_KEY',
  saveUninitialized: false,
  resave: false,
}));

// Parsers init
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Passport init
const passport = require('passport')
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

// Initial routes
app.use('/auth', require('./routes/auth'))
app.use('/streams', require('./routes/streams'))

const {realTime} = require('./routes/realTime.js')
realTime(io)

const port = 5000
http.listen(port, () => console.log('listening on port ', port))