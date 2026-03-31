请根据以下 PRD 开发一个 AI 闪卡生成器 MVP
## 项目概览
名称： AI Flashcard Generator (MVP)
技术栈： Next.js (App Router), Tailwind CSS, Lucide React (图标), Framer Motion (动画).
核心逻辑： 用户上传文本/PDF -> 调用 DeepSeek API -> 解析 JSON -> 展示翻转闪卡。

## 页面结构 (Single Page Application)
Header: 居中显示项目名称 "AI Flashcard Generator"。
Input Section:
一个大的 Textarea 用于粘贴文本。
一个底部的 Upload 区域（支持 PDF，MVP 阶段可先做文本处理，PDF 解析作为 TODO）。
一个巨大的 Generate Flashcards 按钮（带 Loading 状态）。
Flashcard Display (Hidden by default):
Card Container: 一个 3D 翻转效果的卡片，正面显示问题，背面显示答案。
Controls: "Previous" 和 "Next" 按钮，中间显示进度 "3 / 20"。
Reset: 一个按钮返回输入页面重新开始。

## 详细逻辑与接口 (Backend/API)
Endpoint: /api/generate (POST)
DeepSeek Integration:
使用 deepseek-chat 模型。
System Prompt: 你是一个备考专家。请将用户输入的文本提炼成考点，并以 JSON 格式输出：{"flashcards": [{"q": "问题", "a": "答案"}]}。确保问题简洁，答案原子化。不要输出任何解释文字。
Security: API Key 必须从 process.env.DEEPSEEK_API_KEY 读取。

## UI/UX 规范
风格： 极简主义，白色背景，深色文字，紫色强调色 (#8B5CF6)。
闪卡动画： 使用 Framer Motion 实现平滑的翻转动画（Y 轴旋转 180 度）。
响应式： 必须在移动端完美适配，卡片占据屏幕宽度 90%。

## 待实现任务清单 (Instruction for AI)
Step 1: 初始化 Next.js 项目，配置 Tailwind。
Step 2: 创建一个简单的 Card 组件，支持 isFlipped 状态。
Step 3: 编写 /api/generate 接口，集成 OpenAI SDK（配置 DeepSeek 的 BaseURL）。
Step 4: 在前端实现提交逻辑，处理 Loading 状态并渲染返回的 JSON 数据。
