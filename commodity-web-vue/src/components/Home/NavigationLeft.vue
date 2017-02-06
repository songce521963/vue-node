<template>
    <el-menu :default-active="index" class="el-menu-vertical-demo" theme="dark" :router="true" @open="handleOpen" @close="handleClose">
        <el-menu-item v-for="(menu, index) of menus" :index="menu.index" :route="menu.route"><i :class="menu.className"></i>{{menu.displayName}}</el-menu-item>
    </el-menu>
</template>
<script>
export default {
    created() {
            for (let menu of this.menus) {
                if (this.$route.path == menu.path) {
                    this.index = menu.index
                }
            }
        },
        data() {
            return {
                index: '1',
                menus: [{
                    index: '1',
                    name: 'BIndex',
                    displayName: '首页',
                    route: {
                        name: 'BIndex'
                    },
                    className: 'glyphicon glyphicon-home',
                    path: '/admin'
                }, {
                    index: '2',
                    name: 'BCommodity',
                    displayName: '产品管理',
                    route: {
                        name: 'BCommodity',
                        params: {
                            cId: 1
                        }
                    },
                    className: 'el-icon-menu',
                    path: '/admin/commodity/1'
                }, {
                    index: '3',
                    name: 'BCommodity',
                    displayName: '服务管理',
                    route: {
                        name: 'BCommodity',
                        params: {
                            cId: 2
                        }
                    },
                    className: 'el-icon-menu',
                    path: '/admin/commodity/2'
                }, {
                    index: '4',
                    name: 'BCategory',
                    displayName: 'Master管理',
                    route: {
                        name: 'BCategory'
                    },
                    className: 'el-icon-menu',
                    path: '/admin/category'
                }]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            toHome(key, keyPath) {
                console.log(key, keyPath);
            }
        }
}
</script>
<style scoped>
.glyphicon {
   vertical-align: baseline;
    margin-right: 10px;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
}
</style>
