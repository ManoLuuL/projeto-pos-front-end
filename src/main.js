import { createApp } from "vue";
import { TOAST_CONFIGURATION } from "./consts";
import App from "./App.vue";
import pinia from "./store";
import router from "./router";
import Vue3Toastify from "vue3-toastify";

import "./style.css";
import "vue3-toastify/dist/index.css";



const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Vue3Toastify, TOAST_CONFIGURATION);
app.mount("#app");
