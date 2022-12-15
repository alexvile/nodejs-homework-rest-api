const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { register, login } = require('../services/usersServices');

const registerController = async (req, res) => { 
    const { password, email, subscription } = req.body;
    const newUser = await register(password, email, subscription);
    return res.status(200).json({ user: newUser });
};

const loginController = async (req, res) => { 
    const { password, email } = req.body;
    const user = await login(email);

    if (!user) { 
        return res.status(401).json({"message": `Email is wrong `})
    }

    if (!await bcrypt.compare(password, user.password)) { 
        return res.status(401).json({"message": `Password is wrong`})
    }
    // todo- token validation
    const token = jwt.sign({_id: user._id, subscription: user.subscription }, process.env.JWT_SECRET);

    return res.status(200).json({ token, user });
};

module.exports = {
    registerController, loginController
};