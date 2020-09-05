const LoanProduct = require('../models/v2/LoanProduct');
const LoanParameter = require('../models/v2/LoanParameter');

const LoanProductController = () => {

    const add = async (req, res) => {
        const {body, decoded} = req;

        try {
            await LoanParameter.findOne({
                where: {
                    id_koperasi: decoded.koperasi_id
                }
            }).then(async (parameter) => {
                var data = {
                    id_koperasi: decoded.koperasi_id,
                    nama_produk: body.nama_produk,
                    tenor: body.tenor,
                    satuan_tenor: body.satuan_tenor,
                    bunga: body.bunga,
                    tenor_bunga: body.tenor_bunga,
                    admin: body.admin,
                    provisi: body.provisi,
                    type_provisi: body.type_provisi,
                    simpanan_pokok: body.simpanan_pokok,
                    type_simpanan_pokok: body.type_simpanan_pokok,
                    simpanan_wajib: body.simpanan_wajib,
                    denda_keterlambatan: body.denda_keterlambatan,
                    type_denda_keterlambatan: body.type_denda_keterlambatan,
                    pelunasan_dipercepat: body.pelunasan_dipercepat,
                    type_pelunasan_dipercepat: body.type_pelunasan_dipercepat,
                    id_parameter: parameter.id
                };

                await LoanProduct.create(data);
                return res.status(201).json({
                    status: 201,
                    data: [],
                    message: "Data inserted successfully"
                });
            });
        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: "",
                message: "Error: " + err
            });
        }
    };

    const edit = async (req, res) => {
        const {body, decoded} = req;

        try {
            var data = {
                id: body.id,
                id_koperasi: decoded.koperasi_id,
                nama_produk: body.nama_produk,
                tenor: body.tenor,
                satuan_tenor: body.satuan_tenor,
                bunga: body.bunga,
                tenor_bunga: body.tenor_bunga,
                admin: body.admin,
                provisi: body.provisi,
                type_provisi: body.type_provisi,
                simpanan_pokok: body.simpanan_pokok,
                type_simpanan_pokok: body.type_simpanan_pokok,
                simpanan_wajib: body.simpanan_wajib,
                denda_keterlambatan: body.denda_keterlambatan,
                type_denda_keterlambatan: body.type_denda_keterlambatan,
                pelunasan_dipercepat: body.pelunasan_dipercepat,
                type_pelunasan_dipercepat: body.type_pelunasan_dipercepat
            };

            await LoanProduct.update(data, {
                where: {
                    id: body.id,
                    id_koperasi: decoded.koperasi_id,
                }
            }).then((updated) => {
                if (updated) {
                    return res.status(200).json({
                        status: 200,
                        data: [],
                        message: "Data updated  successfully"
                    });
                } else {
                    return res.status(200).json({
                        status: 200,
                        data: [],
                        message: "Failed updated data"
                    });
                }
            });



        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: "",
                message: "Error: " + err
            });
        }
    };

    return {
        add,
        edit
    };
};

module.exports = LoanProductController;
