const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  mapName: String,
  mapDate: Date,
  exportFormat: String,
  mapData: String,
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  memo: String,
  vers: String,
  mapType: Number,
});

const Post = mongoose.model('Map', mapSchema, 'maps');

module.exports = Map;
