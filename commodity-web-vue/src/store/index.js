import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'
import vueResource from 'vue-resource'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
    count: 0,
    fullscreenLoading: false,
    wait: {
        message: '正在请求数据，请等待',
        display: false,
        style: {
            display: 'none'
        }
    },
    userInfo: {
        name: 'test',
        role: 'test'
    },
    userInfoUrl: '/api/userInfo',
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
