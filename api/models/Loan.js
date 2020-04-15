const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'loan';

const Loan = sequelize.define('Loan', {
        koperasi_id: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        member_id: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        member_name: {
                type: Sequelize.STRING,
                allowNull: false
        },
        member_handphone: {
                type: Sequelize.STRING,
                allowNull: false
        },
        ao_id: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        ao_name: {
                type: Sequelize.STRING,
                allowNull: false
        },
        formula_id: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        jumlah_loan: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        total_disbursed: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        tenor: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        tenor_cycle: {
                type: Sequelize.STRING,
                allowNull: false
        },
        service_type: {
                type: Sequelize.STRING,
                allowNull: false
        },
        cicilan_per_bln: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        member_photo_url: {
                type: Sequelize.STRING,
                allowNull: true
        },
        is_loan_approved: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue:0
        },
        approved_by_admin_id: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        approved_date: {
                type: Sequelize.DATE,
                allowNull: true
        }
}, {
        hooks,
        tableName
});

// eslint-disable-next-line
Loan.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        return values;
};

module.exports = Loan;
