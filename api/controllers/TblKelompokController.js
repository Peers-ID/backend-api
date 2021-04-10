const TblKelompok = require('../models/v2/TblKelompok');

const TblKelompokController = () => {

    const add_kelompok = async (req, res) => {
        const {body, decoded} = req;

        try {
            var data = {
                id_koperasi: decoded.koperasi_id,
                id_rembug: body.id_rembug,
                nama_ketua: body.nama_ketua,
                nama_kelompok: body.nama_kelompok
            };

            TblKelompok.create(data).then((result) => {
                return res.status(201).json({
                    status: 200,
                    data: {},
                    message: "Success add Kelompok"
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

    const edit_kelompok = async (req, res) => {
        const {body, decoded} = req;

        try {
            var data = {
                id_koperasi: decoded.koperasi_id,
                id_rembug: body.id_rembug,
                nama_ketua: body.nama_ketua,
                nama_kelompok: body.nama_kelompok
            };

            await TblKelompok.update(data, {
                where: {
                    id: body.id
                }
            });

            return res.status(201).json({
                status: 200,
                data: {},
                message: "Success edit Kelompok"
            });

        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    const view_kelompok = async (req, res) => {
        const {decoded} = req;
        const {id_rembug} = req.params;

        try {
            TblKelompok.findAll({
                where: {
                    id_rembug: req.params.id_rembug,
                }
            }).then((kelompok) => {
                return res.status(201).json({
                    status: 200,
                    data: kelompok,
                    message: "Success retrieve Kelompok"
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
        add_kelompok,
        edit_kelompok,
        view_kelompok
    };
};

module.exports = TblKelompokController;
