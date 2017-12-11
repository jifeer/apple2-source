import Vue from 'vue'
import Router from 'vue-router'
import index from 'pages/index/index'
import product from 'pages/product/product'
import CostBenefit from 'pages/CostBenefit/CostBenefit'
import expence from 'pages/expence/expence'
import ForeignTrade from 'pages/ForeignTrade/ForeignTrade'
import price from 'pages/price/price'
import flow from 'pages/flow/flow'
import test from 'pages/test/test'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index' //重定向解决默认的路由
  }, {
    path: '/index',
    name: 'index',
    component: index
  }, {
    path: '/product',
    name: 'product',
    component: product
  }, {
    path: '/CostBenefit',
    name: 'CostBenefit',
    component: CostBenefit
  }, {
    path: '/expence',
    name: 'expence',
    component: expence
  }, {
    path: '/ForeignTrade',
    name: 'ForeignTrade',
    component: ForeignTrade
  }, {
    path: '/price',
    name: 'price',
    component: price
  }, {
    path: '/flow',
    name: 'flow',
    component: flow
  },




  {
    path: '/test',
    name: 'test',
    component: test
  }
  ],
  linkActiveClass: 'active'
})
