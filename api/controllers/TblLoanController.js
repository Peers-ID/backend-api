const TblLoan = require('../models/v2/TblLoan');
const TblSimpanan = require('../models/v2/TblSimpanan');
const AccountRoleManagement = require('../models/v2/AccountRoleManagement');
const LoanProduct = require('../models/v2/LoanProduct');
const Member = require('../models/Member');
const User = require('../models/User');
const Status = require('../models/v2/MstStatus');
const TblLoanCollection = require('../models/v2/TblLoanCollection');
const LoanParameter = require('../models/v2/LoanParameter');
const sequelize = require('../../config/database');

const {Op} = require("sequelize");

const TblLoanController = () => {

    const add = async (req, res) => {
        const {body, decoded} = req;
        const t = await sequelize.transaction();

        try {

            var data = {
                id_produk: body.id_produk,
                id_koperasi: decoded.koperasi_id,
                id_member: body.id_member,
                id_ao: decoded.id,
                jumlah_pencairan: body.jumlah_pencairan,
                jumlah_pengajuan: body.jumlah_pengajuan,
                jumlah_cicilan: body.jumlah_cicilan,
                utang_pokok: body.utang_pokok,
                bunga_pinjaman: body.bunga_pinjaman
            };

            var jumlah_pengajuan = body.jumlah_pengajuan;
            var jumlah_pencairan = body.jumlah_pencairan;
            var code_pengajuan = 0;
            var desc_pengajuan;
            var code_pencairan;
            var desc_pencairan;
            var loan_tenor;
            var loan_satuan_tenor = "Bulan";
            var hari_per_bulan = 30;
            var simpanan_wajib;
            var simpanan_pokok;
            var id_status = 0;

            /* ------------------------- CHECK ACTIVE LOAN --------------------------*/
            await TblLoan.findAndCountAll({
                attributes:['id_member'],
                where: {
                    id_koperasi: decoded.koperasi_id,
                    id_member: body.id_member,
                    desc_status: 'active'
                }
            }).then(async (data) => {
                console.log("####--1 " + data.count);
                if (data.count > 0) {
                    await t.rollback();

                    return res.status(200).json({
                        status: 500,
                        data: "",
                        message: "Tidak bisa mengajukan karena status pinjaman masih Aktif"
                    });
                } else {

                }
            });


            /* ------------------------- GET PRODUCT --------------------------*/
            await LoanProduct.findOne({
                where: {
                    id: body.id_produk
                }
            }).then(async (produk) => {
                await LoanParameter.findOne({
                    attributes: ['hari_per_bulan'],
                    where: {
                        id: produk.id_parameter
                    }
                }).then((parameter) => {
                    hari_per_bulan = parameter.hari_per_bulan
                });

                data.nama_produk = produk.nama_produk;
                loan_tenor = produk.tenor;
                loan_satuan_tenor = produk.satuan_tenor;
                simpanan_wajib = produk.simpanan_wajib;
                simpanan_pokok = produk.simpanan_pokok;
            });

            /* ------------------------- GET MEMBER --------------------------*/
            await Member.findOne({
                attributes: ['nama_lengkap'],
                where: {
                    member_id: body.id_member
                }
            }).then((member) => {
                data.nama_member = member.nama_lengkap
            });


            /* ------------------------- GET USER AO --------------------------*/
            await User.findOne({
                attributes: ['fullname'],
                where: {
                    id: decoded.id
                }
            }).then((user) => {
                data.nama_ao = user.fullname
            });


            /* ------------------------- CEK SYARAT PERSETUJUAN PINJAMAN --------------------------*/
            if (jumlah_pengajuan <= 10000000) {
                if (jumlah_pengajuan <= 1000000) { //approve_max_1jt
                    await AccountRoleManagement.findOne({
                        attributes: ['approve_max_1jt'],
                        where: {id_user: decoded.id}
                    }).then((approveStatus) => {
                        if (approveStatus.approve_max_1jt !== 1) {
                            code_pengajuan = 1002;
                            desc_pengajuan = "Jumlah Persetujuan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi";
                            id_status = 7; //Menunggu Persetujuan Admin
                        } else {
                            code_pengajuan = 1001;
                            desc_pengajuan = "Apakah Anda akan menyetujui pinjaman sebesar Rp." + jumlah_pengajuan;
                            id_status = 0; //Default, Anggota Hanya Terdaftar
                        }
                    });
                } else if (jumlah_pengajuan <= 5000000) { //approve_max_5jt
                    await AccountRoleManagement.findOne({
                        attributes: ['approve_max_5jt'],
                        where: {id_user: decoded.id}
                    }).then((approveStatus) => {
                        if (approveStatus.approve_max_5jt !== 1) {
                            code_pengajuan = 1002;
                            desc_pengajuan = "Jumlah Persetujuan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi";
                            id_status = 7; //Menunggu Persetujuan Admin
                        } else {
                            code_pengajuan = 1001;
                            desc_pengajuan = "Apakah Anda akan menyetujui pinjaman sebesar Rp." + jumlah_pengajuan;
                            id_status = 0; //Default, Anggota Hanya Terdaftar
                        }
                    });
                } else {  //approve_max_10jt
                    await AccountRoleManagement.findOne({
                        attributes: ['approve_max_10jt'],
                        where: {id_user: decoded.id}
                    }).then((approveStatus) => {
                        if (approveStatus.approve_max_10jt !== 1) {
                            code_pengajuan = 1002;
                            desc_pengajuan = "Jumlah Persetujuan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi";
                            id_status = 7; //Menunggu Persetujuan Admin
                        } else {
                            code_pengajuan = 1001;
                            desc_pengajuan = "Apakah Anda akan menyetujui pinjaman sebesar Rp." + jumlah_pengajuan;
                            id_status = 0; //Default, Anggota Hanya Terdaftar
                        }
                    });
                }
            } else {
                //approve_more_10jt
                await AccountRoleManagement.findOne({
                    attributes: ['approve_more_10jt'],
                    where: {id_user: decoded.id}
                }).then((approveStatus) => {
                    if (approveStatus.approve_more_10jt !== 1) {
                        code_pengajuan = 1002;
                        desc_pengajuan = "Jumlah Pencairan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi"
                        id_status = 7; //Menunggu Persetujuan Admin
                    } else {
                        code_pengajuan = 1001;
                        desc_pengajuan = "Apakah Anda akan menyetujui Pencairan pinjaman sebesar Rp." + jumlah_pengajuan;
                        id_status = 0; //Default, Anggota Hanya Terdaftar
                    }
                });
            }


            if (code_pengajuan === 1001) {
                /* ------------------------- CEK SYARAT PENCAIRAN PINJAMAN --------------------------*/
                if (jumlah_pencairan <= 10000000) {
                    if (jumlah_pencairan <= 5000000) { //disburse_max_5jt
                        await AccountRoleManagement.findOne({
                            attributes: ['disburse_max_5jt'],
                            where: {id_user: decoded.id}
                        }).then((approveStatus) => {
                            if (approveStatus.disburse_max_5jt !== 1) {
                                code_pencairan = 1002;
                                desc_pencairan = "Jumlah Pencairan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi";
                                id_status = 2; //Menunggu Pencairan Admin
                            } else {
                                code_pencairan = 1001;
                                desc_pencairan = "Apakah Anda akan menyetujui Pencairan pinjaman sebesar Rp." + jumlah_pengajuan;
                                id_status = 1; //Dicairkan Oleh AO/CMO/Sales (Pinjaman Aktif)
                            }
                        });
                    } else {  //disburse_max_10jt
                        await AccountRoleManagement.findOne({
                            attributes: ['disburse_max_10jt'],
                            where: {id_user: decoded.id}
                        }).then((approveStatus) => {
                            if (approveStatus.disburse_max_10jt !== 1) {
                                code_pencairan = 1002;
                                desc_pencairan = "Jumlah Pencairan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi";
                                id_status = 2; //Menunggu Pencairan Admin
                            } else {
                                code_pencairan = 1001;
                                desc_pencairan = "Apakah Anda akan menyetujui Pencairan pinjaman sebesar Rp." + jumlah_pengajuan;
                                id_status = 1; //Dicairkan Oleh AO/CMO/Sales (Pinjaman Aktif)
                            }
                        });
                    }
                } else {
                    //disburse_more_10jt
                    await AccountRoleManagement.findOne({
                        attributes: ['disburse_more_10jt'],
                        where: {id_user: decoded.id}
                    }).then((approveStatus) => {
                        if (approveStatus.disburse_more_10jt !== 1) {
                            code_pencairan = 1002;
                            desc_pencairan = "Jumlah Pencairan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi"
                            id_status = 2; //Menunggu Pencairan Admin
                        } else {
                            code_pencairan = 1001;
                            desc_pencairan = "Apakah Anda akan menyetujui Pencairan pinjaman sebesar Rp." + jumlah_pengajuan;
                            id_status = 1; //Dicairkan Oleh AO/CMO/Sales (Pinjaman Aktif)
                        }
                    });
                }
            } else {
                code_pencairan = 1002;
                desc_pencairan = "Proses Pencairan Tidak Dapat Dilanjutkan";
            }


            /* ------------------------- GET STATUS LOAN --------------------------*/
            await Status.findOne({
                attributes: ['desc_status'],
                where: {
                    id: id_status
                }
            }).then((status) => {
                data.nama_status = status.desc_status;
            });

            data.id_status = id_status;
            data.desc_status = "active";
            if (id_status === 1) {
                data.approved_by = "AO/CMO/Sales";
                data.disbursed_by = "AO/CMO/Sales";
            } else if (id_status === 2) {
                data.approved_by = "AO/CMO/Sales";
            }


            /*----------------- CREATE LOAN ---------------*/
            const loan = await TblLoan.create(data, {
                transaction: t
            });

            /*----------------- CREATE SIMPANAN ---------------*/
            var simpanan = {
                id_koperasi: decoded.koperasi_id,
                id_ao: decoded.id,
                id_loan: loan.id,
                id_member: loan.id_member,
                simpanan_pokok: simpanan_pokok
            };

            await TblSimpanan.create(simpanan, {
                transaction: t
            });


            /*----------------- CREATE COLLECTION DATA ---------------*/
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

            await TblLoanCollection.findOne({
                where: {
                    id_produk: loan.id_produk,
                    id_member: loan.id_member
                }
            }).then(async (collection_data) => {
                var start_date_iso;
                if (collection_data === null) {
                    start_date_iso = Date.now();
                } else {
                    start_date_iso = new Date(collection_data.loan_due_date).getTime();
                }

                var due_date_iso = new Date(start_date_iso + pengali * 24 * 60 * 60 * 1000).toISOString();
                var total_tagihan = loan.utang_pokok + loan.bunga_pinjaman + simpanan_wajib;
                var collection = {
                    id_koperasi: decoded.koperasi_id,
                    id_produk: body.id_produk,
                    nama_produk: data.nama_produk,
                    id_member: body.id_member,
                    nama_lengkap: data.nama_member,
                    id_loan: loan.id,
                    loan_due_date: due_date_iso,
                    angsuran: 1,
                    pembayaran_ke: 1,
                    pokok: loan.utang_pokok,
                    bunga: loan.bunga_pinjaman,
                    simpanan_wajib: simpanan_wajib,
                    total_tagihan: total_tagihan,
                    created_by: "system"
                };

                await TblLoanCollection.create(collection, {
                    transaction: t
                });
            });

            await t.commit();

            /*----------------- END OF CREATE COLLECTION DATA ---------------*/
            return res.status(201).json({
                status: 201,
                data: {
                    code_pengajuan: code_pengajuan,
                    desc_pengajuan: desc_pengajuan,
                    code_pencairan: code_pencairan,
                    desc_pencairan
                },
                message: "Succeed create loans "
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

    const update_loan_status = async (req, res) => {
        const {body, decoded} = req;

        try {
            var id_koperasi = decoded.koperasi_id;
            var id_ao = decoded.id;
            var id_member = body.id_member;
            var id_status = body.id_status;
            var id_loan = body.id_loan;
            var data = {};

            /* ------------------------- STATUS LOAN --------------------------*/
            await Status.findOne({
                attributes: ['desc_status'],
                where: {
                    id: id_status
                }
            }).then((status) => {
                data.nama_status = status.desc_status;
            });

            data.id_status = id_status;

            switch (id_status) {
                case 1: //-> Dicairkan Oleh AO/CMO/Sales (Pinjaman Aktif)
                    data.desc_status = "active";
                    data.approved_by = "AO/CMO/Sales";
                    data.disbursed_by = "AO/CMO/Sales";
                    break;
                case 2: //-> Menunggu Pencairan Admin = (Disetujui Oleh AO/CMO/Sales)
                    data.desc_status = "active";
                    data.approved_by = "AO/CMO/Sales";
                    break;
                case 3: //-> Disetujui Admin
                    data.desc_status = "active";
                    data.approved_by = "Admin Koperasi";
                    break;
                case 4: // -> Pencairan Admin di Kantor (Muncul di status Anggota pada Android, sebagai informasi supaya borrower datang ke Kantor)
                    data.desc_status = "active";
                    data.approved_by = "Admin Koperasi";
                    break;
                case 5: // -> Dicairkan Oleh Admin  (Pinjaman Aktif)
                    data.desc_status = "active";
                    data.disbursed_by = "Admin Koperasi";
                    break;
                case 6: // -> Menunggu Pencairan AO/CMO/Sales (Muncul di menu pencairan Android)
                    data.desc_status = "active";
                    data.approved_by = "Admin Koperasi";
                    break;
                case 7: // -> Menunggu Persetujuan Admin
                    data.desc_status = "active";
                    break;
                case 8: // -> Ditolak Admin
                    data.desc_status = "inactive";
                    break;
                case 9: // -> Pinjaman Tidak Aktif
                    data.desc_status = "inactive";
                    break;
            }

            await TblLoan.update(data, {
                where: {
                    id_koperasi: id_koperasi,
                    id_ao: id_ao,
                    id_member: id_member,
                    id: id_loan
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


    const list_per_ao = async (req, res) => {
        const {decoded} = req;

        try {
            var id_koperasi = decoded.koperasi_id;
            var id_ao = decoded.id;

            await TblLoan.findAll({
                where: {
                    id_koperasi: id_koperasi,
                    id_ao: id_ao
                },
            }).then((loan) => {
                return res.status(200).json({
                    status: 200,
                    data: loan,
                    message: ""
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

    const view_per_member = async (req, res) => {
        const {id_member} = req.params;

        try {
            await TblLoan.findAll({
                where: {
                    id_member: id_member
                },
            }).then((loan) => {
                if (loan.length > 0) {
                    return res.status(200).json({
                        status: 200,
                        data: loan,
                        message: ""
                    });
                } else {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Data Not Found"
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

    const view_pending_loan = async (req, res) => {
        const {id_koperasi} = req.params;

        try {
            await TblLoan.findAll({
                where: {
                    id_koperasi: id_koperasi,
                    id_status: {
                        [Op.or]: [2, 7]
                    }
                },
            }).then((loan) => {
                if (loan.length > 0) {
                    return res.status(200).json({
                        status: 200,
                        data: loan,
                        message: ""
                    });
                } else {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Data Not Found"
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

    const view_member_status = async (req, res) => {
        const {id_koperasi, id_ao} = req.params;

        try {
            await TblLoan.findAll({
                where: {
                    id_koperasi: id_koperasi,
                    id_ao: id_ao,
                    id_status: {
                        [Op.or]: [1, 3, 4, 5, 6, 8]
                    }
                },
            }).then((loan) => {
                if (loan.length > 0) {
                    return res.status(200).json({
                        status: 200,
                        data: loan,
                        message: ""
                    });
                } else {
                    return res.status(200).json({
                        status: 404,
                        data: "",
                        message: "Data Not Found"
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
        update_loan_status,
        list_per_ao,
        view_per_member,
        view_pending_loan, //muncul di halaman pending persetujuan dan pending pencairan Dashboard
        view_member_status //muncul di menu Anggota pada Android
    };
};

module.exports = TblLoanController;
