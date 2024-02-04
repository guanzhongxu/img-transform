import IpcRendererEvent = Electron.IpcRendererEvent;
interface Params {
	setLoading: (flag: boolean) => void;
}
export default ({ setLoading }: Params) => {
	let outputPath = ref("");
	const message = useMessage();
	// 输出图片
	const outputList: string[] = reactive([]);
	// 转换后的图片质量
	const quality = ref(60);
	// 转换后的图片类型
	let formatType = ref("");

	const setFormatType = (type: string) => {
		formatType.value = type;
	};

	const getOutput = (_: IpcRendererEvent, path: string) => {
		if (path) {
			outputPath.value = path;
		}
	};
	// 开始转换
	const startTransform = (inputList: string[]) => {
		if (formatType.value.length === 0) return message.error("潮种！先选择图片后的类型");
		if (inputList.length === 0) return message.error("潮种！先选择图片");
		if (outputPath.value.length === 0) return message.error("潮种！先选转换后的路径");
		setLoading(true);
		const basePath = longestCommonPrefix(inputList);
		window.ipcRenderer.send(
			"transform",
			JSON.stringify({
				basePath,
				filePath: inputList,
				targetPath: outputPath.value,
				formatType: formatType.value,
				quality: quality.value
			})
		);
	};
	// 最长前缀
	const longestCommonPrefix = (strs: string[]): string => {
		if (strs.length === 1) return strs[0];
		strs = strs.sort((a, b) => a.length - b.length);
		let result = "";
		const first = strs[0];
		for (let i = 1; i <= first.length; i++) {
			const temp = first.substring(0, i);
			const has = strs.every(item => item.indexOf(temp) === 0);
			if (has) {
				result = temp;
			}
		}
		return result;
	};

	const selectOutput = () => {
		window.ipcRenderer.send("selectOutPutDir");
	};
	window.ipcRenderer.on("selectOutPutDir", getOutput);
	window.ipcRenderer.on("transform", (_, arr) => {
		setLoading(false);
		if (arr.length === 0) {
			message.error("坏了坏了，转换出错了");
		} else {
			outputList.length = 0;
			outputList.push(...arr);
			message.success("转换成功，不愧是我，我真牛逼");
		}
	});
	onUnmounted(() => {
		window.ipcRenderer.off("selectOutPutDir", getOutput);
	});
	// 清空列表
	const clearList = () => {
		outputList.length = 0;
	};
	return {
		selectOutput,
		outputPath,
		startTransform,
		outputList,
		quality,
		setFormatType,
		formatType,
		clearList
	};
};
