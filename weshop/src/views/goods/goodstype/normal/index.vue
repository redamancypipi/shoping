<template>
  <div class="app-container">
    普通商品列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="normalProductQuery.title" placeholder="商品名" />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="normalProductQuery.begin"
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
      <el-table-column prop="id" label="订单ID" width="200" />

      <el-table-column prop="userId" label="用户编号" width="200" />

      <el-table-column prop="title" label="商品名" width="150" />

      <el-table-column prop="priceNew" label="现在价格" width="150" />

      <el-table-column prop="priceOrigin" label="以前价格" width="150"/>

      <el-table-column prop="buyCount" label="收藏人数" width="60" />

      <el-table-column prop="viewCount" label="浏览人数" width="60" />

      <el-table-column label="商品类型" width="150" >
        <template slot-scope="scope">
          <div v-if="scope.row.typeId === '0'">
            数码
          </div>
          <div v-else-if="scope.row.typeId === '1'">
            学习
          </div>
          <div v-else-if="scope.row.typeId === '2'">
            生活
          </div>
          <div v-else-if="scope.row.typeId === '3'">
            美妆
          </div>
          <div v-else-if="scope.row.typeId === '4'">
            衣服
          </div>
          <div v-else-if="scope.row.typeId === '5'">
            其他
          </div>

        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.status==='0'?'未卖':'已卖' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="发布时间" width="200" />

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
import normalProduct from '@/api/goods/normallist'
export default {
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 3, // 每页记录数
      total: 0, // 总记录数
      normalProductQuery: {} // 条件封装对象
    }
  },
  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    this.getList()
  },
  methods: {
    // 商品列表的方法
    getList(page = 1) {
      this.page = page
      normalProduct.getGoodsCondition(this.page, this.limit, this.normalProductQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        })
    },
    resetData() {
      this.normalProductQuery = {}
      // 查询所有商品数据
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
        normalProduct.deleteGoodsId(id)
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
