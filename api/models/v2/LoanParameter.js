const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tblloan_parameter';

const LoanParameter = sequelize.define('LoanParameter', {
    id_koperasi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hari_per_bulan: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_angsuran_sebagian: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_masa_tenggang: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type_denda_keterlambatan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_dasar_denda: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type_pelunasan_dipercepat: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_dasar_pelunasan: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_urutan_simpanan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
        default: 'active'
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
LoanParameter.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = LoanParameter;
