const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },



});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.adduser = async(newUser) => {

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    return newUser.save();
}


module.exports.getUserByEmail = async(email) => {
    return await User.findOne({
        email
    }).exec();
};

module.exports.comparePassword = async(password, userpassword, callback) => {
    await bcrypt.compare(password,
        userpassword, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);

        });

};