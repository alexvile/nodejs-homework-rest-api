const express = require('express');
const { authValidation } = require('../../middlewares/validationMiddleware');
const { registerController, loginController, getCurrentController } = require('../../controllers/usersController');
const { asyncWrapper } = require('../../helpers/apiHelpers');

const router = express.Router()

const { authMiddleware } = require('../../middlewares/authMiddleware');


router.post('/signup', authValidation, asyncWrapper(registerController));
router.post('/login', authValidation, asyncWrapper(loginController));
// router.post('/logout', asyncWrapper());
router.get('/current', authMiddleware, asyncWrapper(getCurrentController));

module.exports = router