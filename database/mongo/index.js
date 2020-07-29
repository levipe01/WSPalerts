const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/stockStories');
const db = mongoose.connection;

db.on('error', () => console.log('Error connecting to stockStories database...'));
db.once('open', () => console.log('Connected to stockStories database...'));

const storySchema = new mongoose.Schema({
  ticker: String,
  story: String,
});

const Story = mongoose.model('Story', storySchema);

const getTopTracks = (id) => new Promise((resolve, reject) => {
  Story.find({ artistId: `${id}` })
    .limit(25)
    .sort({ playcount: -1 }) // sort by most recent
    .exec((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
});

// will take in a story object
const addStory = (story) => {
  const newStory = new Story(story);
  return new Promise((resolve, reject) => {
    newStory.save(
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      },
    );
  });
};

module.exports.getTopTracks = getTopTracks;
module.exports.addStory = addStory;
