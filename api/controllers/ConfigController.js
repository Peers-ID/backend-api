const Config = require('../models/Config');


const ConfigController = () => {

        const add = async (req, res) => {
                const { body } = req;

                try {
                        var data = {
                                env: body.env,
                                key: body.key,
                                value: body.value,
                        };

                        const ConfigInsert = await Config.create(data);

                        return res.status(201).json({
                                status: 201,
                                data: ConfigInsert,
                                message: "Config inserted successfully"
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
                        const configs = await Config.findAll();

                        return res.status(200).json({
                                status: 200,
                                data: configs,
                                message:  "Success retrieve data."
                        });

                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };

        const view = async (req, res) => {
                const { id } = req.params;
                try {
                        const member = await Config.findOne({
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

        const edit = async (req, res) => {
                const { body } = req;
                const { id } = req.params;
                try {
                        const configs = await Config.update(
                                {
                                        env: body.env,
                                        value: body.value,
                                }
                        , {
                                  where: {
                                          id:id
                                  }
                        });

                        if(configs){
                                return res.status(200).json({
                                        status: 201,
                                        data: [],
                                        message: "Success update config."
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

        return {
                add,
                list,
                view,
                edit
        };
};

module.exports = ConfigController;
