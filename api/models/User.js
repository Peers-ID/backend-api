const Sequelize = require('sequelize');
const TblLoan = require('../models/v2/TblLoan');
const bcryptService = require('../services/bcrypt.service');
const sequelize = require('../../config/database');

const hooks = {
    beforeCreate(user) {
        user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
    },
};

const tableName = 'users';

const User = sequelize.define('User', {
    koperasi_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_mobile: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthdate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ak_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    hooks,
    tableName
});



// eslint-disable-next-line
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;
    delete values.role_id;

    return values;
};

module.exports = User;
