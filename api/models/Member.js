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
        member_handphone: {
                type: Sequelize.STRING,
                allowNull: false
        },
        jenis_identitas: {
                type: Sequelize.STRING,
                allowNull: false
        },
        no_identitas: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
        },
        nama_lengkap: {
                type: Sequelize.STRING,
                allowNull: false
        },
        tanggal_lahir: {
                type: Sequelize.DATE,
                allowNull: false
        },
        tempat_lahir: {
                type: Sequelize.STRING,
                allowNull: false
        },
        jenis_kelamin: {
                type: Sequelize.STRING,
                allowNull: false
        },
        nama_gadis_ibu: {
                type: Sequelize.STRING,
                allowNull: false
        },
        status_perkawinan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        pendidikan_terakhir: {
                type: Sequelize.STRING,
                allowNull: false
        },

        alamat_ktp_jalan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_ktp_nomer: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_ktp_rt: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_ktp_rw: {
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
        alamat_ktp_status_tempat_tinggal: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_ktp_lama_tinggal: {
                type: Sequelize.STRING,
                allowNull: false
        },
        domisili_sesuai_ktp: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        alamat_domisili_jalan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_domisili_nomer: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_domisili_rt: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_domisili_rw: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_domisili_kelurahan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_domisili_kecamatan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_domisili_kota: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_domisili_provinsi: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_domisili_status_tempat_tinggal: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_domisili_lama_tempat_tinggal: {
                type: Sequelize.INTEGER,
                allowNull: false
        },

        memiliki_npwp: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        nomer_npwp: {
                type: Sequelize.STRING,
                allowNull: false
        },
        pekerja_usaha: {
                type: Sequelize.STRING,
                allowNull: false
        },
        bidang_pekerja: {
                type: Sequelize.STRING,
                allowNull: false
        },
        posisi_jabatan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        nama_perusahaan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        lama_bekerja: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        penghasilan_omset: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        alamat_kantor_jalan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_kantor_nomer: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_kantor_rt: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_kantor_rw: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_kantor_kelurahan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_kantor_kecamatan: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_kantor_kota: {
                type: Sequelize.STRING,
                allowNull: false
        },
        alamat_kantor_provinsi: {
                type: Sequelize.STRING,
                allowNull: false
        },

        nama: {
                type: Sequelize.STRING,
                allowNull: false
        },
        no_hp: {
                type: Sequelize.STRING,
                allowNull: false
        },
        hubungan: {
                type: Sequelize.STRING,
                allowNull: false
        },

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
