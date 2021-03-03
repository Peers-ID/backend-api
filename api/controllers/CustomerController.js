const TblLoan = require('../models/v2/TblLoan');
const TblSimpananPokok = require('../models/v2/TblSimpananPokok');
const TblSimpananWajib = require('../models/v2/TblSimpananWajib');
const TblSimpananSukarela = require('../models/v2/TblSimpananSukarela');
const TblLoanProduct = require('../models/v2/LoanProduct');
const TblLoanCollection = require('../models/v2/TblLoanCollection');

const CustomerController = () => {

    const view_customer_loan = async (req, res) => {
        const {decoded} = req;

        try {
            const loan = await TblLoan.findAll({
                attributes: ['id', 'id_member', 'id_produk', 'nama_produk', 'nama_ao', 'desc_status', 'jumlah_pengajuan', 'jumlah_cicilan', 'createdAt'],
                where: {
                    id_member: decoded.id
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
        const {decoded} = req;
        const {id_loan} = req.params;

        try {
            const loan_collection = await TblLoanCollection.findAll({
                attributes: ['angsuran', 'loan_due_date', 'loan_payment_date', 'setoran', 'status_pembayaran', 'created_by'],
                where: {
                    id_member: decoded.id,
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

    const view_customer_loan_simpanan = async (req, res) => {
        const {decoded} = req;

        // TblLoan.hasMany(TblSimpananWajib, {as: 'Simpanan Wajib', foreignKey: 'id_loan'});
        // TblLoan.hasMany(TblSimpananSukarela, {as: 'Simpanan Sukarela', foreignKey: 'id_loan'});

        try {
            await TblLoan.findAll({
                attributes: ['id', 'nama_produk', 'nama_member', 'desc_status'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: decoded.id
                },
                include: [{
                    model: TblSimpananPokok,
                    as: "SimpananPokok",
                    attributes: ['simpanan_pokok', 'total_simpanan'],
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                    limit : 1
                }, {
                    model: TblSimpananWajib,
                    as: "SimpananWajib",
                    attributes: ['simpanan_wajib', 'total_simpanan'],
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                    limit : 1
                }, {
                    model: TblSimpananSukarela,
                    as: "SimpananSukarela",
                    attributes: ['simpanan_sukarela', 'total_simpanan'],
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                    limit : 1
                }]
            }).then(async (loan) => {
                if (!loan) {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Simpanan not found"
                    });
                } else {
                    return res.status(201).json({
                        status: 200,
                        data: {loan},
                        message: "Success retrieve Total Simpanan Sukarela"
                    });

                }
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
        view_customer_loan_collection,
        view_customer_loan_simpanan
    };
};

module.exports = CustomerController;
