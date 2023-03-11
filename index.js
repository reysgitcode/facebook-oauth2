const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv').config();
const passport = require('passport');
const cookieParser = require('cookie-parser');

const requireJwtAuth = require('./middleware/requireJwtAuth.js');
const jwt = require('jsonwebtoken');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

passport.initialize();

// Strategy
require('./strategies/facebookStrat.js');
require('./strategies/jwtStrategy.js');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    console.log(req.user);
    res.render('home', {user: req.user});
})

app.get('/home', [requireJwtAuth, (req, res, next) => {
  res.render('home', {user: req.user});
}])

app.get('/auth/facebook',
  passport.authenticate('fuck', {
    session: false
  }));

app.get('/auth/facebook/callback',
  passport.authenticate('fuck', { 
    session: false,
    failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const payload = jwt.sign(req.user, process.env.JWTSecret);
    res.cookie('payload', payload);
    res.redirect('/home');
  });

app.listen(3000,() => {
    console.log('listening on port 3000')
});