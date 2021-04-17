const bcrypt = require('bcrypt-nodejs');

const bcryptService = () => {
        const password = (user) => {
                const salt = bcrypt.genSaltSync();
                return bcrypt.hashSync(user.password, salt);
        };

        const comparePassword = (pw, hash) => (
                bcrypt.compareSync(pw, hash)
        );

        return {
                password,
                comparePassword,
        };
};

module.exports = bcryptService;
