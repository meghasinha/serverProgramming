//importing modules
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./model.js'),
  passportJWT = require('passport-jwt');

var Users = Models.User;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

//local Strategy to define basic Http aurthentication for login request
passport.use(new LocalStrategy({
 usernameField: 'Username',
 passwordField: 'Password'
}, (username, password, callback) => {
 console.log(username + '  ' + password);
 Users.findOne({ Username: username }, (error, user) => {
   if (error) {
     console.log(error);
     return callback(error);
   }
   if (!user) {
     console.log('incorrect username');
     return callback(null, false, {message: 'Incorrect username or password.'});
   }
   console.log('finished');
   return callback(null, user);
 });
}));

//jwt Strategy to authenticate user
passport.use(new JWTStrategy({
 jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
 secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
 return Users.findById(jwtPayload._id)
 .then((user) => {
   return callback(null, user);
 })
 .catch((error) => {
   return callback(error)
 });
}));
