import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getLang } from '../util/storage'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from 'element-ui/lib/locale/lang/ja'

import en from './en'
import zh from './zh-CN'
import ja from './ja'


export const initialLocale = () => {
    Vue.use(VueI18n)

    Vue.locale('zh', Object.assign({}, zhLocale, zh))
    Vue.locale('en', Object.assign({}, enLocale, en))
    Vue.locale('ja', Object.assign({}, jaLocale, ja))

    let language = getLang('lang') || (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage

    Vue.config.lang = language
}
