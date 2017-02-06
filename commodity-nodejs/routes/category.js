import KoaRouter from 'koa-router';
import model from '../model';
import log from '../common/log';
var fs = require('fs');
var path = require('path');
let router = KoaRouter();
let Category = model.Category;
let Commodity = model.Commodity;
router.prefix('/api/category')

router.get('/', async(ctx) => {
    const category = await Category.findAll({
        order: [
            ['order']
        ]
    })
    ctx.body = category
})

router.get('/:type', async(ctx) => {
    const category = await Category.findAll({
        where: {
            type: ctx.params.type
        },
        order: [
            ['order']
        ]
    })
    ctx.body = category
})

router.get('/detail/:id', async(ctx) => {
    const category = await Category.find({
        where: {
            id: ctx.params.id
        }
    })
    ctx.body = category
})

router.get('/:id/commodity', async(ctx) => {
    const commodities = await Commodity.findAll({
        where: {
            category: ctx.params.id
        },
        order: [
            ['order']
        ]
    })
    ctx.body = commodities
})

router.post('/', async(ctx) => {

    var dataString = ctx.request.body.images
    if (dataString.length > 0) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

        var type = matches[1].replace(/^image\//, '');
        var dataBuffer = new Buffer(matches[2], 'base64'); //base64解码
        var newPath = path.join('public/upload', parseInt(Math.random() * 100) + Date.parse(new Date()).toString() + '.' + type);
        fs.writeFile(newPath, dataBuffer, function(err) {
            if (err) throw err
        });

        ctx.request.body.picture = newPath.replace(/^public/, '')
    }

    const category = await Category.create(ctx.request.body)
    ctx.body = category
})
router.put('/:id', async(ctx) => {

    var dataString = ctx.request.body.images
    if (dataString.length > 0) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

        var type = matches[1].replace(/^image\//, '');
        var dataBuffer = new Buffer(matches[2], 'base64'); //base64解码
        var newPath = path.join('public/upload', parseInt(Math.random() * 100) + Date.parse(new Date()).toString() + '.' + type);
        fs.writeFile(newPath, dataBuffer, function(err) {
            if (err) throw err
        });

        ctx.request.body.picture = newPath.replace(/^public/, '')
    }

    const category = await Category.update(ctx.request.body, {
        where: {
            id: ctx.params.id
        }
    })
    ctx.body = category
})

router.del('/:id', async(ctx) => {
    await Category.destroy({
        where: {
            id: ctx.params.id
        }
    })
    ctx.body = ctx.params.id
})

export default router
