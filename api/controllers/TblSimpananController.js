const TblSimpananPokok = require('../models/v2/TblSimpananPokok');
const TblSimpananWajib = require('../models/v2/TblSimpananWajib');
const TblSimpananSukarela = require('../models/v2/TblSimpananSukarela');
const TblLoan = require('../models/v2/TblLoan');

const TblLoanCollectionController = () => {

    const view_sum_simpanan_wajib = async (req, res) => {
        const {decoded} = req;
        const {id_member} = req.params;

        try {

            await TblLoan.findOne({
                attributes:['id'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: id_member,
                    desc_status: 'active'
                }
            }).then(async (id_loan) => {
                if (!id_loan) {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Simpanan Wajib not found"
                    });
                } else {
                    TblSimpananWajib.findOne({
                        attributes: ['total_simpanan'],
                        where: {
                            id_koperasi : decoded.koperasi_id,
                            id_member : id_member,
                            id_loan : id_loan.id
                        },
                        order: [
                            ['updatedAt', 'DESC']
                        ]
                    }).then((total) => {
                        return res.status(201).json({
                            status: 200,
                            data: total,
                            message: "Success retrieve Total Simpanan Wajib"
                        });
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

    const view_detail_simpanan_wajib = async (req, res) => {
        const {decoded} = req;
        const {id_member} = req.params;

        try {

            await TblLoan.findOne({
                attributes:['id'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: id_member,
                    desc_status: 'active'
                }
            }).then(async (id_loan) => {
                if (!id_loan) {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Simpanan Wajib not found"
                    });
                } else {
                    TblSimpananWajib.findAll({
                        where: {
                            id_koperasi : decoded.koperasi_id,
                            id_member : id_member,
                            id_loan : id_loan.id
                        }
                    }).then((data) => {
                        return res.status(201).json({
                            status: 200,
                            data: data,
                            message: "Success retrieve Detail Simpanan Wajib"
                        });
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

    const withdraw_simpanan_wajib = async (req, res) => {
        const {body, decoded} = req;

        try {
            await TblLoan.findOne({
                attributes:['id'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: body.id_member,
                    desc_status: 'active'
                }
            }).then(async (id_loan) => {

                //1. check last total and last updatedDate
                const lastTotal = await TblSimpananWajib.findOne({
                    attributes: ['total_simpanan'],
                    where: {
                        id_koperasi : decoded.koperasi_id,
                        id_member : body.id_member,
                        id_loan : id_loan.id
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                });

                const simpanan_wajib = {
                    id_koperasi: decoded.koperasi_id,
                    id_ao: 0,
                    id_loan: id_loan.id,
                    id_member: body.id_member,
                    id_collection: 0,
                    simpanan_wajib: body.jumlah_penarikan,
                    total_simpanan: lastTotal.total_simpanan - body.jumlah_penarikan,
                    desc: "Penarikan"
                };

                await TblSimpananWajib.create(simpanan_wajib);

                return res.status(201).json({
                    status: 200,
                    data: "",
                    message: "Success withdrawal"
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
        const {decoded} = req;
        const {id_member} = req.params;

        try {

            await TblLoan.findOne({
                attributes:['id'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: id_member,
                    desc_status: 'active'
                }
            }).then(async (id_loan) => {
                if (!id_loan) {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Simpanan Pokok not found"
                    });
                } else {
                    TblSimpananPokok.findOne({
                        attributes: ['total_simpanan'],
                        where: {
                            id_koperasi : decoded.koperasi_id,
                            id_member : id_member,
                            id_loan : id_loan.id
                        },
                        order: [
                            ['updatedAt', 'DESC']
                        ]
                    }).then((total) => {
                        return res.status(201).json({
                            status: 200,
                            data: total,
                            message: "Success retrieve Total Simpanan Pokok"
                        });
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

    const view_detail_simpanan_pokok = async (req, res) => {
        const {decoded} = req;
        const {id_member} = req.params;

        try {

            await TblLoan.findOne({
                attributes:['id'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: id_member,
                    desc_status: 'active'
                }
            }).then(async (id_loan) => {
                if (!id_loan) {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Simpanan Pokok not found"
                    });
                } else {
                    TblSimpananPokok.findAll({
                        where: {
                            id_koperasi : decoded.koperasi_id,
                            id_member : id_member,
                            id_loan : id_loan.id
                        }
                    }).then((data) => {
                        return res.status(201).json({
                            status: 200,
                            data: data,
                            message: "Success retrieve Detail Simpanan Pokok"
                        });
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

    const withdraw_simpanan_pokok = async (req, res) => {
        const {body, decoded} = req;

        try {
            await TblLoan.findOne({
                attributes:['id'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: body.id_member,
                    desc_status: 'active'
                }
            }).then(async (id_loan) => {

                //1. check last total and last updatedDate
                const lastTotal = await TblSimpananPokok.findOne({
                    attributes: ['total_simpanan'],
                    where: {
                        id_koperasi : decoded.koperasi_id,
                        id_member : body.id_member,
                        id_loan : id_loan.id
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                });

                const simpanan_pokok = {
                    id_koperasi: decoded.koperasi_id,
                    id_ao: 0,
                    id_loan: id_loan.id,
                    id_member: body.id_member,
                    id_collection: 0,
                    simpanan_pokok: body.jumlah_penarikan,
                    total_simpanan: lastTotal.total_simpanan - body.jumlah_penarikan,
                    desc: "Penarikan"
                };

                await TblSimpananPokok.create(simpanan_pokok);

                return res.status(201).json({
                    status: 200,
                    data: "",
                    message: "Success withdrawal"
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
        const {decoded} = req;
        const {id_member} = req.params;

        try {

            await TblLoan.findOne({
                attributes:['id'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: id_member,
                    desc_status: 'active'
                }
            }).then(async (id_loan) => {

                if (!id_loan) {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Simpanan Sukarela not found"
                    });
                } else {
                    TblSimpananSukarela.findOne({
                        attributes: ['total_simpanan'],
                        where: {
                            id_koperasi : decoded.koperasi_id,
                            id_member : id_member,
                            id_loan : id_loan.id
                        },
                        order: [
                            ['updatedAt', 'DESC']
                        ]
                    }).then((total) => {
                        return res.status(201).json({
                            status: 200,
                            data: total,
                            message: "Success retrieve Total Simpanan Sukarela"
                        });
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

    const view_detail_simpanan_sukarela = async (req, res) => {
        const {decoded} = req;
        const {id_member} = req.params;

        try {

            await TblLoan.findOne({
                attributes:['id'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: id_member,
                    desc_status: 'active'
                }
            }).then(async (id_loan) => {

                if (!id_loan) {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Simpanan Sukarela not found"
                    });
                } else {
                    TblSimpananSukarela.findAll({
                        where: {
                            id_koperasi : decoded.koperasi_id,
                            id_member : id_member,
                            id_loan : id_loan.id
                        }
                    }).then((data) => {
                        return res.status(201).json({
                            status: 200,
                            data: data,
                            message: "Success retrieve Detail Simpanan Sukarela"
                        });
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

    const withdraw_simpanan_sukarela = async (req, res) => {
        const {body, decoded} = req;

        try {
            await TblLoan.findOne({
                attributes:['id'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: body.id_member,
                    desc_status: 'active'
                }
            }).then(async (id_loan) => {

                //1. check last total and last updatedDate
                const lastTotal = await TblSimpananSukarela.findOne({
                    attributes: ['total_simpanan'],
                    where: {
                        id_koperasi : decoded.koperasi_id,
                        id_member : body.id_member,
                        id_loan : id_loan.id
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                });

                const simpanan_sukarela = {
                    id_koperasi: decoded.koperasi_id,
                    id_ao: 0,
                    id_loan: id_loan.id,
                    id_member: body.id_member,
                    id_collection: 0,
                    simpanan_sukarela: body.jumlah_penarikan,
                    total_simpanan: lastTotal.total_simpanan - body.jumlah_penarikan,
                    desc: "Penarikan"
                };

                await TblSimpananSukarela.create(simpanan_sukarela);

                return res.status(201).json({
                    status: 200,
                    data: "",
                    message: "Success withdrawal"
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

    const view_sum_all_simpanan = async (req, res) => {
        const {decoded} = req;
        const {id_member} = req.params;

        try {
            await TblLoan.findOne({
                attributes:['id'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: id_member,
                    desc_status: 'active'
                }
            }).then(async (id_loan) => {
                if (!id_loan) {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Simpanan not found"
                    });
                } else {
                    const simpanan_wajib = await TblSimpananWajib.findOne({
                        attributes: [['total_simpanan', 'total']],
                        where: {
                            id_koperasi : decoded.koperasi_id,
                            id_member : id_member,
                            id_loan : id_loan.id
                        },
                        order: [
                            ['updatedAt', 'DESC']
                        ]
                    });


                    const simpanan_pokok = await TblSimpananPokok.findOne({
                        attributes: [['total_simpanan', 'total']],
                        where: {
                            id_koperasi : decoded.koperasi_id,
                            id_member : id_member,
                            id_loan : id_loan.id
                        },
                        order: [
                            ['updatedAt', 'DESC']
                        ]
                    });

                    const simpanan_sukarela = await TblSimpananSukarela.findOne({
                        attributes: [['total_simpanan', 'total']],
                        where: {
                            id_koperasi : decoded.koperasi_id,
                            id_member : id_member,
                            id_loan : id_loan.id
                        },
                        order: [
                            ['updatedAt', 'DESC']
                        ]
                    });


                    return res.status(201).json({
                        status: 200,
                        data: {simpanan_wajib, simpanan_pokok, simpanan_sukarela},
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

    return {
        view_sum_simpanan_wajib,
        view_detail_simpanan_wajib,
        withdraw_simpanan_wajib,
        view_sum_simpanan_pokok,
        view_detail_simpanan_pokok,
        withdraw_simpanan_pokok,
        view_sum_simpanan_sukarela,
        view_detail_simpanan_sukarela,
        withdraw_simpanan_sukarela,
        view_sum_all_simpanan
    };
};

module.exports = TblLoanCollectionController;
