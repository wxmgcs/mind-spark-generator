# AI Flashcard Generator

AI 闪卡生成器 MVP，基于 Next.js、Tailwind CSS 和 DeepSeek API。

## 功能特性

- 📝 上传文本内容
- 🤖 自动调用 DeepSeek API 生成闪卡
- 🎴 3D 翻转动画效果
- 📱 响应式设计，支持移动端
- ⚡ 极简主义 UI 设计

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **AI API**: DeepSeek

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

### 3. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 使用方法

1. 在文本框中粘贴或输入您要制作闪卡的文本内容
2. 点击 "Generate Flashcards" 按钮
3. 等待 AI 生成闪卡
4. 点击卡片翻转查看答案
5. 使用 "Previous" 和 "Next" 按钮浏览所有闪卡
6. 点击 "重新开始" 返回输入页面

## API 接口

### POST /api/generate

请求体：
```json
{
  "text": "您的文本内容"
}
```

响应：
```json
{
  "flashcards": [
    {
      "q": "问题",
      "a": "答案"
    }
  ]
}
```

## 项目结构

```
mind-spark-generator/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   └── page.tsx
│   ├── components/
│   │   ├── flashcard.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── textarea.tsx
│   └── lib/
│       └── utils.ts
├── .env.local
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 注意事项

- 请确保在 `.env.local` 中正确配置 DeepSeek API Key
- 当前版本仅支持文本输入，PDF 解析功能将在后续版本中添加
- 闪卡数量取决于 AI 生成结果

## 许可证

MIT
