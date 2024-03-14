//require mongoose
const { connect, connection } = require('mongoose');
//connect with database
connect('mongodb://127.0.0.1:27017/socialNetworkDB');
//export connection
module.exports = connection;
