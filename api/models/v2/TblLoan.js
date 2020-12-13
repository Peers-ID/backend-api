const Sequelize = require('sequelize');
const TblSimpananPokok = require('../v2/TblSimpananPokok');
const TblSimpananWajib = require('../v2/TblSimpananWajib');
const TblSimpananSukarela = require('../v2/TblSimpananSukarela');

const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tbl_loan';

const TblLoan = sequelize.define('TblLoan', {
    id_produk: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nama_produk: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_koperasi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_member: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nama_member: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_ao: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nama_ao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    nama_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc_status: {
        type: Sequelize.STRING,
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
    utang_pokok: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bunga_pinjaman: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    member_photo_url: {
        type: Sequelize.STRING,
        allowNull: true
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


TblLoan.hasMany(TblSimpananPokok, {
    as: 'SimpananPokok',
    foreignKey: "id_loan"
});

TblLoan.hasMany(TblSimpananWajib, {
    as: 'SimpananWajib',
    foreignKey: "id_loan"
});

TblLoan.hasMany(TblSimpananSukarela, {
    as: 'SimpananSukarela',
    foreignKey: "id_loan"
});

// eslint-disable-next-line
TblLoan.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = TblLoan;
