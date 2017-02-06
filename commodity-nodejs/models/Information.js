import db from '../common/db';
import sequelize from 'sequelize'

module.exports = db.define('information', {
    id: {
        primaryKey: true,
        type: sequelize.INTEGER,
        field: 'id'
    },
    name: {
        type: sequelize.STRING,
        field: 'name'
    },
    phone: {
        type: sequelize.STRING,
        field: 'phone'
    },
    location: {
        type: sequelize.STRING,
        field: 'location'
    },
    mail: {
        type: sequelize.STRING,
        field: 'mail'
    },
    summary: {
        type: sequelize.STRING,
        field: 'summary'
    },
    softwareSummary: {
        type: sequelize.INTEGER,
        field: 'software_summary'
    },
    marketSummary: {
        type: sequelize.INTEGER,
        field: 'market_summary'
    },
    contactMessage: {
        type: sequelize.INTEGER,
        field: 'contact_message'
    }
}, {
    tableName: "information",
    timestamps: false
})