var fs = require("fs");
require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

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
        doWhatitsays()
    break;
}
function concertThis(){
    console.log("concert this")
}
function spotifyThis(){
    console.log("spotify This")
}
function movieThis(){
    var axios = require("axios");
    console.log("movie this is running")
    var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  } else {
    movieName += nodeArgs[i];
  }
}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// This line is just to help us debug against the actual URL.
console.log(queryUrl);
//
axios.get(queryUrl).then(
  function(response) {
    console.log(response.data, '\n',
        "Release Year: " + response.data.Year);
    //console.log('',a,'\n',b,'\n',c)
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

}
function doWhatitsays() {
    console.log("do what it says")
}