const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'koperasi_cutoff_time';

const KoperasiCutOffConfig = sequelize.define('KoperasiCutOffConfig', {
        koperasi_id: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false, defaultValue:0
        },
        hours: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        },
        minutes: {
                type: Sequelize.INTEGER,
                allowNull: false, defaultValue:0
        }
}, {
        hooks,
        tableName,
        //timestamps: false
});

// eslint-disable-next-line /
KoperasiCutOffConfig.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        return values;
};

module.exports = KoperasiCutOffConfig;
