<template>
  <div class="app-container">
    被投诉用户

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
      <el-table-column prop="userId" label="投诉用户ID" width="300" />

      <el-table-column prop="memberId" label="被投诉用户ID" width="300" />

      <el-table-column prop="status" label="该投诉状态" width="150" >
        <template slot-scope="scope">
          <div v-if="scope.row.status === '0'">
            <span style="color:red">待审核</span>
          </div>
          <div v-else-if="scope.row.status === '1'">
            <span style="color:green">已审核</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="投诉时间" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/opinion/member_info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">详情</el-button>
          </router-link>
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
import memberComplain from '@/api/complain/member_complain'
export default {
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      memberComplainQuery: {} // 条件封装对象
    }
  },
  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      memberComplain.getMemberComplainCondition(this.page, this.limit, this.memberComplainQuery)
        .then(response => {
          console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        })
    },
    resetData() {
      this.memberComplainQuery = {}
      // 查询所有
      this.getList()
    },
    // 删除的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        memberComplain.deleteMemberComplain(id)
          .then(response => {
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
