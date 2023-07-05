const mongoose = require('mongoose');
const { mongoURI } = require('../ENV');

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