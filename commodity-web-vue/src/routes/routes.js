import BLogin from '../components/BLogin'
import BHome from '../components/BHome'
import BIndex from '../components/BIndex'
import BCommodity from '../components/BCommodity'
import BCategory from '../components/BCategory'
import NotFoundComponent from '../components/NotFoundComponent'
import Index from '../components/Index'
import Content from '../components/Content'
import Commodity from '../components/Commodity'
import Category from '../components/Category'

const indexRouters = [
    {
        path: '/',
        component: Index,
        children: [
            { path: '/', component: Content, name: 'Content' },
            { path: '/commodity/:category', component: Commodity, name: 'Commodity' },
            { path: '/category/:type', component: Category, name: 'Category' },
        ]
    }
]

const backgroundRouters = [
    { path: '/login', component: BLogin, name: 'BLogin' }, 
    {
        path: '/admin',
        component: BHome,
        children: [
            { path: '/', component: BIndex, name: 'BIndex' },
            { path: '/admin/commodity/:cId', component: BCommodity, name: 'BCommodity' },
            { path: '/admin/category', component: BCategory, name: 'BCategory' },
        ]
    }
]

const commonRouters = [
    { path: '*', component: NotFoundComponent },
]

export const routes = indexRouters.concat(backgroundRouters).concat(commonRouters)
