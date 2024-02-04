import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "node:path";
import useHandleDrop from "./hooks/useHandleDrop.ts";
import useTransform from "./hooks/useTransform.ts";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
	win = new BrowserWindow({
		icon: path.join(process.env.VITE_PUBLIC, "logo.ico"),
		width: 1350,
		height: 900,
		minWidth: 1350,
		minHeight: 900,
		webPreferences: {
			preload: path.join(__dirname, "preload.js")
		}
	});
	win.setMenu(null);
	// Test active push message to Renderer-process.
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());
		win?.webContents.openDevTools();
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		// win.loadFile('dist/index.html')
		win.loadFile(path.join(process.env.DIST, "index.html"));
	}
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(createWindow);
ipcMain.handle("handleDrop", (_, args) => useHandleDrop(args));
ipcMain.on("selectOutPutDir", _ => {
	dialog
		.showOpenDialog({
			properties: ["openDirectory"],
			message: "请选择转换后文件储存路径",
			title: "请选择转换后文件储存路径"
		})
		.then(resultDark => {
			_.senderFrame.send("selectOutPutDir", resultDark.filePaths[0]);
		});
});

ipcMain.on("transform", async (_, args) => {
	try {
		const arr = await useTransform(JSON.parse(args));
		_.senderFrame.send("transform", arr);
	} catch (err) {
		_.senderFrame.send("transform", []);
	}
});
