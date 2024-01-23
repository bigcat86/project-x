const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect("mongodb+srv://attanner86:hbskater@clusterx.lxzybun.mongodb.net/?retryWrites=true&w=majority"
|| 'mongodb://127.0.0.1:27017/project-x', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;