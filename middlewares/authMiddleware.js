const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../db/userModel'); 
const { NotAuthorizedError } = require('../helpers/errors');

const authMiddleware = async (req, res, next) => { 
    const { authorization = ""} = req.headers
    const [tokenType, token] = authorization.split(" ");
    
    try {
        if (tokenType !== "Bearer") { 
            throw new NotAuthorizedError('Not authorized');
        }
        
        if (!token) {
            throw new NotAuthorizedError('Not authorized');
        }
    
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        // const user = jwt.decode(token, process.env.JWT_SECRET);
        const user = await User.findById(_id);

        if (!user) { 
            throw new NotAuthorizedError('Not authorized')
        }

        req.user = user;
        // req.token = token;
        next();
    } catch (error) {
        next (new NotAuthorizedError('Invalid token'));
    }
}
module.exports = {
    authMiddleware
}