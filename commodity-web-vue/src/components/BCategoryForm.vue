<template>
    <el-form :model="categoryForm" :rules="rules" ref="categoryForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
            <el-input v-model="categoryForm.name"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="order">
          <el-input v-model="categoryForm.order"></el-input>
        </el-form-item>

        <el-form-item label="分类区分">
          <el-select v-model="categoryForm.type">
            <el-option label="产品" value="1"></el-option>
            <el-option label="服务" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="缩略图" prop="picture">
            <el-input v-model="categoryForm.picture"></el-input>
            <div style="margin-bottom: 20px">
                <a id='addPic' href="" v-on:click="addPic">添加图片 </a>
                <input type="file" @change="onFileChange" multiple style="display: none;">
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('categoryForm')">submit</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    props: {
      categoryUrl: String,
      categoryPUrl: String,
      categoryForm: Object
    },
    created() {
        this.getCategory()
    },
    data() {
        return {
            categorys: [],
            images: {},
            categoryUrl: '/api/category',
            rules: {
                name: [{
                    required: true,
                    message: '请输入活动名称',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        getCategory() {
           {/* let _this = this
            this.$resource(this.categoryUrl).get()
                .then((response) => {
                    this.categorys = response.body
                    console.log(response.body)
                })
                .catch(function(response) {
                    console.log(response)
                })*/}
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.categoryForm.id ? this.editCategory() : this.addCategory()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        addCategory() {
            let _this = this
            this.categoryForm.images = _this.images
            this.$resource(this.categoryUrl).save(this.categoryForm)
                .then((response) => {
                    this.$emit('handleCloseDialog')
                    this.$emit('handleCategorysAddRow', response.body)
                    this.$notify({
                        type: 'success',
                        message: '添加成功!'
                    });
                })
                .catch(function(response) {
                    console.log(response)
                })
        },
        editCategory() {
            let _this = this
            this.categoryForm.images = _this.images
            this.$resource(this.categoryPUrl).update({
                    id: this.categoryForm.id
                }, this.categoryForm)
                .then((response) => {
                    this.$emit('handleCloseDialog')
                    this.$emit('handleCommoditysUpdateRow',  Object.assign({}, this.categoryForm))
                    console.log(response.body)
                    this.$notify({
                        type: 'success',
                        message: '修改成功!'
                    });
                })
                .catch(function(response) {
                    console.log(response)
                })
        },

        addPic(e){
                e.preventDefault();
                $('input[type=file]').trigger('click');
                return false;
        },

        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)return;
            this.createImage(files);
        },

        createImage(file) {
            if(typeof FileReader==='undefined'){
                alert('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }

            var image = new Image();
            var vm = this;
            var leng=file.length;
            for(var i=0;i<leng;i++){
                var reader = new FileReader();
                reader.readAsDataURL(file[i]);
                reader.onload =function(e){
                    vm.images = e.target.result;
                };
            }
        }
    }
}
</script>
