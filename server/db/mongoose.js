var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.connect(uri);

module.exports = { mongoose }