const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema({
  mapName: String,
  mapDate: Date,
  mapData: String,
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  memo: String,
  vers: String,
  mapType: String,
  privacy: String,
  image: { type: Buffer, required: false },
});

const Map = mongoose.model("Map", mapSchema);

module.exports = Map;
