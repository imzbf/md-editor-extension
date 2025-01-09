## PreviewThemeSwitch

Dropdown menu tool for switching the editor's preview theme.

## Usage

```vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars" :theme="theme">
    <template #defToolbars>
      <PreviewThemeSwitch v-model="previewTheme" />
      <!-- <PreviewThemeSwitch v-model="previewTheme">
        <span>Icon</span>
      </ThemeSwitch> -->
    </template>
  </MdEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import type { ToolbarNames, PreviewThemes } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { PreviewThemeSwitch } from '@vavt/v3-extension';

// All CSS for this extension library
// import '@vavt/v3-extension/lib/asset/style.css';
// Or individual style for component
import '@vavt/v3-extension/lib/asset/PreviewThemeSwitch.css';

const text = ref<string>('');
const previewTheme = ref<PreviewThemes>('default');
const toolbars: ToolbarNames[] = ['bold', 0, 'underline'];
</script>
```

## Props

| name | type | default | description |
| --- | --- | --- | --- |
| title | `string` | 'Theme Switcher' | Shown as a tooltip text when the mouse moves over |
| modelValue | `string` | 'light' | Editor's preview theme |
| options | `Array<{ value: string; label: string }>` | [DEFAULT_OPTIONS](https://github.com/imzbf/md-editor-extension/blob/develop/packages/data/src/index.ts#L1) | Option; defaults to a list of preview theme names within the editor |
| extraOptions | `Array<{ value: string; label: string }>` | `[]` | Extra options that will be appended to the default list |
| closeAfterSelect | `boolean` | `true` | Whether to close the dropdown menu after selection |

## Events

| name     | type                      | default   | description |
| -------- | ------------------------- | --------- | ----------- |
| onChange | `(value: Themes) => void` | undefined |             |

## Slots

| name | type | default | description |
| --- | --- | --- | --- |
| default | `string \| VNode \| JSX.Element` | `<SwatchBook class="md-editor-icon" />` | Content displayed in the toolbar |
