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
                    type_admin: body.type_admin,
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
                type_admin: body.type_admin,
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

    const list = async (req, res) => {
        const {decoded} = req;

        try {
            await LoanProduct.findAll({
                where: {
                    id_koperasi: decoded.koperasi_id
                },
            }).then((product) => {
                return res.status(200).json({
                    status: 200,
                    data: product,
                    message: "List All Products"
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

    const list_active = async (req, res) => {
        const {decoded} = req;

        try {
            await LoanProduct.findAll({
                where: {
                    id_koperasi: decoded.koperasi_id,
                    status: "active"
                },
            }).then((product) => {
                return res.status(200).json({
                    status: 200,
                    data: product,
                    message: "List All Active Products"
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

    const per_product = async (req, res) => {
        const {decoded} = req;
        const {id_product} = req.params;

        try {
            await LoanProduct.findAll({
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id: id_product
                },
            }).then((product) => {
                return res.status(200).json({
                    status: 200,
                    data: product,
                    message: "List Products Per Id"
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

    const update_status = async (req, res) => {
        const {body, decoded} = req;

        try {
            var data = {
                status: body.status
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
                        message: "Status updated  successfully"
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
        edit,
        list,
        list_active,
        per_product,
        update_status
    };
};

module.exports = LoanProductController;
