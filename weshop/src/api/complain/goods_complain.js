import request from '@/utils/request'
export default {
  getGoodsComplainCondition(current, limit, goodsComplainQuery) {
    return request({
      url: `/userservice/goods-opinion/pagegoodsOpinionServiceCondition/${current}/${limit}`,
      method: 'post',
      data: goodsComplainQuery
    })
  },
  // 删除
  deleteGoodsComplain(id) {
    return request({
      url: `/userservice/goods-opinion/${id}`,
      method: 'delete'
    })
  },
  // 根据id查询商品
  getGoodsComplainInfo(id) {
    return request({
      url: `/userservice/goods-opinion/getgoodsOpinion/${id}`,
      method: 'get'
    })
  },
  // 修改
  updateGoodsComplainInfo(goodsComplain) {
    return request({
      url: `/userservice/goods-opinion/editGoodsOpinion`,
      method: 'post',
      data: goodsComplain
    })
  }
}
