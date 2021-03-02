const TblLoan = require('../models/v2/TblLoan');
const TblSimpananPokok = require('../models/v2/TblSimpananPokok');
const AccountRoleManagement = require('../models/v2/AccountRoleManagement');
const TblLoanProduct = require('../models/v2/LoanProduct');
const Member = require('../models/Member');
const User = require('../models/User');
const Status = require('../models/v2/MstStatus');
const TblLoanCollection = require('../models/v2/TblLoanCollection');
const LoanParameter = require('../models/v2/LoanParameter');
const sequelize = require('../../config/database');

const {Op} = require("sequelize");

const CustomerController = () => {

    const view_customer_loan = async (req, res) => {
        const {id_member} = req.params;

        try {
            const loan = await TblLoan.findAll({
                attributes: ['id', 'id_member', 'id_produk', 'nama_produk', 'nama_ao', 'desc_status', 'jumlah_pengajuan', 'jumlah_cicilan', 'createdAt'],
                where: {
                    id_member: id_member
                },
            });

            return res.status(200).json({
                status: 200,
                data: {loan},
                message: "Success"
            });

        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    const view_customer_loan_collection = async (req, res) => {
        const {id_member, id_loan} = req.params;

        try {
            const loan_collection = await TblLoanCollection.findAll({
                attributes: ['angsuran', 'loan_due_date', 'loan_payment_date', 'setoran', 'status_pembayaran', 'created_by'],
                where: {
                    id_member: id_member,
                    id_loan: id_loan,
                    created_by: 'android'
                },
                include: [{
                    model: TblLoanProduct,
                    as: "loan_product",
                    attributes: ['nama_produk', 'tenor', 'satuan_tenor'],
                    limit: 1
                }]
            });

            return res.status(200).json({
                status: 200,
                data: {loan_collection},
                message: "Success"
            });

        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    return {
        view_customer_loan,
        view_customer_loan_collection
    };
};

module.exports = CustomerController;
