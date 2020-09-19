const Sequelize = require('sequelize');
const Member = require('../Member');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tblloan_collection';

const TblLoanCollection = sequelize.define('TblLoanCollection', {
    id_koperasi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_produk: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nama_produk: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_member: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nama_lengkap: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_loan: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    loan_due_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    loan_payment_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    angsuran: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    pembayaran_ke: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    pokok: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    bunga: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    total_tagihan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
    },
    denda: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    simpanan_wajib: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    simpanan_sukarela: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    setoran: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    status_pembayaran: {
        type: Sequelize.STRING,
        allowNull: true
    },
    created_by: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
TblLoanCollection.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = TblLoanCollection;
