const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tblmst_dasar_pelunasan';

const MstDasarPelunasan = sequelize.define('MstDasarPelunasan', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    desc_dasar_pelunasan: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
MstDasarPelunasan.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = MstDasarPelunasan;
