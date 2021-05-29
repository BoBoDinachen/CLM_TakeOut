// 导入路由组件，懒加载
import Layout from '@layout/Layout.vue';
import Login from "../views/Login/index.vue"
import Register from "../views/Register/index.vue"
// view组件
const Home = () => import("../views/Home/index.vue")
const Category = () => import("../views/Category/index.vue");
const ShoppingCart = () => import("../views/ShoppingCart/index.vue");
const Settlement = () => import("../views/Settlement/Settlement.vue");
const Order = () => import("../views/Order/index.vue");
const Personal = () => import("../views/Personal/index.vue");
// components 组件
const Prompt = () => import("@comps/Prompt.vue");
// 定义路由
const routes = [
  { path: "/", redirect: { name: "home" } },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
  {
    path: "/app", component: Layout, name: "app",
    children: [
      { path: "home", component: Home, name: "home" },
      { path: "category", component: Category, name: "category" },
      {
        path: "shoppingCart", component: ShoppingCart, name: "shoppingCart", children: [
          {path:"settlement",component: Settlement,name: "Settlement"}
        ]
      },
      { path: "order", component: Order, name: "order" },
      { path: "personal", component: Personal, name: "personal" },
      { path: "prompt", component: Prompt, name: "prompt" },
      // 当没有匹配到子路由时，可以将path设置为空，渲染其它的视图
    ]
  },
]

export default routes;