export interface StaticTextDefaultValue {
  toolbarTips?: {
    bold?: string;
    underline?: string;
    italic?: string;
    strikeThrough?: string;
    title?: string;
    sub?: string;
    sup?: string;
    quote?: string;
    unorderedList?: string;
    orderedList?: string;
    task?: string;
    codeRow?: string;
    code?: string;
    link?: string;
    image?: string;
    table?: string;
    mermaid?: string;
    katex?: string;
    revoke?: string;
    next?: string;
    save?: string;
    prettier?: string;
    pageFullscreen?: string;
    fullscreen?: string;
    preview?: string;
    htmlPreview?: string;
    catalog?: string;
    github?: string;
    '-'?: string;
    '='?: string;
  };
  titleItem?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  imgTitleItem?: {
    link: string;
    upload: string;
    clip2upload: string;
  };
  linkModalTips?: {
    title?: string;
    descLable?: string;
    descLablePlaceHolder?: string;
    urlLable?: string;
    UrlLablePlaceHolder?: string;
    buttonOK?: string;
  };
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  copyCode?: {
    text?: string;
    successTips?: string;
    failTips?: string;
  };
  mermaid?: {
    // 流程图
    flow?: string;
    // 时序图
    sequence?: string;
    // 甘特图
    gantt?: string;
    // 类图
    class?: string;
    // 状态图
    state?: string;
    // 饼图
    pie?: string;
    // 关系图
    relationship?: string;
    // 旅程图
    journey?: string;
  };
  katex?: {
    inline: string;
    block: string;
  };
  footer?: {
    markdownTotal: string;
    scrollAuto: string;
  };
}
