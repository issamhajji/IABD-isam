const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
    pic_url: {
        type: String,
        required: false
    },
    output: {
        type: String,
        required: false
    }
}, { 
    timestamps: true 
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;