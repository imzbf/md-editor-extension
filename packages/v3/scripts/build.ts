import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { build, LibraryFormats } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';

import folder from '@vavt/utils/src/node/folder';
const { removeDir } = folder;

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);

!(async () => {
  const entryList = fs.readdirSync(path.resolve(__dirname, resolvePath('../components')));
  const componentsNames = entryList.filter((e) => /^[A-Z][A-Za-z0-9]*[^.local]$/.test(e));

  const formats: LibraryFormats[] = ['cjs', 'es'];

  const extnames = {
    es: 'mjs',
    cjs: 'cjs',
    // 没用，ts编译不通过
    umd: '',
    iife: ''
  };

  removeDir(resolvePath('../lib'));

  await Promise.all(
    formats.map((t) => {
      const entry = {
        index: resolvePath('../components')
      };

      componentsNames.forEach((name) => {
        entry[name] = resolvePath(`../components/${name}/${t === 'cjs' ? name : ''}`);

        const scssPath = resolvePath(`../styles/${name}.scss`);
        if (t === 'es' && fs.existsSync(scssPath)) {
          // 这里是每个组件的样式
          entry[`${name}-style`] = scssPath;
        }
      });

      // 样式只打包一次，这里是总的样式
      if (t === 'es') {
        entry['style'] = resolvePath('../styles/style.scss');
      }

      return build({
        publicDir: false,
        resolve: {
          alias: {
            '@': resolvePath('../dev'),
            '~': resolvePath('../components')
          }
        },
        plugins: [
          vueJsx(),
          t === 'es' &&
            dts({
              outDir: resolvePath('../lib/types'),
              include: [resolvePath('../components')]
            })
        ],
        css: {
          modules: {
            localsConvention: 'camelCase' // 默认只支持驼峰，修改为同事支持横线和驼峰
          }
        },
        build: {
          emptyOutDir: false,
          cssCodeSplit: true,
          outDir: resolvePath('../lib'),
          lib: {
            entry,
            formats: [t],
            fileName(format) {
              switch (format) {
                case 'es': {
                  return 'es/[name].mjs';
                }
                case 'cjs': {
                  return 'cjs/[name].cjs';
                }
              }
            }
          },
          rollupOptions: {
            external: ['vue', 'md-editor-v3'],
            output: {
              chunkFileNames: `${t}/chunks/[name].${extnames[t]}`,
              assetFileNames: 'asset/[name][extname]'
            }
          }
        }
      });
    })
  );
})();
