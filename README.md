# HMI 智能座舱英语学习

一个面向 HMI / 智能座舱交互设计师的每日英语学习静态网页。

## 本地查看

通过 GitHub Pages 访问，或用静态服务器打开当前目录（例如 `python3 -m http.server 8765` 后访问 `http://localhost:8765`）。页面使用 JavaScript 模块，不建议直接以文件方式打开。

## 每日复习

首页提供单词、句子两种复习模式，默认每天新增 8 个词、2 个句子，可分别调整。先查看答案，再选择认识、模糊或忘记。模糊和忘记会在当前队列稍后再次出现；认识后按 1、3、7、14、30 天安排下一次复习。到期内容优先于新内容。

学习记录保存在当前浏览器的本地存储中，刷新后可继续。北京时间跨天后生成新的任务。无需账号，不提供跨设备同步；清除浏览器数据会清除进度。每日课程、点击查词和朗读仍然保留。

复习逻辑校验：`node scripts/test-review.mjs`。

查看答案和三种评分会播放短音效，可在复习底部关闭。我的词库展示所有学习卡片，支持中英文搜索、类型与状态筛选、次数排序和分页。逐项记录出现、忘记、模糊、认识次数、平均每日出现次数及最近出现时间；复习间隔与下次到期时间保留。旧版没有逐次统计，因此新增次数从更新后开始记录，旧版卡片会标记“含旧版学习记录”。刷新或打开词库不会重复计算出现次数。

## 数据

每日内容保存在 `data/hmi-notes.json`。最新内容放在数组最前面。

## 校验

```bash
node scripts/sync-data-js.mjs
node scripts/sync-local-dictionary.mjs
node scripts/validate-data.mjs
```

`sync-local-dictionary.mjs` 会扫描所有已发布文章和例句，把尚未收录的单词通过免费词典补入
`data/local-dictionary.json` 和 `data/local-dictionary.js`。网站查询顺序为：当天专业词库、内置本地词库、
浏览器免费在线查询；在线结果会缓存在当前设备中。

需要用 ECDICT 重新生成当前全部历史词条时：

```bash
node scripts/import-ecdict.mjs --source=/path/to/ecdict.csv
```

## 发布

推荐发布到 GitHub Pages。首次发布需要登录 GitHub 并开启 Pages；之后每日自动化会更新数据并推送发布。

每日发布后需要做三项检查：

1. 检查 GitHub raw `main/data/hmi-notes.json` 的首条内容是否为当天日期，确认远端 `main` 已更新。
2. 检查 GitHub Pages `data/hmi-notes.json` 的首条内容是否为当天日期，确认网页端已发布新快照。
3. 检查 GitHub Pages 首页返回 HTTP 200，确认公网入口可访问。

如果 raw 文件已经是当天内容，但 GitHub Pages 仍返回旧日期，说明推送已成功但 Pages/CDN 仍在旧发布快照。此时自动化应推送一个空提交触发重新部署：

```bash
git commit --allow-empty -m "Trigger GitHub Pages deployment"
git push origin main
```

触发后等待 1-2 分钟，再重新检查 GitHub Pages 数据文件。若仍为旧内容，在结果里说明 GitHub Pages/CDN 发布延迟，并记录触发重新部署的 commit。
