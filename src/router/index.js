/*
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-01 01:09:53
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-12 04:54:10
 * @FilePath: \vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-01 01:09:53
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-10 08:20:20
 * @FilePath: \vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]
// router.addRoute({
//   path: '/',
//   component: () => import('../views/Manage.vue'),
//   redirect:"/home",
//   children:[
//     {path: 'user',name: '用户管理', component: () => import('../views/User.vue'),},
//     {path: 'home',name: '首页', component: () => import('../views/Home.vue'),},
//     {path: 'role',name: '角色管理', component: () => import('../views/Role.vue'),},
//     {path: 'person',name: '个人信息', omponent: () => import('../views/Person.vue')},
//     {path: 'file',name: '文件管理', component: () => import('../views/File.vue'),},
//     {path: 'menu',name: '菜单管理', component: () => import('../views/Menu.vue'),},
//   ]
// },)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export const resetRouter = () =>{
router.matched =  new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
}
export const setRoutes = () =>{
  const storeMenus = localStorage.getItem("menus");
  if(storeMenus){
    const currentRouteNames = router.getRoutes().map(v => v.name)
    if(!currentRouteNames.includes('Mange')){
      const manageRoute  = {path:'/' ,name:'Manage' , component: () => import('../views/Manage.vue') , redirect:"/home",children:[
        {path: 'person',name: '个人信息', component: () => import('../views/Person.vue')},
      ]}
      const menus = JSON.parse(storeMenus)
      menus.forEach(item =>{
        if(item.path){
          let itemMenu = {path: item.path.replace("/","") ,name:item.name, component: () => import('../views/'+item.pagePath+'.vue')}
          manageRoute.children.push(itemMenu)
        }else if(item.children.length){
          item.children.forEach(item => {
            if(item.path){
              let itemMenu = {path: item.path.replace("/","") ,name:item.name, component: () => import('../views/'+item.pagePath+'.vue')}
              manageRoute.children.push(itemMenu)
            }
            
          })
        }
      })
      router.addRoute(manageRoute)
    }
  }
}

setRoutes()

router.beforeEach((to,from,next)=>{
  localStorage.setItem("currentPathName",to.name)
  store.commit("setPath")
  if(!to.matched.length){
    const storeMenus =  localStorage.getItem("menus")
    console.log(storeMenus)
    if(storeMenus){
      next("/404")
    }else{
      console.log("---------")
      next("/login")
    }
  }
  next()
})

export default router
