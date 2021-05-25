// 导入路由组件，懒加载
const Home = () => import("../views/Home.vue")
const Category = () => import("../views/Category.vue");
const ShoppingCart = () => import("../views/ShoppingCart.vue");
const Order = () => import("../views/Order.vue");
const Personal = () => import("../views/Personal.vue");
// 定义路由
const routes = [
  { path: "/", redirect: {name:"home"}},
  { path: "/home", component: Home, name: "home" },
  { path: "/category", component: Category, name: "category" },
  { path: "/shoppingCart", component: ShoppingCart, name: "shoppingCart" },
  { path: "/order", component: Order, name: "order" },
  { path: "/personal", component: Personal, name: "personal" },
]

export default routes;