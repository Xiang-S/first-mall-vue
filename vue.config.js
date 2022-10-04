const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.18.185.16:28019',
                ws: true,
                changeOrigin: true
            }
        }
    }
})
