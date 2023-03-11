const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const dotenv = require('dotenv').config();


const facebookLogin = new FacebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/facebook/callback',
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
})

passport.use('fuck', facebookLogin);
