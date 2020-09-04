const TblLoan = require('../models/v2/TblLoan');
const AccountRoleManagement = require('../models/v2/AccountRoleManagement');
const LoanProduct = require('../models/v2/LoanProduct');
const Member = require('../models/Member');
const User = require('../models/User');

const {Op} = require("sequelize");

const TblLoanController = () => {

    const add = async (req, res) => {
        const {body, decoded} = req;

        var jumlah_pengajuan = body.jumlah_pengajuan;
        var jumlah_pencairan = body.jumlah_pencairan;
        var code_pengajuan;
        var desc_pengajuan;
        var code_pencairan;
        var desc_pencairan;

        try {
            var data = {
                id_produk: body.id_produk,
                id_koperasi: decoded.koperasi_id,
                id_member: body.id_member,
                id_ao: decoded.id,
                id_status: body.id_status,
                jumlah_pencairan: body.jumlah_pencairan,
                jumlah_pengajuan: body.jumlah_pengajuan,
                jumlah_cicilan: body.jumlah_cicilan
            };

            await TblLoan.create(data).then(async (loan) => {
                if (loan) {

                    // Cek Syarat Persetujuan Pinjaman
                    if (jumlah_pengajuan <= 10000000) {
                        if (jumlah_pengajuan <= 1000000) { //approve_max_1jt
                            await AccountRoleManagement.findOne({
                                attributes: ['approve_max_1jt'],
                                where: {id_user: body.id_ao}
                            }).then((approveStatus) => {
                                if (approveStatus.approve_max_1jt !== 1) {
                                    code_pengajuan = 1002;
                                    desc_pengajuan = "Jumlah Persetujuan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi";
                                } else {
                                    code_pengajuan = 1001;
                                    desc_pengajuan = "Apakah Anda akan menyetujui pinjaman sebesar Rp." + jumlah_pengajuan
                                }
                            });
                        } else if (jumlah_pengajuan <= 5000000) { //approve_max_5jt
                            await AccountRoleManagement.findOne({
                                attributes: ['approve_max_5jt'],
                                where: {id_user: body.id_ao}
                            }).then((approveStatus) => {
                                if (approveStatus.approve_max_5jt !== 1) {
                                    code_pengajuan = 1002;
                                    desc_pengajuan = "Jumlah Persetujuan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi";
                                } else {
                                    code_pengajuan = 1001;
                                    desc_pengajuan = "Apakah Anda akan menyetujui pinjaman sebesar Rp." + jumlah_pengajuan;
                                }
                            });
                        } else {  //approve_max_10jt
                            await AccountRoleManagement.findOne({
                                attributes: ['approve_max_10jt'],
                                where: {id_user: body.id_ao}
                            }).then((approveStatus) => {
                                if (approveStatus.approve_max_10jt !== 1) {
                                    code_pengajuan = 1002;
                                    desc_pengajuan = "Jumlah Persetujuan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi";
                                } else {
                                    code_pengajuan = 1001;
                                    desc_pengajuan = "Apakah Anda akan menyetujui pinjaman sebesar Rp." + jumlah_pengajuan;
                                }
                            });
                        }
                    } else {
                        //approve_more_10jt
                        await AccountRoleManagement.findOne({
                            attributes: ['approve_more_10jt'],
                            where: {id_user: body.id_ao}
                        }).then((approveStatus) => {
                            if (approveStatus.approve_more_10jt !== 1) {
                                code_pengajuan = 1002;
                                desc_pengajuan = "Jumlah Pencairan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi"
                            } else {
                                code_pengajuan = 1001;
                                desc_pengajuan = "Apakah Anda akan menyetujui Pencairan pinjaman sebesar Rp." + jumlah_pengajuan
                            }
                        });
                    }

                    // Cek Syarat Pencairan Pinjaman
                    if (jumlah_pencairan <= 10000000) {
                        if (jumlah_pencairan <= 5000000) { //disburse_max_5jt
                            await AccountRoleManagement.findOne({
                                attributes: ['disburse_max_5jt'],
                                where: {id_user: body.id_ao}
                            }).then((approveStatus) => {
                                if (approveStatus.disburse_max_5jt !== 1) {
                                    code_pencairan = 1002;
                                    desc_pencairan = "Jumlah Pencairan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi";
                                } else {
                                    code_pencairan = 1001;
                                    desc_pencairan = "Apakah Anda akan menyetujui Pencairan pinjaman sebesar Rp." + jumlah_pengajuan;
                                }
                            });
                        } else {  //disburse_max_10jt
                            await AccountRoleManagement.findOne({
                                attributes: ['disburse_max_10jt'],
                                where: {id_user: body.id_ao}
                            }).then((approveStatus) => {
                                if (approveStatus.disburse_max_10jt !== 1) {
                                    code_pencairan = 1002;
                                    desc_pencairan = "Jumlah Pencairan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi";
                                } else {
                                    code_pencairan = 1001;
                                    desc_pencairan = "Apakah Anda akan menyetujui Pencairan pinjaman sebesar Rp." + jumlah_pengajuan;
                                }
                            });
                        }
                    } else {
                        //disburse_more_10jt
                        await AccountRoleManagement.findOne({
                            attributes: ['disburse_more_10jt'],
                            where: {id_user: body.id_ao}
                        }).then((approveStatus) => {
                            if (approveStatus.disburse_more_10jt !== 1) {
                                code_pencairan = 1002;
                                desc_pencairan = "Jumlah Pencairan diluar dari kriteria, proses Persetujuan pinjaman akan dilakukan oleh Admin Koperasi"
                            } else {
                                code_pencairan = 1001;
                                desc_pencairan = "Apakah Anda akan menyetujui Pencairan pinjaman sebesar Rp." + jumlah_pengajuan
                            }
                        });
                    }


                    return res.status(201).json({
                        status: 201,
                        data: {
                            code_pengajuan: code_pengajuan,
                            desc_pengajuan: desc_pengajuan,
                            code_pencairan: code_pencairan,
                            desc_pencairan
                        },
                        message: "Succeed create loan"
                    });
                } else {
                    return res.status(200).json({
                        status: 400,
                        data: {
                            code_pengajuan: code_pengajuan,
                            desc_pengajuan: desc_pengajuan,
                            code_pencairan: code_pencairan,
                            desc_pencairan
                        },
                        message: "Failed create loan"
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


    const view = async (req, res) => {
        const {body, decoded} = req;

        try {
            var id_koperasi = decoded.koperasi_id;
            var id_ao = decoded.id;
            var id_member = body.id_member;
            var id_status = body.id_status;

            await TblLoan.findOne({
                where: {
                    id_koperasi: id_koperasi,
                    id_ao: id_ao,
                    id_member: id_member,
                    id_status: id_status
                }
            }).then(async (detailPinjaman) => {
                if (detailPinjaman) {
                    await LoanProduct.findOne({
                        attributes: ['nama_produk'],
                        where: {id: detailPinjaman.id_produk}
                    }).then((produkPinjaman) => {
                        if (produkPinjaman) {
                            return res.status(200).json({
                                status: 200,
                                data: {
                                    produkPinjaman,
                                    detailPinjaman
                                },
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

    const list = async (req, res) => {
        const {body, decoded} = req;

        try {
            var id_koperasi = decoded.koperasi_id;
            // var id_ao = decoded.id;
            // var id_member = body.id_member;
            // var id_status = body.id_status;

            /*TblLoan.belongsToMany(Member, {through: 'member_id'});
            Member.belongsToMany(TblLoan, {through: 'id_member'});

            Member.belongsToMany(User, {through: 'id'});
            User.belongsToMany(Member, {through: 'member_id'});*/

/*            TblLoan.hasMany(Member, {
                foreignKey: 'member_id'
            });*/
            // TblLoan.belongsTo(Member);

            TblLoan.hasOne(User, {
              foreignKey:'id'
            });
            // User.belongsTo(TblLoan);

            await TblLoan.findAll({
                where: {id_koperasi: id_koperasi},
                include: [
                    /*{
                        model: Member, attributes: ['nama_lengkap'], required: true

                    },*/
                    {
                        model: User, attributes: ['fullname'], required: true

                    },
                    // {model: User, attributes: ['fullname'], required:true}
                ]
            }).then((loan) => {
                return res.status(200).json({
                    status: 200,
                    data: {loan},
                    message: "Data updated successfully"
                });
            });


            /*await TblLoan.update(data, {
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
            });*/
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
        view,
        update_status,
        list
    };
};

module.exports = TblLoanController;
