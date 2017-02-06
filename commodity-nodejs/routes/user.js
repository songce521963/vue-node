import KoaRouter from 'koa-router';

let router = KoaRouter();

router.prefix('/api/signin')

router.post('/', async(ctx) => {
    let { username, password } = ctx.request.body
    if (username == 'admin' && password == "123456") {
        ctx.body = ctx.request.body
    } else {
        ctx.body = {
            status : '1001'
        }
    }
})

export default router
