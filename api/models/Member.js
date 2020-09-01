const Sequelize = require('sequelize');

const sequelize = require('../../config/database');


const hooks = {

};


const tableName = 'member';

const Member = sequelize.define('Member', {
        member_id : {
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
        member_handphone: {
                type: Sequelize.STRING,
                allowNull: false
        },
        jenis_identitas: {
                type: Sequelize.STRING,
                allowNull: true
        },
        no_identitas: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true
        },
        nama_lengkap: {
                type: Sequelize.STRING,
                allowNull: true
        },
        tanggal_lahir: {
                type: Sequelize.DATE,
                allowNull: true
        },
        tempat_lahir: {
                type: Sequelize.STRING,
                allowNull: true
        },
        jenis_kelamin: {
                type: Sequelize.STRING,
                allowNull: true
        },
        nama_gadis_ibu: {
                type: Sequelize.STRING,
                allowNull: true
        },
        status_perkawinan: {
                type: Sequelize.STRING,
                allowNull: true
        },
        pendidikan_terakhir: {
                type: Sequelize.STRING,
                allowNull: true
        },

        alamat_ktp_jalan: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_ktp_nomer: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_ktp_rt: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        },
        alamat_ktp_rw: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        },
        alamat_ktp_kelurahan: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_ktp_kecamatan: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_ktp_kota: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_ktp_provinsi: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_ktp_status_tempat_tinggal: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_ktp_lama_tinggal: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        },
        domisili_sesuai_ktp: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        },
        alamat_domisili_jalan: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_domisili_nomer: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_domisili_rt: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        },
        alamat_domisili_rw: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
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
        alamat_domisili_status_tempat_tinggal: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_domisili_lama_tempat_tinggal: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        },

        memiliki_npwp: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        },
        nomer_npwp: {
                type: Sequelize.STRING,
                allowNull: true
        },
        pekerja_usaha: {
                type: Sequelize.STRING,
                allowNull: true
        },
        bidang_pekerja: {
                type: Sequelize.STRING,
                allowNull: true
        },
        posisi_jabatan: {
                type: Sequelize.STRING,
                allowNull: true
        },
        nama_perusahaan: {
                type: Sequelize.STRING,
                allowNull: true
        },
        lama_bekerja: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        },
        penghasilan_omset: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        },
        alamat_kantor_jalan: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_kantor_nomer: {
                type: Sequelize.STRING,
                allowNull: true
        },
        alamat_kantor_rt: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        },
        alamat_kantor_rw: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
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

        nama: {
                type: Sequelize.STRING,
                allowNull: true
        },
        no_hp: {
                type: Sequelize.STRING,
                allowNull: true
        },
        hubungan: {
                type: Sequelize.STRING,
                allowNull: true
        },
        is_verified: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue:0
        }

}, {
        hooks,
        tableName
});

// eslint-disable-next-line
Member.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        return values;
};

module.exports = Member;
