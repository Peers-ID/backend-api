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
    id_member: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    paid_loan: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    paid_status: {
        type: Sequelize.STRING,
        allowNull: true
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
