<template>
<div>
    <!-- preloader -->
    <div id="preloader"></div>
    <!-- end of preloader -->

    <div class="body-content">
        <div class="navbar-solid-state">
             <!-- Header -->
            <header id="header" class="alt">
                <!-- <h1><a href="index.html" class="a-transparent">Solid State</a></h1> -->
                <nav>
                    <a href="#menu" class="a-menu">MENU <i class="ion-android-menu"></i> </a>
                </nav>
            </header>

            <!-- Menu -->
            <nav id="menu">
                <div class="inner">
                    <h2>MENU</h2>
                    <ul class="links">
                        <li @click="link"><router-link :to="{name: 'Content'}">首页</router-link><li>
                        <li @click="link"><router-link :to="{name: 'Category', params: {type: 1}}">产品</router-link><li>
                        <li @click="link"><router-link :to="{name: 'Category', params: {type: 2}}">服务</router-link><li>
                        <!-- <li><a href="#">Log In</a></li>
                        <li><a href="#">Sign Up</a></li> -->
                    </ul>
                    <a href="#" class="close">Close</a>
                </div>
            </nav>
        </div>
       <div>
            <router-view></router-view>
       </div>
    </div>
</div>
</template>
<script>
export default {
    methods: {
        link(e) {
           //alert(e)
           e.preventDefault();
        }
    }
}
</script>