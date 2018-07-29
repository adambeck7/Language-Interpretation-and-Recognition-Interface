// console.log('this is loaded');
// console.log(process.env.NYT_KEY)
// console.log(process.env.SPOTIFY_ID)

exports.nyt = {
  key: process.env.NYT_KEY
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};