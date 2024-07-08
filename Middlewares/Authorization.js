const { userStatus } = require("../constants/variables");
const UserModel = require("../Models/User");

exports.authorization =  (...role) => {
    return async (req, res, next) => {
      try {
        const user = req.user;

        const userInfo = await UserModel.findOne({email:user.email});
        console.log("userInfo", userInfo)
        const userRole = userInfo.role
        const status = userInfo.status
        if (!role.includes(userRole)) {
          return res.status(403).json({
            status: 'failed',
            error: 'You are not authorized',
          });
        }
        if (status !== userStatus.active) {
          return res.status(403).json({
            status: 'failed',
            error: 'You are active in this website',
          });
        }
  
        next();
      } catch (error) {
        res.status(403).json({
          status: 'failed',
          error: error.message,
        });
      }
    };
  };