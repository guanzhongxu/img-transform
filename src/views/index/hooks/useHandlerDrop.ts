interface Params {
	setLoading: (flag: boolean) => void;
}
export default ({ setLoading }: Params) => {
	const inputList: string[] = reactive([]);
	const message = useMessage();
	const dragover = (e: DragEvent) => {
		e.stopPropagation();
		e.preventDefault();
	};
	const drop = async (e: DragEvent) => {
		dragover(e);
		remove(true);
		if (e.dataTransfer && e.dataTransfer.files.length > 0) {
			setLoading(true);
			for (const file of e.dataTransfer.files) {
				try {
					const result = await window.ipcRenderer.invoke("handleDrop", file.path);
					inputList.push(...result);
				} catch (e) {
					if (e instanceof Error) message.error(e.message);
				} finally {
					setLoading(false);
				}
			}
		}
	};
	// 最长前缀

	const remove = (index: number | boolean) => {
		console.log(index);
		if (typeof index === "boolean") {
			inputList.length = 0;
		} else {
			inputList.splice(index, 1);
		}
	};

	return {
		dragover,
		drop,
		inputList,
		remove
	};
};
