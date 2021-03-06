const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tblloan_product';

const LoanProduct = sequelize.define('LoanProduct', {
    id_koperasi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_parameter: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nama_produk: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tenor: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    satuan_tenor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bunga: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tenor_bunga: {
        type: Sequelize.STRING,
        allowNull: false
    },
    asuransi: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type_asuransi: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dana_jpk: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type_dana_jpk: {
        type: Sequelize.STRING,
        allowNull: true
    },
    admin: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type_admin: {
        type: Sequelize.STRING,
        allowNull: true
    },
    provisi: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type_provisi: {
        type: Sequelize.STRING,
        allowNull: false
    },
    simpanan_pokok: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type_simpanan_pokok: {
        type: Sequelize.STRING,
        allowNull: false
    },
    simpanan_wajib: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    denda_keterlambatan: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type_denda_keterlambatan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pelunasan_dipercepat: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type_pelunasan_dipercepat: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
LoanProduct.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = LoanProduct;
