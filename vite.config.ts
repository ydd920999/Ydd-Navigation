import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [vue()],
    server: {
        port: 8080, //启动端口
        hmr: {
            host: 'localhost',
            port: 8080
        },
        // 设置代理
        proxy: {
            '/api': {
                target: 'https://weibo.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
                ws: true, //是否代理 websockets
                secure: true
            },
            '/top': {
                target: 'https://the.top',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/top/, ''),
                ws: true, //是否代理 websockets
                secure: true
            }
        }
    }
});
