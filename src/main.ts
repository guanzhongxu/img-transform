import { createApp } from "vue";
import App from "./views/app/App.vue";
import router from "@/router";
const app = createApp(App);
app.use(router);
app.mount("#app").$nextTick(() => {
	postMessage({ payload: "removeLoading" }, "*");
	window.ipcRenderer.on("main-process-message", (_event, message) => {
		console.log(message);
	});
});
