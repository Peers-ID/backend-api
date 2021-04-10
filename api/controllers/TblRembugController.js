const TblRembug = require('../models/v2/TblRembug');

const TblRembugController = () => {

    const add_rembug = async (req, res) => {
        const {body, decoded} = req;

        try {
            var data = {
                id_koperasi: decoded.koperasi_id,
                nama_ketua: body.nama_ketua,
                nama_rembug: body.nama_rembug
            };

            TblRembug.create(data).then((result) => {
                return res.status(201).json({
                    status: 200,
                    data: {},
                    message: "Success add Rembug"
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

    const edit_rembug = async (req, res) => {
        const {body, decoded} = req;

        try {
            var data = {
                id_koperasi: decoded.koperasi_id,
                nama_ketua: body.nama_ketua,
                nama_rembug: body.nama_rembug
            };

            await TblRembug.update(data, {
                where: {
                    id: body.id,
                    id_koperasi: decoded.koperasi_id,
                }
            });

            return res.status(201).json({
                status: 200,
                data: {},
                message: "Success edit Rembug"
            });

        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    const view_rembug = async (req, res) => {
        const {decoded} = req;

        try {
            TblRembug.findAll({
                where: {
                    id_koperasi: decoded.koperasi_id,
                }
            }).then((rembug) => {
                return res.status(201).json({
                    status: 200,
                    data: rembug,
                    message: "Success retrieve Rembug"
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
        add_rembug,
        edit_rembug,
        view_rembug
    };
};

module.exports = TblRembugController;
