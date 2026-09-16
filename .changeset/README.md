# Changesets 使用说明

向 `main` 推送包代码变更前，运行 `npm run changeset`，选择受影响的包和合适的语义化版本变更级别，并用英文填写变更摘要。可以先在本地将特性分支合并到 `main`，再添加 Changeset。涉及公开包变更的拉取请求（PR）也需要包含 Changeset；如果已有记录覆盖本次发布，合并后无需重复添加。

仅修改文档、测试或开发工具时，无需添加 Changeset。修改私有工作区 `@vavt/data` 和 `@vavt/utils` 中的源码时，应选择使用这些源码的公开包。

推送到 `main` 后，`.github/workflows/release.yml` 会自动更新包版本、锁文件和包级更新日志，发布到 npm，并为每个已发布的包版本创建 GitHub Release，说明中包含对应版本更新日志的链接。
