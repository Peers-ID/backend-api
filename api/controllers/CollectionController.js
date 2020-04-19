const Loan = require('../models/Loan');
const User = require('../models/User');
const Member = require('../models/Member');
const Collection = require('../models/Collection');
const Op = require('sequelize');

const CollectionController = () => {

        const add = async (req, res) => {
                const { body } = req;

                try {
                        var data = {
                                koperasi_id: body.koperasi_id,
                                member_id: body.member_id,
                                ao_id: body.ao_id,
                                loan_id: body.loan_id,
                                cicilan_jumlah: body.cicilan_jumlah,
                                pokok: body.pokok,
                                sukarela: body.sukarela
                        };

                        Promise.all([
                                Member.findOne({
                                        attributes: ['nama_lengkap'],
                                        where: { member_id:body.member_id }
                                }),
                                Collection.count({
                                        where: {
                                                koperasi_id:body.koperasi_id,
                                                member_id:body.member_id,
                                                ao_id:body.ao_id,
                                                loan_id:body.loan_id
                                        }
                                }),
                                User.findOne({
                                        attributes: ['fullname'],
                                        where: { id:body.ao_id, role: "Admin AO" }
                                })
                        ])
                        .then(async ([member, cicilan_ke, ao]) => {
                                data.member_name = member.nama_lengkap;
                                data.ao_name = ao.fullname;
                                data.cicilan_ke = cicilan_ke + 1;

                                const CollectionInsert = await Collection.create(data);

                                return res.status(201).json({
                                        status: 201,
                                        data: CollectionInsert,
                                        message: "Collection Data inserted successfully"
                                });
                        })
                        .catch((err) => {
                                return res.status(200).json({ status: 500, data: "", message: "Error: " + err });
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
                        let condition = {where:{}};

                        if(req.query.page !== undefined && req.query.row !== undefined){
                                condition.limit = Number(req.query.row);
                                condition.offset = req.query.page -1;
                        }

                        if(req.query.column !== undefined && req.query.sort !== undefined){
                                condition.order = [[req.query.column, req.query.sort]]
                        }
console.log(req.query.createdAt);
// console.log(Op.like);
                        if(req.query.createdAt !== undefined){
                                condition.where.createdAt = { [Op.like]: '%'+req.query.createdAt+'%'}
                        }

                        const members_collection = await Collection.findAll(condition);
                        //const count = await Collection.count(condition);

                        return res.status(200).json({
                                status: 200,
                                data: members_collection,
                                message: {
                                        page: req.query.page,
                                        row: req.query.row,
                                        // total: count,
                                        message: "Success retrieve data."}
                        });

                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        const view = async (req, res) => {
                const { id } = req.params;
                try {
                        const collection = await Collection.findOne({
                                where: {
                                        id:id
                                },
                        });

                        return res.status(200).json({
                                status: 200,
                                data: collection,
                                message: "Success retrieve data."
                        });

                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };


        return {
                add,
                list,
                view
        };
};

module.exports = CollectionController;
