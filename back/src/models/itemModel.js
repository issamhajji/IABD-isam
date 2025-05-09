const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    pic_url: {
        type: String,
        required: false
    },
    output: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
}, { 
    timestamps: true 
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;