<template>
    <div id="top">
        <el-dropdown class="setting" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link"><i class="el-icon-setting ch"></i></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="setting">欢迎， {{userName}}</div>
    </div>
</template>
<script>
export default {
    created() {
            let user = JSON.parse(sessionStorage.getItem('user'))
            this.userName = user.username
        },
        data() {
            return {
                userName: ''
            }
        },
        methods: {
            handleCommand(command) {
               if(command=='logout'){
               		this.logout()
               }
            },
            logout() {
                this.$confirm('退出登录, 您确定要退出登录吗?', 'Confirm', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    sessionStorage.setItem('user', null)
                    this.$router.push({
                        name: 'BLogin'
                    })
                }).catch(() => {
                    console.log('error')
                });
            }
        }
}
</script>
<style>
.el-icon-setting {
    color: white;
    font-size: 20px;
}

.setting {
    margin-top: 14px;
    margin-right: 14px;
    float: right;
}
.ch{
	cursor:pointer
}
</style>
