const TblLoan = require('../models/v2/TblLoan');
const Member = require('../models/Member');
const TblLoanCollection = require('../models/v2/TblLoanCollection');
const sequelize = require('../../config/database');

const {Op} = require("sequelize");

const KinerjaKoperasiController = () => {

    const view_count_anggota = async (req, res) => {
        const {decoded} = req;
        const currentYear = new Date().getFullYear();

        try {
            const count_member = await Member.findAll({
                attributes: [[sequelize.fn('count', 'member_id'), 'data'], ['month(createdAt)', 'bulan']],
                where: {
                    'koperasi_id': decoded.koperasi_id,
                    [Op.and]: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), currentYear)
                },
                group: [sequelize.fn('MONTH', sequelize.col('createdAt'))]
            });

            return res.status(200).json({
                status: 200,
                data: count_member,
                message: "Success get data"
            });

        } catch (err) {

            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    const view_sum_penyaluran_pinjaman = async (req, res) => {
        const {decoded} = req;
        const currentYear = new Date().getFullYear();

        try {
            const count_pencairan = await TblLoan.findAll({
                attributes: [[sequelize.fn('sum', sequelize.col('jumlah_pencairan')), 'data'], ['month(createdAt)', 'bulan']],
                where: {
                    'id_koperasi': decoded.koperasi_id,
                    [Op.and]: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), currentYear)
                },
                group: [sequelize.fn('MONTH', sequelize.col('createdAt'))]
            });

            return res.status(200).json({
                status: 200,
                data: count_pencairan,
                message: "Success get data"
            });

        } catch (err) {

            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    const view_sum_pembayaran_angsuran = async (req, res) => {
        const {decoded} = req;
        const currentYear = new Date().getFullYear();

        try {
            const count_setoran = await TblLoanCollection.findAll({
                attributes: [[sequelize.fn('sum', sequelize.col('setoran')), 'data'], ['month(createdAt)', 'bulan']],
                where: {
                    'id_koperasi': decoded.koperasi_id,
                    'created_by': 'android',
                    [Op.and]: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), currentYear)
                },
                group: [sequelize.fn('MONTH', sequelize.col('createdAt'))]
            });

            return res.status(200).json({
                status: 200,
                data: count_setoran,
                message: "Success get data"
            });

        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    const view_count_pinjaman_berjalan = async (req, res) => {
        const {decoded} = req;
        const currentYear = new Date().getFullYear();

        try {
            const count_pinjaman = await TblLoan.findAll({
                attributes: [[sequelize.fn('count', sequelize.col('id')), 'data'], ['month(createdAt)', 'bulan']],
                where: {
                    'id_koperasi': decoded.koperasi_id,
                    'desc_status': 'active',
                    [Op.and]: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), currentYear)
                },
                group: [sequelize.fn('MONTH', sequelize.col('createdAt'))]
            });

            return res.status(200).json({
                status: 200,
                data: count_pinjaman,
                message: "Success get data"
            });

        } catch (err) {

            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }

    };

    const view_all_graph = async (req, res) => {
        const {decoded} = req;
        const currentYear = new Date().getFullYear();

        try {
            const member = await Member.findAll({
                attributes: [[sequelize.fn('count', 'member_id'), 'data'], ['month(createdAt)', 'bulan']],
                where: {
                    'koperasi_id': decoded.koperasi_id,
                    [Op.and]: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), currentYear)
                },
                group: [sequelize.fn('MONTH', sequelize.col('createdAt'))]
            });


            const pencairan = await TblLoan.findAll({
                attributes: [[sequelize.fn('sum', sequelize.col('jumlah_pencairan')), 'data'], ['month(createdAt)', 'bulan']],
                where: {
                    'id_koperasi': decoded.koperasi_id,
                    [Op.and]: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), currentYear)
                },
                group: [sequelize.fn('MONTH', sequelize.col('createdAt'))]
            });

            const setoran = await TblLoanCollection.findAll({
                attributes: [[sequelize.fn('sum', sequelize.col('setoran')), 'data'], ['month(createdAt)', 'bulan']],
                where: {
                    'id_koperasi': decoded.koperasi_id,
                    'created_by': 'android',
                    [Op.and]: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), currentYear)
                },
                group: [sequelize.fn('MONTH', sequelize.col('createdAt'))]
            });

            const pinjaman = await TblLoan.findAll({
                attributes: [[sequelize.fn('count', sequelize.col('id')), 'data'], ['month(createdAt)', 'bulan']],
                where: {
                    'id_koperasi': decoded.koperasi_id,
                    'desc_status': 'active',
                    [Op.and]: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), currentYear)
                },
                group: [sequelize.fn('MONTH', sequelize.col('createdAt'))]
            });

            return res.status(200).json({
                status: 200,
                data: {member, pencairan, setoran, pinjaman},
                message: "Success get data"
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
        view_count_anggota,
        view_sum_penyaluran_pinjaman,
        view_sum_pembayaran_angsuran,
        view_count_pinjaman_berjalan,
        view_all_graph
    };
};

module.exports = KinerjaKoperasiController;
