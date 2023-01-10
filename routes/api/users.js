const express = require('express');

const { authValidation, subscriptionValidation } = require('../../middlewares/validationMiddleware');
const { registerController, loginController, getCurrentController, logoutController, updateSubscriptionController, updateAvatarController } = require('../../controllers/usersController');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const { upload } = require('../../middlewares/upload')

const router = express.Router()

router.post('/signup', authValidation, asyncWrapper(registerController));
router.post('/login', authValidation, asyncWrapper(loginController));
router.get('/current', authMiddleware, asyncWrapper(getCurrentController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));
router.patch('/subscription', subscriptionValidation, authMiddleware, asyncWrapper(updateSubscriptionController));
router.patch('/avatars', authMiddleware, upload.single('avatar'), asyncWrapper(updateAvatarController))

module.exports = router