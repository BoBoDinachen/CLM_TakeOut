import ToastComp from './Toast.vue'
import { createApp } from 'vue'
let instance; // toast组件实例
const toast = function (params) {
  const { text, type } = params;
  if (instance) {
    instance.state.text = text;
    instance.state.type = type;
    instance.show();
  } else {
    instance = createApp(ToastComp).mount(document.createElement("div"));
    instance.state.text = text;
    instance.state.type = type;
    document.body.appendChild(instance.$el);
  }
}
export default toast;