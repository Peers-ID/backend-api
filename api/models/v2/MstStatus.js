const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tblmst_status';

const MstStatus = sequelize.define('MstStatus', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    desc_status: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
MstStatus.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = MstStatus;
