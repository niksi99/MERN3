const mongoose = require('mongoose');

const ConnectToMongo = async () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("Radi Mongo"))
      .catch(error => console.log(error)) 
}

module.exports = ConnectToMongo;