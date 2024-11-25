<template>
  <div :class="state.theme">
    <div class="dev-tools">
      <fieldset>
        <legend>theme</legend>
        <button @click="state.theme = 'light'">light</button>
        <button @click="state.theme = 'dark'">dark</button>
      </fieldset>
      <fieldset>
        <legend>locale</legend>
        <button @click="state.language = 'zh-CN'">简体中文</button>
        <button @click="state.language = 'zh-TW'">繁体中文</button>
        <button @click="state.language = 'en-US'">English</button>
        <button @click="state.language = 'fr-FR'">Français</button>
        <button @click="state.language = 'jp-JP'">日本語</button>
      </fieldset>
      <fieldset>
        <legend>previewTheme</legend>
        <button @click="state.previewTheme = 'default'">default</button>
        <button @click="state.previewTheme = 'arknights'">arknights</button>
      </fieldset>
    </div>

    <div class="container">
      <MdEditorV3
        v-model="state.text"
        id="locale-develop"
        :theme="state.theme"
        :language="state.language"
        :previewTheme="state.previewTheme"
        showCodeRowNumber
      />

      <br />

      <MdEditorV3
        v-model="state.text"
        id="preview-theme-develop"
        :theme="state.theme"
        :language="state.language"
        :previewTheme="state.previewTheme"
        showCodeRowNumber
        previewOnly
      />
    </div>
  </div>
</template>
<script setup>
import { reactive, watch, toRefs } from 'vue';
import mdAll from './md-all.md';

const l_state = localStorage.getItem('md-editor-extension-setting');

const state = reactive(
  l_state === null
    ? {
        theme: 'light',
        language: 'zh-CN',
        previewTheme: 'default',
        text: mdAll
      }
    : {
        ...JSON.parse(l_state),
        text: mdAll
      }
);

watch(
  () => toRefs(state),
  () => {
    localStorage.setItem(
      'md-editor-extension-setting',
      JSON.stringify({
        ...state,
        text: ''
      })
    );
  }
);
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

button + button {
  margin-left: 6px;
}

.dark {
  background-color: #000;
  color: #fff;
}

.light {
  background-color: #fff;
  color: #000;
}

.dev-tools {
  position: fixed;
  width: 200px;
  left: 20px;
  top: 20px;
  list-style: none;
}

.container {
  width: 1170px;
  margin: 0 auto;
  padding: 50px 0;
}
</style>
