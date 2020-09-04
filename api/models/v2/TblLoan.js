const Sequelize = require('sequelize');
const Member = require('../Member');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tbl_loan';

const TblLoan = sequelize.define('TblLoan', {
    id_produk: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_koperasi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_ao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    jumlah_pencairan: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    jumlah_pengajuan: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    jumlah_cicilan: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    approved_by: {
        type: Sequelize.STRING,
        allowNull: true
    },
    disbursed_by: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
TblLoan.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = TblLoan;