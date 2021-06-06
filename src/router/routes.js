// 导入路由组件，懒加载
import Layout from '@layout/Layout.vue';
import Login from "../views/Login/Login.vue"
import Register from "../views/Register/Register.vue"
// view组件
const Home = () => import("../views/Home/Home.vue")
const ShopList = () => import("../views/ShopList/ShopList.vue");
const Category = () => import("../views/Category/Category.vue");
const ShoppingCart = () => import("../views/ShoppingCart/ShoppingCart.vue");
const Settlement = () => import("../views/Settlement/Settlement.vue");
const Order = () => import("../views/Order/Order.vue");
const OrderDetails = () => import("../views/OrderDetails/OrderDetails.vue");
const Personal = () => import("../views/Personal/Personal.vue");
const Address = () => import("../views/Address/Address.vue");
const IncreAddress = () => import("../views/IncreAddress/IncreAddress.vue");
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
      // 主页
      { path: "home", component: Home, name: "home" },
      // 店铺列表
      {
        path: "shopList", component: ShopList, name: "shopList", children: [
          { path: "category", component: Category, name: "category" }
        ]
      },
      // 购物车
      {
        path: "shoppingCart", component: ShoppingCart, name: "shoppingCart", children: [
          { path: "settlement", component: Settlement, name: "settlement" }
        ]
      },
      // 订单
      {
        path: "order", component: Order, name: "order", children: [
          { path: "details", component: OrderDetails, name: "orderDetails" }
        ]
      },
      // 个人中心
      {
        path: "personal", component: Personal, name: "personal", children: [
          { path: "address", component: Address, name: Address },
          { path: "increAddress", component: IncreAddress, name: IncreAddress },
        ]
      },
      // 提示登录
      { path: "prompt", component: Prompt, name: "prompt" },
      // 当没有匹配到子路由时，可以将path设置为空，渲染其它的视图
    ]
  },
]

export default routes;