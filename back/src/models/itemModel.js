const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    picture: {
        type: String,
        required: false
    },
    items: [{
        item: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    recipe: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
}, { 
    timestamps: true 
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;