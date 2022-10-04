import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from "js-cookie";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'layout',
        redirect: {name: 'home'},
        component: () => import("../views/layout/index"),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/index'),
                meta: {
                    TabBar: true
                }
            },
            {
                path: '/category',
                name: 'category',
                component: () => import('../views/category/index'),
                meta: {
                    TabBar: true
                }
            },
            {
                path: '/cart',
                name: 'cart',
                component: () => import('../views/cart/index'),
                meta: {
                    title: '购物车',
                    navBar: true,
                    Authority: true,
                }
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/user/index'),
                meta: {
                    title: '我的',
                    navBar: true,
                    Authority: true,
                    TabBar: true
                }
            },
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/user/login'),
                meta: {
                    title: '登录',
                    navBar: true,
                }
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('@/views/user/register'),
                meta: {
                    title: '注册',
                    navBar: true,
                }
            },
            {
                path: '/changePassword',
                name: 'ChangePassword',
                component: () => import('../views/user/ChangePassword'),
                meta: {
                    title: '修改密码',
                    navBar: true,
                    TabBar: true
                }
            },
            {
                path: '/productDetail',
                name: 'ProductDetail',
                component: () => import('../components/ProductDetail'),
                meta: {
                    navBar: true,
                    title: '商品详情',
                    Authority: true,
                }
            },
            {
                path:'/search',
                name:'Search',
                component:()=>import('../components/Search'),
            },
            {
                path:'/order',
                name:'order',
                component:()=>import('../views/order/index'),
                meta:{
                    navBar: true,
                    title: '创建订单',
                }
            },
            {
                path: '/address',
                name:'address',
                component:()=>import('../views/address/index'),
                meta:{
                    navBar: true,
                    title: '我的地址',
                }
            },
            {
                path: '/addressEdit',
                name:'AddressEdit',
                component: ()=>import('../views/address/AddressEdit'),
                meta:{
                    navBar: true,
                    title: '编辑地址',
                }
            },
            {
                path: '/addressAdd',
                name:'addressAdd',
                component:()=>import('../views/address/AddressAdd'),
                meta:{
                    navBar: true,
                    title: '新建地址',
                }
            },
            {
                path:'/paySuccess',
                name:'PaySuccess',
                component:()=>import('../views/order/PaySuccess'),
                meta:{
                    navBar: true,
                    title: '支付成功',
                }
            },
            {
                path:'/totalOrder',
                name:'TotalOrder',
                component:()=>import('../views/order/TotalOrder'),
                meta:{
                    navBar: true,
                    title: '我的订单',
                }
            },
            {
                path:'/orderDetail',
                name:'OrderDetail',
                component:()=>import('../components/OrderDetail'),
                meta:{
                    navBar: true,
                    title: '订单详情',
                }
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach ((to, from, next) => {
    if (to.meta.Authority) {//判断是否需要鉴权
        if (Cookie.get('token')) {
            next()
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        next()
    }
})
//路由版本高,抛出了promise异常用catch接收它
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
export default router
