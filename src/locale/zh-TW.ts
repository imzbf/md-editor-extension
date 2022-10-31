import type { StaticTextDefaultValue } from '../../index';

/**
 * @author imzbf
 * @email  zbfcqtl@gmail.com
 * @github https://github.com/imzbf
 *
 * 繁体
 *
 * 作者不确定是否完全翻译正确中文繁体
 * 如果您发现错误，请纠正我
 */
const ZH_TW: StaticTextDefaultValue = {
  toolbarTips: {
    bold: '加粗',
    underline: '下劃線',
    italic: '斜體',
    strikeThrough: '删除線',
    title: '標題',
    sub: '下標',
    sup: '上標',
    quote: '引用',
    unorderedList: '無序列錶',
    orderedList: '有序列錶',
    codeRow: '行內代碼',
    code: '塊級代碼',
    link: '鏈接',
    image: '圖片',
    table: '表格',
    mermaid: 'mermaid圖',
    katex: 'katex公式',
    revoke: '後退',
    next: '前進',
    save: '保存',
    prettier: '美化',
    pageFullscreen: '瀏覽器全屏',
    fullscreen: '屏幕全屏',
    preview: '預覽',
    htmlPreview: 'html代碼預覽',
    catalog: '目錄',
    github: '源碼地址',
  },
  titleItem: {
    h1: '一級標題',
    h2: '二級標題',
    h3: '三級標題',
    h4: '四級標題',
    h5: '五級標題',
    h6: '六級標題',
  },
  imgTitleItem: {
    link: '添加鏈接',
    upload: '上傳圖片',
    clip2upload: '裁剪上傳',
  },
  linkModalTips: {
    title: '添加',
    descLable: '鏈接描述：',
    descLablePlaceHolder: '請輸入描述...',
    urlLable: '鏈接地址：',
    UrlLablePlaceHolder: '請輸入链接...',
    buttonOK: '確定',
  },
  clipModalTips: {
    title: '裁剪圖片上傳',
    buttonUpload: '上傳',
  },
  copyCode: {
    text: '複製代碼',
    successTips: '已複製！',
    failTips: '複製失敗！',
  },
  mermaid: {
    flow: '流程圖',
    sequence: '時序圖',
    gantt: '甘特圖',
    class: '類圖',
    state: '狀態圖',
    pie: '餅圖',
    relationship: '關係圖',
    journey: '旅程圖',
  },
  katex: {
    inline: '行內公式',
    block: '塊級公式',
  },
  footer: {
    markdownTotal: '字數',
    scrollAuto: '同步滾動',
  },
};

export default ZH_TW;
