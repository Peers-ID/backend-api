// const JWTService = require('../services/auth.service');
// Format token: "Authorization: Bearer [token]" atau "token: [token]"
module.exports = async (req, res, next) => {

    try {
        return res.status(200).json({
            status: 200,
            data: "",
            message: req.decoded.role
        });
    } catch (err) {
        return res.status(200).json({
            status: 500,
            data: "",
            message: 'Error: ' + err
        });
    }
};
