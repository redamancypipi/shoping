import request from '@/utils/request'
export default {
  // 1 会员列表（分页）
  // current当前页 limit每页记录数 memberQuery条件对象
  getMemberListPage(current, limit, memberQuery) {
    return request({
      // url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+limit,
      url: `/userservice/user/pageUser/${current}/${limit}`,
      method: 'get',
      // memberQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: memberQuery
    })
  },
  getMemberCondition(current, limit, memberQuery) {
    return request({
      url: `/userservice/user/pageUserCondition/${current}/${limit}`,
      method: 'post',
      // memberQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: memberQuery
    })
  },
  // 删除会员
  deletMembererId(id) {
    return request({
      url: `/userservice/user/${id}`,
      method: 'delete'
    })
  },
  // 添加会员
  addMember(member) {
    return request({
      url: `/userservice/user/addUser`,
      method: 'post',
      data: member
    })
  },
  // 根据id查询会员
  getMemberInfo(id) {
    return request({
      url: `/userservice/user/getUser/${id}`,
      method: 'get'
    })
  },
  // 修改会员
  updateMemberInfo(member) {
    return request({
      url: `/userservice/user/editUser`,
      method: 'post',
      data: member
    })
  }
}
