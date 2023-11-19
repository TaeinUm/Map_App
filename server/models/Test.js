const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId
});

const Test = mongoose.model('Test', testSchema, 'test');

module.exports = Test;
