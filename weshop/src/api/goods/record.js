import request from '@/utils/request'
export default {
  getOrderListPage(current, limit, tOrderQuery) {
    return request({
      // url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+limit,
      url: `/userservice/user/pageUser/${current}/${limit}`,
      method: 'get',
      // memberQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: tOrderQuery
    })
  },
  getOrderCondition(current, limit, tOrderQuery) {
    return request({
      url: `/userservice/t-order/pageTorderCondition/${current}/${limit}`,
      method: 'post',
      data: tOrderQuery
    })
  },
  // 删除订单
  deleteOrderId(id) {
    return request({
      url: `/userservice/t-order/${id}`,
      method: 'delete'
    })
  }
}
