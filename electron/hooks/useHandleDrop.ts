import { stat } from "fs/promises";
import { extname } from "path";
import useReadDir from "./useReadDir";
import imgType from "../../public/config/imgType.ts";
export default async (filePath: string) => {
	const stats = await stat(filePath);
	let result: string[] = [];
	if (stats.isFile()) {
		const ext = extname(filePath).substring(1);
		if (imgType.includes(ext)) {
			result.push(filePath);
		}
	} else {
		// 递归读取文件夹
		result = await useReadDir(filePath);
	}
	return result;
};
