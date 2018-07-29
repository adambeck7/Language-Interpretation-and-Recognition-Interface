require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const nyt = keys.nyt.key;
const terminalImage = require("terminal-image");
const download = require("image-downloader");
const request = require("request");
const fs = require("fs");
var arr = [];



if (process.argv[2] == "spotify-this-song") {
  getSpotify();
} else if (process.argv[2] == "movie-this") {
  getMovie();
  // ...
} else if (process.argv[2] == "search-nyt") {
  nytInfo();
} else if (process.argv[2] == "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var arr = data.split(" ");
    var arr2 = data.split(" ");
    arr2.shift();
    var str = arr2.toString();
    str2 = str.replace(/,/g, " ")
    // console.log(str2);

    // console.log(arr[0]);
    if (arr[0] == 'spotify-this-song') {
      getSpotify(str2);
    } else if (arr[0] == "movie-this") {
      getMovie(str2);
    } else if (arr[0] == "search-nyt") {
      nytInfo(str2);
    }

  });

}


function nytInfo(str2) {
  var keyword = "";
  if (str2) {
    keyword = str2
  }
  array = process.argv;
  process.argv.shift(); // skip node.exe
  process.argv.shift(); // skip name of js file
  process.argv.shift(); // skip search-nyt
  keyword = process.argv.join("-");

  request.get({
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: {
      'api-key': nyt,
      'q': keyword,
    },
  }, function (err, response, body) {
    body = JSON.parse(body);
    console.log('');
    console.log("***********************************************");
    console.log('Headline:', body.response.docs[0].headline.main);
    console.log('Summary:', body.response.docs[0].snippet);
    console.log('URL:', body.response.docs[0].web_url);
    console.log('Date of Publication:', body.response.docs[0].pub_date);

  })
}

function getMovie(str2) {
  var movieName = "";
  if (str2) {
    movieName = str2
  }
  array = process.argv;
  process.argv.shift(); // skip node.exe
  process.argv.shift(); // skip name of js file
  process.argv.shift(); // skip movie-this
  movieName = process.argv.join("-");
  if (movieName == "") {
    movieName = "Mr-Nobody";
    console.log("blank query= ", movieName);
  }
  // Then run a request to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


  request(queryUrl, function (error, response, body) {
    // If the request was successful...
    if (!error && response.statusCode === 200) {

      console.log("");
      console.log("");
      console.log("Your results");
      console.log("***********************************************");
      console.log("Title:", JSON.parse(body).Title);
      console.log("Released:", JSON.parse(body).Released);
      console.log("IMDB Rating:", JSON.parse(body).imdbRating);
      console.log("Produced in:", JSON.parse(body).Country);
      console.log("Language:", JSON.parse(body).Language);
      console.log("Synopsis:", JSON.parse(body).Plot);
      console.log("Cast:", JSON.parse(body).Actors);
      console.log("");

      const options = {
        url: JSON.parse(body).Poster,
        dest: "./images/image.jpg"
      };

      async function downloadIMG() {
        try {
          const {
            filename,
            image
          } = await download.image(options);
          console.log(await terminalImage.file("images/image.jpg")); // => /path/to/dest/image.jpg
        } catch (e) {
          if (e == 'Error: Invalid URI "N/A"') {
            console.log("Sorry but there is no poster image for the movie you selected.")
            console.log('')
          } else {
            console.error(e);
          }
        }
      }

      downloadIMG();
    }
  });
}

function getSpotify(str2) {
  var song = "";
  if (str2) {
    song = str2
  }

  for (var i = 3; i < process.argv.length; i++) {
    song = song + " " + process.argv[i];
    // query.join(' ');
    // query = song[i].concat()
    // console.log(song);
  }
  console.log('song ', song);
  if (song == "") {
    song = "The Sign";
    console.log("blank query= ", song);
  }
  spotify.search({
      type: "track",
      query: song,
      limit: 1
    },
    function (err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log("");
      console.log("Your results");
      // console.log(data.tracks.items[0]);
      console.log("***********************************************");
      console.log("Artist:", data.tracks.items[0].album.artists[0].name);
      console.log("Song:", data.tracks.items[0].name);
      console.log("Listen to a clip here:", data.tracks.items[0].preview_url);
      console.log("Album:", data.tracks.items[0].album.name);
      console.log("Image:", data.tracks.items[0].album.images[0].url);
      console.log("***********************************************");
      const options = {
        url: data.tracks.items[0].album.images[0].url,
        dest: "./images/image.jpg"
      };

      async function downloadIMG() {
        try {
          const {
            filename,
            image
          } = await download.image(options);
          console.log(await terminalImage.file("images/image.jpg")); // => /path/to/dest/image.jpg
        } catch (e) {
          console.error(e);
        }
      }

      downloadIMG();
    }
  );
}