const {signup, initializeCounter,login,} = require('../controllers/AuthController');
const { forgotPassword, resetPassword } = require('../controllers/forgotPassword');
const {signupValidation, loginValidation} = require('../Middlewares/authValidation')


const router = require('express').Router()
initializeCounter()
router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)

module.exports = router;