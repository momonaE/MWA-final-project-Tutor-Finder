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
    passWord: {
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
    newUser.passWord = await bcrypt.hash(newUser.passWord, salt);
    return newUser.save();
}


module.exports.getUserByEmail = async(email) => {
    return await User.findOne({
        email
    }).exec();
};

module.exports.comparePassword = async(passWord, userpassword, callback) => {
    console.log(passWord, userpassword);
    await bcrypt.compare(passWord,
        userpassword, (err, isMatch) => {
            if (err) return err;
            callback(null, isMatch);

        });

};