import KoaRouter from 'koa-router'
import send from 'koa-send'
import commodity from './commodity'
import category from './category'
import user from './user'

let router = KoaRouter()

const routes = [
    user,
    commodity,
    category
]

export default function(app) {
    routes.forEach((route) => {
        app
            .use(route.routes())
            .use(route.allowedMethods({
                throw: true
            }))
    })
}
