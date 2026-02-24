# 个人博客

## 项目结构

- `/_config.yml`：站点配置（SEO、插件、分页、URL 等）
- `/themes/matery/_config.yml`：Matery 主题配置（导航、轮播、关于页模块、社交、统计、评论等）
- `/source/`：内容与页面
  - `/_posts/`：文章
  - `/about/`：关于页
  - `/tags/`、`/categories/`、`/friends/`：主题功能页
  - `/_data/friends.json`：友链数据
  - `/medias/video/`：封面/背景视频池（兼容旧目录 `/medias/vedio/`）
- `/.github/workflows/deploy.yml`：GitHub Actions 自动部署到 `gh-pages`

## 环境要求

- Node.js（建议 20+）
- Git（用于拉取主题、部署）

## 本地启动（PowerShell）

```powershell
npm ci
npx hexo clean
npx hexo g
npx hexo s --port 4000
```

浏览器打开：`http://localhost:4000/`

## 写文章

```powershell
npx hexo new post "标题"
```

文章在：`source/_posts/标题.md`

更完整的写作与管理说明见：`docs/content-workflow.md`

### Matery 推荐文章 / 轮播封面写法

```yaml
---
title: 你的标题
date: 2026-02-23 20:30:00
cover: true
coverImg: /medias/featureimages/0.jpg
img: /medias/featureimages/1.jpg
coverVideo: /medias/featurevideos/demo.webm  # 可选：轮播支持视频（需静音自动循环）
categories:
  - 随笔
tags:
  - 标签1
  - 标签2
summary: 一句话摘要（用于首页卡片与 SEO description）
keywords:
  - 关键词1
  - 关键词2
---
```

## 必备页面（已初始化）

- `source/tags/index.md`（标签云）
- `source/categories/index.md`（分类雷达图）
- `source/friends/index.md` + `source/_data/friends.json`（友链）
- `source/about/index.md`（关于）
- `source/404.md`（404）

## SEO

已启用：
- `sitemap.xml`（`hexo-generator-sitemap`）
- `robots.txt`（`hexo-generator-robotstxt`）
- meta：`keywords/description`（来自站点与文章 Front-matter）
- 结构化数据 JSON-LD（站点与文章，见 `themes/matery/layout/_partial/head.ejs`）


## 插件清单

- 搜索：`hexo-generator-search`（生成 `search.xml`）
- RSS：`hexo-generator-feed`（生成 `atom.xml`）
- 懒加载：`hexo-lazyload-image`（将图片转换为 `data-original`）
- 代码高亮：Hexo 内置 PrismJS（`/_config.yml` 已启用）
- 字数统计：`hexo-wordcount`
- Emoji：`hexo-filter-github-emojis`

## 性能优化

- 已启用 Instant.page 预加载（主题配置 `instantpage.enable: true`）
- 可选 CDN：在 `themes/matery/_config.yml` 配置 `jsDelivr.url`
  - 例：`https://cdn.jsdelivr.net/gh/<用户名>/<仓库名>`
  - 注意：配置 CDN 后，本地调试也会走线上资源；本地开发时建议临时注释该项

## 评论系统 / 站点统计 / 分析

- 站点统计：默认启用不蒜子（`busuanziStatistics.enable: true`）
- Google Analytics / 百度统计：默认关闭（在主题配置中填入 ID 再开启）
- 评论系统：默认关闭（建议使用 Waline 或 Twikoo 这类独立服务端方案）
  - 位置：`themes/matery/_config.yml` 的 `waline` / `twikoo`
