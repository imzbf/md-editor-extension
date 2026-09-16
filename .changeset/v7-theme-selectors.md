---
'@vavt/cm-extension': major
'@vavt/rt-extension': major
'@vavt/v3-extension': major
---

Require md-editor v7 and drop support for the v6 dark mode selector.

The preview themes and component styles now target v7's `[data-theme='dark']`
attribute instead of the legacy `.md-editor-dark` class, and the code blocks
support v7 line numbering and line highlighting markup. The compiled CSS no
longer contains any `.md-editor-dark` rule, so dark mode silently stops working
on md-editor v6.

`@vavt/v3-extension` now requires `md-editor-v3 >= 7.0.0` and
`@vavt/rt-extension` now requires `md-editor-rt >= 7.0.0`. `@vavt/cm-extension`
declares both editors as optional peer dependencies at `>= 7.0.0`, so whichever
editor you have installed is version checked and the other one is ignored.
Upgrade the editor before upgrading these packages.
