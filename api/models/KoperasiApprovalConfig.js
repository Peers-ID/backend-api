const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'form_koperasi_approval_config';

const KoperasiApprovalConfig = sequelize.define('KoperasiApprovalConfig', {
        koperasi_id: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false, defaultValue:0
        },
        ao_can_approved: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        }
}, {
        hooks,
        tableName,
        //timestamps: false
});

// eslint-disable-next-line /
KoperasiApprovalConfig.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        return values;
};

module.exports = KoperasiApprovalConfig;
