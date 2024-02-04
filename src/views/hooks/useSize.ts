import router from "@/router";
import { debounce } from "lodash";
export default () => {
	const setSize = debounce(() => {
		const eleClass = router.currentRoute.value.path.substring(1);
		const ele: HTMLDivElement | null = document.querySelector(`.${eleClass}`);
		if (ele) {
			ele.style.width = `${window.innerWidth}px`;
			ele.style.height = `${window.innerHeight}px`;
		}
	}, 100);

	onMounted(setSize);
	window.addEventListener("resize", setSize);
	onUnmounted(() => {
		window.removeEventListener("resize", setSize);
	});
};
