# Dash Monorepo

现代化 React 组件库开发工作区

## 技术栈

- 🚀 React 19 + TypeScript
- 📦 PNPM Workspace
- ⚡ Vite 构建工具链
- 🎨 Styled-Components 样式方案
- 🛠 Changesets 版本管理

## 目录结构

``` text
dash/
├── packages/      # 核心包
│   └── ui/        # UI 组件库
└── examples/      # 示例项目
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动组件开发
cd packages/ui
pnpm dev:ui

# 启动示例项目
cd examples
pnpm dev:ep
```

## 核心包说明

### @dash/ui

UI 组件库，当前包含：

- 动态停靠栏组件

```tsx
import { Dock } from '@dash/ui'

const App = () => (
  <Dock 
    position="bottom"
    items={[...]}
  />
)
```

## 许可证

[MIT License](LICENSE) © 2025-present [krislorem](https://github.com/krislorem/dash)
