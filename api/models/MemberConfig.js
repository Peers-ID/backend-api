const Sequelize = require('sequelize');

const sequelize = require('../../config/database');


const hooks = {

};


const tableName = 'form_member_config';

const MemberConfig = sequelize.define('MemberConfig', {
        koperasi_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                unique: true
        },
        member_handphone: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:1
        },
        jenis_identitas: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        no_identitas: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        nama_lengkap: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        tanggal_lahir: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        tempat_lahir: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        jenis_kelamin: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        nama_gadis_ibu: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        status_perkawinan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        pendidikan_terakhir: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },

        alamat_ktp_jalan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_ktp_nomer: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0,
        },
        alamat_ktp_rt: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_ktp_rw: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_ktp_kelurahan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_ktp_kecamatan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_ktp_kota: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_ktp_provinsi: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_ktp_status_tempat_tinggal: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_ktp_lama_tinggal: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        domisili_sesuai_ktp: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_domisili_jalan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_domisili_nomer: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0,
        },
        alamat_domisili_rt: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_domisili_rw: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_domisili_kelurahan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_domisili_kecamatan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_domisili_kota: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_domisili_provinsi: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_domisili_status_tempat_tinggal: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_domisili_lama_tempat_tinggal: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },

        memiliki_npwp: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        nomer_npwp: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        pekerja_usaha: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        bidang_pekerja: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        posisi_jabatan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        nama_perusahaan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        lama_bekerja: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        penghasilan_omset: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_kantor_jalan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_kantor_nomer: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_kantor_rt: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_kantor_rw: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_kantor_kelurahan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_kantor_kecamatan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_kantor_kota: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        alamat_kantor_provinsi: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },

        nama: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        no_hp: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        hubungan: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        }

}, {
        hooks,
        tableName
});

// eslint-disable-next-line
MemberConfig.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        return values;
};

module.exports = MemberConfig;
