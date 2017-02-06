import db from '../common/db';
import sequelize from 'sequelize';

module.exports = db.define('commodity', {
    id: {
        primaryKey: true,
        type: sequelize.INTEGER,
        field: 'id'
    },
    name: {
        type: sequelize.STRING,
        field: 'name'
    },
    category: {
        type: sequelize.STRING,
        field: 'category'
    },
    summary: {
        type: sequelize.STRING,
        field: 'summary'
    },
    picture: {
        type: sequelize.STRING,
        field: 'picture'
    },
    productDemo: {
        type: sequelize.STRING,
        field: 'product_demo'
    },
    order: {
        type: sequelize.INTEGER,
        field: 'order'
    },
    productDesc: {
        type: sequelize.STRING,
        field: 'product_desc'
    },
    productInfo: {
        type: sequelize.STRING,
        field: 'product_info'
    },
    homePage: {
        type: sequelize.STRING,
        field: 'home_page'
    }
}, {
    tableName: "commodity",
    timestamps: false
});