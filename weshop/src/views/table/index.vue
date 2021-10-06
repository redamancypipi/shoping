<template>
  <div class="app-container">
    红包管理
    <!-- 表格 -->
    <el-table
      :data="list"
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
      <el-table-column prop="userId" label="用户ID" />

      <el-table-column prop="totalFee" label="拥有金额" />

      <el-table-column label="该用户得到红包详情" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/discount/redpocket_info/'+scope.row.userId">
            <el-button type="primary" size="mini" icon="el-icon-edit">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import redpocket from '@/api/red/redpocket'
export default {
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      redpocketQuery: {} // 条件封装对象
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
      redpocket.getRedpocketList()
        .then(response => {
          console.log(response)
          this.list = response.data.items
          console.log(this.list)
        })
    }

  }
}

</script>
