const User = require('../models/User');
const AccountRoleManagement = require('../models/v2/AccountRoleManagement');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const emailService = require('../services/email.service');

const UserController = () => {

    const add_account = async (req, res) => {
        const {body, decoded} = req;
        try {
            await User.create({
                koperasi_id: decoded.koperasi_id,
                fullname: body.fullname,
                phone_mobile: body.phone_mobile,
                birthdate: body.birthdate,
                email: body.email,
                password: body.fullname.substr(0, 1) + body.birthdate + body.phone_mobile.substr(-4),
                role: body.role,
                status: "active",
                ak_id: decoded.id
            }).then((user) => {
                if (user) {

                    const role = AccountRoleManagement.create({
                        id_koperasi: decoded.koperasi_id,
                        id_user: user.id,
                        approve_max_1jt: body.approve_max_1jt,
                        approve_max_3jt: body.approve_max_3jt,
                        approve_max_5jt: body.approve_max_5jt,
                        approve_max_10jt: body.approve_max_10jt,
                        approve_more_10jt: body.approve_more_10jt,
                        disburse_max_5jt: body.disburse_max_5jt,
                        disburse_max_10jt: body.disburse_max_10jt,
                        disburse_more_10jt: body.disburse_more_10jt,
                        repayment: body.repayment,
                        collection: body.collection,
                        mn_kinerja_koperasi: body.mn_kinerja_koperasi,
                        mn_pengaturan_pinjaman: body.mn_pengaturan_pinjaman,
                        mn_tambah_ao: body.mn_tambah_ao,
                        mn_tambah_admin: body.mn_tambah_admin,
                        mn_tambah_super_admin: body.mn_tambah_super_admin,
                        mn_management_pinjaman: body.mn_management_pinjaman,
                        mn_management_anggota: body.mn_management_anggota
                    }).then((role) => {
                        if (role) {
                            return res.status(200).json({
                                status: 200,
                                data: {},
                                message: "Inserted Successfully"
                            });
                        } else {
                            return res.status(200).json({
                                status: 500,
                                data: "",
                                message: "Failed Insert Role"
                            });
                        }
                    });
                } else {
                    return res.status(200).json({
                        status: 500,
                        data: "",
                        message: "Failed Insert"
                    });
                }
            });

        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
        }
    };

    const list_account = async (req, res) => {
        const {id, decoded} = req;
        try {
            const users = await User.findAll({
                where: {
                    koperasi_id: decoded.koperasi_id,
                },
            });

            return res.status(200).json({
                status: 200,
                data: users,
                message: "Success retrieve data"
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const edit_account = async (req, res) => {
        const {body, decoded} = req;
        try {

            var data = {
                id: body.id_user,
                koperasi_id: decoded.koperasi_id,
                fullname: body.fullname,
                phone_mobile: body.phone_mobile,
                birthdate: body.birthdate,
                password: body.fullname.substr(0, 1) + body.birthdate + body.phone_mobile.substr(-4),
                role: body.role,
                status: "active",
                ak_id: decoded.id
            };

            var role = {
                id_koperasi: decoded.koperasi_id,
                id_user: body.id_user,
                approve_max_1jt: body.approve_max_1jt,
                approve_max_3jt: body.approve_max_3jt,
                approve_max_5jt: body.approve_max_5jt,
                approve_max_10jt: body.approve_max_10jt,
                approve_more_10jt: body.approve_more_10jt,
                disburse_max_5jt: body.disburse_max_5jt,
                disburse_max_10jt: body.disburse_max_10jt,
                disburse_more_10jt: body.disburse_more_10jt,
                repayment: body.repayment,
                collection: body.collection,
                mn_kinerja_koperasi: body.mn_kinerja_koperasi,
                mn_pengaturan_pinjaman: body.mn_pengaturan_pinjaman,
                mn_tambah_ao: body.mn_tambah_ao,
                mn_tambah_admin: body.mn_tambah_admin,
                mn_tambah_super_admin: body.mn_tambah_super_admin,
                mn_management_pinjaman: body.mn_management_pinjaman,
                mn_management_anggota: body.mn_management_anggota
            };

            await User.update(data, {
                where: {
                    id: body.id_user,
                    koperasi_id: decoded.koperasi_id,
                }
            });

            await AccountRoleManagement.update(role, {
                where: {
                    id_user: body.id_user,
                    id_koperasi: decoded.koperasi_id,
                }
            });

            return res.status(200).json({
                status: 200,
                data: [],
                message: "Data updated  successfully"
            });

        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
        }
    };

    /*------------------------------------------- END PHASE 2 ------------------------------------*/

    const add_ao = async (req, res) => {
        const {body, decoded} = req;

        try {
            const user = await User.create({
                koperasi_id: decoded.koperasi_id,
                fullname: body.fullname,
                phone_mobile: body.phone_mobile,
                birthdate: body.birthdate,
                email: body.email,
                password: body.fullname.substr(0, 1) + body.birthdate + body.phone_mobile.substr(-4),
                role: "Admin AO",
                status: "active",
                ak_id: decoded.id
            });
            const token = authService().issue({id: user.id});

            if (user) {
                const password = body.fullname.substr(0, 1) + body.birthdate + body.phone_mobile.substr(-4);

                emailService().welcomeMessage(body.fullname, body.email, password);
            }

            return res.status(201).json({
                status: 201,
                data: {token, user},
                message: "Registered successfully: "
            });
        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
        }

    };

    const list_ao = async (req, res) => {
        const {id} = req.params;
        try {
            const users = await User.findAll({
                where: {
                    role: "AO/CMO/Sales",
                },
            });

            return res.status(200).json({
                status: 200,
                data: users,
                message: "Success retrieve data." + id
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const view_ao = async (req, res) => {
        const id = req.params.id;
        try {
            const users = await User.findAll({
                where: {
                    role: "Admin AO",
                    id: id
                },
            });

            return res.status(200).json({
                status: 200,
                data: users,
                message: "Success retrieve data."
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const view_ao_by_akId = async (req, res) => {
        const ak_id = req.params.akId;
        try {
            let condition = {
                where: {role: "Admin AO", ak_id: ak_id}
            };

            if (req.query.page !== undefined && req.query.row !== undefined) {
                condition.limit = Number(req.query.row);
                condition.offset = req.query.page - 1;
            }

            if (req.query.column !== undefined && req.query.sort !== undefined) {
                condition.order = [[req.query.column, req.query.sort]]
            }

            const users = await User.findAll(condition);
            const count = await User.count(condition);

            return res.status(200).json({
                status: 200,
                data: users,
                message: {
                    page: req.query.page,
                    row: req.query.row,
                    total: count,
                    message: "Success retrieve data."
                }
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const edit_ao = async (req, res) => {
        const {body} = req;
        const id = req.params.id;
        try {
            const users = await User.update(
                {
                    fullname: body.fullname,
                    phone_mobile: body.phone_mobile,
                    birthdate: body.birthdate,
                    email: body.email,
                }
                , {
                    where: {
                        id: id
                    }
                });

            if (users) {
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
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const edit_ao_status = async (req, res) => {
        const {body} = req;
        const id = req.params.id;
        try {
            if (body.status == "active" || body.status == "inactive") {
                const users = await User.update(
                    {
                        status: body.status,
                    }
                    , {
                        where: {
                            id: id
                        }
                    });

                if (users) {
                    return res.status(200).json({
                        status: 201,
                        data: [],
                        message: "Success update status data."
                    });
                }
            }
            return res.status(200).json({
                status: 400,
                data: [],
                message: "Failed to update status data!"
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };

    const login = async (req, res) => {
        const {email, password} = req.body;

        if (email && password) {
            try {
                const user = await User.findOne({
                    where: {
                        email,
                    },
                });

                if (!user) {
                    return res.status(200).json({
                        status: 400,
                        data: "",
                        message: "User not found"
                    });
                }

                if (bcryptService().comparePassword(password, user.password)) {
                    const token = authService().issue({
                        id: user.id,
                        role: user.role,
                        koperasi_id: user.koperasi_id
                    });

                    return res.status(201).json({
                        status: 201,
                        data: {token, user},
                        message: "Successfully Logged In"
                    });
                }

                return res.status(200).json({
                    status: 401,
                    data: "",
                    message: "Invalid email or password"
                });
            } catch (err) {
                return res.status(500).json({
                    status: 500,
                    data: "",
                    message: "Sorry, try again later."
                });
            }
        }

        return res.status(200).json({
            status: 400,
            data: "",
            message: "Email or password is wrong."
        });
    };

    const change_password = async (req, res) => {
        const {email, password, password_new} = req.body;
        const pwd_new = {password: password_new};

        if (email && password) {
            try {
                const user = await User.findOne({
                    where: {
                        email,
                    },
                });

                if (!user) {
                    return res.status(200).json({
                        status: 400,
                        data: "",
                        message: "User not found"
                    });
                }

                if (bcryptService().comparePassword(password, user.password)) {
                    const users = await User.update(
                        {
                            password: bcryptService().password(pwd_new),
                        }
                        , {
                            where: {
                                email: email
                            }
                        });

                    if (users) {
                        return res.status(200).json({
                            status: 201,
                            data: [],
                            message: "Success change password"
                        });
                    }
                }
                return res.status(200).json({
                    status: 401,
                    data: "",
                    message: "Invalid email or password"
                });
            } catch (err) {
                // console.log(err);
                return res.status(500).json({
                    status: 500,
                    data: "",
                    message: "Sorry, try again later."
                });
            }
        }

        return res.status(200).json({
            status: 400,
            data: "",
            message: "Email or password is wrong."
        });
    };

    const forgot_password = async (req, res) => {
        const {email} = req.body;

        try {
            const user = await User.findOne({
                where: {email}
            });

            if (!user) {
                return res.status(200).json({
                    status: 400,
                    data: "",
                    message: "User not found"
                });
            } else {
                var result = emailService().forgotPassword(email);

                return res.status(200).json({
                    status: 200,
                    data: [],
                    message: result
                });
            }
        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: "",
                message: "Error: " + err
            });
        }
    };


    const validate = (req, res) => {
        const {token} = req.body;

        authService().verify(token, (err) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    data: {isValid: false},
                    message: "Inalid Token!"
                });
            }

            return res.status(200).json({
                status: 200,
                data: {isValid: true},
                message: "Valid Token"
            });
        });
    };

    const getAll = async (req, res) => {
        try {
            const users = await User.findAll();

            return res.status(200).json({users});
        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'});
        }
    };


    return {
        add_account,
        list_account,
        edit_account,



        add_ao,
        list_ao,
        view_ao,
        view_ao_by_akId,
        edit_ao,
        edit_ao_status,
        login,
        change_password,
        forgot_password,
        validate,
        getAll,
    };
};

module.exports = UserController;
