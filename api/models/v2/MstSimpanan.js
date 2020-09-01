const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tblmst_simpanan';

const MstSimpanan = sequelize.define('MstSimpanan', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    desc_simpanan: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
MstSimpanan.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = MstSimpanan;
