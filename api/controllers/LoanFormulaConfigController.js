const LoanFormulaConfig = require('../models/LoanFormulaConfig');
const LoanOtherFee = require('../models/LoanOtherFee');

const sequelize = require('../../config/database');

const LoanFormulaConfigController = () => {
        const add = async (req, res) => {
                const { body, decoded } = req;

                const t = await sequelize.transaction();

                try {
                        const LoanFormula = await LoanFormulaConfig.upsert({
                                koperasi_id: body.koperasi_id,
                                formula_name: body.formula_name,
                                min_loan_amount: body.min_loan_amount,
                                max_loan_amount: body.max_loan_amount,
                                kelipatan: body.kelipatan,
                                min_tenure: body.min_tenure,
                                max_tenure: body.max_tenure,
                                tenure_cycle: body.tenure_cycle,
                                service_type: body.service_type,
                                service_amount: body.service_amount,
                                service_cycle: body.service_cycle
                        },
                        { transaction: t });

                        await LoanFormulaConfig.findOne({
                                where: {
                                        koperasi_id: body.koperasi_id
                                }
                        },
                        { transaction: t })
                        .then(async (getID) => {

                                if (Array.isArray(body.other_fee) && body.other_fee.length){
                                        var otherFee = new Array();
                                        var items = new Object();

                                        for (i = 0; i < body.other_fee.length; i++) {
                                                items.formula_id = getID.id;
                                                items.service_name = body.other_fee[i].service_name;
                                                items.service_type = body.other_fee[i].service_type;
                                                items.service_amount = body.other_fee[i].service_amount;
                                                items.service_cycle = body.other_fee[i].service_cycle;

                                                otherFee.push(items);
                                                items = {};
                                        }

                                        const delOtherFee = await LoanOtherFee.destroy({
                                                  where: {
                                                          formula_id: getID.id
                                                  }
                                        },
                                        { transaction: t });

                                        const bulkOtherFee = await LoanOtherFee.bulkCreate(
                                                otherFee
                                        ,
                                        { transaction: t });
                                }

                        });

                        await t.commit();

                        return res.status(201).json({
                                status: 201,
                                data: [],
                                message: "Formula successfully added"
                        });

                } catch (err) {
                        await t.rollback();

                        return res.status(200).json({
                                status: 500,
                                data: "",
                                message: "Error Add LoanFormulaConfig: " + err
                        });
                }
        };

        const list = async (req, res) => {
                try {
                        const formulas = await LoanFormulaConfig.findAll();

                        return res.status(200).json({
                                status: 200,
                                data: formulas,
                                message: "Success retrieve"

                        });
                } catch (err) {
                        return res.status(200).json({
                                status: 500,
                                data: "",
                                message: "Error: " + err
                        });
                }
        };

        const list_other_fee = async (req, res) => {
                const formula_id = req.params.frm_id;

                try {
                        const formulas = await LoanOtherFee.findAll({
                                                where: {
                                                        formula_id:formula_id
                                                },
                                        });

                        return res.status(200).json({
                                status: 200,
                                data: formulas,
                                message: "Success retrieve"

                        });
                } catch (err) {
                        return res.status(200).json({
                                status: 500,
                                data: "",
                                message: "Error: " + err
                        });
                }
        };

        // const edit = async (req, res) => {
        //         const { body } = req;
        //         const kop_id = req.params.kop_id;
        //         try {
        //                 const editConfig = await LoanFormulaConfigApprovalConfig.update(
        //                         {
        //                                 ao_can_approved: body.ao_can_approved
        //                         }
        //                         , {
        //                                 where: {
        //                                         koperasi_id:kop_id
        //                                 }
        //                         });
        //
        //                         if(editConfig.toString() == "1"){
        //                                 return res.status(200).json({
        //                                         status: 201,
        //                                         data: [],
        //                                         message: "Success update config."
        //                                 });
        //                         }
        //
        //                         return res.status(200).json({
        //                                 status: 400,
        //                                 data: [],
        //                                 message: "Failed to update config!"
        //                         });
        //
        //                 } catch (err) {
        //                         console.log(err);
        //                         return res.status(500).json({ msg: 'Internal server error' });
        //                 }
        // };
        //
        const view = async (req, res) => {
                const kop_id = req.params.kop_id;
                try {
                        const config = await LoanFormulaConfig.findAll({
                                where: {
                                        koperasi_id:kop_id
                                },
                        });

                        return res.status(200).json({
                                status: 200,
                                data: config,
                                message: "Success retrieve loan formula."
                        });

                } catch (err) {
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        return {
                add,
                list,
                list_other_fee,
                // edit,
                view
        };
};

module.exports = LoanFormulaConfigController;
