<template>
    <el-form :model="commodityForm" :rules="rules" ref="commodityForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
            <el-input v-model="commodityForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类区分" prop="Classification">
            <el-select v-model="commodityForm.category" placeholder="请选择">
                <el-option v-for="(classification, index) of categorys" :label="classification.name" :value="classification.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="summary">
            <el-input v-model="commodityForm.summary"></el-input>
        </el-form-item>
        <el-form-item label="缩略图" prop="picture">
            <el-input v-model="commodityForm.picture"></el-input>
            <div style="margin-bottom: 20px">
                <a id='addPic' href="" v-on:click="addPic">添加图片 </a>
                <input type="file" @change="onFileChange" multiple style="display: none;">
            </div>
        </el-form-item>
        <el-form-item label="DemoLink" prop="productDemo">
            <el-input v-model="commodityForm.productDemo"></el-input>
        </el-form-item>
        <el-form-item label="公司首页" prop="homePage">
            <el-input v-model="commodityForm.homePage"></el-input>
        </el-form-item>
        <el-form-item label="营销说明连接" prop="productDesc">
            <el-input v-model="commodityForm.productDesc"></el-input>
        </el-form-item>
        <el-form-item label="资料连接" prop="productInfo">
            <el-input v-model="commodityForm.productInfo"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('commodityForm')">submit</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    props: {
        commodityUrl: String,
        commodityPUrl: String,
        commodityForm: Object
    },
    created() {
        let type = this.$route.params.cId
        this.getCategory(type)
    },
    data() {
        return {
            categorys: [],
            images: {},
            categoryUrl: '/api/category/{type}',
            rules: {
                name: [{
                    required: true,
                    message: '请输入活动名称',
                    trigger: 'blur'
                }]
            }
        };
    },
    watch: {
        '$route' (to, from) {
            let type = to.params.cId
            this.getCategory(type)    
        }
    },
    methods: {
        getCategory(type) {
            let _this = this
            this.$resource(this.categoryUrl).get({type})
                .then((response) => {
                    this.categorys = response.body
                    console.log(response.body)
                })
                .catch(function(response) {
                    console.log(response)
                })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.commodityForm.id ? this.editCommodity() : this.addCommodity()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        addCommodity() {
            let _this = this
            this.commodityForm.images = _this.images
            this.$resource(this.commodityUrl).save(this.commodityForm)
                .then((response) => {
                    this.$emit('handleCloseDialog')
                    this.$emit('handleCommoditysAddRow', response.body)
                    this.$notify({
                        type: 'success',
                        message: '添加成功!'
                    });
                })
                .catch(function(response) {
                    console.log(response)
                })
        },
        editCommodity() {
            let _this = this
            this.commodityForm.images = _this.images
            this.$resource(this.commodityPUrl).update({
                    id: this.commodityForm.id
                }, this.commodityForm)
                .then((response) => {
                    this.$emit('handleCloseDialog')
                    this.$emit('handleCommoditysUpdateRow',  Object.assign({}, this.commodityForm))
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
