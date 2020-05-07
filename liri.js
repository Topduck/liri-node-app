var fs = require("fs");
require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
//var Spotify = require('node-spotify-api');
//var spotify = new Spotify(keys.spotify);
var input = process.argv.slice(3).join(" ");

var command = process.argv[2];
//command in take switch statement:
function switchFunc(){
  switch(command) {

      case `concert-this`:
          concertThis()
      break;
      case `spotify-this-song`:
          spotifyThis()
      break;
      case `movie-this`:
          movieThis();
      break;
      case `do-what-it-says`:
        fs.readFile("random.txt","utf8", function(error, data) {
          if (error) {
              return console.log(error);
          }
          var dataArr = data.split(',');
          command = dataArr[0];
          input = dataArr[1];
          switchFunc()

        });
          //doWhatitsays()
      break;
  };
};
function concertThis(){
    var axios = require("axios");
    //console.log("concert this")
    var artist =`https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`
    axios.get(artist).then(
      function(response) {
        console.log(`${input}'s Next Show!!!`)
        console.log(`Venue: ${response.data[0].venue.name}`);
        console.log(`Venue Location: ${response.data[0].venue.location}`);
        console.log(`Date: ${response.data[0].datetime}`);
      });
}

function spotifyThis(){
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    //console.log("Spotify This")
    if (input === '') {
      input = 'The Sign'
    }
    spotify.search({ type: 'track', query: input, limit: 1})
    .then(function(response) {
        console.log(`Tracks Artist! ${response.tracks.items[0].artists[0].name}`);
        console.log(`Tracks Name! ${response.tracks.items[0].name}`);
        console.log(`Preview Link! ${response.tracks.items[0].preview_url}`);
        console.log(`Album! ${response.tracks.items[0].album.name}`);
      })
    .catch(function(err) {
      console.log(err);
    });
}
function movieThis(){
    var axios = require("axios");
    //console.log("movie this is running")
 // Create an empty variable for holding the movie name
if (input === '') {
  input = 'Mr. Nobody'
}
var queryUrl = `http://www.omdbapi.com/?t= ${input} &y=&plot=short&apikey=trilogy`;

axios.get(queryUrl).then(
  function(response) {
    //console.log(response.data);
    //console.log(response.data);
    console.log("Title: ", response.data.Title);
    console.log("Year: ", response.data.Year);
    console.log("IMDB Rating: ", response.data.imdbRating);
    if (response.data.Ratings[1] == null){
      console.log("Rotten Tomatoes Rating: Not Available");
    } else {
      console.log("Rotten Tomatoes Rating: ", response.data.Ratings[1].Value);
    }
    console.log("Country of Production: ", response.data.Country);
    console.log("Languages: ", response.data.Language);
    console.log("Plot: ", response.data.Plot);
    console.log("Cast: ", response.data.Actors); 
  })
  .catch(function(error) {
    if (error.response) {
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}
switchFunc()