import request from '@/utils/request'
export default {
  getRedpocketList() {
    return request({
      url: `/userservice/hongbao/getHongBaoList`,
      method: 'get'
    })
  },
  // 根据id查询商品
  getRedpocketInfo(id) {
    return request({
      url: `/userservice/hongbao/getHongBaoListByUserId/${id}`,
      method: 'get'
    })
  },
  getRedpocket(current, limit, redpocketQuery) {
    return request({
      url: `/userservice/hongbao/pageHongBao/${current}/${limit}`,
      method: 'post',
      data: redpocketQuery
    })
  },
  getOrderList(id) {
    return request({
      url: `/userservice/t-order/getOrderList/${id}`,
      method: 'get'
    })
  }
}
