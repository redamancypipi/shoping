import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: '首页',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '首页', icon: 'dashboard' }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    // name: '首页',
    // hidden: true,
    // children: [{
    //   path: 'dashboard',
    //   component: () => import('@/views/dashboard/index')
    // }]
    children: [
      {
        path: 'dashboard',
        name: '首页',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'form' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods',
    name: '商城管理',
    meta: { title: '商城管理', icon: 'example' },
    children: [
      {
        path: 'goodsmanage',
        name: '商品管理',
        component: () => import('@/views/goods/goodstype'),
        meta: { title: '商品管理', icon: 'table' },
        children: [
          {
            path: 'normal',
            component: () => import('@/views/goods/goodstype/normal/index'),
            name: '普通商品',
            meta: { title: '普通商品' }
          },
          {
            path: 'killing',
            component: () => import('@/views/goods/goodstype/sec-killing/index'),
            // redirect: '/goods/goodstype/sec-killing/list',
            name: '秒杀商品',
            meta: { title: '秒杀商品' },
            children: [
              {
                path: 'list',
                name: '秒杀商品1',
                component: () => import('@/views/goods/goodstype/sec-killing/list'),
                meta: { title: '商品列表', icon: 'form' }
              },
              {
                path: 'save',
                name: '秒杀商品2',
                component: () => import('@/views/goods/goodstype/sec-killing/save'),
                meta: { title: '添加商品', icon: 'form' }
              },
              {
                path: 'edit/:id',
                name: '编辑商品',
                component: () => import('@/views/goods/goodstype/sec-killing/save'),
                meta: { title: '修改商品', noCache: true },
                hidden: true
              }
            ]
          }
        ]
      },
      {
        path: 'shopmanage',
        name: '交易记录',
        component: () => import('@/views/goods/record'),
        meta: { title: '交易记录', icon: 'tree' }
      }
    ]
  },

  {
    path: '/member',
    component: Layout,
    children: [
      {
        path: 'member',
        name: '会员管理',
        component: () => import('@/views/member/list'),
        meta: { title: '会员管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/opinion',
    component: Layout,
    redirect: '/opinion',
    name: '用户反馈',
    meta: { title: '用户反馈', icon: 'example' },
    children: [
      {
        path: 'goods',
        name: '投诉商品',
        component: () => import('@/views/opinion/goods'),
        meta: { title: '商品投诉', icon: 'table' }
      },
      {
        path: 'member',
        name: '被投诉用户',
        component: () => import('@/views/opinion/member'),
        meta: { title: '被投诉用户', icon: 'table' }

      },
      {
        path: 'goods_info/:id',
        name: '投诉商品详情',
        component: () => import('@/views/opinion/goods_info'),
        meta: { title: '商品投诉详情', icon: 'table' },
        hidden: true
      },
      {
        path: 'member_info/:id',
        name: '被投诉用户详情',
        component: () => import('@/views/opinion/member_info'),
        meta: { title: '被投诉用户详情', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/discount',
    component: Layout,
    // redirect: '/example/table',
    name: '优惠商城',
    meta: { title: '优惠商城', icon: 'example' },
    children: [
      {
        path: 'redpocket',
        name: '红包管理',
        component: () => import('@/views/table/index'),
        meta: { title: '红包管理', icon: 'table' }
      },
      {
        path: 'redpocket_info/:id',
        name: '会员红包详情',
        component: () => import('@/views/table/red_info'),
        meta: { title: '会员红包详情', icon: 'table' },
        hidden: true
      },
      {
        path: 'withdraw',
        name: '提现管理',
        component: () => import('@/views/tree/index'),
        meta: { title: '提现管理', icon: 'table' },
        children: [
          {
            path: 'withdraw_wait',
            name: '待审核提现',
            component: () => import('@/views/tree/withdraw/withdraw_wait'),
            meta: { title: '待审核提现', icon: 'tree' }
          },
          {
            path: 'withdraw_down',
            name: '已审核提现',
            component: () => import('@/views/tree/withdraw/withdraw_down'),
            meta: { title: '已审核提现', icon: 'tree' }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
