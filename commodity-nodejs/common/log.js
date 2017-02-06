import bunyan from 'bunyan'

export const log = bunyan.createLogger({
    name: 'commodity-nodejs',
    level: 'info',
    streams: [{
        level: 'info',
        stream: process.stdout
    }, {
        level: 'info',
        path: './commodity-nodejs.log'
    }]
})