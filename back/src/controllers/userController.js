const userService = require('../services/userService')

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers();
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    const allUsers = userService.getAllUsers();
    res.send("Get all items");
};

const getOneUser = async (req, res) => {
    try {
        const user = await userService.getOneUser(req.params['userId']);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createNewUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createNewUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateOneUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updateData = req.body;
        
        const updateUser = await userService.updateOneUser(userId, updateData);

        if (updateUser){
            const updateUser = await userService.getOneUser(userId);
            res.status(201).json(updatedItem)
        }
    } catch (error) {
        res.status(500).json({erro: error.message});
    }
};

const deleteOneUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await userService.deleteOneUser(userId);

        if (deletedUser){
            res.status(200).json({message: "Item deleted successfully" })
        }
    } catch (error) {
        res.status(500).json({erro: error.message});
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};