const MstDasarCicilanSebagian = require('../models/v2/MstDasarCicilanSebagian');
const MstDasarDenda = require('../models/v2/MstDasarDenda');
const MstDasarPelunasan = require('../models/v2/MstDasarPelunasan');
const MstSimpanan = require('../models/v2/MstSimpanan');


const MasterDataController = () => {

    const cicilan_sebagian = async (req, res) => {
        try {
            const find_data_cicilan_sebagian = await MstDasarCicilanSebagian.findAll();
            return res.status(200).json({
                status: 200,
                data: find_data_cicilan_sebagian,
                message: "Success retrieve data."
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
        }
    };

    const dasar_denda = async (req, res) => {
        try {
            const find_dasar_denda = await MstDasarDenda.findAll();
            return res.status(200).json({
                status: 200,
                data: find_dasar_denda,
                message: "Success retrieve data."
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
        }
    };

    const dasar_pelunasan = async (req, res) => {
        try {
            const find_dasar_pelunasan = await MstDasarPelunasan.findAll();
            return res.status(200).json({
                status: 200,
                data: find_dasar_pelunasan,
                message: "Success retrieve data."
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
        }
    };

    const dasar_simpanan = async (req, res) => {
        try {
            const find_simpanan = await MstSimpanan.findAll();
            return res.status(200).json({
                status: 200,
                data: find_simpanan,
                message: "Success retrieve data."
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
        }
    };

    return {
        cicilan_sebagian,
        dasar_denda,
        dasar_pelunasan,
        dasar_simpanan
    };
};

module.exports = MasterDataController;
