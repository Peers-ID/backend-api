const JWTService = require('../services/auth.service');

// Format token: "Authorization: Bearer [token]" atau "token: [token]"
module.exports = (req, res, next) => {

        if(req.path !== "/api/v1/login"){
                let tokenToVerify;

                if (req.header('Authorization')) {
                        const parts = req.header('Authorization').split(' ');

                        if (parts.length === 2) {
                                const scheme = parts[0];
                                const credentials = parts[1];

                                if (/^Bearer$/.test(scheme)) {
                                        tokenToVerify = credentials;
                                } else {
                                        return res.status(401).json({
                                                status: 401,
                                                data:"",
                                                message: 'Format for Authorization: Bearer [token]' });
                                }
                        } else {
                                return res.status(401).json({
                                        status: 401,
                                        data:"",
                                        message: 'Format for Authorization: Bearer [token]'
                                });
                        }
                } else if (req.body.token) {

                        tokenToVerify = req.body.token;
                        delete req.query.token;
                } else {

                        return res.status(401).json({
                                status: 401,
                                data:"",
                                message: 'No Authorization was found'
                        });
                }

                return JWTService().verify(tokenToVerify, (err, thisToken) => {
                        if (err)
                        return res.status(401).json({
                                status: 401,
                                data:"",
                                message: err
                        });

                        req.token = thisToken;
                        req.decoded = thisToken;
                        return next();
                });
        }
        return next();
};
