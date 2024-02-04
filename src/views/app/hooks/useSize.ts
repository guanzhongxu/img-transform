import { debounce } from "lodash";
export default () => {
	const ele: HTMLDivElement | null = document.querySelector("#app");
	const setSize = debounce(() => {
		if (ele) {
			ele.style.width = `${window.innerWidth}px`;
			ele.style.height = `${window.innerHeight}px`;
		}
	}, 100);
	setSize();
	window.addEventListener("resize", setSize);
};
