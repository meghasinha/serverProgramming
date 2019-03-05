const express= require('express');
const morgan= require('morgan');
const app= express();
let topMovies = [
  {
    id:1,
    name:'Forrest Gump ',
    genre:'Drama',
    year:1994
  },
  {
    id:2,
    name:'Catch me if you can',
    genre:'Thriller',
    year:2002
  },
  {
    id:3,
    name:'The Truman show ',
    genre:'Drama',
    year:1998
  },
  {
    id:4,
    name:'The Terminal',
    genre:'Comedy',
    year:2004
  },
  {
    id:5,
    name:'The Notebook',
    genre:'Romantic',
    year:2004
  },
  {
    id:6,
    name:'Sully',
    genre:'Thriller',
    year:2016
  },
  {
    id:7,
    name:'Sleepless in Seattle',
    genre:'Romantic',
    year:1993
  },
  {
    id:8,
    name:'3idiots',
    genre:'comedy',
    year:2009
  },
  {
    id:9,
    name:'The Martian',
    genre:'Adventure',
    year:2015
  },
  {
    id:10,
    name:'Cast Away',
    genre:'Drama',
    year:2000
  }
]
app.use(express.static('public'));
app.use(morgan('common'));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Get request
app.get('/movies',(req,res)=>
 {
  res.json(topMovies);
});

app.get('/',(req,res)=>
{
  res.send("My movies list");
});
//request movies according the year
app.get('/movies/:year',(req,res)=>
{
  const movies = topMovies.filter(c=> c.year === parseInt(req.params.year));
  if(movies.length == 0)
    res.status(404).send("No movies found!..");
    res.send(movies);
});

// environment variable port
 const port=process.env.PORT || 8080;
 //listen for request
app.listen(8080,()=> console.log(`listening at on port ${port}...`));
