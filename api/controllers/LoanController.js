const Loan = require('../models/Loan');
const Member = require('../models/Member');
const User = require('../models/User');
const LoanFormulaConfig = require('../models/LoanFormulaConfig');
const Collection = require('../models/Collection');
const KoperasiApprovalConfig = require('../models/KoperasiApprovalConfig');

const { Op } = require("sequelize");

const LoanController = () => {

        const add = async (req, res) => {
                const { body, decoded } = req;

                try {
                        await Member.findOne({
                                where: {
                                        member_handphone:body.member_handphone
                                },
                        })
                        .then(async (member) => {
                                if(member){

                                        await Loan.count({
                                                where: {
                                                        member_handphone:member.member_handphone,
                                                        formula_id: body.formula_id,

                                                        [Op.or]: [
                                                                {       is_loan_approved: 0    },
                                                                {       is_loan_approved: 1     },
                                                                {       is_loan_approved: 3     }
                                                        ]
                                                },
                                        })
                                        .then(async (loan) => {
                                                if(loan > 0){
                                                        return res.status(200).json({
                                                                status: 401,
                                                                data: [],
                                                                message: "Already have on progress, approved or pending Loan!"
                                                        });
                                                }else{
                                                        var data = {
                                                                koperasi_id: body.koperasi_id,
                                                                member_id : member.member_id,
                                                                member_name : member.nama_lengkap,
                                                                member_handphone: body.member_handphone,
                                                                ao_id: decoded.id,
                                                                formula_id: body.formula_id,
                                                                jumlah_loan: body.jumlah_loan,
                                                                total_disbursed: body.total_disbursed,
                                                                tenor: body.tenor,
                                                                cicilan_per_bln: body.cicilan_per_bln
                                                        };

                                                        await KoperasiApprovalConfig.findOne({
                                                                attributes: ['ao_can_approved'],
                                                                where: { koperasi_id: body.koperasi_id }
                                                        }).then((apprConfig) => {
                                                                if(apprConfig.ao_can_approved == 1){
                                                                        data.is_loan_approved = 1;
                                                                        data.approved_date = new Date();
                                                                }
                                                        });

                                                        await User.findOne({
                                                                attributes: ['fullname'],
                                                                where: { id:decoded.id, role: "Admin AO" }
                                                        }).then((ao_items) =>
                                                                data.ao_name = ao_items.fullname
                                                        );

                                                        await LoanFormulaConfig.findOne({
                                                                attributes: ['tenure_cycle', 'service_type'],
                                                                where: { id:body.formula_id }
                                                        }).then((formula_items) => {
                                                                data.tenor_cycle = formula_items.tenure_cycle;
                                                                data.service_type = formula_items.service_type;
                                                        });

                                                        const LoanInsert = await Loan.create(data);

                                                        return res.status(201).json({
                                                                status: 201,
                                                                //data: LoanInsert,
                                                                message: "Data inserted successfully"
                                                        });
                                                }
                                        });
                                }else{
                                        return res.status(200).json({
                                                status: 400,
                                                data: [],
                                                message: "Member doesnt exist!"
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
                        let condition = { where:{} };

                        if(req.query.page !== undefined && req.query.row !== undefined){
                                condition.limit = Number(req.query.row);
                                condition.offset = req.query.page -1;
                        }

                        if(req.query.column !== undefined && req.query.sort !== undefined){
                                condition.order = [[req.query.column, req.query.sort]]
                        }

                        if(req.query.member_id !== undefined){ condition.where.member_id = Number(req.query.member_id) }
                        if(req.query.koperasi_id !== undefined){ condition.where.koperasi_id = Number(req.query.koperasi_id) }

                        if(req.query.is_loan_approved !== undefined){ condition.where.is_loan_approved = Number(req.query.is_loan_approved) }
                        // if(req.query.status !== undefined){ condition.where.is_loan_approved = Number(req.query.status) }

                        if(req.query.ao_id !== undefined){ condition.where.ao_id = Number(req.query.ao_id) }

                        if(req.query.keywords !== undefined){
                                condition.where = {
                                                        [Op.or] : [
                                                                { ao_name: { [Op.substring]: req.query.keywords } },
                                                                { member_name: { [Op.substring]: req.query.keywords } },
                                                                { createdAt: { [Op.substring]: req.query.keywords } },
                                                                { jumlah_loan: { [Op.substring]: req.query.keywords } },
                                                                { tenor: { [Op.substring]: req.query.keywords } }
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
                                if(req.query.jumlah_loan !== undefined){
                                        condition.where = {
                                                                jumlah_loan: { [Op.substring]:req.query.jumlah_loan }
                                                        }
                                }
                                if(req.query.tenor !== undefined){
                                        condition.where = {
                                                                tenor: { [Op.substring]:req.query.tenor }
                                                        }
                                }
                        }

                        const members_loan = await Loan.findAll(condition);
                        const count = await Loan.count(condition);

                        return res.status(200).json({
                                status: 200,
                                data: members_loan,
                                message: {
                                        page: req.query.page,
                                        row: req.query.row,
                                        total: count,
                                        message: "Success retrieve data."
                                }
                        });

                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        const view = async (req, res) => {
                const { id } = req.params;
                try {
                        const member = await Loan.findOne({
                                where: {
                                        id:id
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

        const loan_approval = async (req, res) => {
                const { body, decoded } = req;
                const { loan_id, is_approved } = req.params;
                try {
                        var data = {
                                is_loan_approved:0
                        }

                        if(is_approved == 1) {
                                data.is_loan_approved = 1;
                                data.approved_by_admin_id = decoded.id;
                                data.approved_date = new Date();

                                generate_collections(loan_id);
                        }
                        if(is_approved == 2) data.is_loan_approved = 2;
                        if(is_approved == 3) data.is_loan_approved = 3;
                        if(is_approved == 4) data.is_loan_approved = 4;

                        const approval = await Loan.update( data, {
                                        where: {        id: loan_id     }
                        });

                        if(approval){
                                return res.status(200).json({
                                        status: 201,
                                        data: [],
                                        message: "Success update approval data."
                                });
                        }

                        return res.status(200).json({
                                status: 400,
                                data: [],
                                message: "Failed to update approval data!"
                        });

                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        const generate_collections = async (loan_id) => {
                await Loan.findOne({
                        where: {
                                id:loan_id
                        },
                })
                .then(async (loan_detail) => {
                        var data = [];
                        var tmp = {}

                        for(i=0; i<loan_detail.tenor; i++){
                                tmp.koperasi_id = loan_detail.koperasi_id;
                                tmp.member_id = loan_detail.member_id;
                                tmp.member_name = loan_detail.member_name;
                                tmp.ao_id = loan_detail.ao_id;
                                tmp.ao_name = loan_detail.ao_name;
                                tmp.loan_id = loan_detail.id;
                                tmp.cicilan_ke = i + 1;

                                data.push(tmp);
                                tmp = {};

                                if(i == loan_detail.tenor - 1){
                                        await Collection.bulkCreate(data, {returning: true})
                                }
                        }
                });
        };

        return {
                add,
                list,
                view,
                loan_approval
        };
};

module.exports = LoanController;
