const TblLoan = require('../models/v2/TblLoan');
const TblSimpananPokok = require('../models/v2/TblSimpananPokok');
const TblSimpananWajib = require('../models/v2/TblSimpananWajib');
const TblSimpananSukarela = require('../models/v2/TblSimpananSukarela');
const User = require('../models/User');
const bcryptService = require('../services/bcrypt.service');
const TblLoanCollection = require('../models/v2/TblLoanCollection');

const CustomerController = () => {

    const view_customer_loan = async (req, res) => {
        const {decoded} = req;

        try {
            const loan = await TblLoan.findAll({
                attributes: ['id', 'id_member', 'id_produk', 'nama_produk', 'tenor', 'nama_ao', 'desc_status', 'jumlah_pengajuan', 'jumlah_cicilan', 'createdAt'],
                where: {
                    id_member: decoded.ak_id
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
                    id_member: decoded.ak_id,
                    id_loan: id_loan,
                    created_by: 'android'
                }
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

        try {
            await TblLoan.findAll({
                attributes: ['id', 'nama_produk', 'nama_member', 'desc_status'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: decoded.ak_id
                },
                include: [{
                    model: TblSimpananPokok,
                    as: "SimpananPokok",
                    attributes: ['simpanan_pokok', 'total_simpanan'],
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                    limit: 1
                }, {
                    model: TblSimpananWajib,
                    as: "SimpananWajib",
                    attributes: ['simpanan_wajib', 'total_simpanan'],
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                    limit: 1
                }, {
                    model: TblSimpananSukarela,
                    as: "SimpananSukarela",
                    attributes: ['simpanan_sukarela', 'total_simpanan'],
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                    limit: 1
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

    const view_customer_change_pass = async (req, res) => {
        const {nik, password, password_new} = req.body;
        const pwd_new = {password: password_new};

        if (nik && password) {
            try {
                const user = await User.findOne({
                    where: {
                        no_identitas: nik
                    },
                });

                if (!user) {
                    return res.status(200).json({
                        status: 400,
                        data: "",
                        message: "User not found"
                    });
                }

                if (bcryptService().comparePassword(password, user.password)) {
                    const users = await User.update(
                        {
                            password: bcryptService().password(pwd_new),
                        }
                        , {
                            where: {
                                no_identitas: nik
                            }
                        });

                    if (users) {
                        return res.status(200).json({
                            status: 201,
                            data: [],
                            message: "Success change password"
                        });
                    }
                }
                return res.status(200).json({
                    status: 401,
                    data: "",
                    message: "Wrong current nik or password"
                });
            } catch (err) {
                // console.log(err);
                return res.status(500).json({
                    status: 500,
                    data: "",
                    message: "Sorry, try again later."
                });
            }
        }

        return res.status(200).json({
            status: 400,
            data: "",
            message: "Nik or password is wrong."
        });
    };

    return {
        view_customer_loan,
        view_customer_loan_collection,
        view_customer_loan_simpanan,
        view_customer_change_pass
    };
};

module.exports = CustomerController;
