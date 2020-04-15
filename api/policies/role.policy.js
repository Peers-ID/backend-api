// const JWTService = require('../services/auth.service');
const User = require('../models/User');

// Format token: "Authorization: Bearer [token]" atau "token: [token]"
module.exports = async (req, res, next) => {

        try {
                // const user = await User.findByPk(req.header('uid'));
                //
                // req.body.user_info = user;
                // return next();

                return res.status(200).json({
                        status: 200,
                        data:"",
                        message: req.decoded.role
                });


        } catch (err) {
                return res.status(200).json({
                        status: 500,
                        data:"",
                        message: 'Error: ' + err
                });
        }

};
