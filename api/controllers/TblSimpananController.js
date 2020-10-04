const TblSimpananPokok = require('../models/v2/TblSimpananPokok');
const TblSimpananWajib = require('../models/v2/TblSimpananWajib');
const TblSimpananSukarela = require('../models/v2/TblSimpananSukarela');

const TblLoanCollectionController = () => {

    const view_sum_simpanan_wajib = async (req, res) => {
        const {body, decoded} = req;

        try {
            TblSimpananWajib.sum('simpanan_wajib', {
                attributes: ['id_member'],
                group : ['id_member'],
                where: {
                    id_koperasi : decoded.koperasi_id,
                    id_member : body.id_member,
                    id_loan : body.id_loan
                }
            }).then((total) => {
                return res.status(201).json({
                    status: 200,
                    data: {total},
                    message: "Success retrieve Total Simpanan Wajib"
                });
            });

        } catch (err) {

            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    const view_sum_simpanan_pokok = async (req, res) => {
        const {body, decoded} = req;


        try {
            TblSimpananPokok.sum('simpanan_pokok', {
                attributes: ['id_member'],
                group : ['id_member'],
                where: {
                    id_koperasi : decoded.koperasi_id,
                    id_member : body.id_member,
                    id_loan : body.id_loan
                }
            }).then((total) => {
                return res.status(201).json({
                    status: 200,
                    data: {total},
                    message: "Success retrieve Total Simpanan Pokok"
                });
            });

        } catch (err) {

            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    const view_sum_simpanan_sukarela = async (req, res) => {
        const {body, decoded} = req;


        try {
            TblSimpananSukarela.sum('simpanan_sukarela', {
                attributes: ['id_member'],
                group : ['id_member'],
                where: {
                    id_koperasi : decoded.koperasi_id,
                    id_member : body.id_member,
                    id_loan : body.id_loan
                }
            }).then((total) => {
                return res.status(201).json({
                    status: 200,
                    data: {total},
                    message: "Success retrieve Total Simpanan Sukarela"
                });
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
        view_sum_simpanan_wajib,
        view_sum_simpanan_pokok,
        view_sum_simpanan_sukarela
    };
};

module.exports = TblLoanCollectionController;
