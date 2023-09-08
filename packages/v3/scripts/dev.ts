import path from 'path';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import markdown from '@vavt/vite-plugin-import-markdown';

// 默认的导出在import的时候会提示不存在
import nodeServicePlugins from '@vavt/utils/src/node/vite-plugins/nodeService';
const { nodeService } = nodeServicePlugins;

// vite的兼容
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);

// vue3.3.x兼容
const __defProp = Object.defineProperty;
const __name = (target, value) =>
  __defProp(target, 'name', { value, configurable: true });
globalThis.__name = __name;

!(async () => {
  const server = await createServer({
    root: resolvePath('..'),
    configFile: false,
    publicDir: resolvePath('../dev/public'),
    resolve: {
      alias: {
        '@': resolvePath('../dev'),
        '~': resolvePath('../components')
      }
    },
    server: {
      port: 6010
    },
    plugins: [vue(), nodeService(), vueJsx(), markdown()],
    css: {
      modules: {
        localsConvention: 'camelCase' // 默认只支持驼峰，修改为同事支持横线和驼峰
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  });

  await server.listen();

  server.printUrls();
})();
