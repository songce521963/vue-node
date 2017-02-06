import KoaRouter from 'koa-router'
import model from '../model'
var fs = require('fs');
var path = require('path');
let router = KoaRouter()
let Commodity = model.Commodity
let Category = model.Category
Commodity.belongsTo(Category, { foreignKey: 'category' })

router.prefix('/api/commodity')

router
    .param('id', (id, ctx, next) => {
        ctx.id = id
        if (!ctx.id) return ctx.status = 404
        return next()
    })
    .get('/type/:type', async(ctx) => {
        const commodities = await Commodity.findAll({
            include: [{
                model: Category,
                where: {
                    type: ctx.params.type
                }
            }],
            
        })
        ctx.body = commodities
    })
    .get('/:id', async(ctx) => {
        const commodity = await Commodity.find({
            where: {
                id: ctx.id
            }
        })
        ctx.body = commodity
    })
    .post('/', async(ctx) => {

        var dataString = ctx.request.body.images
        if(dataString.length > 0) {
            var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

            var type = matches[1].replace(/^image\//, '');  
            var dataBuffer = new Buffer(matches[2], 'base64');//base64解码  
            var newPath = path.join('public/upload', parseInt(Math.random()*100) + Date.parse(new Date()).toString() + '.' + type);
            fs.writeFile(newPath, dataBuffer, function(err) {
                if(err) throw err
            });

            ctx.request.body.picture = newPath.replace(/^public/, '')
        }

        const commodity = await Commodity.create(ctx.request.body)
        ctx.body = commodity
    })
    .put('/:id', async(ctx) => {

        var dataString = ctx.request.body.images
        if(dataString.length > 0 ) {
            var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

            var type = matches[1].replace(/^image\//, '');  
            var dataBuffer = new Buffer(matches[2], 'base64');//base64解码  
            var newPath = path.join('public/upload', parseInt(Math.random()*100) + Date.parse(new Date()).toString() + '.' + type);
            fs.writeFile(newPath, dataBuffer, function(err) {
                if(err) throw err
            });

            ctx.request.body.picture = newPath.replace(/^public/, '')
        }

        const commodity = await Commodity.update(ctx.request.body, {
            where: {
                id: ctx.id
            }
        })
        ctx.body = commodity
    })
    .del('/:id', async(ctx) => {
        await Commodity.destroy({
            where: {
                id: ctx.id
            }
        })
        ctx.body = ctx.id
    })


export default router
