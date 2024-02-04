import { readdir, stat } from "fs/promises";
import { extname, join } from "path";
import imgType from "../../public/config/imgType.ts";
export default async (dirPath: string) => {
	const pathArr: string[] = [];
	const readDir = async (readPath: string) => {
		const pathList = await readdir(readPath);
		for (const p of pathList) {
			const tempPat = join(readPath, p);
			const stats = await stat(tempPat);
			if (stats.isFile()) {
				const ext = extname(tempPat).substring(1);
				if (imgType.includes(ext)) pathArr.push(tempPat);
			} else {
				await readDir(tempPat);
			}
		}
	};
	await readDir(dirPath);
	return pathArr;
};
