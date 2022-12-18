const express = require('express');
const { authValidation, subscriptionValidation } = require('../../middlewares/validationMiddleware');
const { registerController, loginController, getCurrentController, logoutController, updateSubscriptionController } = require('../../controllers/usersController');
const { asyncWrapper } = require('../../helpers/apiHelpers');

const router = express.Router()

const { authMiddleware } = require('../../middlewares/authMiddleware');


router.post('/signup', authValidation, asyncWrapper(registerController));
router.post('/login', authValidation, asyncWrapper(loginController));
router.get('/current', authMiddleware, asyncWrapper(getCurrentController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));
router.patch('/subscription', subscriptionValidation, authMiddleware, asyncWrapper(updateSubscriptionController));

module.exports = router