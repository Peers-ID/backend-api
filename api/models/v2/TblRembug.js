const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tbl_rembug';

const TblRembug = sequelize.define('TblRembug', {
    id_koperasi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nama_ketua: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nama_rembug: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
TblRembug.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = TblRembug;
