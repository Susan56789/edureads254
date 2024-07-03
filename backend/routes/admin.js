const express = require('express');
const asyncHandler = require('express-async-handler');
const { login, requestPasswordReset, resetPassword } = require('../controllers/authController');



const router = express.Router();

router.post('/login', login);
router.post('//reset-password', resetPassword);
router.post('/request-password-reset', requestPasswordReset);



module.exports = router;
