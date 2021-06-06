import ConfirmBox from './ConfirmBox.vue'
import { createApp } from 'vue'
let instance; //组件实例
export default function confirm(params) {
  const { title, message } = params;
  if (instance) {
    instance.title = title;
    instance.message = message;
    instance.openDialog();
    return instance.confirm();
  } else {
    const app = createApp(ConfirmBox);
    instance = app.mount(document.createElement("div"));
    instance.title = title;
    instance.message = message;
    instance.openDialog();
    document.body.appendChild(instance.$el);
    return instance.confirm();
  }
}