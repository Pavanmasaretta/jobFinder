const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();
const bcrypt = require('bcrypt');


router.post('/register', async (req, res , next) => {
    const { name, email, password,mobile } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            const err = new Error('User already exists');
            err.name = 'ValidationError';
            throw err;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
        });
        res.status(201).json({ message: 'User registered successfully',});
    } catch (err) {
        next(err);
    }
}
);

router.post('/login', async (req, res,next) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error('User not found');
            err.name = "NotFoundError";
            throw err;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const err = new Error('Invalid password');
            err.name = "UnauthorizedError";
            throw err;
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (err) {
        next(err);  
    }
})

module.exports = router;