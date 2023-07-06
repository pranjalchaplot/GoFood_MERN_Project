const mongoose = require('mongoose');
const { mongoURI } = require('../ENV');

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected!');
        let foodItems = await mongoose.connection.db.collection("food_items");
        let itemData = await foodItems.find({}).toArray();
        global.food_items = itemData;

        let foodCategory = await mongoose.connection.db.collection("foodCategory");
        let categoryData = await foodCategory.find({}).toArray();
        global.foodCategory = categoryData;

    } catch (error) {
        console.log('err: ', error);
    }
};

module.exports = mongoDB;   