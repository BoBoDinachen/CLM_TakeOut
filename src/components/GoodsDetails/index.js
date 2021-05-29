import { createApp } from 'vue'
import GoodsDetails from './GoodsDetails.vue'
let instance;

const showGoodsDetails = function (params) {
  const { goods } = params;
  if (instance) {
    instance.state.goods = goods;
    instance.show();
  } else {
    instance = createApp(GoodsDetails).mount(document.createElement("div"));
    instance.state.goods = goods;
    document.body.appendChild(instance.$el);
  }
}

export default showGoodsDetails;