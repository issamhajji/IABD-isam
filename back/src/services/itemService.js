const Item = require('../models/itemModel');

const getAllItems = async () => {
    try {
        const items = await Item.find();
        return items;
    } catch (error) {
        throw new Error(`Unable to get items: ${error.message}`);
    }
};

const getOneItem = async (itemId) => {    
    try {
        const itemById = await Item.findById(itemId);
        return itemById;
    } catch (error) {
        throw new Error(`Unable to find item: ${error.message}`);
    }
};

const createNewItem = async (itemData) => {
    try {
        const newItem = await Item.create(itemData);
        return newItem;
    } catch (error) {
        throw new Error(`Unable to create item: ${error.message}`);
    }
};

const updateOneItem = async (itemId, itemData) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(itemId, itemData, { new: true });
        return updatedItem;
    } catch (error) {
        throw new Error(`Unable to update item: ${error.message}`);
    }
};

const deleteOneItem = async (itemId) => {
    try {
        const deleted = await Item.findByIdAndDelete(itemId);
        return deleted;
    } catch (error) {
        throw new Error(`Unable to delete item: ${error.message}`);
    }
};

module.exports = {
    getAllItems,
    getOneItem,
    createNewItem,
    updateOneItem,
    deleteOneItem,
};