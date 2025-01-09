## ThemeSwitch

Standard tool for toggling the editor's theme.

## Usage

```vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars" :theme="theme">
    <template #defToolbars>
      <ThemeSwitch v-model="theme" />
      <!-- <ThemeSwitch v-model="theme">
        <span>Icon</span>
      </ThemeSwitch> -->
    </template>
  </MdEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import type { ToolbarNames, Themes } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { ThemeSwitch } from '@vavt/v3-extension';

// This component has no additional CSS.

const text = ref<string>('');
const theme = ref<Themes>('light');
const toolbars: ToolbarNames[] = ['bold', 0, 'underline'];
</script>
```

## Props

| name | type | default | description |
| --- | --- | --- | --- |
| title | `string` | 'Theme Switcher' | Shown as a tooltip text when the mouse moves over |
| modelValue | `string` | 'light' | Editor's theme |

## Events

| name     | type                      | default   | description |
| -------- | ------------------------- | --------- | ----------- |
| onChange | `(value: Themes) => void` | undefined |             |

## Slots

| name | type | default | description |
| --- | --- | --- | --- |
| default | `string \| VNode \| JSX.Element` | `<Moon  class="md-editor-icon" /> \| <Sun  class="md-editor-icon" />` | Content displayed in the toolbar |
