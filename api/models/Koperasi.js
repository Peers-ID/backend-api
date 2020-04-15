const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'koperasi';

const Koperasi = sequelize.define('Koperasi', {
        nama_koperasi: {
                type: Sequelize.STRING,
                allowNull: false
        },
        no_badan_hukum: {
                type: Sequelize.STRING,
                allowNull: false
        },
        tgl_badan_hukum: {
                type: Sequelize.DATE,
                allowNull: false
        },
        no_perubahan_anggaran_dasar: {
                type: Sequelize.STRING,
                allowNull: false
        },
        tgl_perubahan_anggaran_dasar: {
                type: Sequelize.DATE,
                allowNull: false
        },
        tgl_rat_terakhir: {
                type: Sequelize.DATE,
                allowNull: false
        },
        alamat: {
                type: Sequelize.STRING,
                allowNull: false
        },
        kelurahan_desa: {
                type: Sequelize.STRING,
                allowNull: false
        },
        kecamatan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        kabupaten: {
                type: Sequelize.STRING,
                allowNull: false
        },
        provinsi: {
                type: Sequelize.STRING,
                allowNull: false
        },
        bentuk_koperasi: {
                type: Sequelize.STRING,
                allowNull: false
        },
        jenis_koperasi: {
                type: Sequelize.STRING,
                allowNull: false
        },
        kelompok_koperasi: {
                type: Sequelize.STRING,
                allowNull: false
        },
        sektor_usaha: {
                type: Sequelize.STRING,
                allowNull: false
        },
        nama_ketua: {
                type: Sequelize.STRING,
                allowNull: false
        },
        nama_sekretaris: {
                type: Sequelize.STRING,
                allowNull: false
        },
        nama_bendahara: {
                type: Sequelize.STRING,
                allowNull: false
        },
        foto_ktp_ketua: {
                type: Sequelize.STRING,
                allowNull: false
        },
        jml_anggota_pria: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        jml_anggota_wanita: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        total_anggota: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        total_manajer: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        total_karyawan: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        no_induk_koperasi: {
                type: Sequelize.STRING,
                allowNull: false
        },
        status_nik: {
                type: Sequelize.STRING,
                allowNull: false
        },
        status_grade: {
                type: Sequelize.STRING,
                allowNull: false
        },
        hp_pengurus: {
                type: Sequelize.STRING,
                allowNull: false
        },
        email_pengurus: {
                type: Sequelize.STRING,
                allowNull: false
        }
}, {
        hooks,
        tableName,
        //timestamps: false
});

// eslint-disable-next-line
Koperasi.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        return values;
};

module.exports = Koperasi;
