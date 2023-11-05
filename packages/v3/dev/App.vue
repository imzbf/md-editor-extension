<template>
  <button @click="changeTheme">{{ theme }}</button>
  <MdEditor v-model="text" :toolbars="toolbars" :theme="theme">
    <template #defToolbars>
      <Mark />
      <Emoji />
      <OriginalImg />

      <ExportPDF :modelValue="text" exportBtnText="导出" />

      <!-- <Image modalTitle="添加图片" @onUpload="onUpload">
        <template #trigger>
          <span>上传</span>
        </template>
      </Image> -->
    </template>
  </MdEditor>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import type { ToolbarNames, Themes } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import data from '@vavt/data/src/markdown-demo.md';

import { Mark, Emoji, OriginalImg, ExportPDF } from '../components';

const text = ref(data);

const theme = ref<Themes>('light');

const toolbars: ToolbarNames[] = [
  'bold',
  'underline',
  'italic',
  'strikeThrough',
  '-',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  0,
  1,
  2,
  3,
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'prettier',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'catalog',
  'github'
];

const changeTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
};
</script>

<style lang="scss">
@import '../styles/style.scss';
</style>
