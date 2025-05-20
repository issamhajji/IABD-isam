const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassword;
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

const login = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        const passValidation = await bcrypt.compare(password, user.password);
        if (!passValidation) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username }, 
            'secret_key', { expiresIn: '24h' }
        );

        return { 
            token, 
            userData: {
                _id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
            }};

    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);}
}

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
    login,
};