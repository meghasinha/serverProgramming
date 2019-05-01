//Importing  requored modules
const mongoose=require('mongoose');
const Model= require('./model.js');
const express= require('express');
const morgan= require('morgan');
const bodyParser= require('body-parser');
const uuid= require('uuid');
const passport = require('passport');
const cors= require('cors');
const validator= require('express-validator');

require('./passport');
//encapsulate express functionality
const app= express();
app.use(cors());
app.use(bodyParser.json());
var auth = require('./auth')(app);

app.use(validator());

//assign the modules
const Movies= Model.Movie;
const Users= Model.User;


app.use(express.static('public'));
app.use(morgan('common'));

//connect to mongodB
//mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

mongoose.connect('mongodb+srv://myFlixDBadmin:vijayant@174@cluster0-u54mz.mongodb.net/myFlixDB?retryWrites=true',{useNewUrlParser: true});

//return json object of movie to user
app.get('/movies',passport.authenticate('jwt',{ session:false}), function(req,res)
{
  Movies.find()
  .then (function(movies)
  {
    res.status(201).json(movies);
  })
  .catch (function(err)
  {
    console.eroor(err);
    res.status(500). send("Error" +err);
  });
});

//return json object of every user
app.get('/users', passport.authenticate('jwt',{ session:false}), function(req,res)
{
  Users.find()
  .then (function(users)
  {
    res.status(201).json(users);
  })
  .catch (function(err)
  {
    console.eroor(err);
    res.status(500). send("Error" +err);
  });
});

// return  movies by its name
app.get('/movies/:Title',passport.authenticate('jwt',{ session:false}), function(req,res)
{
  Movies.findOne({Title: req.params.Title})
  .then(function(movie)
  {
    res.status(201).json(movie);
  })
  .catch(function(err)
  {
    console.error(err);
    res.status(500).send ("Error" +err);
  });
});

//return json object of  genre information  by  its name
app.get('/genres/:Name',passport.authenticate('jwt', {session:false}),function(req,res)
{
  Movies.findOne({"Genre.Name":req.params.Name})
  .then(function(movie)
  {
    res.status(201).json(movie.Genre);
  })
  .catch(function(err)
  {
    console.error(err);
    res.status(500).send("Error" +err);
  });
});

//return json object of detail director information by its name
app.get('/directors/:Name',passport.authenticate('jwt',{session:false}),function(req,res)
{
  Movies.findOne({"Director.Name":req.params.Name})
  .then(function(movie)
  {
    res.status(201).json(movie.Director);
  })
  .catch(function(err)
  {
    console.error(err);
    res.status(500).send("error" +err);
  });
});

//Delete movie by its title
app.delete('/movies/:Title',passport.authenticate('jwt', {session:false}),function(req,res)
{
  Movies.findOneAndRemove({Title :req.params.Title})
  .then(function(movies)
  {

  if (!movies)
  {
    res.status(400).send(req.params.Title + " was not found");
  }
   else
  {
    res.status(200).send(req.params.Title + " was deleted.");
  }
  })
  .catch(function(err)
  {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Add a new user tpo the list
app.post('/users',function(req,res)
{
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({ errors: errors });
  }
  var hashPassword= Users.hashPassword(req.body.Password);
  Users.findOne({Username:req.body.Username})
  .then(function(user)
  {
    if(user)
    {
      return res.status(400).send(req.body.Username +"already exists");
    }
    else
    {
      Users.create({
      Username:req.body.Username,
      Password:hashPassword,
      Email:req.body.Email,
      Birthday:req.body.Birthday
      })
      .then(function(user)
      {
        res.status(201).json(user);
      });
    }
  }).catch(function(err)
  {
    console.log(err);
    res.status(500).send("Error" +err);
  });
});

//update the user information by user name
app.put('/users/:Username',passport.authenticate('jwt',{session:false}), function(req,res)
{
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({ errors: errors });
  }
  var hashPassword= Users.hashPassword(req.body.Password);
  Users.update({ Username:req.params.Username},{$set:
  {
    Username : req.body.Username,
    Password : hashPassword,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
  {new:true},
  function(err,updatedUser)
  {
    if(err)
    {
      console.log(err);
      res.status(500).res.send("Error" +err);
    }
    else
    {
      res.json(updatedUser);
    }
  });
});

//update the favorite movies in user list
app.put('/users/:Username/movies/:MovieID',passport.authenticate('jwt', {session:false}), function(req, res)
{
  Users.findOneAndUpdate({Username : req.params.Username }, {
  $push : { Movies : req.params.MovieID}
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser)
  {
    if (err)
    {
      console.error(err);
      res.status(500).send("Error: " + err);
    }
    else
    {
      res.json(updatedUser);
    }
  });
});

//remove the favorite movie from user list
app.put('/users/:Username/:MovieID',passport.authenticate('jwt',{session:false}), function(req, res)
{
  Users.findOneAndUpdate({ Username : req.params.Username }, {
  $pull: { Movies : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser)
  {
    if (err)
    {
      console.error(err);
      res.status(500).send("Error: " + err);
    }
    else
    {
      res.json(updatedUser);
    }
  });
});

//delete the user by user name
app.delete('/users/:Username', passport.authenticate('jwt',{session:false}), function(req, res)
{
  Users.findOneAndRemove({ Username: req.params.Username }, function(){})
  .then(function(user)
  {
    if (!user)
    {
      res.status(400).send(req.params.Username + " was not found");
    }
    else
    {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err)
  {
    console.error(err);
    res.status(500).send( "Error: " + err );
  });
});

//error handling function
app.use(function (err, req, res, next)
{
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// default textual response
app.get('/', function(req, res)
{
  res.send('Welcome to myMovie Flix');
});

//environment variable port
 var port=process.env.PORT || 3000;
 //listen for request
 app.listen(port, "0.0.0.0", function() {
 console.log(`Listening on Port ${port}`);
 });
