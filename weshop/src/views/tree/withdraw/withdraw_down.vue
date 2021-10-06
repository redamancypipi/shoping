<template>
  <div class="app-container">
    已审核提现页面

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
      <el-table-column prop="id" label="提现id" width="250" />
      <el-table-column prop="userId" label="提现用户ID" width="250" />

      <el-table-column prop="money" label="提现金额" width="200" />

      <el-table-column prop="moneyOrigin" label="提现前拥有金额" width="200" />

      <el-table-column prop="moneyNew" label="提现后拥有金额" width="200" />

      <el-table-column label="当前状态" width="200">
        <template slot-scope="scope">
          {{ scope.row.ststus==='1'?'已审核':'未审核' }}
        </template>
      </el-table-column>

      <el-table-column label="提现时间" width="250">
        <template slot-scope="scope">
          {{ scope.row.isPassed==='1'?'已同意':'未同意' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="提现时间"/>

      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="editWithdraw(scope.row.id)">确定</el-button>
        </template>
      </el-table-column> -->
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
import withDraw from '@/api/withdraw/withDraw'
export default {
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      statusQuery: {
        ststus: '1'
      } // 条件封装对象
    }
  },
  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    this.getList()
  },
  methods: {

    getList(page = 1) {
      this.page = page
      withDraw.getPassedList(this.page, this.limit, this.statusQuery)
        .then(response => {
          // console.log(this.statusQuery, '0000')
          console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        })
    },
    resetData() {
      this.statusQuery = {
        ststus: '0'
      }
      // 查询所有数据
      this.getList()
    },
    // 同意提现
    editWithdraw(id) {
      this.$confirm('此操作将同意该成员提现, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'confirm'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        withDraw.editWithdraw(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '同意提现成功!'
            })
            // 回到列表页面
            this.getList()
          })
      }) // 点击取消，执行catch方法
    }

  }
}

</script>
