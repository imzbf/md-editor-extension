# @vavt/rt-extension

## 5.0.0

### Major Changes

- 4c14690: Require md-editor v7 and drop support for the v6 dark mode selector.

  The preview themes and component styles now target v7's `[data-theme='dark']` attribute instead of the legacy `.md-editor-dark` class, and the code blocks support v7 line numbering and line highlighting markup. The compiled CSS no longer contains any `.md-editor-dark` rule, so dark mode silently stops working on md-editor v6.

  `@vavt/v3-extension` now requires `md-editor-v3 >= 7.0.0` and `@vavt/rt-extension` now requires `md-editor-rt >= 7.0.0`. `@vavt/cm-extension` declares both editors as optional peer dependencies at `>= 7.0.0`, so whichever editor you have installed is version checked and the other one is ignored. Upgrade the editor before upgrading these packages.

  Forward `ExportPDF.sanitize` to its internal preview so HTML filtering can match the editor when opting into raw HTML on v7. Preserve custom content in both `ThemeSwitch` components and close React's `PreviewThemeSwitch` after selection by default, matching Vue and the documented behavior.

  Document the HTML opt-in required by `OriginalImg` and custom HTML emoji, and correct the controlled editor and theme bindings in the component examples.

### Patch Changes

- 1fe492f: Migrate workspace management and package publishing to npm workspaces and Changesets.
