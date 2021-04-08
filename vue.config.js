const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/styles/variables.less') // 需要全局导入的less
            ]
        })
}

const vueConfig = {
    lintOnSave: true,
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach((type) => addStyleResource(config.module.rule('less').oneOf(type)))

        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
            .set('_p', resolve('src/pages'))
    }
}

module.exports = vueConfig