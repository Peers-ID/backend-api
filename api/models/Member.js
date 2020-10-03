const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const hooks = {};
const tableName = 'member';

const Member = sequelize.define('Member', {
    member_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    koperasi_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ao_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    no_identitas: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    member_handphone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nama_lengkap: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tanggal_lahir: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usia: {
        type: Sequelize.INTEGER,
        allowNull: false, defaultValue: 0
    },
    tempat_lahir: {
        type: Sequelize.STRING,
        allowNull: false
    },
    jenis_kelamin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status_perkawinan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pendidikan_terakhir: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nama_gadis_ibu: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alamat_ktp_jalan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alamat_ktp_kelurahan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alamat_ktp_kecamatan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alamat_ktp_kota: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alamat_ktp_provinsi: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alamat_ktp_kode_pos: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    alamat_ktp_status_tempat_tinggal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alamat_ktp_lama_tinggal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    domisili_sesuai_ktp: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_domisili_jalan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_domisili_kelurahan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_domisili_kecamatan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_domisili_kota: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_domisili_provinsi: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_domisili_kode_pos: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    alamat_domisili_status_tempat_tinggal: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_domisili_lama_tempat_tinggal: {
        type: Sequelize.STRING,
        allowNull: true
    },
    memiliki_npwp: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nomer_npwp: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pekerja_usaha: {
        type: Sequelize.STRING,
        allowNull: true
    },
    jenis_umkm: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nama_perusahaan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lama_bekerja: {
        type: Sequelize.STRING,
        allowNull: true
    },
    penghasilan_omset: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    alamat_kantor_jalan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_kantor_kelurahan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_kantor_kecamatan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_kantor_kota: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_kantor_provinsi: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alamat_kantor_kode_pos: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nama_kontak_darurat: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nomor_ponsel_darurat: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    hubungan_kontak_darurat: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nama_pasangan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    no_identitas_pasangan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    pekerjaan_pasangan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    no_hp_pasangan: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    nama_penjamin: {
        type: Sequelize.STRING,
        allowNull: true
    },
    no_hp_penjamin: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    hubungan_penjamin: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dokumen_ktp: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dokumen_sim: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dokumen_kk: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dokumen_keterangan_kerja: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dokumen_slip_gaji: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dokumen_akta_nikah: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dokumen_bpkb: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dokumen_lainnya: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_luas_rumah: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_jenis_atap: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_jenis_dinding: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_kondisi_rumah: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_letak_rumah: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_tanggungan_keluarga: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_data_fisik_perabot: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_akses_lembaga_keuangan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_info_ttg_usaha: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_index_rumah: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_index_asset: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_kepemilikan_asset: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_pendapatan_luar_usaha: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_perkembangan_asset: {
        type: Sequelize.STRING,
        allowNull: true
    },
    survey_perkembangan_usaha: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    hooks,
    tableName
});


// eslint-disable-next-line
Member.prototype.toJSON = function () {
    return Object.assign({}, this.get());
};

module.exports = Member;
