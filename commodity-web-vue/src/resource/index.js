import Vue from 'vue'
import vueResource from 'vue-resource'
import * as interceptors from './interceptors'

export const createResource = () => {
	Vue.use(vueResource)

	Object.keys(interceptors).forEach(key => {
		Vue.http.interceptors.push(interceptors[key])
	})
}