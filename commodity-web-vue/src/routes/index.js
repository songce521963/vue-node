import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import { auth, progressStart, progressDone } from './routerAround'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach(auth)
router.beforeEach(progressStart)
router.afterEach(progressDone)

export default router
