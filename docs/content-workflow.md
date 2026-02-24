# 文章写作与管理（Hexo + Matery）

## 文章放哪里

- 文章：`source/_posts/*.md`
- 友链数据：`source/_data/friends.json`
- 视频池（封面/背景用）：`source/medias/vedio/`（直接丢视频即可）

## 新建文章

```powershell
npx hexo new post "标题"
```

生成：`source/_posts/标题.md`

## 常用 Front-matter（建议模板）

```yaml
---
title: 标题
date: 2026-02-24 12:00:00
categories:
  - 随笔
tags:
  - Hexo
summary: 一句话摘要（会用于首页卡片与 SEO description）

# 让文章出现在首页顶部轮播（推荐文章）
cover: true

# 指定这篇文章的封面视频（指定后永远固定，不走随机）
# coverVideo: /medias/vedio/3.mp4

# 可选：指定这篇文章的封面图片（视频没加载出来时的兜底图）
# coverImg: /medias/featureimages/0.jpg
# img: /medias/featureimages/1.jpg

# 置顶（推荐文章区也会优先显示）
# top: 1

# 隐藏文章（不在列表显示）
# hide: true
---
```

## 封面视频的默认规则

- 你没有给文章写 `coverVideo` 时：页面每次打开都会从视频池里随机挑选视频当封面。
- 你给文章写了 `coverVideo` 时：这篇文章永远用你指定的视频。

## 友链怎么加

编辑 `source/_data/friends.json`，新增一个对象：

```json
{
  "avatar": "https://example.com/avatar.png",
  "name": "站点名",
  "introduction": "一句话介绍",
  "url": "https://example.com/",
  "title": "访问"
}
```

生成后访问：`/friends/`

