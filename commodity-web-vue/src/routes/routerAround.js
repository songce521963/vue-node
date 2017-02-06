import NProgress from 'nprogress' //页面顶部进度条
import 'nprogress/nprogress.css'

export const auth = (to, from, next) => {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (!user && to.path != '/login' && to.path.indexOf('admin')>= 0) {
        next({ path: '/login' })
    }
    next()
}

NProgress.configure({ ease: 'ease', speed: 500 })
export const progressStart = (to, from, next) => {
    NProgress.start()
    next()
}

export const progressDone = transition => {
    NProgress.done()
}