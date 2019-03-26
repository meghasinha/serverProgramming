const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

//creating movie schema
var movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
    Death: String,
    Movies: [String]
  },
    actors: [String],
    ImagePath: String,
    Featured: Boolean
});

//creating uset schema
var userSchema=  mongoose.Schema({
  Username: {type: String, required: true},
  Password: { type: String, required: true},
  Email: { type: String, required: true},
  Birthday: Date,
  Movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}]
});

//function for actually hashing the password
userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

//to compare the hashed password with submitted paasword
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

//creating models
var Movie= mongoose.model('Movie', movieSchema);
var User= mongoose.model('User', userSchema);

//exporting models
module.exports.Movie= Movie;
module.exports.User= User;
