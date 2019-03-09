const express= require('express');
const morgan= require('morgan');
const bodyParser= require('body-parser');
const uuid=require('uuid');
const app= express();
app.use(bodyParser.json());
//movies list
let topMovies = [
  {
    id:'1',
    title:'Forrest Gump',
    genre:'drama',
    director:'Robert Zemeckis',
    year:1994,
    url:'https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672'
  },
  {
    id:'2',
    title:'Catch me if you can',
    genre:'thriller',
    director:'Steven Spielberg',
    year:2002,
    url:'https://www.imdb.com/title/tt0264464/mediaviewer/rm3911489536'
  },
  {
    id:'3',
    title:'The Truman show',
    genre:'drama',
    director:'Peter Weir',
    year:1998,
    url:'https://www.imdb.com/title/tt0120382/mediaviewer/rm1927354112'
  },
  {
    id:'4',
    title:'The Terminal',
    genre:'comedy',
    director:'Steven Spielberg',
    year:2004,
    url:'https://www.imdb.com/title/tt0362227/mediaviewer/rm3088158464'
  },
  {
    id:'5',
    title:'The Notebook',
    genre:'romantic',
    director:'Nick Cassavetes',
    year:2004,
    url:'https://www.imdb.com/title/tt0332280/mediaviewer/rm1153669376'
  },
  {
    id:'6',
    title:'Sully',
    genre:'thriller',
    director:'Clint Eastwood',
    year:2016,
    url:'https://www.imdb.com/title/tt3263904/mediaviewer/rm1603684352'
  },
  {
    id:'7',
    title:'Sleepless in Seattle',
    genre:'romantic',
    director:'Nora Ephron',
    year:1993,
    url:'https://www.imdb.com/title/tt0108160/mediaviewer/rm2444975104'
  },
  {
    id:'8',
    title:'3idiots',
    genre:'comedy',
    director:'Rajkumar Hirani',
    year:2009,
    url:'https://www.imdb.com/title/tt1187043/mediaviewer/rm2029391104'
  },
  {
    id:'9',
    title:'The Martian',
    genre:'adventure',
    director:'Ridley Scott',
    year:2015,
    url:'https://www.imdb.com/title/tt3659388/mediaviewer/rm1391324160'
  },
  {
    id:'10',
    title:'Cast Away',
    genre:'drama',
    director:'Steven Spielberg',
    year:2000,
    url:'https://www.imdb.com/title/tt0162222/mediaviewer/rm381427456'
  }
];

//directors list
let directors = [
  {
    id : '1',
    name : 'Robert Zemeckis',
    bio : 'https://www.imdb.com/name/nm0000709/bio?ref_=nm_ql_1',
    born : 1952
  },
  {
    id : '2',
    name : 'Steven Spielberg',
    bio : 'https://www.imdb.com/name/nm0000229/bio?ref_=nm_ql_1',
    born : 1946
  },
  {
    id : '3',
    name : 'Peter Weir',
    bio : 'https://www.imdb.com/name/nm0001837/bio?ref_=nm_ql_1',
    born : 1944
  },
  {
    id : '5',
    name : 'Nick Cassavetes',
    bio : 'https://www.imdb.com/name/nm0001024/bio?ref_=nm_ql_1',
    born : 1959,
    died : 'n/a'
  },
  {
    id : '6',
    name : 'Clint Eastwood',
    bio : 'https://www.imdb.com/name/nm0000142/bio?ref_=nm_ql_1',
    born : 1930
  },
  {
    id : '7',
    name : 'Nora Ephron',
    bio : 'https://www.imdb.com/name/nm0001188/bio?ref_=nm_ql_1',
    born : 1941
  },
  {
    id : '8',
    name : 'Rajkumar Hirani',
    bio : 'https://www.imdb.com/name/nm0386246/bio?ref_=nm_ov_bio_sm',
    born : 1962
  },
  {
    id : '9',
    name : 'Ridley Scott',
    bio : 'https://www.imdb.com/name/nm0000631/bio?ref_=nm_ov_bio_sm',
    born : 1937
  }
];

// users list
let users = [
  {
    id : '1',
    username : 'adam',
    password : 'XXXXXX',
    email : 'abraham@example.com',
    dateOfBirth : 1996
  }
];

app.use(express.static('public'));
app.use(morgan('common'));

//error handling function
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// default textual response
app.get('/', function(req, res)
{
  res.send('Welcome to myMovie Flix');
});

//Get request for returning all the movies
app.get('/movies',function(req,res)
 {
  res.json(topMovies);
});

//get request for movie by name
app.get('/movies/:title',function(req,res)
 {
  res.json(topMovies.find((movies)=>
  {
    return movies.title === req.params.title;
  }));
});
//requesting movie
app.get('/movies/genres/:genre',function(req,res)
{
  let genre = topMovies.filter(function(obj)
  {
    return obj.genre.includes(req.params.genre.toLowerCase());
  });
  if(genre.length == 0)
    res.status(404).send("Sorry No movies with this genre found in our database!..");
    res.send(genre);
});

//post request to add a movie
app.post('/movies',function(req,res)
{
  let newMovie=req.body;
  if(!newMovie.title)
  {
    const message ="missing the name of movie";
    res.status(400).send(message);
  }
  else
  {
    newMovie.id =uuid.v4();
    topMovies.push(newMovie);
    res.status(200).send(newMovie);
  }
});

//delete request to delete a movie
app.delete('/movies/:id',function(req,res)
{
  let movie =topMovies.find((movie)=>
  {
    return movie.id===req.params.id;
  });
  if(movie)
  {
    topMovies.filter(function(obj)
    {
      return obj.id!==req.params.id;
    });
    res.status(201).send("movie " + req.params.id + " was DELETED");
  }
});

//returning data about Director by name
app.get('/directors/:name',function(req,res)
{
  res.json(directors.find((director)=>
  {
    return director.name === req.params.name;
  }));
});

//create new user
app.post('/users/',function(req,res)
{
  let newUser=req.body;
  if(!newUser.username)
  {
    const message="userName is missing";
    res.status(400).send(message);
  }
  else
  {
    newUser.id=uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//delete requset to delete the user by id
app.delete("/users/:id",function(req,res)
{
  let user= users.find((user)=>
  {
    return user.id === req.params.id;
  });
  if(user)
  {
    users.filter(function(obj)
    {
      return obj.id != req.params.id;
    });
    res.status(201).send("user"+ req.params.id +"was DELETED");
  }
});

//update the user information
app.put("/users/:id/:username/:email/:password/:dateOfBirth",function(req,res)
{
    let user=users.find((user)=>
    {
    return user.id===req.params.id;
});
if(user)
{
  user.username = req.params.username;
  user.password = req.params.password;
  user.email = req.params.email;
  user.dateOfBirth = req.params.dateOfBirth;
  res.status(200).send("user information is updated");
}
else
{
  res.status(404).send("user requested id" + req.params.username + "is not found");
}
});

// environment variable port
 const port=process.env.PORT || 8080;
 //listen for request
app.listen(port,()=> console.log(`listening  on port ${port}...`));
