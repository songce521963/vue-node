import Sequelize from 'sequelize'
import config from'../conf/config'

console.log('init sequelize...')

export default new Sequelize({
    dialect: config.dialect,
    storage: config.storage
})


