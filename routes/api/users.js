const express = require('express')
const { registerController, loginController } = require('../../controllers/usersController');
const { asyncWrapper } = require('../../helpers/apiHelpers');

const router = express.Router()

router.post('/signup', asyncWrapper(registerController));
router.post('/login', asyncWrapper(loginController));
// router.post('/logout', asyncWrapper());
// router.post('/current', asyncWrapper());

module.exports = router