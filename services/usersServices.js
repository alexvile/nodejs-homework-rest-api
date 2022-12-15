const { User } = require('../db/userModel');
const { RegistrationConflictError } = require('../helpers/errors')

const register = async (password, email, subscription) => { 
    if (await User.findOne({ email })) {
        throw new RegistrationConflictError('Email in use');
    }
    // console.log('after error');
    const user = new User({ password, email, subscription });
    await user.save();
    return user;
}

const login = async (email) => { 
    const user = await User.findOne({ email });
    return user;
}

module.exports = {
    register, login
}