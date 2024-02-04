const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ACME');

module.exports = mongoose.connection;
