const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tblmst_dasar_cicilan_sebagian';

const MstDasarCicilanSebagian = sequelize.define('MstDasarCicilanSebagian', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    desc_dasar_cicilan_sebagian: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
MstDasarCicilanSebagian.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = MstDasarCicilanSebagian;
