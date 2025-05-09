const User = require('../models/userModel');

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(`Unable to get users: ${error.message}`);
    }
};

const getOneUser = async (userId) => {    
    try {
        const userById = await User.findById(userId);
        return userById;
    } catch (error) {
        throw new Error(`Unable to find user: ${error.message}`);
    }
};

const createNewUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw new Error(`Unable to create user: ${error.message}`);
    }
};

const updateOneUser = async (userId, userData) => {
    try {
        const updateUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        return updateUser;
    } catch (error) {
        throw new Error(`Unable to update user: ${error.message}`);
    }
};

const deleteOneUser = async (userId) => {
    try {
        const deleted = await User.findByIdAndDelete(userId);
        return deleted;
    } catch (error) {
        throw new Error(`Unable to delete user: ${error.message}`);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};