import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import vue from "@vitejs/plugin-vue";
import common from "@rollup/plugin-commonjs";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { resolve, join } from "path";

export default defineConfig({
	optimizeDeps: {
		exclude: ["sharp"]
	},
	plugins: [
		common({}),
		vue(),
		Components({
			resolvers: [NaiveUiResolver()]
		}),
		AutoImport({
			imports: [
				"vue",
				"vue-router",
				{
					"naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
				}
			],
			dts: "./src/autoImport.d.ts"
		}),
		electron({
			main: {
				entry: "electron/main.ts",
				vite: {
					build: {
						rollupOptions: {
							external: ["sharp"]
						}
					}
				}
			},
			preload: {
				input: join(__dirname, "electron/preload.ts")
			},
			renderer: {}
		})
	],
	css: {
		preprocessorOptions: {
			stylus: {
				imports: [resolve("./src/assets/css/public.styl")]
			}
		}
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src/"),
			components: resolve(__dirname, "./src/components/"),
			views: resolve(__dirname, "./src/views/"),
			entities: resolve(__dirname, "./src/entities"),
			public: resolve(__dirname, "public")
		}
	},
});
