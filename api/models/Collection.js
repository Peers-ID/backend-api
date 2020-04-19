const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'collection';

const Collection = sequelize.define('Collection', {
        koperasi_id: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        member_id: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        member_name: {
                type: Sequelize.STRING,
                allowNull: false
        },
        ao_id: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        ao_name: {
                type: Sequelize.STRING,
                allowNull: false
        },
        loan_id: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        cicilan_ke: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        cicilan_jumlah: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        pokok: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        sukarela: {
                type: Sequelize.INTEGER,
                allowNull: true
        }
}, {
        hooks,
        tableName
});

// eslint-disable-next-line
Collection.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        return values;
};

module.exports = Collection;
