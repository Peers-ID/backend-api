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

        let loan_satuan_tenor;
        let tenor;
        let hari_per_bulan;
        let id_angsuran_sebagian;
        let type_denda_keterlambatan;
        let denda_keterlambatan;
        let id_dasar_denda;
        let id_masa_tenggang;
        let nama_produk;
        let nama_lengkap;


        let date_now_string = new Date(Date.now()).toISOString();

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
                attributes: ['nama_lengkap'],
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
            }).then(async (previous_system_collection) => {

                //check parameter and product
                await LoanProduct.findOne({
                    where: {
                        id: previous_system_collection.id_produk
                    }
                }).then(async (produk) => {
                    loan_satuan_tenor = produk.satuan_tenor;
                    tenor = produk.tenor;
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

                collection.id_produk = previous_system_collection.id_produk;
                collection.nama_produk = nama_produk;
                collection.nama_lengkap = nama_lengkap;
                collection.id_loan = previous_system_collection.id_loan;
                collection.total_tagihan = previous_system_collection.total_tagihan;
                collection.loan_due_date = previous_system_collection.loan_due_date;
                collection.denda = body.denda;

                if (body.setoran >= previous_system_collection.total_tagihan - body.simpanan_wajib) {
                    collection.status_pembayaran = "lunas";
                    collection.pokok = body.utang_pokok;
                    collection.bunga = body.bunga_pinjaman;
                    collection.simpanan_wajib = body.simpanan_wajib;

                    if (body.setoran >= previous_system_collection.total_tagihan) {
                        collection.simpanan_sukarela = body.simpanan_sukarela + (body.setoran - previous_system_collection.total_tagihan)
                    } else {
                        collection.simpanan_sukarela = body.simpanan_sukarela
                    }
                } else {
                    collection.status_pembayaran = "sebagian";

                    //1: Mengurangi Pokok; 2: Mengurangi Bunga
                    if (id_angsuran_sebagian === 1) {

                        if (collection.setoran >= collection.pokok) {
                            if (previous_system_collection.pokok === 0) {
                                if (collection.setoran >= previous_system_collection.bunga) {
                                    let sisa_angsuran = collection.setoran - previous_system_collection.bunga;

                                    collection.bunga = previous_system_collection.bunga;

                                    if (sisa_angsuran >= previous_system_collection.denda) {
                                        collection.denda = 0;
                                        collection.simpanan_sukarela = sisa_angsuran - previous_system_collection.denda
                                    } else {
                                        collection.denda = previous_system_collection.denda
                                        collection.simpanan_sukarela = sisa_angsuran
                                    }
                                    collection.status_pembayaran = "lunas";
                                }
                            } else {
                                collection.bunga = collection.setoran - previous_system_collection.pokok;
                                collection.pokok = previous_system_collection.pokok;
                            }
                        } else {
                            collection.pokok = previous_system_collection.pokok - collection.setoran;
                            collection.bunga = previous_system_collection.bunga
                        }
                    } else if (id_angsuran_sebagian === 2) {

                        if (collection.setoran >= previous_system_collection.bunga) {
                            if (previous_system_collection.bunga === 0) {
                                if (collection.setoran >= previous_system_collection.pokok) {
                                    let sisa_angsuran = collection.setoran - previous_system_collection.pokok;

                                    collection.pokok = previous_system_collection.pokok;

                                    if (sisa_angsuran >= previous_system_collection.denda) {
                                        collection.denda = 0;
                                        collection.simpanan_sukarela = sisa_angsuran - previous_system_collection.denda
                                    } else {
                                        collection.denda = previous_system_collection.denda
                                        collection.simpanan_sukarela = sisa_angsuran
                                    }
                                    collection.status_pembayaran = "lunas";
                                }
                            } else {
                                collection.bunga = previous_system_collection.bunga;
                                collection.pokok = collection.setoran - previous_system_collection.bunga;
                                collection.simpanan_sukarela = body.simpanan_sukarela;
                            }
                        } else {
                            collection.bunga = previous_system_collection.bunga - collection.setoran;
                            collection.pokok = previous_system_collection.pokok;
                            collection.simpanan_sukarela = body.simpanan_sukarela;
                        }
                    }
                    collection.simpanan_wajib = 0;
                }

                //FIXME !!!!

                //RESET DENDA
                // if (collection.setoran >= previous_system_collection.denda) {
                //     collection.denda = 0
                //     collection.simpanan_sukarela = collection.setoran - previous_system_collection.denda - previous_system_collection.pokok - previous_system_collection.bunga - previous_system_collection.simpanan_wajib
                // } else {
                //     collection.denda = previous_system_collection.denda
                // }

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
                const lastTotalSimpananWajib = await TblSimpananWajib.findOne({
                    attributes: ['total_simpanan'],
                    where: {
                        id_koperasi: decoded.koperasi_id,
                        id_member: android_collection.id_member,
                        id_loan: android_collection.id_loan
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                });


                if (lastTotalSimpananWajib) {
                    console.log("### last total " + lastTotalSimpananWajib.total_simpanan);
                }

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
                if (!lastTotalSimpananWajib) { //first create
                    simpanan_wajib.total_simpanan = simpanan_wajib.simpanan_wajib;
                } else {
                    if (simpanan_wajib.desc === "Setoran") {
                        simpanan_wajib.total_simpanan = lastTotalSimpananWajib.total_simpanan + simpanan_wajib.simpanan_wajib
                    } else {
                        //TODO : lakukan pengecekan priority pengurangan simpanan dari parameter disini
                        simpanan_wajib.total_simpanan = lastTotalSimpananWajib.total_simpanan - simpanan_wajib.simpanan_wajib
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
                        id_koperasi: decoded.koperasi_id,
                        id_member: android_collection.id_member,
                        id_loan: android_collection.id_loan
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                });

                if (lastTotalSimpananSukarela) {
                    console.log("### lastTotalSimpananSukarela " + lastTotalSimpananSukarela.total_simpanan);
                }

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
                if (!lastTotalSimpananSukarela) {  //first create
                    simpanan_sukarela.total_simpanan = simpanan_sukarela.simpanan_sukarela;
                } else {
                    if (simpanan_sukarela.desc === "Setoran") {
                        simpanan_sukarela.total_simpanan = lastTotalSimpananSukarela.total_simpanan + simpanan_sukarela.simpanan_sukarela
                    } else {
                        //TODO : lakukan pengecekan priority pengurangan simpanan dari parameter disini
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

                // don't generate next collection if loan finished
                if (previous_system_collection.angsuran < tenor) {
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

                    let new_denda = 0;
                    let start_date_iso = new Date(previous_system_collection.loan_due_date).getTime();
                    let next_due_date_iso = new Date(start_date_iso + pengali * 24 * 60 * 60 * 1000).toISOString();
                    let jlh_telat = 1;

                    next_collection.simpanan_wajib = previous_system_collection.simpanan_wajib;

                    if (android_collection.status_pembayaran === "sebagian") {
                        next_collection.pokok = previous_system_collection.pokok - android_collection.pokok;
                        next_collection.bunga = previous_system_collection.bunga - android_collection.bunga;
                        next_collection.angsuran = android_collection.angsuran;
                        next_collection.pembayaran_ke = android_collection.pembayaran_ke + 1;
                        next_collection.loan_due_date = android_collection.loan_due_date;

                    } else {
                        next_collection.pokok = body.utang_pokok;
                        next_collection.bunga = body.bunga_pinjaman;
                        next_collection.angsuran = android_collection.angsuran + 1;
                        next_collection.pembayaran_ke = 1;
                        next_collection.loan_due_date = next_due_date_iso;

                    }

                    //TODO uncomment feature ini nanti !!
                    //hitung berapa hari telat dari tgl collection ke due date
                    /*var jlh_telat = dateDiffInDays(android_collection.loan_due_date, android_collection.loan_payment_date);*/
                    jlh_telat = 1;

                    //Sudah melewati Grace Period
                    // if (jlh_telat >= id_masa_tenggang && android_collection.denda !== 0 ) {
                    //     if (type_denda_keterlambatan === "Fix") {
                    //         new_denda = denda_keterlambatan * jlh_telat;
                    //     } else {
                    //         // 1: Angsuran (Pokok Pinjaman + Bunga);
                    //         // 2: Pokok Pinjaman
                    //         if (id_dasar_denda === 1) {
                    //             //case denda keterlambatan menggunakan persen
                    //             // new_denda = (denda_keterlambatan / 100) * (next_collection.pokok + next_collection.bunga) * jlh_telat
                    //
                    //             new_denda = (denda_keterlambatan) * (next_collection.pokok + next_collection.bunga) * jlh_telat
                    //         } else if (id_dasar_denda === 2) {
                    //             //case denda keterlambatan menggunakan persen
                    //             // new_denda = (denda_keterlambatan / 100) * (next_collection.pokok) * jlh_telat
                    //
                    //             new_denda = (denda_keterlambatan) * (next_collection.pokok) * jlh_telat
                    //         }
                    //     }
                    // }

                    next_collection.denda = body.denda; //calculate fines here
                    next_collection.total_tagihan = next_collection.pokok + next_collection.bunga + next_collection.denda + next_collection.simpanan_wajib;

                    await TblLoanCollection.create(next_collection, {
                        transaction: t
                    });
                } else {
                    return res.status(200).json({
                        status: 400,
                        data: {},
                        message: "All collection already paid"
                    });
                }


                /* --------------------------------- COMMIT TRANSACTION -------------------------------*/

                await t.commit();

                return res.status(200).json({
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
