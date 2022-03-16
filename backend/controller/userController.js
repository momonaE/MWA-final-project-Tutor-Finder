const User = require('../models/User');
const tokengen = require('../tokenGenerator/tokengen');

module.exports.adduser = (req, res, next) => {
    const { firstName, email, lastName, phoneNumber, passWord, role } = req.body;
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        passWord: passWord,
        role: role
    })
    const result = User.adduser(
        new User({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            passWord: passWord,
            role: role
        }));

    const token = tokengen.tokengen(newUser);
    console.log(token)

    result.then((docs) => {
            if (docs) {
                res.json({
                    success: true,
                    data: docs,
                    token: 'JWT ' + token,
                    msg: 'new  user Added !',
                    status: res.statusCode
                })

            } else {
                res.json({
                    success: false,

                    data: {},
                    msg: 'Failed to add user',
                    status: res.statusCode
                })

            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

module.exports.signin = async(req, res, next) => {
    const { email, passWord } = req.body;
    const getUserByEmail = User.getUserByEmail(email);

    const user = getUserByEmail.then((user) => {

        if (!user || user == null) {
            return res.json({
                success: false,
                data: {},
                msg: 'user not found!',
                status: res.statusCode
            });
        };
        return user;

    });
    user.then((user) => {

        User.comparePassword(passWord, user.passWord, (err, isMatch) => {

            const payload = {
                firstName: user.firstName,
                email: user.email,
                role: user.role
            }
            if (err) {
                return res.json({
                    success: true,
                    token: {},
                    data: {},
                    msg: "Password MisMatch",
                    status: res.statusCode

                });
            }


            if (isMatch) {
                const token = tokengen.tokengen(user);

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    data: payload,
                    msg: "Signed Succefully",
                    status: res.statusCode

                });
            } else {

                res.json({
                    success: false,
                    token: null,
                    data: payload,
                    msg: "Wrong password",
                    status: res.statusCode

                });
            }

        })
    });

}

module.exports.verifyemail = (req, res, next) => {
    const { email } = req.params;
    User.getUserByEmail(email).then((user) => {

        if (!user) {
            res.json({
                success: false,
                data: { exists: false },
                msg: 'user not found!',
                status: res.statusCode
            });
        } else {
            res.json({
                success: true,
                data: { exists: true },
                msg: "email already exists",
                status: res.statusCode
            })
        }

    });


}

module.exports.authenticate = (req, res, next) => {
    res.json({ success: true, data: req.user });
}