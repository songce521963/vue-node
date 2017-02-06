import Vue from 'vue'
import * as types from './mutation-types'

export const getUserInfo = ({ state, commit }) => {
    Vue.resource(state.userInfoUrl).get()
        .then(response => {
            commit(types.GET_USER_INFO_SUCCESS, response.data)
        })
}
