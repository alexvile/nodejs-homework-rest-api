const { User } = require('../db/userModel');


const register = async (password, email, subscription) => { 
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