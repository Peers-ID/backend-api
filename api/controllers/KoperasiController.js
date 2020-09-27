const Koperasi = require('../models/Koperasi');
const User = require('../models/User');
const AccountRoleManagement = require('../models/v2/AccountRoleManagement');
const sequelize = require('../../config/database');
const authService = require('../services/auth.service');
const emailService = require('../services/email.service');

const { Op } = require("sequelize");

const KoperasiController = () => {
    const add = async (req, res) => {

        const {body, decoded} = req;

        var now = Date.now();
        var nama_kop = body.nama_koperasi.split(" ");
        var errorUpload = false;

        //check email
        await Koperasi.findAndCountAll({
            attributes:['email_pengurus'],
            where: {
                email_pengurus:body.email_pengurus
            }
        }).then((data) => {
           if (data.count > 0) {
               return res.status(200).json({
                   status: 500,
                   data: "",
                   message: "Alamat Email Koperasi sudah pernah terdaftar"
               });
           }
        });

        //check no HP
        await Koperasi.findAndCountAll({
            attributes:['hp_pengurus'],
            where: {
                hp_pengurus:body.hp_pengurus
            }
        }).then((data) => {
            if (data.count > 0) {
                return res.status(200).json({
                    status: 500,
                    data: "",
                    message: "No HP Koperasi sudah pernah terdaftar"
                });
            }
        });

        const data = {
            nama_koperasi: body.nama_koperasi,
            no_badan_hukum: body.no_badan_hukum,
            tgl_badan_hukum: body.tgl_badan_hukum,
            no_perubahan_anggaran_dasar: body.no_perubahan_anggaran_dasar,
            tgl_perubahan_anggaran_dasar: body.tgl_perubahan_anggaran_dasar,
            tgl_rat_terakhir: body.tgl_rat_terakhir,
            alamat: body.alamat,
            kelurahan_desa: body.kelurahan_desa,
            kecamatan: body.kecamatan,
            kabupaten: body.kabupaten,
            provinsi: body.provinsi,
            bentuk_koperasi: body.bentuk_koperasi,
            jenis_koperasi: body.jenis_koperasi,
            nama_ketua: body.nama_ketua,
            nama_sekretaris: body.nama_sekretaris,
            nama_bendahara: body.nama_bendahara,
            foto_ktp_ketua: '',
            nama_pengelola_harian: body.nama_pengelola_harian,
            jml_anggota_pria: body.jml_anggota_pria | 0,
            jml_anggota_wanita: body.jml_anggota_wanita | 0,
            total_anggota: body.total_anggota | 0,
            total_manajer: body.total_manajer | 0,
            total_karyawan: body.total_karyawan,
            no_induk_koperasi: body.no_induk_koperasi,
            status_nik: body.status_nik,
            status_grade: body.status_grade,
            jabatan: body.jabatan,
            hp_pengurus: body.hp_pengurus,
            email_pengurus: body.email_pengurus
        };

        if (req.files) {
            data.foto_ktp_ketua = 'Kop-' + nama_kop[0] + '-' + now + '.jpg';

            let fotoKtpKetua = req.files.foto_ktp_ketua;

            fotoKtpKetua.mv('/home/dev_peers_id/backend-api/pictures/koperasi/Kop-' + nama_kop[0] + '-' + now + '.jpg', function (err) {
                if (err) {
                    errorUpload = true
                }
            });
        }

        if (errorUpload) {
            return res.send({status: 500, data: "", message: "Failed to upload image!"});
        } else {
            const t = await sequelize.transaction();

            try {
                const koperasi = await Koperasi.create(data, {transaction: t});

                const user = await User.create({
                    koperasi_id: koperasi.id,
                    fullname: body.nama_koperasi,
                    phone_mobile: body.hp_pengurus,
                    birthdate: Date.now(),
                    email: body.email_pengurus,
                    password: "Peers" + body.nama_koperasi.substr(0, 1) + body.hp_pengurus.substr(-4),
                    role: "Super Admin",
                    ak_id: 0,
                    status: "active"
                }, {transaction: t});

                const role = await AccountRoleManagement.create({
                    id_koperasi: koperasi.id,
                    id_user: user.id,
                    mn_kinerja_koperasi: 1,
                    mn_pengaturan_pinjaman: 1,
                    mn_tambah_ao: 1,
                    mn_tambah_admin: 1,
                    mn_tambah_super_admin: 1,
                    mn_management_anggota: 1,
                    mn_management_pinjaman: 1

                }, {transaction: t});

                const token = authService().issue({id: user.id});

                await t.commit();

                if (user) {
                    const password = "Peers" + body.nama_koperasi.substr(0, 1) + body.hp_pengurus.substr(-4);
                    emailService().welcomeMessage(body.nama_koperasi, body.email_pengurus, password);
                }

                return res.status(201).json({
                    status: 201,
                    data: {token, user, role},
                    message: "Registered successfully"
                });

            } catch (err) {
                await t.rollback();

                return res.status(200).json({
                    status: 500,
                    data: "",
                    message: "Error Add Koperasi: " + err
                });
            }
        }
    };

    const list = async (req, res) => {
        try {
            const koperasi_list = await Koperasi.findAll();

            return res.status(200).json({
                status: 200,
                data: koperasi_list,
                message: "Success retrieve"

            });
        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: "",
                message: "Error: " + err
            });
        }
    };

    const view_by_id = async (req, res) => {
        const {id} = req.params;

        try {
            const koperasi = await Koperasi.findOne({
               where: {
                   id
               }
            });

            if (koperasi) {
                return res.status(200).json({
                    status: 200,
                    data: koperasi,
                    message: "Success retrieve"

                });
            } else {
                return res.status(200).json({
                    status: 404,
                    data: {},
                    message: "Not found"

                });
            }
        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: "",
                message: "Error: " + err
            });
        }
    };


    const edit_by_id = async (req, res) => {
        const {body} = req;
        const {id} = req.params;

        try {

            var now = Date.now();
            var nama_kop = body.nama_koperasi.split(" ");

            //check email
            await Koperasi.findAndCountAll({
                attributes:['email_pengurus'],
                where: {
                    email_pengurus:body.email_pengurus,
                    id: {[Op.not]: id}
                }
            }).then((data) => {
                if (data.count > 0) {
                    return res.status(200).json({
                        status: 500,
                        data: "",
                        message: "Alamat Email Koperasi sudah pernah terdaftar"
                    });
                }
            });

            //check no HP
            await Koperasi.findAndCountAll({
                attributes:['hp_pengurus'],
                where: {
                    hp_pengurus:body.hp_pengurus,
                    id: {[Op.not]: id}
                }
            }).then((data) => {
                if (data.count > 0) {
                    return res.status(200).json({
                        status: 500,
                        data: "",
                        message: "No HP Koperasi sudah pernah terdaftar"
                    });
                }
            });

            const data = {
                nama_koperasi: body.nama_koperasi,
                no_badan_hukum: body.no_badan_hukum,
                tgl_badan_hukum: body.tgl_badan_hukum,
                no_perubahan_anggaran_dasar: body.no_perubahan_anggaran_dasar,
                tgl_perubahan_anggaran_dasar: body.tgl_perubahan_anggaran_dasar,
                tgl_rat_terakhir: body.tgl_rat_terakhir,
                alamat: body.alamat,
                kelurahan_desa: body.kelurahan_desa,
                kecamatan: body.kecamatan,
                kabupaten: body.kabupaten,
                provinsi: body.provinsi,
                bentuk_koperasi: body.bentuk_koperasi,
                jenis_koperasi: body.jenis_koperasi,
                nama_ketua: body.nama_ketua,
                nama_sekretaris: body.nama_sekretaris,
                nama_bendahara: body.nama_bendahara,
                foto_ktp_ketua: '',
                nama_pengelola_harian: body.nama_pengelola_harian,
                jml_anggota_pria: body.jml_anggota_pria | 0,
                jml_anggota_wanita: body.jml_anggota_wanita | 0,
                total_anggota: body.total_anggota | 0,
                total_manajer: body.total_manajer | 0,
                total_karyawan: body.total_karyawan,
                no_induk_koperasi: body.no_induk_koperasi,
                status_nik: body.status_nik,
                status_grade: body.status_grade,
                jabatan: body.jabatan,
                hp_pengurus: body.hp_pengurus,
                email_pengurus: body.email_pengurus
            };

            if (req.files) {
                data.foto_ktp_ketua = 'Kop-' + nama_kop[0] + '-' + now + '.jpg';

                let fotoKtpKetua = req.files.foto_ktp_ketua;

                fotoKtpKetua.mv('/home/dev_peers_id/backend-api/pictures/koperasi/Kop-' + nama_kop[0] + '-' + now + '.jpg', function (err) {
                    if (err) {
                        return res.send({status: 500, data: "", message: "Failed to upload image!"});
                    }
                });
            }

            const update_koperasi = await Koperasi.update(data, {
                where: {
                    id
                }
            });

            if (update_koperasi) {
                return res.status(200).json({
                    status: 500,
                    data: data,
                    message: "Update Koperasi Successfully"
                });
            } else {
                return res.status(200).json({
                    status: 500,
                    data: "",
                    message: "Update failed"
                });
            }

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
        list,
        view_by_id,
        edit_by_id
    };
};

module.exports = KoperasiController;
