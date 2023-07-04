const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://pranjalchaplot:otTGQD9MyerH3J4N@cluster0.9ndyej8.mongodb.net/goFoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected!');
        let fetched_data = mongoose.connection.db.collection("food_items");
        let data = await fetched_data.find({}).toArray()
        console.log();
    } catch (error) {
        console.log('err: ', error);
    }
};

module.exports = mongoDB;   