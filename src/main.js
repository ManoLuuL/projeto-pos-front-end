import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import pinia from "./store";
import router from "./router";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const options = {
	position: "top-right", // Posição dos toasts
	autoClose: 3000, // Tempo de exibição dos toasts (em ms)
	hideProgressBar: false, // Exibir barra de progresso
	closeOnClick: true, // Fechar ao clicar no toast
	pauseOnHover: true, // Pausar ao passar o mouse sobre o toast
	draggable: true, // Permitir arrastar o toast
	draggablePercent: 60, // Porcentagem de arrasto para fechar
	rtl: false, // Suporte para idiomas da direita para a esquerda
};

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Vue3Toastify, options);
app.mount("#app");
