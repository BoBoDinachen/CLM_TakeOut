import { createApp } from 'vue'
import router from '../../router/index'
import GoodsDetails from './GoodsDetails.vue'
let instance;

const showGoodsDetails = function (params) {
  const { goods } = params;
  if (instance) {
    instance.state.goods = goods;
    instance.show();
  } else {
    const app = createApp(GoodsDetails);
    app.use(router);
    instance = app.mount(document.createElement("div"));
    instance.state.goods = goods;
    document.body.appendChild(instance.$el);
  }
}

export default showGoodsDetails;