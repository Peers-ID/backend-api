const TblLoanCollection = require('../models/v2/TblLoanCollection');
const LoanProduct = require('../models/v2/LoanProduct');
const LoanParameter = require('../models/v2/LoanParameter');
const TblSimpananWajib = require('../models/v2/TblSimpananWajib');
const TblSimpananSukarela = require('../models/v2/TblSimpananSukarela');
const Member = require('../models/Member');
const sequelize = require('../../config/database');

const {Op} = require("sequelize");

const TblLoanCollectionController = () => {

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Fungsi untuk kalkulasi jarak antara 2 tanggal
    function dateDiffInDays(a, b) {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    const add = async (req, res) => {
        const {body, decoded} = req;
        const t = await sequelize.transaction();

        var loan_satuan_tenor;
        var hari_per_bulan;
        var id_angsuran_sebagian;
        var type_denda_keterlambatan;
        var denda_keterlambatan;
        var id_dasar_denda;
        var id_masa_tenggang;
        var nama_produk;
        var nama_lengkap;


        var date_now_string = new Date(Date.now()).toISOString();

        try {
            var collection = {
                id_koperasi: decoded.koperasi_id,
                id_member: body.id_member,
                angsuran: body.angsuran,
                pembayaran_ke: body.pembayaran_ke,
                loan_payment_date: date_now_string,
                denda: body.denda,
                setoran: body.setoran,
                created_by: "android"
            };

            await Member.findOne({
                attributes:['nama_lengkap'],
                where: {
                    member_id: body.id_member
                }
            }).then((member) => {
                if (member) {
                    nama_lengkap = member.nama_lengkap;
                }
            });

            await TblLoanCollection.findOne({
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: body.id_member,
                    angsuran: body.angsuran,
                    pembayaran_ke: body.pembayaran_ke,
                    created_by: "system"
                }
            }).then(async (record_collection) => {

                //check parameter and product
                await LoanProduct.findOne({
                    where: {
                        id: record_collection.id_produk
                    }
                }).then(async (produk) => {
                    loan_satuan_tenor = produk.satuan_tenor;
                    denda_keterlambatan = produk.denda_keterlambatan;
                    nama_produk = produk.nama_produk;

                    await LoanParameter.findOne({
                        attributes: ['hari_per_bulan', 'id_angsuran_sebagian', 'type_denda_keterlambatan', 'id_dasar_denda', 'id_masa_tenggang'],
                        where: {
                            id: produk.id_parameter
                        }
                    }).then((parameter) => {
                        hari_per_bulan = parameter.hari_per_bulan;
                        id_angsuran_sebagian = parameter.id_angsuran_sebagian;
                        type_denda_keterlambatan = parameter.type_denda_keterlambatan;
                        id_dasar_denda = parameter.id_dasar_denda;
                        id_masa_tenggang = parameter.id_masa_tenggang;
                    });
                });

                /* --------------- CREATE NEW COLLECTION FROM ANDROID --------------*/

                collection.id_produk = record_collection.id_produk;
                collection.nama_produk = nama_produk;
                collection.nama_lengkap = nama_lengkap;
                collection.id_loan = record_collection.id_loan;
                collection.total_tagihan = record_collection.total_tagihan;
                collection.loan_due_date = record_collection.loan_due_date;

                if (body.setoran >= record_collection.total_tagihan) {
                    collection.status_pembayaran = "lunas";
                    collection.pokok = body.utang_pokok;
                    collection.bunga = body.bunga_pinjaman;
                    collection.simpanan_wajib = body.simpanan_wajib;
                    collection.simpanan_sukarela = body.simpanan_sukarela + (body.setoran - record_collection.total_tagihan)

                } else {
                    collection.status_pembayaran = "sebagian";
                    //1: Mengurangi Pokok; 2: Mengurangi Bunga
                    if (id_angsuran_sebagian === 1) {
                        if (collection.setoran >= collection.pokok) {
                            collection.bunga = collection.setoran - record_collection.pokok;
                            collection.pokok = record_collection.pokok;
                        } else {
                            collection.pokok = record_collection.pokok - collection.setoran;
                            collection.bunga = record_collection.bunga
                        }
                    } else if (id_angsuran_sebagian === 2) {
                        if (collection.setoran >= record_collection.bunga) {
                            collection.bunga = record_collection.bunga;
                            collection.pokok = collection.setoran - record_collection.bunga;
                        } else {
                            collection.bunga = record_collection.bunga - collection.setoran;
                            collection.pokok = record_collection.pokok;
                        }
                    }
                    collection.simpanan_wajib = 0;
                    collection.simpanan_sukarela = body.simpanan_sukarela;
                }

                const android_collection = await TblLoanCollection.create(collection, {
                    transaction: t
                });


                /*----------------- CREATE/UPDATE SIMPANAN WAJIB---------------*/
                var simpanan_wajib = {};
                simpanan_wajib.id_koperasi = decoded.koperasi_id;
                simpanan_wajib.id_ao = decoded.id;
                simpanan_wajib.id_loan = android_collection.id_loan;
                simpanan_wajib.id_member = android_collection.id_member;
                simpanan_wajib.id_collection = android_collection.id;

                simpanan_wajib.simpanan_wajib = android_collection.simpanan_wajib;
                simpanan_wajib.desc = body.bayar_dengan_simpanan === 0 ? "Setoran" : "Cicilan";

                //1. check last total and last updatedDate
                const lastTotal = await TblSimpananWajib.findOne({
                    attributes: ['total_simpanan'],
                    where: {
                        id_koperasi : decoded.koperasi_id,
                        id_member : android_collection.id_member,
                        id_loan : android_collection.id_loan
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                });

                console.log("### last total " + lastTotal.total_simpanan);

                const lastUpdateDate = await TblSimpananWajib.findOne({
                    attributes: ['updatedAt'],
                    where: {
                        id_koperasi: decoded.koperasi_id,
                        id_ao: decoded.id,
                        id_loan: android_collection.id_loan,
                        id_member: android_collection.id_member
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                });

                console.log("### last lastUpdateDate " + lastUpdateDate);

                //2. update total_saldo where last updatedDate is similar with before
                if (!lastTotal) {
                    simpanan_wajib.total_simpanan = simpanan_wajib.simpanan_wajib;
                } else {
                    if (simpanan_wajib.desc === "Setoran") {
                        simpanan_wajib.total_simpanan = lastTotal.total_simpanan + simpanan_wajib.simpanan_wajib
                    } else {
                        //TODO : lakukan pengecekan priirity pengurangan simpanan dari parameter disini
                        simpanan_wajib.total_simpanan = lastTotal.total_simpanan - simpanan_wajib.simpanan_wajib
                    }
                }

                let condition = {where: {}};
                condition.where.id_koperasi = decoded.koperasi_id;
                condition.where.id_ao = decoded.id;
                condition.where.id_loan = android_collection.id_loan;
                condition.where.id_member = android_collection.id_member;
                if (lastUpdateDate !== null) {
                    condition.where.updatedAt = lastUpdateDate; //optimistic lock should be working well when update same column
                }

                await TblSimpananWajib.create(simpanan_wajib, {
                    condition,
                    transaction: t
                });

                // await TblSimpananWajib.findOne({
                //     where: {
                //         id_koperasi: decoded.koperasi_id,
                //         id_ao: decoded.id,
                //         id_loan: android_collection.id_loan,
                //         id_member: android_collection.id_member
                //     }
                // }).then(async (data_simpanan) => {
                //     if (data_simpanan) {
                //         simpanan_wajib.simpanan_wajib = android_collection.simpanan_wajib + data_simpanan.simpanan_wajib;
                //         simpanan_wajib.desc = "Setoran";
                //
                //         await TblSimpananWajib.update(simpanan_wajib, {
                //             where: {
                //                 id_koperasi: decoded.koperasi_id,
                //                 id_ao: decoded.id,
                //                 id_loan: android_collection.id_loan,
                //                 id_member: android_collection.id_member
                //             },
                //             transaction: t
                //         });
                //     } else {
                //         simpanan_wajib.simpanan_wajib = android_collection.simpanan_wajib;
                //         simpanan_wajib.desc = "Setoran";
                //
                //         await TblSimpananWajib.create(simpanan_wajib, {
                //             where: {
                //                 id_koperasi: decoded.koperasi_id,
                //                 id_ao: decoded.id,
                //                 id_loan: android_collection.id_loan,
                //                 id_member: android_collection.id_member
                //             },
                //             transaction: t
                //         });
                //     }
                // });


                /*----------------- CREATE/UPDATE SIMPANAN SUKARELA---------------*/
                var simpanan_sukarela = {};
                simpanan_sukarela.id_koperasi = decoded.koperasi_id;
                simpanan_sukarela.id_ao = decoded.id;
                simpanan_sukarela.id_loan = android_collection.id_loan;
                simpanan_sukarela.id_member = android_collection.id_member;
                simpanan_sukarela.id_collection = android_collection.id;

                simpanan_sukarela.simpanan_sukarela = android_collection.simpanan_sukarela;
                simpanan_sukarela.desc = body.bayar_dengan_simpanan === 0 ? "Setoran" : "Cicilan";

                //1. check last total and last updatedDate
                const lastTotalSimpananSukarela = await TblSimpananSukarela.findOne({
                    attributes: ['total_simpanan'],
                    where: {
                        id_koperasi : decoded.koperasi_id,
                        id_member : android_collection.id_member,
                        id_loan : android_collection.id_loan
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                });

                console.log("### lastTotalSimpananSukarela " + lastTotalSimpananSukarela.total_simpanan);

                const lastUpdateDateSimpananSukarela = await TblSimpananSukarela.findOne({
                    attributes: ['updatedAt'],
                    where: {
                        id_koperasi: decoded.koperasi_id,
                        id_ao: decoded.id,
                        id_loan: android_collection.id_loan,
                        id_member: android_collection.id_member
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                });

                console.log("### lastUpdateDateSimpananSukarela " + lastUpdateDateSimpananSukarela);


                //2. update total_saldo where last updatedDate is similar with before
                if (!lastTotalSimpananSukarela) {
                    simpanan_sukarela.total_simpanan = simpanan_sukarela.simpanan_sukarela;
                } else {
                    if (simpanan_sukarela.desc === "Setoran") {
                        simpanan_sukarela.total_simpanan = lastTotalSimpananSukarela.total_simpanan + simpanan_sukarela.simpanan_sukarela
                    } else {
                        //TODO : lakukan pengecekan priirity pengurangan simpanan dari parameter disini
                        simpanan_sukarela.total_simpanan = lastTotalSimpananSukarela.total_simpanan - simpanan_sukarela.simpanan_sukarela
                    }
                }

                let conditionSimpananSukarela = {where: {}};
                conditionSimpananSukarela.where.id_koperasi = decoded.koperasi_id;
                conditionSimpananSukarela.where.id_ao = decoded.id;
                conditionSimpananSukarela.where.id_loan = android_collection.id_loan;
                conditionSimpananSukarela.where.id_member = android_collection.id_member;
                if (lastUpdateDateSimpananSukarela !== null) {
                    conditionSimpananSukarela.where.updatedAt = lastUpdateDateSimpananSukarela;  //optimistic lock should be working well when update same column
                }

                await TblSimpananSukarela.create(simpanan_sukarela, {
                    conditionSimpananSukarela,
                    transaction: t
                });

                // await TblSimpananSukarela.findOne({
                //     where: {
                //         id_koperasi: decoded.koperasi_id,
                //         id_ao: decoded.id,
                //         id_loan: android_collection.id_loan,
                //         id_member: android_collection.id_member
                //     }
                // }).then(async (data_simpanan) => {
                //     if (data_simpanan) {
                //         simpanan_sukarela.simpanan_sukarela = android_collection.simpanan_sukarela + data_simpanan.simpanan_sukarela;
                //         simpanan_sukarela.desc = "Setoran";
                //
                //         await TblSimpananSukarela.update(simpanan_sukarela, {
                //             where: {
                //                 id_koperasi: decoded.koperasi_id,
                //                 id_ao: decoded.id,
                //                 id_loan: android_collection.id_loan,
                //                 id_member: android_collection.id_member
                //             },
                //             transaction: t
                //         });
                //     } else {
                //         simpanan_sukarela.simpanan_sukarela = android_collection.simpanan_sukarela;
                //         simpanan_sukarela.desc = "Setoran";
                //
                //         await TblSimpananSukarela.create(simpanan_sukarela, {
                //             where: {
                //                 id_koperasi: decoded.koperasi_id,
                //                 id_ao: decoded.id,
                //                 id_loan: android_collection.id_loan,
                //                 id_member: android_collection.id_member
                //             },
                //             transaction: t
                //         });
                //     }
                // });


                /* --------------- Generate NEXT collection from System --------------*/

                var next_collection = {
                    id_koperasi: decoded.koperasi_id,
                    id_produk: android_collection.id_produk,
                    nama_produk: android_collection.nama_produk,
                    id_member: body.id_member,
                    nama_lengkap: android_collection.nama_lengkap,
                    id_loan: android_collection.id_loan,
                    simpanan_wajib: android_collection.simpanan_wajib,
                    created_by: "system"
                };

                if (android_collection.status_pembayaran === "sebagian") {
                    next_collection.pokok = record_collection.pokok - android_collection.pokok;
                    next_collection.bunga = record_collection.bunga - android_collection.bunga;
                    next_collection.angsuran = android_collection.angsuran;
                    next_collection.pembayaran_ke = android_collection.pembayaran_ke + 1;
                } else {
                    next_collection.pokok = android_collection.pokok;
                    next_collection.bunga = android_collection.bunga;
                    next_collection.angsuran = android_collection.angsuran + 1;
                    next_collection.pembayaran_ke = 1;
                }


                var pengali;
                switch (loan_satuan_tenor) {
                    case "Bulan":
                        pengali = hari_per_bulan;
                        break;
                    case "Minggu":
                        pengali = 7;
                        break;
                    default:
                        pengali = 1;
                        break
                }

                var start_date_iso = new Date(record_collection.loan_due_date).getTime();
                var next_due_date_iso = new Date(start_date_iso + pengali * 24 * 60 * 60 * 1000).toISOString();
                var new_denda = 0;

                //TODO uncomment feature ini nanti !!
                //hitung berapa hari telat dari tgl collection ke due date
                /*var jlh_telat = dateDiffInDays(android_collection.loan_due_date, android_collection.loan_payment_date);*/

                var jlh_telat = 1;

                //Sudah melewati Grace Period
                if (jlh_telat >= id_masa_tenggang) {
                    if (type_denda_keterlambatan === "Fix") {
                        new_denda = denda_keterlambatan * jlh_telat;
                    } else {
                        // 1: Angsuran (Pokok Pinjaman + Bunga);
                        // 2: Pokok Pinjaman
                        if (id_dasar_denda === 1) {
                            new_denda = (denda_keterlambatan / 100) * (next_collection.pokok + next_collection.bunga) * jlh_telat
                        } else if (id_dasar_denda === 2) {
                            new_denda = (denda_keterlambatan / 100) * (next_collection.pokok) * jlh_telat
                        }
                    }
                }

                next_collection.denda = new_denda; //calculate fines here
                next_collection.loan_due_date = next_due_date_iso;
                next_collection.total_tagihan = next_collection.pokok + next_collection.bunga + next_collection.simpanan_wajib + next_collection.denda;

                await TblLoanCollection.create(next_collection, {
                    transaction: t
                });


                /* --------------------------------- COMMIT TRANSACTION -------------------------------*/

                await t.commit();

                return res.status(201).json({
                    status: 201,
                    data: {},
                    message: "Success add collection and generate new collection"
                });
            });

        } catch (err) {
            await t.rollback();

            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    const view_member_collection = async (req, res) => {
        let condition = {where: {}};
        const {body, decoded} = req;

        try {
            var id_koperasi = decoded.koperasi_id;
            var id_member = body.id_member;

            if (req.body.angsuran !== undefined) {
                condition.where.id_member = body.id_member;
                condition.where.id_koperasi = id_koperasi;
                condition.where.angsuran = body.angsuran;
                condition.where.created_by = "system";
                await TblLoanCollection.findOne(condition)
                    .then(async (collection) => {
                        if (collection) {
                            return res.status(200).json({
                                status: 200,
                                data: collection,
                                message: ""
                            });
                        } else {
                            return res.status(200).json({
                                status: 404,
                                data: {},
                                message: "Data tidak ditemukan"
                            });
                        }
                    });
            } else {
                condition.where.id_member = body.id_member;
                condition.where.id_koperasi = id_koperasi;
                condition.where.created_by = "system";
                await TblLoanCollection.findAll(condition)
                    .then(async (collection) => {
                        if (collection) {
                            return res.status(200).json({
                                status: 200,
                                data: collection,
                                message: ""
                            });
                        } else {
                            return res.status(200).json({
                                status: 404,
                                data: {},
                                message: "Data tidak ditemukan"
                            });
                        }
                    });
            }
        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    };

    const list = async (req, res) => {
        let condition = {where: {}};
        const {decoded} = req;

        try {
            condition.where.id_koperasi = decoded.koperasi_id;
            condition.where.created_by = "system";

            await TblLoanCollection.findAll(condition)
                .then(async (collection) => {
                    if (collection) {
                        return res.status(200).json({
                            status: 200,
                            data: collection,
                            message: ""
                        });
                    } else {
                        return res.status(200).json({
                            status: 404,
                            data: {},
                            message: "Data tidak ditemukan"
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

    const update_status = async (req, res) => {
        const {body, decoded} = req;

        try {
            var id_koperasi = decoded.koperasi_id;
            var id_ao = decoded.id;
            var id_member = body.id_member;

            var data = {
                id_status: body.id_status
            };

            data.desc_status = "Identified Later";

            await TblLoan.update(data, {
                where: {
                    id_koperasi: id_koperasi,
                    id_ao: id_ao,
                    id_member: id_member
                }
            }).then((updated) => {
                if (updated) {
                    return res.status(200).json({
                        status: 200,
                        data: {},
                        message: "Data updated successfully"
                    });
                } else {
                    return res.status(200).json({
                        status: 400,
                        data: {},
                        message: "Failed update data"
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
        add,
        view_member_collection,
        update_status,
        list
    };
};

module.exports = TblLoanCollectionController;
