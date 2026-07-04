# HMI 智能座舱英语学习

一个面向 HMI / 智能座舱交互设计师的每日英语学习静态网页。

## 本地查看

直接打开 `index.html`，或用任意静态服务器打开当前目录。

## 数据

每日内容保存在 `data/hmi-notes.json`。最新内容放在数组最前面。

## 校验

```bash
node scripts/validate-data.mjs
```

## 发布

推荐发布到 GitHub Pages。首次发布需要登录 GitHub 并开启 Pages；之后每日自动化会更新数据并推送发布。
