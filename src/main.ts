import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import "./mockjs/index";
import { createPinia } from "pinia";
import '@/assets/iconfont/iconfont.css'
createApp(App).use(router).use(createPinia()).mount("#app");
