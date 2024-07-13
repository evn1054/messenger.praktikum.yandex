import { defineConfig } from 'vite'
import * as path from "node:path";

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist'
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@styles': path.resolve(__dirname, './src/styles')
        }
    },
    server: {
        port: 3000
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "./src/styles/main.scss";
                    @import "./src/styles/variables.scss";
                `
            }
        }
    }
})
