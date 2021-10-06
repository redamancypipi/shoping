import request from '@/utils/request'
export default {
  getMemberComplainCondition(current, limit, memberComplainQuery) {
    return request({
      url: `/userservice/member-opinion/pagememberOpinionServiceCondition/${current}/${limit}`,
      method: 'post',
      data: memberComplainQuery
    })
  },
  // 删除
  deleteMemberComplain(id) {
    return request({
      url: `/userservice/member-opinion/${id}`,
      method: 'delete'
    })
  },
  // 根据id查询商品
  getMemberComplainInfo(id) {
    return request({
      url: `/userservice/member-opinion/getmemberOpinion/${id}`,
      method: 'get'
    })
  },
  // 修改
  updateMemberComplainInfo(goodsComplain) {
    return request({
      url: `/userservice/member-opinion/editMemberOpinion`,
      method: 'post',
      data: goodsComplain
    })
  }
}
