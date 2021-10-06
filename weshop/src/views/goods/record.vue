<template>
  <div class="app-container">
    会员列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- <el-form-item>
        <el-input v-model="tOrderQuery.name" placeholder="会员名" />
      </el-form-item> -->

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="tOrderQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >

      <el-table-column
        label="序号"
        width="50"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="订单ID" width="180" />

      <el-table-column prop="productTitle" label="商品名称" width="120" />

      <el-table-column prop="productId" label="商品ID" width="120" />

      <el-table-column prop="nickname" label="购买人昵称" width="160" />

      <el-table-column prop="memberId" label="购买人ID" width="160" />

      <el-table-column prop="money" label="奖励金额" width="160"/>

      <el-table-column prop="totalFee" label="出售价格" width="160" />

      <el-table-column label="商品类型" width="200">
        <template slot-scope="scope">
          {{ scope.row.payType===0?'普通商品':'秒杀商品' }}
        </template>
      </el-table-column>
      <!-- width="200" -->
      <el-table-column prop="gmtCreate" label="成交时间" width="200"/>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/member/edit/'+scope.row.userId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link> -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
import record from '@/api/goods/record'
export default {
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 3, // 每页记录数
      total: 0, // 总记录数
      tOrderQuery: {} // 条件封装对象
    }
  },
  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    this.getList()
  },
  methods: {
    // 列表的方法
    getList(page = 1) {
      this.page = page
      record.getOrderCondition(this.page, this.limit, this.tOrderQuery)
        .then(response => { // 请求成功
          // response接口返回的数据
          // console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        })
    },
    resetData() { // 清空的方法
      // 表单输入项数据清空
      this.tOrderQuery = {}
      // 查询所有讲师数据
      this.getList()
    },
    // 删除成员的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除成员记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        record.deletOrderId(id)
          .then(response => { // 删除成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 回到列表页面
            this.getList()
          })
      }) // 点击取消，执行catch方法
    }

  }
}

</script>
