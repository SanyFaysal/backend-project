const { signup, login, getUserById, getAllUsers, udpateUserStatus } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middlewares/Auth');
const { authorization } = require('../Middlewares/Authorization');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
 // Route to fetch user data by ID
// Route to fetch user data by ID
// router.get('/users', getAllUsers); // New route to fetch all users

module.exports = router;
