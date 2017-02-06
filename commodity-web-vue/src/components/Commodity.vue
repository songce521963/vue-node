<template>
    <div>
        <section id="element-header" class="elements-header">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="header-design">
                        <div class="col-md-12">
                            <h1 class="elements-h">{{ category.name }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="four">
            <div class="container">
                <div class="row">
                    <div class="col-md-6" v-for="commodity in commodities">
                        <div class="four-features four-features-left-bottom">
                            <div class="commodity-div">
                                <div class="features-img">
                                    <img class="commodity-img" v-on:click="goto(commodity.homePage)" v-bind:src="commodity.picture" alt="Responsive image">
                                </div>
                                <div class="commodity-content">
                                    <table style="width:95%">
                                        <tr>
                                            <td colspan="2"><h4>{{ commodity.name }}</h4></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"><textarea class="summary-text">{{ commodity.summary }}</textarea></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"><span><a v-bind:href="commodity.productDesc">产品营销说明</a></span></td>
                                        </tr>
                                        <tr>
                                            <td width="80"><span><a v-bind:href="commodity.productInfo">产品资料</a></span></td>
                                            <td><span><a v-bind:href="commodity.productDemo">产品Demo演示</a></span></td>
                                        </tr>
                                        <tr>
                                           
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        </div>
</template>
<script>
export default {
    components: {},
    created() {
        let category = this.$route.params.category
        this.commodityUrl = '/api/category/' + category + '/commodity'
        this.categoryUrl = '/api/category/detail/' + category
        this.getCategory()
        this.getCommodities()
    },
    data() {
        return {
            commodities: [],
            commodityUrl: '',
            category: '',
            categoryUrl: ''
        }
    },
    methods: {
        getCommodities() {
            let _this = this
            this.$resource(this.commodityUrl).get()
                .then((response) => {
                    console.log(response.data)
                    _this.commodities = response.data
                })
                .catch(function(response) {
                    console.log(response)
                })
        },
        getCategory() {
            let _this = this
            this.$resource(this.categoryUrl).get()
                .then((response) => {
                    console.log(response.data)
                    _this.category = response.data
                })
                .catch(function(response) {
                    console.log(response)
                })

        },
        goto(url) {
            window.location.href = url
        }
    }
}
</script>
<style>
.features-img{
    display: inline-block;
    float: left;
}  

.commodity-img{
    border-radius: 10px;
    width:110px;
    height: 110px;
    margin-top: 11px; 
}

.summary-text{
    border: 1px; 
    background-color: transparent;
}

.commodity-content{
    display: inline-block; 
    float: left;
    margin-left:5px;
}

.commodity-div{
    display: inline-block; 
    overflow: hidden; 
    white-space: nowrap;
}
</style>