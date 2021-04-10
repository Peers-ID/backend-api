const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tbl_kelompok';

const TblKelompok = sequelize.define('TblKelompok', {
    id_rembug: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nama_ketua: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nama_kelompok: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
TblKelompok.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = TblKelompok;
