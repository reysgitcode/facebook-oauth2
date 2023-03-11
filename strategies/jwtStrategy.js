const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');

const cookieExtractor = (req) => {
    const payload = req.cookies['payload'];
    return payload;
}

const jwtLogin = new Strategy({
    secretOrKey:  process.env.JWTSecret,
    jwtFromRequest: cookieExtractor
}, (payload, done) => {
    done(null, payload)
})

passport.use('jwt', jwtLogin);