const mongoose = require('mongoose');
const { userRole } = require('../constants/variables');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: userRole.user,
        enum: {
          values: [userRole.user, userRole.admin],
          message: "{VALUE} can't be a role !!! ",
        },
      },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: {
          values: ["pending", "active", "block"],
          message: "{VALUE} can't be a role !!! ",
        },
      },

});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;