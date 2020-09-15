const Koperasi = require('../models/Koperasi');
/*const KoperasiApprovalConfig = require('../models/KoperasiApprovalConfig');
const KoperasiCutOffConfig = require('../models/KoperasiCutOffConfig');*/
const User = require('../models/User');

const sequelize = require('../../config/database');
const authService = require('../services/auth.service');
const emailService = require('../services/email.service');

const KoperasiController = () => {
    const add = async (req, res) => {

        const {body, decoded} = req;

        var now = Date.now();
        var nama_kop = body.nama_koperasi.split(" ");
        var errorUpload = false;

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
            kelompok_koperasi: body.kelompok_koperasi,
            sektor_usaha: body.sektor_usaha,
            nama_ketua: body.nama_ketua,
            foto_ktp_ketua: '',
            nama_sekretaris: body.nama_sekretaris,
            nama_bendahara: body.nama_bendahara,
            jml_anggota_pria: body.jml_anggota_pria | 0,
            jml_anggota_wanita: body.jml_anggota_wanita | 0,
            total_anggota: body.total_anggota | 0,
            total_manajer: body.total_manajer | 0,
            total_karyawan: body.total_karyawan,
            no_induk_koperasi: body.no_induk_koperasi,
            status_nik: body.status_nik,
            status_grade: body.status_grade,
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
                    role: "Admin Koperasi",
                    ak_id: 0,
                    status: "active"
                }, {transaction: t});

                /*const approvalConfig = await KoperasiApprovalConfig.create({
                        koperasi_id: koperasi.id,
                        ao_can_approved: 0
                }, { transaction: t });

                const cutOffConfig = await KoperasiCutOffConfig.create({
                        koperasi_id: koperasi.id,
                        hours: 0,
                        minutes:0
                }, { transaction: t });*/

                const token = authService().issue({id: user.id});

                await t.commit();

                if (user) {
                    const password = "Peers" + body.nama_koperasi.substr(0, 1) + body.hp_pengurus.substr(-4);

                    emailService().welcomeMessage(body.nama_koperasi, body.email_pengurus, password);
                }

                return res.status(201).json({
                    status: 201,
                    data: {token, user},
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

    /*const edit_approval = async (req, res) => {
        const {body} = req;
        const kop_id = req.params.kop_id;
        try {
            const editConfig = await KoperasiApprovalConfig.update(
                {
                    ao_can_approved: body.ao_can_approved
                }
                , {
                    where: {
                        koperasi_id: kop_id
                    }
                });

            if (editConfig.toString() == "1") {
                return res.status(200).json({
                    status: 201,
                    data: [],
                    message: "Success update config."
                });
            }

            return res.status(200).json({
                status: 400,
                data: [],
                message: "Failed to update config!"
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const view_approval = async (req, res) => {
        const kop_id = req.params.kop_id;
        try {
            const config = await KoperasiApprovalConfig.findAll({
                where: {
                    koperasi_id: kop_id
                },
            });

            return res.status(200).json({
                status: 200,
                data: config,
                message: "Success retrieve config."
            });

        } catch (err) {
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const edit_cutoff = async (req, res) => {
        const {body} = req;
        const kop_id = req.params.kop_id;
        try {
            const cutOff = await KoperasiCutOffConfig.update(
                {
                    hours: body.hours,
                    minutes: body.minutes
                }
                , {
                    where: {
                        koperasi_id: kop_id
                    }
                });

            if (cutOff.toString() == "1") {
                return res.status(200).json({
                    status: 201,
                    data: [],
                    message: "Success update cutoff."
                });
            }

            return res.status(200).json({
                status: 400,
                data: [],
                message: "Failed to update cutoff!"
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const view_cutoff = async (req, res) => {
        const kop_id = req.params.kop_id;
        try {
            const cutOff = await KoperasiCutOffConfig.findAll({
                where: {
                    koperasi_id: kop_id
                },
            });

            return res.status(200).json({
                status: 200,
                data: cutOff,
                message: "Success retrieve cutoff time."
            });

        } catch (err) {
            return res.status(500).json({msg: 'Internal server error'});
        }
    };*/

    return {
        add,
        list
    };
};

module.exports = KoperasiController;
