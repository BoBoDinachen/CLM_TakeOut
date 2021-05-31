import {createRouter,createWebHashHistory} from 'vue-router'
import routes from './routes'

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router ;