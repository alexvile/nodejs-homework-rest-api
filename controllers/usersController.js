const { register, login } = require('../services/usersServices');

const registerController = async (req, res) => { 
    const newUser = await register(req.body);
    const { email, subscription } = newUser;
    return res.status(201).json({ email, subscription  });
};

const loginController = async (req, res) => { 
    const { user, token } = await login(req.body);
    const { email, subscription } = user; 
    return res.status(200).json({ token, user: { email, subscription } });
};

const getCurrentController = async (req, res) => { 
    const { email, subscription } = req.user;
    return res.status(200).json({ email, subscription });
}

module.exports = {
    registerController, loginController, getCurrentController
};