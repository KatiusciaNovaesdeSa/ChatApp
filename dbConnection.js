const mongoose = require('mongoose');

// connect to Mongo  
console.log('Attempting to connect to mongoose');

mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-nili5.mongodb.net:27017,cluster0-shard-00-01-nili5.mongodb.net:27017,cluster0-shard-00-02-nili5.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo database!");
  })
  .catch(err => {
    console.error("App starting error:", err.stack);
  });