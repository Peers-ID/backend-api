const Member = require('../models/Member');
const Loan = require('../models/Loan');
const Koperasi = require('../models/Koperasi');
const Config = require('../models/Config');
const Axios = require('axios');

const MemberController = () => {

        const add = async (req, res) => {
                const { body, decoded } = req;

                try {
                        await Koperasi.findOne({
                                where: {
                                        id:body.koperasi_id
                                },
                        })
                        .then(async (koperasi) => {
                                if(decoded.role !== "Admin AO"){
                                        return res.status(200).json({
                                                status: 400,
                                                data: [],
                                                message: "Unauthorized. You are not AO!"
                                        });
                                }
                                if(koperasi){
                                        const member = await Member.create({
                                                koperasi_id: body.koperasi_id,
                                                ao_id: decoded.id,
                                                member_handphone: body.member_handphone,
                                                jenis_identitas: body.jenis_identitas,
                                                no_identitas: body.no_identitas,
                                                nama_lengkap: body.nama_lengkap,
                                                tanggal_lahir: body.tanggal_lahir,
                                                tempat_lahir: body.tempat_lahir,
                                                jenis_kelamin: body.jenis_kelamin,
                                                nama_gadis_ibu: body.nama_gadis_ibu,
                                                status_perkawinan: body.status_perkawinan,
                                                pendidikan_terakhir: body.pendidikan_terakhir,

                                                alamat_ktp_jalan: body.alamat_ktp_jalan,
                                                alamat_ktp_nomer: body.alamat_ktp_nomer,
                                                alamat_ktp_rt: body.alamat_ktp_rt,
                                                alamat_ktp_rw: body.alamat_ktp_rw,
                                                alamat_ktp_kelurahan: body.alamat_ktp_kelurahan,
                                                alamat_ktp_kecamatan: body.alamat_ktp_kecamatan,
                                                alamat_ktp_kota: body.alamat_ktp_kota,
                                                alamat_ktp_provinsi: body.alamat_ktp_provinsi,
                                                alamat_ktp_status_tempat_tinggal: body.alamat_ktp_status_tempat_tinggal,
                                                alamat_ktp_lama_tinggal: body.alamat_ktp_lama_tinggal,

                                                domisili_sesuai_ktp: body.domisili_sesuai_ktp,
                                                alamat_domisili_jalan: body.alamat_domisili_jalan,
                                                alamat_domisili_nomer: body.alamat_domisili_nomer,
                                                alamat_domisili_rt: body.alamat_domisili_rt,
                                                alamat_domisili_rw: body.alamat_domisili_rw,
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
                                                posisi_jabatan: body.posisi_jabatan,
                                                nama_perusahaan: body.nama_perusahaan,
                                                lama_bekerja: body.lama_bekerja,
                                                penghasilan_omset: body.penghasilan_omset,
                                                alamat_kantor_jalan: body.alamat_kantor_jalan,
                                                alamat_kantor_nomer: body.alamat_kantor_nomer,
                                                alamat_kantor_rt: body.alamat_kantor_rt,
                                                alamat_kantor_rw: body.alamat_kantor_rw,
                                                alamat_kantor_kelurahan: body.alamat_kantor_kelurahan,
                                                alamat_kantor_kecamatan: body.alamat_kantor_kecamatan,
                                                alamat_kantor_kota: body.alamat_kantor_kota,
                                                alamat_kantor_provinsi: body.alamat_kantor_provinsi,

                                                is_verified: body.is_verified,

                                                nama: body.nama,
                                                no_hp: body.no_hp,
                                                hubungan: body.hubungan
                                        });

                                        return res.status(201).json({
                                                status: 201,
                                                data: { member },
                                                message: "Member registered successfully"
                                        });
                                }else{
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
                try {
                        const member = await Member.findAll();

                        return res.status(200).json({
                                status: 200,
                                data: member,
                                message: "Success retrieve data."
                        });

                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        const view = async (req, res) => {
                const { member_id } = req.params;
                try {
                        const member = await Member.findAll({
                                where: {
                                        member_id:member_id
                                },
                        });

                        return res.status(200).json({
                                status: 200,
                                data: member,
                                message: "Success retrieve data."
                        });

                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        const view_by_phone = async (req, res) => {
                const { mobile_phone } = req.params;
                try {
                        const member = await Member.findAll({
                                attributes: ['member_id', 'nama_lengkap', 'no_identitas', 'tanggal_lahir', 'jenis_kelamin', 'nama_gadis_ibu', 'nomer_npwp'],
                                where: {
                                        member_handphone:mobile_phone
                                },
                        });

                        return res.status(200).json({
                                status: 200,
                                data: member,
                                message: "Success retrieve data."
                        });

                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        const edit = async (req, res) => {
                const { body } = req;
                const { member_id } = req.params;
                try {
                        const member = await Member.update(
                                {
                                        member_handphone: body.member_handphone,
                                        jenis_identitas: body.jenis_identitas,
                                        no_identitas: body.no_identitas,
                                        nama_lengkap: body.nama_lengkap,
                                        tanggal_lahir: body.tanggal_lahir,
                                        tempat_lahir: body.tempat_lahir,
                                        jenis_kelamin: body.jenis_kelamin,
                                        nama_gadis_ibu: body.nama_gadis_ibu,
                                        status_perkawinan: body.status_perkawinan,
                                        pendidikan_terakhir: body.pendidikan_terakhir,

                                        alamat_ktp_jalan: body.alamat_ktp_jalan,
                                        alamat_ktp_nomer: body.alamat_ktp_nomer,
                                        alamat_ktp_rt: body.alamat_ktp_rt,
                                        alamat_ktp_rw: body.alamat_ktp_rw,
                                        alamat_ktp_kelurahan: body.alamat_ktp_kelurahan,
                                        alamat_ktp_kecamatan: body.alamat_ktp_kecamatan,
                                        alamat_ktp_kota: body.alamat_ktp_kota,
                                        alamat_ktp_provinsi: body.alamat_ktp_provinsi,
                                        alamat_ktp_status_tempat_tinggal: body.alamat_ktp_status_tempat_tinggal,
                                        alamat_ktp_lama_tinggal: body.alamat_ktp_lama_tinggal,

                                        domisili_sesuai_ktp: body.domisili_sesuai_ktp,
                                        alamat_domisili_jalan: body.alamat_domisili_jalan,
                                        alamat_domisili_nomer: body.alamat_domisili_nomer,
                                        alamat_domisili_rt: body.alamat_domisili_rt,
                                        alamat_domisili_rw: body.alamat_domisili_rw,
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
                                        posisi_jabatan: body.posisi_jabatan,
                                        nama_perusahaan: body.nama_perusahaan,
                                        lama_bekerja: body.lama_bekerja,
                                        penghasilan_omset: body.penghasilan_omset,
                                        alamat_kantor_jalan: body.alamat_kantor_jalan,
                                        alamat_kantor_nomer: body.alamat_kantor_nomer,
                                        alamat_kantor_rt: body.alamat_kantor_rt,
                                        alamat_kantor_rw: body.alamat_kantor_rw,
                                        alamat_kantor_kelurahan: body.alamat_kantor_kelurahan,
                                        alamat_kantor_kecamatan: body.alamat_kantor_kecamatan,
                                        alamat_kantor_kota: body.alamat_kantor_kota,
                                        alamat_kantor_provinsi: body.alamat_kantor_provinsi,

                                        nama: body.nama,
                                        no_hp: body.no_hp,
                                        hubungan: body.hubungan
                                }
                        , {
                                  where: {
                                          member_id:member_id
                                  }
                        });

                        if(member){
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
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        const change_picture = async (req, res) => {
                const { member_id } = req.params;

                try {
                        if (!req.files || Object.keys(req.files).length === 0) {
                                return res.status(400).send('No files were uploaded.');
                        }
                        var now = Date.now();

                        let memberPicture = req.files.image;

                        memberPicture.mv('/home/dev_peers_id/backend-api/pictures/ID-' + member_id + '-' + now + '.jpg', async function(err) {
                                if (err)
                                        return res.status(500).send(err);

                                        const member = await Loan.update(
                                                {
                                                        member_photo_url: 'ID-' + member_id + '-' + now + '.jpg',
                                                }
                                        , {
                                                  where: {
                                                          member_id:member_id
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
                const { member_id } = req.params;
                try {
                        const member = await Loan.findOne({
                                attributes: ['member_photo_url'],
                                where: {
                                        member_id:member_id
                                },
                        });

                        return res.status(200).json({
                                status: 200,
                                data: member,
                                message: "Success retrieve data."
                        });

                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        const miscall = async (req, res) => {
                const { member_hp } = req.body;
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
                                                          'Authorization': 'Basic ' + auth.value},
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
                                          return res.status(500).json({ msg: err });
                                  });
                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        return {
                add,
                list,
                view,
                view_by_phone,
                edit,
                change_picture,
                get_picture,
                miscall
        };
};

module.exports = MemberController;
