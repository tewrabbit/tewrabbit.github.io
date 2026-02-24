# 克制系二次元美学体系（Hexo + Matery）

## 视觉基调

- 留白：页面可见区域尽量保持 ≥ 60% 留白（通过更窄内容宽度、更大区块间距实现）
- 画布：背景固定 `#FFFFFF`，禁止纹理/光效/大面积渐变
- 三级层级
  - 基础层：`#FFFFFF`
  - 功能层：`1px #F5F5F5` 分隔线
  - 亮点层：低饱和主题色，只占 ≤ 5% 面积：`#7BA7E1` / `#A8D8B9`
- 8px 栅格：布局间距以 8px 为基线（8/16/24/32/40…）

## 二次元元素使用规则

- 2.5D 只用于核心交互点（按钮）：圆角矩形 `r=12px` + 内阴影 `inset 0 2px 4px rgba(0,0,0,.1)`
- 图标：线性 `1.5px`，`round` 线帽与连接，SVG 保留可变 `stroke-width`
- 角色剪影：单线稿、透明填充、描边 `#7BA7E1`，面积 ≤ 3%（建议放在页脚角落）
- 微渐变：仅允许用于 1px 描边线（`#7BA7E1 → #A8D8B9`，90°，长度 ≤ 80px）

## 字体系统

- 双字体栈
  - 标题/按钮：得意黑 Smiley Sans（700，缺失时回退幼圆）
  - 正文/辅助：霞鹜文楷 LXGW WenKai（400）
- 字号阶梯：40 / 32 / 24 / 16 / 14 / 12px
- 行高：字号 × 1.5
- 字重：仅允许 400 / 700
- 禁止：`text-shadow`、`text-stroke`

## 组件规范

### 按钮

- 高度：48px
- 圆角：12px
- 内阴影：2px（`inset 0 2px 4px rgba(0,0,0,.1)`）
- Hover：`translateY(-2px)` + `transition 200ms ease-out`

### 输入框

- 默认：`1px #E0E0E0`
- Focus：描边 `#7BA7E1` + 外发光 `0 0 0 2px rgba(123,167,225,.2)`

### 轮播/封面区域

- 统一 16:9 占位
- 每日自动抓取“二次元图像站点最高赞 TOP1”并压缩为 ≤200KB WebP（见脚本与工作流）

## Do & Don’t

- Do：白底、细分隔、低饱和点缀、充足留白、可复用组件
- Don’t：背景纹理、强光效、大片渐变、夸张阴影、字体描边/阴影

## 实现位置

- CSS Tokens：`themes/matery/source/css/anime-vars.css`
- 样式覆盖：`themes/matery/source/css/my.css`
- 线性图标：`themes/matery/layout/_partial/navigation.ejs` / `mobile-nav.ejs`
- 角色剪影：`themes/matery/layout/_partial/footer.ejs`
