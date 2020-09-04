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
        allowNull: false
    },
    approve_max_3jt: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    approve_max_5jt: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    approve_max_10jt: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    approve_more_10jt: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    disburse_max_5jt: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    disburse_max_10jt: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    disburse_more_10jt: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    repayment: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    collection: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_kinerja_koperasi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_pengaturan_pinjaman: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_tambah_ao: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_tambah_admin: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_tambah_super_admin: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_management_pinjaman: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_management_anggota: {
        type: Sequelize.INTEGER,
        allowNull: false
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
