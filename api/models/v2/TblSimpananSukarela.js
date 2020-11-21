const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const hooks = {};
const tableName = 'tbl_simpanan_sukarela';

const TblSimpananSukarela = sequelize.define('TblSimpananSukarela', {
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
    id_collection: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    simpanan_sukarela: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    total_simpanan: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
TblSimpananSukarela.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = TblSimpananSukarela;
