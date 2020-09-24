const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tblrole_management';

const AccountRoleManagement = sequelize.define('AccountRoleManagement', {
    id_koperasi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    approve_max_1jt: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    approve_max_3jt: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    approve_max_5jt: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    approve_max_10jt: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    approve_more_10jt: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    disburse_max_5jt: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    disburse_max_10jt: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    disburse_more_10jt: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    repayment: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    collection: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    mn_kinerja_koperasi: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    mn_pengaturan_pinjaman: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    mn_tambah_ao: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    mn_tambah_admin: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    mn_tambah_super_admin: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    mn_management_pinjaman: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    mn_management_anggota: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
AccountRoleManagement.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = AccountRoleManagement;
