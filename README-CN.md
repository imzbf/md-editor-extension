# md-editor-extension

[English](https://github.com/imzbf/md-editor-extension) \| 中文

分享你关于[md-editor-v3](https://github.com/imzbf/md-editor-v3) 和 [md-editor-rt](https://github.com/imzbf/md-editor-rt)的公共配置。以及编辑器的扩展组件等。

## 使用

### @vavt/cm-extension

这是一个公共的配置库，包括语言、主题。

```shell
yarn add @vavt/cm-extension
```

语言

| 语言名称 | 描述 | 作者 |
| --- | --- | --- |
| zh-TW | 中文（繁体） | [@imzbf](https://github.com/imzbf) |
| fr-FR | 法语 | [@tofandel](https://github.com/tofandel) |
| jp-JP | 日语 | [@xj89959853](https://github.com/xj89959853) |
| id-ID | 印尼语 | [@vallerydelexy](https://github.com/vallerydelexy) |
| jv-ID | Basa Jawa(?不太清楚中文是啥) | [@vallerydelexy](https://github.com/vallerydelexy) |
| ru | 俄语 | [@gorgulenkozxc](https://github.com/gorgulenkozxc) |
| pt-BR | 巴西葡萄牙语 | [@kleberMRocha](https://github.com/kleberMRocha) |
| de-DE | 德语 | [@JehtJanich](https://github.com/JehtJanich) |
| it-IT | 意大利语 | [@JehtJanich](https://github.com/JehtJanich) |
| es-ES | 西班牙语 | [@mreysei](https://github.com/mreysei) |
| ar | 阿拉伯语 | [@mzner](https://github.com/mzner) |

预览主题

| 主题名称 | 描述 | 作者 |
| --- | --- | --- |
| arknights | 来自[juejin-markdown-theme-arknights](https://github.com/viewweiwu/juejin-markdown-theme-arknights)，原作者：[@viewweiwu](https://github.com/viewweiwu) | [@imzbf](https://github.com/imzbf) |

#### 在 md-editor-v3 中使用

```vue
<template>
  <MdEditor language="zh-TW" previewTheme="arknights" />
</template>

<script setup>
import { MdEditor, config } from 'md-editor-v3';
// 引入公共库中的预览主题
import '@vavt/cm-extension/dist/previewTheme/arknights.css';
// 引入公共库中的语言配置
import ZH_TW from '@vavt/cm-extension/dist/locale/zh-TW';

config({
  editorConfig: {
    languageUserDefined: {
      'zh-TW': ZH_TW
    }
  }
});
</script>
```

#### 在 md-editor-rt 中使用

```jsx
import React from 'react';
import { MdEditor, config } from 'md-editor-rt';
// 引入公共库中的预览主题
import '@vavt/cm-extension/dist/previewTheme/arknights.css';
// 引入公共库中的语言配置
import ZH_TW from '@vavt/cm-extension/dist/locale/zh-TW';

config({
  editorConfig: {
    languageUserDefined: {
      'zh-TW': ZH_TW
    }
  }
});

export default () => {
  return <MdEditor language="zh-TW" previewTheme="arknights" />;
};
```

### @vavt/v3-extension

这是`md-editor-v3`的扩展组件库

```shell
yarn add @vavt/v3-extension
```

#### components

| 名称 | 描述 |
| --- | --- |
| [Emoji](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/Emoji/README.md) | 向编辑器插入小表情 |
| [Mark](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/Mark/README.md) | 文本标记`<mark>` |
| [OriginalImg](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/OriginalImg/README.md) | 添加`<img src="" alt="" width="100%">`标签 |
| [ExportPDF](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/ExportPDF/README.md) | 导出为 PDF 文件 |
| [ThemeSwitch](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/ThemeSwitch/README.md) | 用于切换编辑器主题的标准工具 |
| [PreviewThemeSwitch](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/PreviewThemeSwitch/README.md) | 用于切换编辑器预览主题的下拉菜单工具 |

| @vavt/v3-extension | md-editor-v3 |
| ------------------ | ------------ |
| >=3.0.0            | >=5.2.0      |

### @vavt/rt-extension

这是`md-editor-rt`的扩展组件库

安装

```shell
yarn add @vavt/rt-extension
```

#### components

| 名称 | 描述 |
| --- | --- |
| [Emoji](https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/Emoji/README.md) | 向编辑器插入小表情 |
| [Mark](https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/Mark/README.md) | 文本标记`<mark>` |
| [OriginalImg](https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/OriginalImg/README.md) | 添加`<img src="" alt="" width="100%">`标签 |
| [ExportPDF](https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/ExportPDF/README.md) | 导出为 PDF 文件 |
| [ThemeSwitch](https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/ThemeSwitch/README.md) | 用于切换编辑器主题的标准工具 |
| [PreviewThemeSwitch](https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/PreviewThemeSwitch/README.md) | 用于切换编辑器预览主题的下拉菜单工具 |

| @vavt/rt-extension | md-editor-rt |
| ------------------ | ------------ |
| >=3.0.0            | >=5.2.0      |

## 参与贡献

- Fork 这个仓库；
- 按照仓库的模板编写你的配置代码；
- 提交 pull request 到本仓库。

> 请注意，`@vavt/cm-extension`的开发环境已经自动引入你的语言配置和主题，不需要在`dev`目录下手动引用，无论生产还是开发环境，都只需要关注语言配置和主题的内容本身。

### 语言

创建一个以`[语言名称].js`命名的文件，使用下面的模板修改你的语言设置：

```ts
import type { StaticTextDefaultValue } from '../../index';

/**
 * @author imzbf
 * @email  zbfcqtl@gmail.com
 * @github https://github.com/imzbf
 *
 * 中文简体
 */
const ZH_CN: StaticTextDefaultValue = {
  toolbarTips: {
    bold: '加粗',
    underline: '下划线',
    italic: '斜体',
    strikeThrough: '删除线',
    title: '标题',
    sub: '下标',
    sup: '上标',
    quote: '引用',
    unorderedList: '无序列表',
    orderedList: '有序列表',
    task: '任务列表',
    codeRow: '行内代码',
    code: '块级代码',
    link: '链接',
    image: '图片',
    table: '表格',
    mermaid: 'mermaid图',
    katex: 'katex公式',
    revoke: '后退',
    next: '前进',
    save: '保存',
    prettier: '美化',
    pageFullscreen: '浏览器全屏',
    fullscreen: '屏幕全屏',
    preview: '预览',
    previewOnly: '仅预览',
    htmlPreview: 'html代码预览',
    catalog: '目录',
    github: '源码地址'
  },
  titleItem: {
    h1: '一级标题',
    h2: '二级标题',
    h3: '三级标题',
    h4: '四级标题',
    h5: '五级标题',
    h6: '六级标题'
  },
  imgTitleItem: {
    link: '添加链接',
    upload: '上传图片',
    clip2upload: '裁剪上传'
  },
  linkModalTips: {
    title: '添加',
    descLabel: '链接描述：',
    descLabelPlaceHolder: '请输入描述...',
    urlLabel: '链接地址：',
    urlLabelPlaceHolder: '请输入链接...',
    buttonOK: '确定'
  },
  clipModalTips: {
    title: '裁剪图片上传',
    buttonUpload: '上传'
  },
  copyCode: {
    text: '复制代码',
    successTips: '已复制！',
    failTips: '复制失败！'
  },
  mermaid: {
    flow: '流程图',
    sequence: '时序图',
    gantt: '甘特图',
    class: '类图',
    state: '状态图',
    pie: '饼图',
    relationship: '关系图',
    journey: '旅程图'
  },
  katex: {
    inline: '行内公式',
    block: '块级公式'
  },
  footer: {
    markdownTotal: '字数',
    scrollAuto: '同步滚动'
  }
};

export default ZH_CN;
```

### 预览主题

在 previewTheme 文件夹下新增你的预览主题，通过 `[name].scss` 导出

```scss
@import '../../common/index.scss';

.xxx-theme {
  @include common-style;
  color: red;
}
```

`xxx` 即是你的主题名称，通过 `previewTheme="xxx"` 来使用。

你可以充分的利用编辑器已提供的[css 变量](https://github.com/imzbf/md-editor-v3#change-styles)来设置你的主题。
