const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../db/userModel');
const { RegistrationConflictError, NotAuthorizedError } = require('../helpers/errors');



const register = async ({ password, email, subscription }) => { 
    if (await User.findOne({ email })) {
        throw new RegistrationConflictError('Email in use');
    }

    const user = new User({ password, email, subscription });
    await user.save();
    return user;
}

const login = async ({ email, password }) => { 
    const user = await User.findOne({ email });
    if (!user) { 
        // return res.status(401).json({ "message": `Email doesn't exist` })
        throw new NotAuthorizedError('Email or password is wrong');
    }
    if (!await bcrypt.compare(password, user.password)) { 
        // return res.status(401).json({ "message": `Password is wrong` })
        throw new NotAuthorizedError('Email or password is wrong');
    };

    const payload = {
        _id: user._id,
        subscription: user.subscription
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2d"});
    await User.findByIdAndUpdate(user._id, { token });
    return { token, user };
}

const logout = async (userId) => { 
    await User.findByIdAndUpdate(userId, { token: null });
}

module.exports = {
    register, login, logout
}