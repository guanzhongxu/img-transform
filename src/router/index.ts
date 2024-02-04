import { createRouter, createWebHashHistory } from "vue-router";
import BASEURL from "@/router/baseUrl";
import useCreateRoutes from "@/router/useCreateRoutes";
const router = createRouter({
	history: createWebHashHistory(BASEURL),
	routes: useCreateRoutes()
});
router.afterEach(to => {
	document.title = to.meta.title?.toString() || "";
});
export default router;
