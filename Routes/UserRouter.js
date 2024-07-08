const { userRole } = require('../constants/variables');
const { udpateUserStatus, getUserById } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middlewares/Auth');
const { authorization } = require('../Middlewares/Authorization');
const UserModel = require('../Models/User');

const router = require('express').Router();

router.get('/', ensureAuthenticated, authorization(userRole.admin), async (req, res) => {
    const result = await UserModel.find({})
    return res.status(200).json({message:'User fetched successfully', data: result}) 
});


router.get('/:userId', ensureAuthenticated, authorization(userRole.user, userRole.admin), getUserById);


router.patch('/:userId',
    ensureAuthenticated, 
    authorization('admin'), udpateUserStatus); 

module.exports = router;