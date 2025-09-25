<template>
  <button @click="changeTheme">{{ theme }}</button>
  <button @click="exportHandler">导出</button>
  <MdEditor
    v-model="text"
    :toolbars="toolbars"
    :theme="theme"
    :previewTheme="previewTheme"
    :showToolbarName="true"
  >
    <template #defToolbars>
      <Mark />
      <Emoji />
      <OriginalImg />

      <ExportPDF
        ref="pdfRef"
        :modelValue="text"
        @onStart="
          () => {
            console.log('onStart');
          }
        "
        @onSuccess="onSuccess"
      />

      <ThemeSwitch v-model="theme" />

      <PreviewThemeSwitch v-model="previewTheme" :closeAfterSelect="false" />

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
import type { ToolbarNames, Themes, PreviewThemes } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { message } from '@vavt/message';

import data from '@vavt/data/src/markdown-demo.md';

import {
  Mark,
  Emoji,
  OriginalImg,
  ExportPDF,
  PreviewThemeSwitch,
  ThemeSwitch
} from '../components';

const pdfRef = ref();
const text = ref(data);
const theme = ref<Themes>('light');
const previewTheme = ref<PreviewThemes>('default');
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
  4,
  5,
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

const exportHandler = () => {
  pdfRef.value.trigger();
};

const changeTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
};

const onSuccess = () => {
  message.success('导出成功！', {
    zIndex: 999999
  });
};
</script>

<style lang="scss">
@use '../styles/style.scss';
</style>
