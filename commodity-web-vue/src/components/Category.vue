<template>
    <div id="demo">
        <!-- Page Wrapper -->
        <div id="elements-page-wrapper">
            <section class="fit-image">
                <div class="container">
                    <h1 class="elements-h">{{title.name}}</h1>
                    <br>
                    <div v-for="category of categorys">
                        <h4 class="elements-h elements-h4">{{category.name}}</h4>
                        <div class="row">
                            <div class="col-md-12" @click="link">
                                <router-link active-class="classification-link" :to="{name: 'Commodity', params: { category: category.id }}">
                                <img v-bind:src="category.picture" class="img-responsive img-fit" alt="Responsive image" />
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div>
</template>
<script>
export default {
    components: {},
    created() {
        console.log(this)
        let type = this.$route.params.type
        this.categorysUrl = '/api/category/' + type
        if(type == 1) {
            this.title.name = '产品'
        } else {
            this.title.name = '服务'
        }
        this.getCategorys()
    },
    data() {
        return {
            title: {},
            categorys: [],
            categorysUrl: ''
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route' (to, from) {
            let type = to.params.type
            this.categorysUrl = '/api/category/' + type
            if(type == 1) {
                this.title.name = '产品'
            } else {
                this.title.name = '服务'
            }
            this.getCategorys()
        }
    },
    methods: {
        getCategorys() {
            let _this = this
            this.$resource(this.categorysUrl).get()
                .then((response) => {
                    _this.categorys = response.data
                }).catch(function(response) {
                    console.log(response)
                })
        },
        link(e) {
           //alert(e)
           e.preventDefault();
        }
    }
}
</script>
