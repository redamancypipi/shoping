<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="商品名称">
        <el-input v-model="product.title"/>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number v-model="product.price" min="0"/>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="product.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 商品图片 -->
      <el-form-item label="课程封面">

        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          action="http://localhost:8002/shoposs/fileoss"
          class="avatar-uploader">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>

      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import secKillingProduct from '@/api/goods/sec-killing'
export default {
  data() {
    return {
      product: {
        cover: '',
        payType: 2,
        price: 0,
        title: '',
        status: 'Draft',
        intro: ''
        // isDeleted: false
      },
      imageUrl: '',
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  watch: { // 监听
    $route(to, from) { // 路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  created() { // 页面渲染之前执行
    this.init()
  },

  methods: {
    init() {
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        // 调用根据id查询的方法
        this.getInfo(id)
      } else { // 路径没有id值，做添加
        // 清空表单
        this.product = {}
      }
    },
    saveOrUpdate() {
      // this.saveBtnDisabled = true
      // this.saveData()
      if (!this.product.id) {
        // 添加
        this.saveData()
      } else {
        // 修改
        this.updateProduct()
      }
    },
    getInfo(id) {
      secKillingProduct.getSecKillingProductInfo(id)
        .then(response => {
          console.log(response.data)
          this.product = response.data.productSecKilling
          this.imageUrl = response.data.productSecKilling.cover
        })
    },
    // 保存
    saveData() {
      secKillingProduct.addSecKillingProduct(this.product)
        .then(response => {
          console.log(this.product)
          console.log('00000')
          console.log(response)
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/goods/goodsmanage/killing/list' })
        })
    },
    // 修改商品
    updateProduct() {
      secKillingProduct.updateSecKillingProductInfo(this.product)
        .then(response => {
          console.log(response)
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/goods/goodsmanage/killing/list' })
        })
    },
    // 上传封面成功调用的方法
    handleAvatarSuccess(res) {
      console.log(res)
      this.product.cover = res.data.url
      this.imageUrl = this.product.cover
    },
    // 上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      return isJPG && isLt2M
    }

  }
}
</script>
<style scope>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
