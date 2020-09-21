const MemberConfig = require('../models/MemberConfig');

const MemberConfigController = () => {

    const insert = async (req, res) => {
        const {body, decoded} = req;

        var data = {
            no_identitas: body.no_identitas,
            member_handphone: body.member_handphone,
            email: body.email,
            jenis_identitas: body.jenis_identitas,
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
            alamat_ktp_status_tempat_tinggal: body.alamat_ktp_status_tempat_tinggal,
            alamat_ktp_lama_tinggal: body.alamat_ktp_lama_tinggal,

            domisili_sesuai_ktp: body.domisili_sesuai_ktp,
            alamat_domisili_jalan: body.alamat_domisili_jalan,
            alamat_domisili_kelurahan: body.alamat_domisili_kelurahan,
            alamat_domisili_kecamatan: body.alamat_domisili_kecamatan,
            alamat_domisili_kota: body.alamat_domisili_kota,
            alamat_domisili_provinsi: body.alamat_domisili_provinsi,
            alamat_domisili_status_tempat_tinggal: body.alamat_domisili_status_tempat_tinggal,
            alamat_domisili_lama_tempat_tinggal: body.alamat_domisili_lama_tempat_tinggal,

            memiliki_npwp: body.memiliki_npwp,
            nomer_npwp: body.nomer_npwp,
            pekerja_usaha: body.pekerja_usaha,
            bidang_pekerja: body.bidang_pekerja,
            nama_perusahaan: body.nama_perusahaan,
            lama_bekerja: body.lama_bekerja,
            penghasilan_omset: body.penghasilan_omset,
            alamat_kantor_jalan: body.alamat_kantor_jalan,
            alamat_kantor_kelurahan: body.alamat_kantor_kelurahan,
            alamat_kantor_kecamatan: body.alamat_kantor_kecamatan,
            alamat_kantor_kota: body.alamat_kantor_kota,
            alamat_kantor_provinsi: body.alamat_kantor_provinsi,

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
            dokumen_slip_gaji: body.dokumen_akta_nikah,
            dokumen_bpkb: body.dokumen_bpkb,
            dokumen_lainnya: body.dokumen_lainnya,

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

        try {
            var count = await MemberConfig.count({
                where: {
                    koperasi_id: decoded.koperasi_id
                },
            });

            if (count !== 0) {
                var config = await MemberConfig.update(
                    data
                    , {
                        where: {
                            koperasi_id: decoded.koperasi_id
                        }
                    });

                if (config) {
                    return res.status(200).json({
                        status: 201,
                        data: [],
                        message: "MemberConfig updated successfully"
                    });
                }
            } else {
                data.koperasi_id = decoded.koperasi_id;
                var member = await MemberConfig.create(data);

                return res.status(201).json({
                    status: 201,
                    data: {member},
                    message: "MemberConfig added successfully"
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

    const list = async (req, res) => {
        try {
            const users = await MemberConfig.findAll();

            return res.status(200).json({
                status: 200,
                data: users,
                message: "Success retrieve datas."
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const view = async (req, res) => {
        const {kop_id} = req.params;
        try {
            const users = await MemberConfig.findAll({
                where: {
                    koperasi_id: kop_id
                },
            });

            return res.status(200).json({
                status: 200,
                data: users,
                message: "Success retrieve data."
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };


    return {
        insert,
        list,
        view
    };
};

module.exports = MemberConfigController;
