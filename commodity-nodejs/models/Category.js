import db from '../common/db';
import sequelize from 'sequelize';

module.exports = db.define('Category', {
    id: {
        primaryKey: true,
        type: sequelize.INTEGER,
        field: 'id'
    },
    name: {
        type: sequelize.STRING,
        field: 'name'
    },
    order: {
        type: sequelize.INTEGER,
        field: 'order'
    },
    picture: {
        type: sequelize.STRING,
        field: 'picture'
    },
    type: {
        type: sequelize.INTEGER,
        field: 'type'
    }
}, {
    tableName: "category",
    timestamps: false
});