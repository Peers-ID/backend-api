const LoanParameter = require('../models/v2/LoanParameter');

const LoanParameterController = () => {

    const add = async (req, res) => {
        const {body} = req;

        try {
            var data = {
                id_koperasi: body.id_koperasi,
                hari_per_bulan: body.hari_per_bulan,
                id_angsuran_sebagian: body.id_angsuran_sebagian,
                id_masa_tenggang: body.id_masa_tenggang,
                type_denda_keterlambatan: body.type_denda_keterlambatan,
                id_dasar_denda: body.id_dasar_denda,
                type_pelunasan_dipercepat: body.type_pelunasan_dipercepat,
                id_dasar_pelunasan: body.id_dasar_pelunasan,
                id_urutan_simpanan: body.id_urutan_simpanan
            };

            await LoanParameter.findOne({
                where: {
                    id_koperasi: body.id_koperasi
                }
            }).then(async (isExistLoanParameter) => {
                if (isExistLoanParameter) {
                    await LoanParameter.update(data, {
                        where: {
                            id_koperasi: body.id_koperasi
                        }
                    });

                    return res.status(201).json({
                        status: 201,
                        data: [],
                        message: "Data updated successfully "
                    });
                } else {
                    await LoanParameter.create(data);
                    return res.status(201).json({
                        status: 201,
                        data: [],
                        message: "Data inserted successfully"
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

    const view = async (req, res) => {
        const {id} = req.params;

        try {
            const loan_parameter = await LoanParameter.findAll({
                where: {
                    id_koperasi: id
                }
            });

            if (loan_parameter) {
                return res.status(200).json({
                    status: 200,
                    data: loan_parameter,
                    message: "Success retrieve data."
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    data: [],
                    message: "Data not found"
                });
            }
        } catch (err) {
            return res.status(500).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
        }
    };

    return {
        add,
        view
    };
};

module.exports = LoanParameterController;
