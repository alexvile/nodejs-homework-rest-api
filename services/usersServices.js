const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');
const { verificationEmailTpl, resendVerificationEmailTpl } = require('../email/emailTemplates')

const { sendMail } = require('../helpers/sendEmail');

const { User } = require('../db/userModel');
const { RegistrationConflictError, NotAuthorizedError, NotFoundError, BadRequestError } = require('../helpers/errors');


const register = async ({ password, email, subscription }) => { 
    if (await User.findOne({ email })) {
        throw new RegistrationConflictError('Email in use');
    }
    const avatarURL = gravatar.url(email)

    const verificationToken = uuidv4();

    const user = new User({ password, email, subscription, avatarURL, verificationToken });
    await user.save();

    const mail = {
        to: email,
        subject: "Верифікація емейл (тестування)",
        html: verificationEmailTpl(verificationToken)
    }
    await sendMail(mail);
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
    if(!user.verify) {
        throw new NotAuthorizedError('Email not verify');
    }

    const payload = {
        _id: user._id
        // subscription: user.subscription
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2d"});
    await User.findByIdAndUpdate(user._id, { token });
    return { token, user };
}

const logout = async (userId) => { 
    await User.findByIdAndUpdate(userId, { token: null });
}

const updateSubscription = async (userId, subscriptionObj) => { 
    const { subscription } = subscriptionObj;
    const user = await User.findByIdAndUpdate(userId, { subscription: subscription }, { new: true });
    return user;
}

const verifyEmail = async (verificationToken) => {
    const user = await User.findOne({verificationToken});
    if(!user) {
        throw new NotFoundError('User not found');
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""});
   
}

const resendVerifyEmail = async (email) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new NotFoundError('User not found');
    };
    if(user.verify) {
        throw new BadRequestError('Verification has already been passed');
    };
    const mail = {
        to: email,
        subject: "Повторна верифікація емейл (тестування)",
        html: resendVerificationEmailTpl(user.verificationToken)
    }
    await sendMail(mail)
}

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req) => { 
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user
    const filename = `${_id}_${originalname}`

    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    
    const imgToResize = await Jimp.read(resultUpload);
    imgToResize.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatars", filename)

    await User.findByIdAndUpdate(_id, { avatarURL });
    return avatarURL
}


module.exports = {
    register, login, logout, updateSubscription, updateAvatar, verifyEmail, resendVerifyEmail
}