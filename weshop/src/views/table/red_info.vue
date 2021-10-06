<template>
  <div class="app-container">
    <el-table
      :data="product"
      border
      fit
      highlight-current-row
    >

      <el-table-column
        label="序号"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="orderNo" label="订单号" />

      <el-table-column prop="nickname" label="昵称" />

      <el-table-column prop="productTitle" label="所购买商品名" />

      <el-table-column prop="totalFee" label="本次购买所花钱" />

      <el-table-column prop="money" label="本次购买所得红包" />

    </el-table>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">确定</el-button>
  </div>
</template>
<script>
import redpocket from '@/api/red/redpocket'
export default {
  data() {
    return {
      product: null,
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
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
      this.$router.push({ path: '/discount/redpocket' })
    },
    getInfo(id) {
      redpocket.getOrderList(id)
        .then(response => {
          console.log(response)
          this.product = response.data.productCollectList
        })
    }
  }
}
</script>
