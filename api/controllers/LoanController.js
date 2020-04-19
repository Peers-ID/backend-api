const Loan = require('../models/Loan');
const Member = require('../models/Member');
const User = require('../models/User');
const LoanFormulaConfig = require('../models/LoanFormulaConfig');

const LoanController = () => {

        const add = async (req, res) => {
                const { body } = req;

                try {
                        var data = {
                                koperasi_id: body.koperasi_id,
                                member_id: body.member_id,
                                member_handphone: body.member_handphone,
                                ao_id: body.ao_id,
                                formula_id: body.formula_id,
                                jumlah_loan: body.jumlah_loan,
                                total_disbursed: body.total_disbursed,
                                tenor: body.tenor,
                                cicilan_per_bln: body.cicilan_per_bln
                        };


                                                await Member.findAll({
                                                        attributes: ['nama_lengkap'],
                                                        where: { member_id:body.member_id }
                                                }).then((member_items) =>
                                                        data.member_name = member_items[0].nama_lengkap
                                                );

                                                await User.findAll({
                                                        attributes: ['fullname'],
                                                        where: { id:body.ao_id, role: "Admin AO" }
                                                }).then((ao_items) =>
                                                        data.ao_name = ao_items[0].fullname
                                                );

                                                await LoanFormulaConfig.findAll({
                                                        attributes: ['tenure_cycle', 'service_type'],
                                                        where: { id:body.formula_id }
                                                }).then((formula_items) => {
                                                        data.tenor_cycle = formula_items[0].tenure_cycle;
                                                        data.service_type = formula_items[0].service_type;
                                                });

                                                const LoanInsert = await Loan.create(data);

                        return res.status(201).json({
                                status: 201,
                                data: LoanInsert,
                                message: "Data inserted successfully"
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

                        if(req.query.column !== undefined && req.query.sort !== undefined){ condition.order = [[req.query.column, req.query.sort]] }

                        if(req.query.member_id !== undefined){ condition.where.member_id = Number(req.query.member_id) }
                        if(req.query.koperasi_id !== undefined){ condition.where.koperasi_id = Number(req.query.koperasi_id) }
                        if(req.query.status !== undefined){ condition.where.is_loan_approved = req.query.status }
                        if(req.query.keyword !== undefined){ status = req.query.keyword }

                        const members_loan = await Loan.findAll(condition);
                        const count = await Loan.count(condition);

                        return res.status(200).json({
                                status: 200,
                                data: members_loan,
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
                const { member_id, is_approved } = req.params;
                try {
                        var data = {
                                is_loan_approved:0,
                                approved_by_admin_id: decoded.id,
                                approved_date: new Date()
                        }

                        if(is_approved == 1) data.is_loan_approved = 1;

                        const approval = await Loan.update(
                                data
                                , {
                                        where: {
                                                member_id:member_id
                                        }
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

        // router.get('/booking-information', function (req, res) {
        //           // Get orders
        //           Promise.all([
        //                     Order.findAll({
        //                               /*where: {
        //                                         endDate: null,
        //                               },*/
        //                               order: [
        //                                       ['id', 'DESC'],
        //                               ]
        //                     }),
        //                     Professional.findAll({
        //                               where: {
        //                                       status: '1'
        //                               }
        //                     })
        //           ])
        //           .then(([orders, professionals]) => {
        //                     orders.map((order) => {
        //                                 let professionalsInSameArea = professionals.filter((professional) => {
        //                                           return (professional.service === order.service
        //                                                  || (professional.secondary_service || '').toLowerCase().indexOf((order.service || '').toLowerCase()) > -1)
        //                                                         && (professional.area === order.area
        //                                                 || order.area === professional.secondary_area);
        //                                 });
        //                                 order.professionals = professionalsInSameArea; //you don't need to spread, then make an array
        //                                 return order;
        //                     });
        //                     res.render('booking-information', { title: 'Technician', orders: orders, user: req.user });
        //           })
        //           .catch((err) => {
        //                   console.error(err);
        //           });
        // });

        return {
                add,
                list,
                view,
                loan_approval
        };
};

module.exports = LoanController;
