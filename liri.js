require("dotenv").config();
const keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const terminalImage = require('terminal-image')
const download = require('image-downloader');
// var client = new Twitter(keys.twitter);

if (process.argv[2] == 'spotify-this-song') {
    var song = '';
    for (var i = 3; i < process.argv.length; i++) {

        // Build a string with the address.
        song = song + ' ' + process.argv[i];

        // query.join(' ');
        // query = song[i].concat()
        console.log(song);
    }
    // console.log('song ', song);
    if (song == '') {
        song = 'The Sign'
        console.log('blank query= ', song)
    }
    spotify.search({
        type: 'track',
        query: song,
        limit: 1,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log('');
        console.log('Your results');
        console.log('***********************************************');
        console.log("Artist:", data.tracks.items[0].album.artists[0].name);
        console.log("Song:", data.tracks.items[0].name);
        console.log("Listen to a clip here:", data.tracks.items[0].preview_url);
        console.log("Album:", data.tracks.items[0].album.name);
        console.log("Image:", data.tracks.items[0].album.images[0].url);

        // (async () => {
        //     const options = {
        //         url: data.tracks.items[0].album.images[0].url,
        //         dest: './images/image.jpg' // Save to /path/to/dest/image.jpg
        //     }
        //     // console.log(count)
        //     download.image(options)
        //         .then(({
        //             filename,
        //             image
        //         }) => {
        //             console.log('File saved to', filename)
        //         })
        //         .catch((err) => {
        //             console.error(err)
        //         })
        //     console.log(await terminalImage.file('images/image.jpg'));
        // })();
        const options = {
            url: data.tracks.items[0].album.images[0].url,
            dest: './images/image.jpg'
        }

        async function downloadIMG() {
            try {
                const {
                    filename,
                    image
                } = await download.image(options)
                console.log(await terminalImage.file('images/image.jpg')) // => /path/to/dest/image.jpg 
            } catch (e) {
                console.error(e)
            }
        }

        downloadIMG()

    });
} else if (process.argv[2] == 'movie-this') {



}