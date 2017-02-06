<template>
    <div class="category">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="addButton">
          <el-button type="primary" @click="handleAdd">添加</el-button>

          <el-select v-model="default_id" @change="changeType">
            <el-option v-for="type in types" :label="type.name" :value="type.id">
          </el-option>
          </el-select>
        </div>

        <el-table :data="categorys" border style="width: 100%">

            <el-table-column prop="id" label="id" width="100">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="150">
            </el-table-column>
            <el-table-column prop="order" label="排序" width="100">
            </el-table-column>
            <el-table-column prop="picture" label="缩略图">
            </el-table-column>
            <el-table-column prop="type" label="分类区分" width="100">
            </el-table-column>

            <el-table-column label="" width="120" min-width="100">
                <template scope="scope" style="text-align:center" >
                    <el-button size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button size="small" icon="delete" type="danger" @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-dialog title="category" v-model="categoryDialog">
            <category-form ref="categoryForm"
            @handleCommoditysAddRow="handleCategorysAddRow"
            @handleCategorysUpdateRow="handleCategorysUpdateRow"
            @handleCloseDialog="handleCloseDialog"
            :categoryUrl="categoryUrl"
            :categoryPUrl="categoryPUrl"
            :categoryForm="categoryForm">
        </category-form>

        </el-dialog>
    </div>
</template>
<script>
import CategoryForm from './BCategoryForm'
export default {
    components: {
      CategoryForm
    },
    created() {
        this.categoryList(1)
        this.categoryForm = this.getCategoryForm()
    },
    data() {
        return {
            types:[{
              id: 1,
              name: '产品'
            }, {
              id: 2,
              name: '服务'
            }],
            default_id:1,
            categorys: [],
            categoryForm: {},
            categoryDialog: false,
            categoryUrl: '/api/category/{type}',
            categoryPUrl: '/api/category/{id}'
        }
    },
    watch: {
      categoryDialog(val, oldVal) {
            if (!val) {
                setTimeout(() => {
                    this.categoryForm = this.getCategoryForm()
                    this.$refs['categoryForm'].resetForm('categoryForm')
                }, 100)
            }
        }
    },
    methods: {
        getCategoryForm() {
            return {
                name: '输入名称',
                order: 1,
                picture: '/static/images/cl_city.jpg',
                type: ''
            }
        },
        categoryList(type) {
            let _this = this
            this.$resource(this.categoryUrl).get({
              type
            })
                .then((response) => {
                    _this.categorys = response.data
                })
                .catch(function(response) {
                    console.log(response)
                })
        },
        changeType(id) {
            this.categoryList(id)
        },
        handleAdd() {
            this.categoryDialog = true
        },
        handleEdit(index, row) {
            this.categoryForm = Object.assign({}, row)
            this.categoryDialog = true
        },
        handleDelete(index, row) {
            this.$confirm('Delete, Do you want to continue?', 'Confirm', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.deleteCategory(index, row.id);
            }).catch(() => {
                this.$notify({
                    title: 'Success',
                    message: 'Deleted deleted',
                    type: 'info'
                });
            });
        },
        handleCloseDialog() {
            this.categoryDialog = false
        },
        handleCategorysUpdateRow(category) {
        	/*this.categorys = this.categorys.map((item)=>{
        		if(item.id == category.id){
        			return category
        		}
        		return item
        	})*/
            this.categoryList()
        },
        handleCategorysAddRow(category) {
            //this.categorys.push(category)
            this.categoryList()
        },
        deleteCategory(index, id) {
            let _this = this
            this.$resource(this.categoryPUrl).delete({
                    id
                })
                .then((response) => {
                    _this.categorys.splice(index, 1)
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
  .category {
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
