import Vue from 'vue'
import { createResource } from './resource'
import 'assets/css/main.css'
import 'assets/css/bootstrap.min.css'
import 'assets/css/ionicons.min.css'
import 'assets/js/main.js'
import 'assets/js/bootstrap.min.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './routes/index'
import App from './App'
//vue resource
import vueResource from 'vue-resource'

Vue.use(ElementUI)

//vue resource
createResource()

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
