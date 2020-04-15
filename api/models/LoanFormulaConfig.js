const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'form_loan_formula_config';

const LoanFormulaConfig = sequelize.define('LoanFormulaConfig', {
        koperasi_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
        },
        formula_name: {
                type: Sequelize.STRING,
                allowNull: false
        },
        min_loan_amount: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        max_loan_amount: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        kelipatan: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        min_tenure: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        max_tenure: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        tenure_cycle: {
                type: Sequelize.STRING,
                allowNull: true
        },
        service_type: {
                type: Sequelize.STRING,
                allowNull: true
        },
        service_amount: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        service_cycle: {
                type: Sequelize.STRING,
                allowNull: true
        },
}, {
        hooks,
        tableName
});

// eslint-disable-next-line
LoanFormulaConfig.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        return values;
};

module.exports = LoanFormulaConfig;
