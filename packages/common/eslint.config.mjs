import js from '@eslint/js';
import parserTs from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import vueParser from 'vue-eslint-parser';

export default defineConfig([
  // 忽略文件
  {
    ignores: []
  },
  js.configs.recommended,
  // TypeScript 推荐规则（开启类型检查）
  ...tseslint.configs.recommendedTypeChecked,
  ...pluginVue.configs['flat/recommended'],
  eslintPluginPrettierRecommended,

  {
    files: ['**/*.{ts,tsx,vue,js,mjs,cjs}'],
    plugins: {
      import: importPlugin
    },
    languageOptions: {
      // Vue 文件主解析器
      parser: vueParser,
      globals: {
        ...globals.node,
        ...globals.browser
      },
      parserOptions: {
        // 用于 <script lang="ts"> 的嵌套解析器
        parser: parserTs,
        extraFileExtensions: ['.vue'],
        projectService: true // 需要 typescript-eslint >= 7.0
      }
    },
    settings: {
      'import/resolver': {
        typescript: {} // 支持 tsconfig.json 中的 paths
      }
    },
    rules: {
      /* ===== TypeScript ===== */
      '@typescript-eslint/no-explicit-any': 'off',
      // 不强制所有函数必须显式声明返回类型
      '@typescript-eslint/explicit-function-return-type': 'off',
      // 不要求所有模块公有导出（函数、方法）必须显式声明参数与返回类型
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // 关闭“对 any 类型变量赋值”的限制（例如：const a: any = ...）
      // 在某些快速开发场景中可容忍此类不安全赋值
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // 关闭“对 any 类型成员访问”的限制（例如：a.b.c）
      // 适用于对第三方库、全局变量等非类型安全场景的宽松处理
      '@typescript-eslint/no-unsafe-member-access': 'off',
      // 关闭“对 any 类型函数调用”的限制（例如：anyFunc()）
      // 可减少类型不完整时的报错干扰，但需自行保证调用安全性
      '@typescript-eslint/no-unsafe-call': 'off',
      // 关闭“未绑定方法直接赋值”的限制（例如：const fn = obj.method）
      // 在某些 class 实例或函数绑定场景下更方便使用
      '@typescript-eslint/unbound-method': 'off',

      /* ===== Vue ===== */
      // 标签内容不强制换行，与 prettier 冲突
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      // 自闭合标签风格与 prettier 冲突
      'vue/html-self-closing': 'off',
      // 允许使用 v-html
      'vue/no-v-html': 'off',

      // 属性强制使用 camelCase
      'vue/attribute-hyphenation': [
        'error',
        'never',
        {
          ignore: [
            'accept-charset',
            'http-equiv',
            'accesskey',
            'contenteditable',
            'tabindex',
            'maxlength',
            'minlength',
            'autocomplete',
            'autocapitalize',
            'spellcheck',
            'crossorigin',
            'referrerpolicy',
            'aria-*',
            'data-*'
          ]
        }
      ],

      // 强制事件名使用 camelCase
      'vue/v-on-event-hyphenation': [
        'error',
        'never',
        {
          autofix: true,
          ignore: []
        }
      ],

      // 强制组件名使用 PascalCase
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: []
        }
      ],

      // 每行最多 4 个属性（根据你的设置关闭强制）
      'vue/max-attributes-per-line': ['off'],

      /* ===== Import 顺序 ===== */
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'ignore',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  }
]);
