# GitHub Pages 覆盖式上线（tewrabbit.github.io）

目标：保留你原来的 `tewrabbit.github.io` 仓库，但用当前项目直接覆盖旧站点内容，并通过 Actions 自动发布到 `gh-pages`。

## 重要规则

- 账号主页站点（User Pages）仓库名必须是：`tewrabbit.github.io`
- `TewRabbit.github.io` 只是大小写不同，实际访问域名仍然是：`https://tewrabbit.github.io/`

## 一次性准备（GitHub 仓库设置）

在 `tewrabbit/tewrabbit.github.io` 仓库里：

1. Settings → Pages
2. Build and deployment → Source 选择 `Deploy from a branch`
3. Branch 选择 `gh-pages`，目录选择 `/ (root)`

## 覆盖式推送（本地只做一次）

假设你本地项目目录是 `D:\MyBlog`，并且你想用它覆盖旧仓库：

1. 初始化 git（如果还没有）
   - `git init`
2. 设置远端为你的 `tewrabbit.github.io`
   - `git remote add origin https://github.com/tewrabbit/tewrabbit.github.io.git`
3. 确保默认分支是 `main`（Actions 默认监听 `main/master`）
   - `git branch -M main`
4. 推送覆盖
   - `git add -A`
   - `git commit -m "init: new blog"`
   - `git push -u origin main --force`

说明：
- `--force` 代表你明确要覆盖远端 `main` 的旧内容（建议你只在第一次覆盖时使用）。
- 站点发布产物由 GitHub Actions 构建并推送到 `gh-pages`，不需要你手动提交 `public/`。

## 上线后检查

- Actions → Deploy Hexo (Matery) 这一条 workflow 运行成功
- Pages 页面显示部署成功
- 访问：`https://tewrabbit.github.io/`

