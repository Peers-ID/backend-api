const User = require('../models/User');
const Member = require('../models/Member');
const Collection = require('../models/Collection');

const { Op } = require("sequelize");

const CollectionController = () => {

        const add = async (req, res) => {
                const { body } = req;

                try {
                        var data = {
                                cicilan_jumlah: body.cicilan_jumlah,
                                pokok: body.pokok,
                                sukarela: body.sukarela
                        };

                        const CollectionUpdate = await Collection.update(data, {
                                                where: {
                                                        koperasi_id: body.koperasi_id,
                                                        member_id: body.member_id,
                                                        ao_id: body.ao_id,
                                                        loan_id: body.loan_id,
                                                        cicilan_ke: body.cicilan_ke
                                                }
                                }
                        );

                        return res.status(201).json({
                                status: 201,
                                data: CollectionUpdate,
                                message: "Collection Data updated successfully"
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
                        let condition = { where:{} };

                        if(req.query.page !== undefined && req.query.row !== undefined){
                                condition.limit = Number(req.query.row);
                                condition.offset = req.query.page -1;
                        }

                        if(req.query.column !== undefined && req.query.sort !== undefined){
                                condition.order = [[req.query.column, req.query.sort]]
                        }

                        if(req.query.createdAt !== undefined){ condition.where.createdAt = { [Op.like]: '%'+req.query.createdAt+'%'} }
                        if(req.query.member_id !== undefined){ condition.where.member_id = Number(req.query.member_id) }
                        if(req.query.koperasi_id !== undefined){ condition.where.koperasi_id = Number(req.query.koperasi_id) }
                        if(req.query.ao_id !== undefined){ condition.where.ao_id = Number(req.query.ao_id) }
                        if(req.query.loan_id !== undefined){ condition.where.loan_id = Number(req.query.loan_id) }

                        if(req.query.cicilan_jumlah !== undefined){
                                var where_cicilan_jumlah = {}

                                if(req.query.cicilan_jumlah == "null"){
                                        where_cicilan_jumlah = null
                                }else{
                                        where_cicilan_jumlah =  { [Op.substring]:req.query.cicilan_jumlah }
                                }
                                condition.where.cicilan_jumlah = where_cicilan_jumlah   ;
                        }

                        if(req.query.keywords !== undefined){
                                condition.where = {
                                                        [Op.or] : [
                                                                { ao_name: { [Op.substring]: req.query.keywords } },
                                                                { member_name: { [Op.substring]: req.query.keywords } },
                                                                { createdAt: { [Op.substring]: req.query.keywords } },
                                                                { cicilan_jumlah: { [Op.substring]: req.query.keywords } },
                                                                { cicilan_ke: { [Op.substring]: req.query.keywords } },
                                                                { pokok: { [Op.substring]: req.query.keywords } },
                                                                { sukarela: { [Op.substring]: req.query.keywords } },
                                                        ]
                                                }
                        }else{
                                if(req.query.ao_name !== undefined){
                                        condition.where = {
                                                                ao_name: { [Op.substring]:req.query.ao_name }
                                                        }
                                }
                                if(req.query.member_name !== undefined){
                                        condition.where = {
                                                                member_name: { [Op.substring]:req.query.member_name }
                                                        }
                                }
                                if(req.query.createdAt !== undefined){
                                        condition.where = {
                                                                createdAt: { [Op.substring]:req.query.createdAt }
                                                        }
                                }

                                if(req.query.cicilan_ke !== undefined){
                                        condition.where = {
                                                                cicilan_ke: { [Op.substring]:req.query.cicilan_ke }
                                                        }
                                }
                                if(req.query.pokok !== undefined){
                                        condition.where = {
                                                                pokok: { [Op.substring]:req.query.pokok }
                                                        }
                                }
                                if(req.query.sukarela !== undefined){
                                        condition.where = {
                                                                sukarela: { [Op.substring]:req.query.sukarela }
                                                        }
                                }
                        }

                        if(req.query.cutHour !== undefined && req.query.cutMinute !== undefined){
                                var a = new Date(new Date() - 24 * 60 * 60 * 1000);
                                var b = new Date();

                                var yesterday = a.getFullYear()+'-'+("0" + (a.getMonth()+1)).slice(-2)+'-'+("0" + a.getDate()).slice(-2)+"T"+req.query.cutHour.toString()+":"+req.query.cutMinute.toString()+":01.000Z";
                                var today = b.getFullYear()+'-'+("0" + (b.getMonth()+1)).slice(-2)+'-'+("0" + b.getDate()).slice(-2)+"T"+req.query.cutHour.toString()+":"+req.query.cutMinute.toString()+":01.000Z";

                                var created = {
                                        [Op.lt]: today,
                                        [Op.gte]: yesterday
                                }

                                condition.where['createdAt'] = created;
                        }

                        const members_collection = await Collection.findAll(condition);
                        const count = await Collection.count(condition);

                        return res.status(200).json({
                                status: 200,
                                data: members_collection,
                                message: {
                                        page: req.query.page,
                                        row: req.query.row,
                                        total: count,
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
