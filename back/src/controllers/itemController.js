const itemService = require('../services/itemService')

const getAllItems = async (req, res) => {
    try {
        const allItems = await itemService.getAllItems();
        res.status(200).json(allItems)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    const allItems = itemService.getAllItems();
    res.send("Get all items");
};

const getOneItem = async (req, res) => {
    try {
        const item = await itemService.getOneItem(req.params['itemId']);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createNewItem = async (req, res) => {
    try {
        const itemData = req.body;
        const newItem = await itemService.createNewItem(itemData);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateOneItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const updateData = req.body;
        
        const updateItem = await itemService.updateOneItem(itemId, updateData);

        if (updateItem){
            const updatedItem = await itemService.getOneItem(itemId);
            res.status(201).json(updatedItem)
        }
    } catch (error) {
        res.status(500).json({erro: error.message});
    }
};

const deleteOneItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const deletedItem = await itemService.deleteOneItem(itemId);

        if (deletedItem){
            res.status(200).json({message: "Item deleted successfully" })
        }
    } catch (error) {
        res.status(500).json({erro: error.message});
    }
};

module.exports = {
    getAllItems,
    getOneItem,
    createNewItem,
    updateOneItem,
    deleteOneItem,
};