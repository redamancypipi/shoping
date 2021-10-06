<template>
  <div class="app-container">

    <el-form label-width="120px">
      <el-form-item label="商品名称">
        <el-input v-model="product.productTitle" readonly />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="product.productPrice" readonly />
      </el-form-item>
      <el-form-item label="投诉原因">
        <el-input v-model="product.opinion" :rows="10" type="textarea" readonly />
      </el-form-item>

      <el-form-item label="投诉详情">

        <img :src="product.cover">

      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">同意</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import goodsComplain from '@/api/complain/goods_complain'
export default {
  data() {
    return {
      product: {},
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
      // 修改
      this.product.status = 1
      this.updateProduct()
    },
    getInfo(id) {
      goodsComplain.getGoodsComplainInfo(id)
        .then(response => {
          console.log(response.data)
          this.product = response.data.goodsOpinion
        })
    },
    // 修改
    updateProduct() {
      goodsComplain.updateGoodsComplainInfo(this.product)
        .then(response => {
          console.log(response)
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/opinion/goods' })
        })
    }
  }
}
</script>
