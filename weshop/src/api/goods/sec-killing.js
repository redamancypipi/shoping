import request from '@/utils/request'
export default {
//   getOrderListPage(current, limit, secKillingProductQuery) {
//     return request({
//       url: `/userservice/user/pageUser/${current}/${limit}`,
//       method: 'get',
//       // memberQuery条件对象，后端使用RequestBody获取数据
//       // data表示把对象转换json进行传递到接口里面
//       data: secKillingProductQuery
//     })
//   },
  getSecKillingProductCondition(current, limit, secKillingProductQuery) {
    return request({
      url: `/userservice/product-sec-killing/pageSecKillingProductCondition/${current}/${limit}`,
      method: 'post',
      data: secKillingProductQuery
    })
  },
  // 删除
  deleteSecKillingProduct(id) {
    return request({
      url: `/userservice/product-sec-killing/${id}`,
      method: 'delete'
    })
  },
  //   添加秒杀商品
  addSecKillingProduct(secKillingProduct) {
    return request({
      url: `/userservice/product-sec-killing/addSecKillingProduct`,
      method: 'post',
      data: secKillingProduct
    })
  },
  // 根据id查询商品
  getSecKillingProductInfo(id) {
    return request({
      url: `/userservice/product-sec-killing/getSecKillingProduct/${id}`,
      method: 'get'
    })
  },
  // 修改商品
  updateSecKillingProductInfo(secKillingProduct) {
    return request({
      url: `/userservice/product-sec-killing/editSecKillingProduct`,
      method: 'post',
      data: secKillingProduct
    })
  }
}
