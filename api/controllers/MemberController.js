const Member = require('../models/Member');
const User = require('../models/User');
const TblLoan = require('../models/v2/TblLoan');
const Koperasi = require('../models/Koperasi');
const Config = require('../models/Config');
const Axios = require('axios');
const sequelize = require('../../config/database');

const MemberController = () => {

    const add = async (req, res) => {
        const {body, decoded} = req;

        try {
            //anggota sudah terdaftar, no_identitas dalam 1 koperasi yang sama
            //anggota baru
            //status pinjaman pending persetujuan, pending pencairan
            //status pinjaman aktif

            var data = {
                koperasi_id: decoded.koperasi_id,
                ao_id: decoded.id,
                no_identitas: body.no_identitas,
                member_handphone: body.member_handphone,
                email: body.email,
                nama_lengkap: body.nama_lengkap,
                tempat_lahir: body.tempat_lahir,
                tanggal_lahir: body.tanggal_lahir,
                usia: body.usia,
                jenis_kelamin: body.jenis_kelamin,
                status_perkawinan: body.status_perkawinan,
                pendidikan_terakhir: body.pendidikan_terakhir,
                nama_gadis_ibu: body.nama_gadis_ibu,
                alamat_ktp_jalan: body.alamat_ktp_jalan,
                alamat_ktp_kelurahan: body.alamat_ktp_kelurahan,
                alamat_ktp_kecamatan: body.alamat_ktp_kecamatan,
                alamat_ktp_kota: body.alamat_ktp_kota,
                alamat_ktp_provinsi: body.alamat_ktp_provinsi,
                alamat_ktp_kode_pos: body.alamat_ktp_kode_pos,
                alamat_ktp_status_tempat_tinggal: body.alamat_ktp_status_tempat_tinggal,
                alamat_ktp_lama_tinggal: body.alamat_ktp_lama_tinggal,

                domisili_sesuai_ktp: body.domisili_sesuai_ktp,
                alamat_domisili_jalan: body.alamat_domisili_jalan,
                alamat_domisili_kelurahan: body.alamat_domisili_kelurahan,
                alamat_domisili_kecamatan: body.alamat_domisili_kecamatan,
                alamat_domisili_kota: body.alamat_domisili_kota,
                alamat_domisili_provinsi: body.alamat_domisili_provinsi,
                alamat_domisili_kode_pos: body.alamat_domisili_kode_pos,
                alamat_domisili_status_tempat_tinggal: body.alamat_domisili_status_tempat_tinggal,
                alamat_domisili_lama_tempat_tinggal: body.alamat_domisili_lama_tempat_tinggal,

                memiliki_npwp: body.memiliki_npwp,
                nomer_npwp: body.nomer_npwp,
                pekerja_usaha: body.pekerja_usaha,
                jenis_umkm: body.jenis_umkm,
                nama_perusahaan: body.nama_perusahaan,
                lama_bekerja: body.lama_bekerja,
                penghasilan_omset: body.penghasilan_omset,
                alamat_kantor_jalan: body.alamat_kantor_jalan,
                alamat_kantor_kelurahan: body.alamat_kantor_kelurahan,
                alamat_kantor_kecamatan: body.alamat_kantor_kecamatan,
                alamat_kantor_kota: body.alamat_kantor_kota,
                alamat_kantor_provinsi: body.alamat_kantor_provinsi,
                alamat_kantor_kode_pos: body.alamat_kantor_kode_pos,

                nama_kontak_darurat: body.nama_kontak_darurat,
                nomor_ponsel_darurat: body.nomor_ponsel_darurat,
                hubungan_kontak_darurat: body.hubungan_kontak_darurat,

                nama_pasangan: body.nama_pasangan,
                no_identitas_pasangan: body.no_identitas_pasangan,
                pekerjaan_pasangan: body.pekerjaan_pasangan,
                no_hp_pasangan: body.no_hp_pasangan,

                nama_penjamin: body.nama_penjamin,
                no_hp_penjamin: body.no_hp_penjamin,
                hubungan_penjamin: body.hubungan_penjamin,

                dokumen_ktp: body.dokumen_ktp,
                dokumen_sim: body.dokumen_sim,
                dokumen_kk: body.dokumen_kk,
                dokumen_keterangan_kerja: body.dokumen_keterangan_kerja,
                dokumen_slip_gaji: body.dokumen_slip_gaji,
                dokumen_akta_nikah: body.dokumen_akta_nikah,
                dokumen_bpkb: body.dokumen_bpkb,
                dokumen_lainnya: body.dokumen_lainnya,

                rembug: body.rembug,
                kelompok: body.kelompok,

                survey_luas_rumah: body.survey_luas_rumah,
                survey_jenis_atap: body.survey_jenis_atap,
                survey_jenis_dinding: body.survey_jenis_dinding,
                survey_kondisi_rumah: body.survey_kondisi_rumah,
                survey_letak_rumah: body.survey_letak_rumah,
                survey_tanggungan_keluarga: body.survey_tanggungan_keluarga,
                survey_data_fisik_perabot: body.survey_data_fisik_perabot,
                survey_akses_lembaga_keuangan: body.survey_akses_lembaga_keuangan,
                survey_info_ttg_usaha: body.survey_info_ttg_usaha,
                survey_index_rumah: body.survey_index_rumah,
                survey_index_asset: body.survey_index_asset,
                survey_kepemilikan_asset: body.survey_kepemilikan_asset,
                survey_pendapatan_luar_usaha: body.survey_pendapatan_luar_usaha,
                survey_perkembangan_asset: body.survey_perkembangan_asset,
                survey_perkembangan_usaha: body.survey_perkembangan_usaha
            };

            await Koperasi.findOne({
                where: {
                    id: decoded.koperasi_id
                },
            })
                .then(async (koperasi) => {
                    if (decoded.role !== "AO/CMO/Sales") {
                        return res.status(200).json({
                            status: 400,
                            data: [],
                            message: "Unauthorized. You are not AO!"
                        });
                    }
                    if (koperasi) {
                        await Member.findOne({
                            where: {
                                no_identitas: body.no_identitas
                            }
                        }).then(async (member) => {
                            if (member) {
                                await TblLoan.findOne({
                                    where: {
                                        id_member: member.member_id,
                                        desc_status: 'active'
                                    }
                                }).then(async (loan) => {
                                    if (loan) {
                                        return res.status(200).json({
                                            status: 202,
                                            message: "Pinjaman sedang berjalan",
                                            data: {loan}
                                        });
                                    } else {
                                        return res.status(200).json({
                                            status: 204,
                                            message: "Anggota sudah terdaftar",
                                            data: member
                                        });
                                    }
                                });
                            } else {
                                const t = await sequelize.transaction();

                                try {
                                    //create data customer
                                    const registered_cust = await Member.create(data, {transaction: t});

                                    //create user
                                    await User.create({
                                        koperasi_id: decoded.koperasi_id,
                                        fullname: registered_cust.nama_lengkap,
                                        phone_mobile: registered_cust.member_handphone,
                                        no_identitas: registered_cust.no_identitas,
                                        birthdate: registered_cust.tanggal_lahir,
                                        email: registered_cust.email,
                                        password: registered_cust.nama_lengkap.substr(0, 3) + registered_cust.no_identitas.substr(0, 3) + registered_cust.member_handphone.substr(-4), //3 huruf nama pertama & 4 digit terakhir no HP
                                        role: "Customer",
                                        status: "active",

                                        //ak_id was the AO id who create the user. But in this case, ak_id is a generated member id;
                                        ak_id: registered_cust.member_id
                                    }, {transaction: t});

                                    await t.commit();

                                    return res.status(201).json({
                                        status: 201,
                                        message: "Member registered successfully",
                                        data: registered_cust
                                    });
                                } catch (err) {
                                    await t.rollback();

                                    return res.status(200).json({
                                        status: 500,
                                        data: [],
                                        message: "Error create data and customer's password: " + err
                                    });
                                }
                            }
                        });
                    } else {
                        return res.status(200).json({
                            status: 400,
                            data: [],
                            message: "Koperasi is not exist!"
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
        let condition = {where: {}};
        const {decoded} = req;

        try {
            condition.where.koperasi_id = decoded.koperasi_id;
            if (decoded.role === "AO/CMO/Sales") {
                condition.where.ao_id = decoded.id;
            }

            const member = await Member.findAll(condition);

            return res.status(200).json({
                status: 200,
                data: member,
                message: "Success retrieve data."
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const view = async (req, res) => {
        const {member_id} = req.params;
        try {
            const member = await Member.findAll({
                where: {
                    member_id: member_id
                },
            });

            return res.status(200).json({
                status: 200,
                data: member,
                message: "Success retrieve data."
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const view_by_phone = async (req, res) => {
        const {mobile_phone} = req.params;
        try {
            const member = await Member.findAll({
                attributes: ['member_id', 'nama_lengkap', 'no_identitas', 'tanggal_lahir', 'jenis_kelamin', 'nama_gadis_ibu', 'nomer_npwp'],
                where: {
                    member_handphone: mobile_phone
                },
            });

            return res.status(200).json({
                status: 200,
                data: member,
                message: "Success retrieve data."
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const edit = async (req, res) => {
        const {body} = req;
        const {member_id} = req.params;
        try {
            const member = await Member.update(
                {
                    member_handphone: body.member_handphone,
                    no_identitas: body.no_identitas,
                    nama_lengkap: body.nama_lengkap,
                    tanggal_lahir: body.tanggal_lahir,
                    tempat_lahir: body.tempat_lahir,
                    usia: body.usia,
                    jenis_kelamin: body.jenis_kelamin,
                    status_perkawinan: body.status_perkawinan,
                    pendidikan_terakhir: body.pendidikan_terakhir,
                    nama_gadis_ibu: body.nama_gadis_ibu,
                    alamat_ktp_jalan: body.alamat_ktp_jalan,
                    alamat_ktp_kelurahan: body.alamat_ktp_kelurahan,
                    alamat_ktp_kecamatan: body.alamat_ktp_kecamatan,
                    alamat_ktp_kota: body.alamat_ktp_kota,
                    alamat_ktp_provinsi: body.alamat_ktp_provinsi,
                    alamat_ktp_kode_pos: body.alamat_ktp_kode_pos,
                    alamat_ktp_status_tempat_tinggal: body.alamat_ktp_status_tempat_tinggal,
                    alamat_ktp_lama_tinggal: body.alamat_ktp_lama_tinggal,

                    domisili_sesuai_ktp: body.domisili_sesuai_ktp,
                    alamat_domisili_jalan: body.alamat_domisili_jalan,
                    alamat_domisili_kelurahan: body.alamat_domisili_kelurahan,
                    alamat_domisili_kecamatan: body.alamat_domisili_kecamatan,
                    alamat_domisili_kota: body.alamat_domisili_kota,
                    alamat_domisili_provinsi: body.alamat_domisili_provinsi,
                    alamat_domisili_kode_pos: body.alamat_domisili_kode_pos,
                    alamat_domisili_status_tempat_tinggal: body.alamat_domisili_status_tempat_tinggal,
                    alamat_domisili_lama_tempat_tinggal: body.alamat_domisili_lama_tempat_tinggal,

                    memiliki_npwp: body.memiliki_npwp,
                    nomer_npwp: body.nomer_npwp,
                    pekerja_usaha: body.pekerja_usaha,
                    jenis_umkm: body.jenis_umkm,
                    nama_perusahaan: body.nama_perusahaan,
                    lama_bekerja: body.lama_bekerja,
                    penghasilan_omset: body.penghasilan_omset,
                    alamat_kantor_jalan: body.alamat_kantor_jalan,
                    alamat_kantor_kelurahan: body.alamat_kantor_kelurahan,
                    alamat_kantor_kecamatan: body.alamat_kantor_kecamatan,
                    alamat_kantor_kota: body.alamat_kantor_kota,
                    alamat_kantor_provinsi: body.alamat_kantor_provinsi,
                    alamat_kantor_kode_pos: body.alamat_kantor_kode_pos,

                    nama_kontak_darurat: body.nama_kontak_darurat,
                    nomor_ponsel_darurat: body.nomor_ponsel_darurat,
                    hubungan_kontak_darurat: body.hubungan_kontak_darurat,

                    nama_pasangan: body.nama_pasangan,
                    no_identitas_pasangan: body.no_identitas_pasangan,
                    pekerjaan_pasangan: body.pekerjaan_pasangan,
                    no_hp_pasangan: body.no_hp_pasangan,

                    nama_penjamin: body.nama_penjamin,
                    no_hp_penjamin: body.no_hp_penjamin,
                    hubungan_penjamin: body.hubungan_penjamin,

                    dokumen_ktp: body.dokumen_ktp,
                    dokumen_sim: body.dokumen_sim,
                    dokumen_kk: body.dokumen_kk,
                    dokumen_keterangan_kerja: body.dokumen_keterangan_kerja,
                    dokumen_slip_gaji: body.dokumen_slip_gaji,
                    dokumen_akta_nikah: body.dokumen_akta_nikah,
                    dokumen_bpkb: body.dokumen_bpkb,
                    dokumen_lainnya: body.dokumen_lainnya,

                    rembug: body.rembug,
                    kelompok: body.kelompok,

                    survey_luas_rumah: body.survey_luas_rumah,
                    survey_jenis_atap: body.survey_jenis_atap,
                    survey_jenis_dinding: body.survey_jenis_dinding,
                    survey_kondisi_rumah: body.survey_kondisi_rumah,
                    survey_letak_rumah: body.survey_letak_rumah,
                    survey_tanggungan_keluarga: body.survey_tanggungan_keluarga,
                    survey_data_fisik_perabot: body.survey_data_fisik_perabot,
                    survey_akses_lembaga_keuangan: body.survey_akses_lembaga_keuangan,
                    survey_info_ttg_usaha: body.survey_info_ttg_usaha,
                    survey_index_rumah: body.survey_index_rumah,
                    survey_index_asset: body.survey_index_asset,
                    survey_kepemilikan_asset: body.survey_kepemilikan_asset,
                    survey_pendapatan_luar_usaha: body.survey_pendapatan_luar_usaha,
                    survey_perkembangan_asset: body.survey_perkembangan_asset,
                    survey_perkembangan_usaha: body.survey_perkembangan_usaha
                }
                , {
                    where: {
                        member_id: member_id
                    }
                });

            if (member) {
                return res.status(200).json({
                    status: 201,
                    data: [],
                    message: "Success update data."
                });
            }

            return res.status(200).json({
                status: 400,
                data: [],
                message: "Failed to update data!"
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const upload_files = async (req, res) => {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }

            let memberPicture = req.files.image;

            console.log(memberPicture.name);

            memberPicture.mv('/home/dev_peers_id/backend-api/files/ID-' + memberPicture.name, async function (err) {
                if (err)
                    return res.status(500).send(err);

                return res.status(201).json({
                    status: 201,
                    data: {
                        file_name: 'ID-' + memberPicture.name
                    },
                    message: "Files Uploaded"
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

    const disburse_picture = async (req, res) => {
        const {member_id} = req.params;

        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }
            var now = Date.now();

            let memberPicture = req.files.image;

            memberPicture.mv('/home/dev_peers_id/backend-api/pictures/ID-' + member_id + '-' + now + '.jpg', async function (err) {
                if (err)
                    return res.status(500).send(err);

                await TblLoan.update(
                    {
                        member_photo_url: 'ID-' + member_id + '-' + now + '.jpg',
                    }
                    , {
                        where: {
                            id_member: member_id
                        }
                    });
                return res.status(201).json({
                    status: 201,
                    data: [],
                    message: "Profile picture updated!"
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

    const get_picture = async (req, res) => {
        const {member_id} = req.params;
        try {
            const member = await TblLoan.findOne({
                attributes: ['member_photo_url'],
                where: {
                    id_member: member_id
                },
            });

            return res.status(200).json({
                status: 200,
                data: member,
                message: "Success retrieve data."
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const miscall = async (req, res) => {
        const {member_hp} = req.body;
        try {
            Promise.all([
                Config.findOne({
                    where: {
                        env: 'dev',
                        key: 'citcall-url'
                    }
                }),
                Config.findOne({
                    where: {
                        env: 'dev',
                        key: 'citcall-auth'
                    }
                })
            ])
                .then(([url, auth]) => {
                    Axios({
                        method: 'post',
                        url: url.value,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic ' + auth.value
                        },
                        data: {
                            "msisdn": member_hp.toString(),
                            "gateway": 1
                        }
                    })
                        .then(function (response) {
                            return res.status(200).json({
                                status: 200,
                                data: response.data,
                                message: "Success making a call."
                            });
                        });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({msg: err});
                });
        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const view_by_nik = async (req, res) => {
        const {nik} = req.params;
        const {decoded} = req;


        try {
            await Member.findOne({
                where: {
                    koperasi_id: decoded.koperasi_id,
                    no_identitas: nik
                },
            }).then(async (member) => {
                if (member) {

                    await TblLoan.findOne({
                        where: {
                            id_koperasi: decoded.koperasi_id,
                            id_member: member.member_id,
                            desc_status: 'active'
                        }
                    }).then(async (loan) => {
                        if (loan) {
                            return res.status(200).json({
                                status: 202,
                                data: loan,
                                message: "Pinjaman sedang berjalan"
                            });
                        } else {
                            return res.status(200).json({
                                status: 203,
                                data: member,
                                message: "Anggota sudah terdaftar"
                            });
                        }
                    });
                } else {
                    return res.status(200).json({
                        status: 200,
                        data: {},
                        message: "Member not found"
                    });
                }
            });


        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    return {
        add,
        list,
        view,
        view_by_phone,
        view_by_nik,
        edit,
        upload_files,
        disburse_picture,
        get_picture,
        miscall
    };
};

module.exports = MemberController;
