import Vue from 'vue'
import * as types from './mutation-types'

export default {
    [types.ADD_COUNT](state, payload) {
        //Vue.set(state,'count',state.count+payload.amount)
        state.count += payload.amount
    }, [types.ADD_COUNT2](state) {
        state.count++
    }, [types.SET_WAIT_DISPLAY](state) {
        state.wait.display = !state.wait.display
        state.fullscreenLoading = !state.fullscreenLoading
    }, [types.GET_USER_INFO_SUCCESS](state, payload) {
        state.userInfo = {...state.userInfo, ...payload }
    }
}
