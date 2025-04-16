import type { UserConfigExport } from "@tarojs/cli";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export default {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {
    optimizeMainPackage: {
      enable: true,
    },
    webpackChain(chain) {
      chain.merge({
        plugin: {
          install: {
            plugin: require('terser-webpack-plugin'),
            args: [
              {
                terserOptions: {
                  compress: true, // 默认使用terser压缩
                  // mangle: false,
                  keep_classnames: true, // 不改变class名称
                  keep_fnames: true // 不改变函数名称
                },
              },
            ],
          },
        },
      })
      chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
      chain.plugin('analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    },
  },
  h5: {}
} satisfies UserConfigExport
