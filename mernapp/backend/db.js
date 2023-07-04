const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://pranjalchaplot:otTGQD9MyerH3J4N@cluster0.9ndyej8.mongodb.net/?retryWrites=true&w=majority";

const mongoDB = () => {
    mongoose.connect(mongoUri, { useNewUrlParser: true }).then(
        () => {
            console.log("connected");
        }
    );
}

module.exports = mongoDB;   