# Figma 高保真原型规范（可直接照做）

说明：仓库中提供的是可落地的“页面结构 + 组件规范 + Token 文件”。Figma 原型文件本身需要在 Figma 中创建（无法在代码仓库里自动生成 .fig 设计稿）。

## 文件结构

- Pages
  - `00 - Tokens`
  - `01 - Components`
  - `02 - Login`
  - `03 - Home`
  - `04 - Detail`
  - `05 - Profile`

## 00 - Tokens

- Colors：导入 `design/tokens.json`
- Spacing：8px 基线（8/16/24/32/40）
- Radius：12px
- Stroke：1.5px
- Typography：标题 700、正文 400；字号 40/32/24/16/14/12，行高=字号×1.5

## 01 - Components（100% 可复用 + Auto Layout）

- Button / Primary（48h, r12, inset shadow）
- Button / Secondary（48h, 1px border）
- Input / Default（48h, 1px #E0E0E0）
- Input / Focus（outline 2px rgba(123,167,225,.2)）
- Card / Post（白底 + 1px 分隔，去阴影）
- Nav / Desktop（Logo + Menu + Search）
- Nav / Mobile（Drawer）
- Carousel / 16:9（固定占位）
- ListItem / Archive（时间线项）
- Chip / Tag（线性边框 + 小圆角）
- Empty / State（空状态）
- Lottie / Loading、Hover、Done（对应 `source/lottie/*.json`）

## 02 - Login

- Layout：居中窄栏（max 420），周围留白充足
- 内容：标题、输入（邮箱/密码）、主按钮、次按钮（注册/找回）

## 03 - Home

- Top Nav
- Hero：一句话 + 16:9 轮播（封面区域）
- Feed：文章卡片列表（高密度信息禁止，强调留白）

## 04 - Detail

- 标题区：标题/日期/标签
- 正文：正文排版严格（16/24、段落间距=16）
- 代码块：Prism 高亮，去阴影
- 评论：预留模块（Waline/Twikoo）

## 05 - Profile

- 头像（线稿剪影/圆形）
- 信息：昵称/简介/链接
- 列表：我的文章/我的收藏/设置入口

## 响应式规则

- 容器宽：`min(960, 100% - 48)`
- 栅格：8px 基线，所有区块上下间距使用 24/32/40
- 移动端：侧边抽屉，轮播保持 16:9
