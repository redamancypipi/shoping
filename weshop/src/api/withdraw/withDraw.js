import request from '@/utils/request'
export default {

//   根据审核状态查询
  getPassedList(current, limit, statusQuery) {
    return request({
      url: `/userservice/withdraw/getPassedList/${current}/${limit}`,
      method: 'post',
      data: statusQuery
    })
  },
  // 同意提现
  passWithdraw(id) {
    return request({
      url: `/userservice/withdraw/passWithDraw/${id}`,
      method: 'post'
    })
  },
  //   拒绝提现，把钱还给用户
  payBackMoney(userId, money) {
    return request({
      url: `/userservice/hongbao/addHongBao`,
      method: 'post',
      data: {
        totalFee: money,
        userId: userId
      }
    })
  },
  //   拒绝提现，把钱还给用户
  refuseWithdraw(id) {
    return request({
      url: `/userservice/withdraw/refuseWithDraw/${id}`,
      method: 'post'
    })
  }
}
