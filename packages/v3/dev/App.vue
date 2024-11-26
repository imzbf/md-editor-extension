<template>
  <button @click="changeTheme">{{ theme }}</button>
  <MdEditor v-model="text" :toolbars="toolbars" :theme="theme">
    <template #defToolbars>
      <Mark />
      <Emoji />
      <OriginalImg />

      <ExportPDF
        :modelValue="text"
        :customize="customizePdf"
        @onProgress="onProgress"
        @onStart="
          () => {
            console.log('onStart');
          }
        "
        @onSuccess="onSuccess"
      />

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

import { message } from '@vavt/message';

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

let updateRatio: ((str: string) => void) | undefined;
let closrRatio = () => {};

const onProgress = ({ ratio }: any) => {
  if (updateRatio) {
    updateRatio(`Progress: ${ratio * 100}%`);
  } else {
    const { close, update } = message.info(`Progress: ${ratio * 100}%`, {
      zIndex: 999999,
      duration: 0
    });

    updateRatio = update;
    closrRatio = close;
  }
};

const onSuccess = () => {
  closrRatio();

  setTimeout(() => {
    updateRatio = undefined;
  }, 100);

  message.success('导出成功！', {
    zIndex: 999999
  });
};

const customizePdf = (pdfIns: any) => {
  // 获取总页数
  const totalPages = pdfIns.internal.getNumberOfPages();
  const pageWidth = pdfIns.internal.pageSize.getWidth();
  const pageHeight = pdfIns.internal.pageSize.getHeight();

  // 遍历每页并添加页码
  for (let i = 1; i <= totalPages; i++) {
    // 设置当前页
    pdfIns.setPage(i);
    // 设置字体大小
    pdfIns.setFontSize(10);
    pdfIns.text(
      // 页码格式
      `Page ${i}, Total ${totalPages}`,
      // 居中
      pageWidth / 2,
      // 底部距离
      pageHeight - 1,
      { align: 'center' }
    );
  }
};
</script>

<style lang="scss">
@use '../styles/style.scss';
</style>
