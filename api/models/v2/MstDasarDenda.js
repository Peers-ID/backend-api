const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tblmst_dasar_denda';

const MstDasarDenda = sequelize.define('MstDasarDenda', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    desc_dasar_denda: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
MstDasarDenda.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = MstDasarDenda;
