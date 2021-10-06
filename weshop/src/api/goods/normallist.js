import request from '@/utils/request'
export default {
  getGoodsListPage(current, limit, normalProductQuery) {
    return request({
      // url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+limit,
      url: `/userservice/product-normal/getNormalProduct/${current}/${limit}`,
      method: 'get',
      // normalProductQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: normalProductQuery
    })
  },
  getGoodsCondition(current, limit, normalProductQuery) {
    return request({
      url: `/userservice/product-normal/pageNormalProductCondition/${current}/${limit}`,
      method: 'post',
      data: normalProductQuery
    })
  },
  // 删除商品
  deleteGoodsId(id) {
    return request({
      url: `/userservice/product-normal/${id}`,
      method: 'delete'
    })
  }
}
