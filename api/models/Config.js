const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'config';

const Config = sequelize.define('Config', {
        env: {
                type: Sequelize.STRING,
                allowNull: false
        },
        key: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
        },
        value: {
                type: Sequelize.STRING,
                allowNull: false
        },
}, {
        hooks,
        tableName
});

// eslint-disable-next-line
Config.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        return values;
};

module.exports = Config;
