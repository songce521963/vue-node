import { Notification, Loading } from 'element-ui'
import Vue from 'vue'

export const error = (request, next) => {
    next((response) => {
        if (!response.ok) {
            Notification.error('系统异常,请联系管理员。')
        }
        return response
    })
}
