<template>
  <div class="app-container">
    会员列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="memberQuery.name" placeholder="会员名" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="memberQuery.schoolName" placeholder="学校名称" />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="memberQuery.begin"
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
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="会员ID" width="200" />

      <el-table-column prop="nickname" label="微信名" width="200" />

      <el-table-column prop="schoolName" label="学校名称" />

      <el-table-column prop="sno" label="学号" width="220" />

      <el-table-column prop="tel" label="电话" width="220" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
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
import member from '@/api/member/member'
export default {
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 3, // 每页记录数
      total: 0, // 总记录数
      memberQuery: {} // 条件封装对象
    }
  },
  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    this.getList()
  },
  methods: {
    // 成员列表的方法
    getList(page = 1) {
      this.page = page
      member.getMemberCondition(this.page, this.limit, this.memberQuery)
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
      this.memberQuery = {}
      // 查询所有数据
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
        member.deletMembererId(id)
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
