const Sequelize = require('sequelize');

const sequelize = require('../../config/database');


const hooks = {};


const tableName = 'form_member_config';

const MemberConfig = sequelize.define('MemberConfig', {
    koperasi_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    no_identitas: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 1
    },
    member_handphone: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 1
    },
    email: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    nama_lengkap: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    tanggal_lahir: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    usia: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    tempat_lahir: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    jenis_kelamin: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    status_perkawinan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    pendidikan_terakhir: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    nama_gadis_ibu: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_ktp_jalan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_ktp_kelurahan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_ktp_kecamatan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_ktp_kota: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_ktp_provinsi: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_ktp_kode_pos: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_ktp_status_tempat_tinggal: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_ktp_lama_tinggal: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    domisili_sesuai_ktp: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_domisili_jalan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_domisili_kelurahan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_domisili_kecamatan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_domisili_kota: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_domisili_provinsi: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_domisili_kode_pos: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_domisili_status_tempat_tinggal: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_domisili_lama_tempat_tinggal: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    memiliki_npwp: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    nomer_npwp: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    pekerja_usaha: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    jenis_umkm: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    nama_perusahaan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    lama_bekerja: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    penghasilan_omset: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_kantor_jalan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_kantor_kelurahan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_kantor_kecamatan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_kantor_kota: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_kantor_provinsi: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    alamat_kantor_kode_pos: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    nama_kontak_darurat: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    nomor_ponsel_darurat: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    hubungan_kontak_darurat: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    nama_pasangan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    no_identitas_pasangan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    pekerjaan_pasangan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    no_hp_pasangan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    nama_penjamin: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    no_hp_penjamin: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    hubungan_penjamin: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    dokumen_ktp: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    dokumen_sim: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    dokumen_kk: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    dokumen_keterangan_kerja: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    dokumen_slip_gaji: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    dokumen_akta_nikah: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    dokumen_bpkb: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    dokumen_lainnya: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_luas_rumah: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_jenis_atap: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_jenis_dinding: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_kondisi_rumah: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_letak_rumah: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_tanggungan_keluarga: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_data_fisik_perabot: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_akses_lembaga_keuangan: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_info_ttg_usaha: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_index_rumah: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_index_asset: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_kepemilikan_asset: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_pendapatan_luar_usaha: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_perkembangan_asset: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    survey_perkembangan_usaha: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    }
}, {
    hooks,
    tableName
});

// eslint-disable-next-line
MemberConfig.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = MemberConfig;
