# @krislorem/dash-ui

Dash UI 组件库

## 特性

- 🚀 基于 React 19 + TypeScript 构建

## 安装

```bash
# 使用 pnpm
pnpm add @krislorem/dash-ui

# 使用 npm
npm install @krislorem/dash-ui
```

## 使用示例

```typescript
import { Dock } from '@krislorem/dash-ui'
import type { DockProps } from '@krislorem/dash-ui'

const App = () => {
  const dockItems = [
    { id: 'home', icon: '🏠', label: '首页' },
    { id: 'settings', icon: '⚙️', label: '设置' }
  ]

  return (
    <Dock 
      items={dockItems}
      position="bottom"
      theme="glass"
      width="600px"
    />
  )
}
```

### Dock 组件 Props

| 属性名      | 类型                         | 默认值     | 描述               |
|-------------|------------------------------|------------|--------------------|
| items       | `DockItem[]`                 | 必填       | 停靠栏项目配置     |
| position    | `'top'｜'bottom'｜'left'｜'right'` | `'bottom'` | 停靠位置           |
| theme       | `'glass'｜'dark'｜'light'`   | `'glass'`  | 组件主题样式       |
| width       | `string`                     | `'auto'`   | 容器宽度           |
| height      | `string`                     | `'auto'`   | 容器高度           |

## 开发

```bash
# 启动开发服务器
pnpm dev

# 生产环境构建
pnpm build
```

## 组件列表

- [x] Dock - 图标坞
- [ ] Comments - 评论区组件
- [ ] Files - 文件树组件

## 许可证

[MIT](https://opensource.org/licenses/MIT) © 2025-present [krislorem](https://github.com/krislorem/dash)
