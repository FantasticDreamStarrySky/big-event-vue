import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            // 获取路径中包含/api的路径，转发到http://localhost:8080
            '/api': {
                // 代理目标地址
                target: 'http://localhost:8080',
                // 是否开启代理
                changeOrigin: true,
                // 替换路径
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
