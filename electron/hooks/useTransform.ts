import sharp, { AvailableFormatInfo, FormatEnum } from "sharp";
import { join, sep, basename, extname } from "path";
import { mkdir } from "fs/promises";
interface Params {
	basePath: string;
	filePath: string[];
	targetPath: string;
	formatType: keyof FormatEnum | AvailableFormatInfo;
	quality: number;
}
export default async ({ basePath, filePath, targetPath, formatType, quality }: Params) => {
	const arr: string[] = [];
	const p: Promise<string>[] = [];
	console.time("run timer:");
	const imgT = async (basePathElement: string, outputPath: string) => {
		try {
			await sharp(basePathElement)
				.toFormat(formatType, {
					quality
				})
				.toFile(outputPath);
			return outputPath;
		} catch (e) {
			return "";
		}
	};
	for (const basePathElement of filePath) {
		const savePath = await createDir(basePath, targetPath, basePathElement);
		const fileName = basename(basePathElement).split(extname(basePathElement))[0];
		if (quality === 0) {
			quality = 1;
		}
		if (quality > 100) {
			quality = 100;
		}
		const outputPath = join(savePath, `${fileName}.${formatType}`);
		p.push(imgT(basePathElement, outputPath));
	}
	const result = await Promise.all(p);
	result.forEach(item => {
		console.log(item);
		if (item.length > 0) arr.push(item);
	});
	console.timeEnd("run timer:");
	return arr;
};

const createDir = async (basePath: string, targetPath: string, filePath: string) => {
	const arr = filePath.substring(basePath.length - 1).split(sep);
	let index = 0;
	for (const current of arr) {
		if (current.length !== 0 && index !== arr.length - 1) {
			targetPath = join(targetPath, current);
			try {
				await mkdir(targetPath);
			} catch {
				//
			}
		}
		index++;
	}
	return targetPath;
};
