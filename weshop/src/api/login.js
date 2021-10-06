import request from '@/utils/request'

export function login(mobile, password) {
  return request({
    url: '/userservice/admin/login',
    method: 'post',
    data: {
      mobile: mobile,
      password: password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/userservice/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/userservice/admin/logout',
    method: 'post'
  })
}
