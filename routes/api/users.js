const express = require('express');

const { authValidation, subscriptionValidation, emailValidation } = require('../../middlewares/validationMiddleware');
const { registerController, loginController, getCurrentController, logoutController, verifyEmailController, updateSubscriptionController, updateAvatarController, resendVerifyEmailController } = require('../../controllers/usersController');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const { upload } = require('../../middlewares/upload')

const router = express.Router()

router.post('/signup', authValidation, asyncWrapper(registerController));
router.get('/verify/:verificationToken', asyncWrapper(verifyEmailController));
router.post('/verify', emailValidation, asyncWrapper(resendVerifyEmailController));
router.post('/login', authValidation, asyncWrapper(loginController));
router.get('/current', authMiddleware, asyncWrapper(getCurrentController));
router.patch('/subscription', subscriptionValidation, authMiddleware, asyncWrapper(updateSubscriptionController));
router.patch('/avatars', authMiddleware, upload.single('avatar'), asyncWrapper(updateAvatarController))
router.get('/logout', authMiddleware, asyncWrapper(logoutController));

module.exports = router