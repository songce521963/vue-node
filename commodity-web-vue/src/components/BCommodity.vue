<template>
    <div class="commodity">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="addButton">
            <el-button type="primary" @click="handleAdd">添加</el-button>
        </div>
        <el-table :data="commoditys" border style="">
            <el-table-column prop="name" label="名称" width="120">
            </el-table-column>
            <el-table-column prop="Category.name" label="分类区分" width="100">
            </el-table-column>
            <el-table-column prop="summary" label="简介">
            </el-table-column>
            <el-table-column prop="picture" label="缩略图">
            </el-table-column>
            <el-table-column prop="productDemo" label="DemoLink">
            </el-table-column>
            <el-table-column prop="homePage" label="公司首页">
            </el-table-column>
            <el-table-column prop="productDesc" label="产品营销说明连接">
            </el-table-column>
            <el-table-column prop="productInfo" label="产品资料连接">
            </el-table-column>
            <el-table-column label="" width="120" min-width="100">
                <template scope="scope" style="text-align:center">
                    <el-button size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button size="small" icon="delete" type="danger" @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="commodity" v-model="commodityDialog">
            <commodity-form ref="commodityForm" @handleCommoditysAddRow="handleCommoditysAddRow" @handleCommoditysUpdateRow="handleCommoditysUpdateRow" @handleCloseDialog="handleCloseDialog" :commodityUrl="commodityUrl" :commodityPUrl="commodityPUrl" :commodityForm="commodityForm"></commodity-form>
        </el-dialog>
    </div>
</template>
<script>
import CommodityForm from './BCommodityForm'
export default {
    components: {
        CommodityForm
    },
    created() {
        let type = this.$route.params.cId
        type == 1 ? this.title = "产品管理" : this.title = "服务管理"
        this.commodityUrl = '/api/commodity/type/' + type
        this.commodityList()
        this.commodityForm = this.getCommodityForm()
    },
    data() {
        return {
            commoditys: [],
            commodityForm: {},
            title: '',
            commodityDialog: false,
            commodityUrl: '',
            commodityPUrl: '/api/commodity/{id}'
        }
    },
    watch: {
        commodityDialog(val, oldVal) {
            if (!val) {
                setTimeout(() => {
                    this.commodityForm = this.getCommodityForm()
                    this.$refs['commodityForm'].resetForm('commodityForm')
                }, 100)
            }
        },
        '$route' (to, from) {
            let type = to.params.cId
            type == 1 ? this.title = "产品管理" : this.title = "服务管理"
            this.commodityUrl = '/api/commodity/type/' + type
            this.commodityList()
        }
    },
    methods: {
        getCommodityForm() {
            return {
                name: '',
                category: 1,
                summary: '',
                picture: '',
                productDemo: '',
                order: 0,
                homePage: '',
                productDesc: '',
                productInfo: ''
            }
        },
        commodityList() {
            let _this = this
            this.$resource(this.commodityUrl).get()
                .then((response) => {
                    _this.commoditys = response.data
                })
                .catch(function(response) {
                    console.log(response)
                })
        },
        handleAdd() {
            this.commodityDialog = true
        },
        handleEdit(index, row) {
            this.commodityForm = Object.assign({}, row)
            this.commodityDialog = true
        },
        handleDelete(index, row) {
            this.$confirm('Delete, Do you want to continue?', 'Confirm', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.deleteCommodity(index, row.id);
            }).catch(() => {
                this.$notify({
                    title: 'Success',
                    message: 'Deleted deleted',
                    type: 'info'
                });
            });
        },
        handleCloseDialog() {
            this.commodityDialog = false
        },
        handleCommoditysUpdateRow(commodity) {
            /*this.commoditys = this.commoditys.map((item)=>{
                if(item.id == commodity.id){
                    return commodity
                }
                return item
            })*/
            this.commodityList()
        },
        handleCommoditysAddRow(commodity) {
            //this.commoditys.push(commodity)
            this.commodityList()
        },
        deleteCommodity(index, id) {
            let _this = this
            this.$resource(this.commodityPUrl).delete({
                    id
                })
                .then((response) => {
                    _this.commoditys.splice(index, 1)
                    this.$notify({
                        message: 'Delete success!',
                        type: 'success'
                    });
                })
        }
    }
}
</script>
<style scoped>
.commodity {
    padding: 10px;
}

.addButton {
    float: left;
    margin: 10px 0 10px 0;
}

.breadcrumb {
    margin: 10px 10 10px 0;
}
</style>
