const LoanParameter = require('../models/v2/LoanParameter');

const LoanParameterController = () => {

    const add = async (req, res) => {
        const {body, decoded} = req;


        //TODO list status pinjaman
        /*Anggota Sudah Terdaftar : 0, 9
        Pending Persetujuan Pinjaman : 2,3,4,6,7,8
        Pinjaman Aktif : 1,5*/

        try {
            var data = {
                id_koperasi: decoded.koperasi_id,
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
                    id_koperasi: decoded.koperasi_id
                }
            }).then(async (isExistLoanParameter) => {
                if (isExistLoanParameter) {
                    await LoanParameter.update(data, {
                        where: {
                            id_koperasi: decoded.koperasi_id
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
        const {decoded} = req;

        try {
            const loan_parameter = await LoanParameter.findAll({
                where: {
                    id_koperasi: decoded.koperasi_id
                }
            });

            if (loan_parameter) {
                return res.status(200).json({
                    status: 200,
                    data: loan_parameter,
                    message: "Success retrieve data"
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
