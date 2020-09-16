const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tbl_simpanan';

const TblSimpanan = sequelize.define('TblSimpanan', {
    id_koperasi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_ao: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_loan: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_member: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    simpanan_wajib: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    simpanan_pokok: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    simpanan_sukarela: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
TblSimpanan.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = TblSimpanan;
