<template>
  <div class="app-container">
    <el-form label-width="120px">

      <el-form-item label="投诉原因：">
        <el-input v-model="product.opinion" readonly />
      </el-form-item>

      <el-form-item label="投诉详情">

        <img :src="product.cover">

      </el-form-item>

      <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">同意</el-button>
    </el-form>
  </div>
</template>
<script>
import memberComplain from '@/api/complain/member_complain'
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
      memberComplain.getMemberComplainInfo(id)
        .then(response => {
          console.log(response.data)
          this.product = response.data.memberOpinion
        })
    },
    // 修改
    updateProduct() {
      memberComplain.updateMemberComplainInfo(this.product)
        .then(response => {
          console.log(response)
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/opinion/member' })
        })
    }
  }
}
</script>
