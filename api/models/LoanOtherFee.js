// const Sequelize = require('sequelize');
//
// const sequelize = require('../../config/database');
//
// const hooks = {
//
// };
//
// const tableName = 'loan_other_fee';
//
// const LoanOtherFee = sequelize.define('LoanOtherFee', {
//         formula_id: {
//                 type: Sequelize.INTEGER,
//                 allowNull: false
//         },
//         service_name: {
//                 type: Sequelize.STRING,
//                 allowNull: false
//         },
//         service_type: {
//                 type: Sequelize.STRING,
//                 allowNull: false
//         },
//         service_amount: {
//                 type: Sequelize.INTEGER,
//                 allowNull: true
//         },
//         service_cycle: {
//                 type: Sequelize.STRING,
//                 allowNull: true
//         }
// }, {
//         hooks,
//         tableName
// });
//
// // eslint-disable-next-line
// LoanOtherFee.prototype.toJSON = function () {
//         const values = Object.assign({}, this.get());
//
//         return values;
// };
//
// module.exports = LoanOtherFee;
