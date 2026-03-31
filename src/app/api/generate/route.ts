import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com/v1'
const DEEPSEEK_MODEL = 'deepseek-chat'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: '文本不能为空' }, { status: 400 })
    }

    const apiKey = process.env.DEEPSEEK_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key 未配置' }, { status: 500 })
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: DEEPSEEK_BASE_URL,
    })

    const systemPrompt = `你是一个备考专家。请将用户输入的文本提炼成考点，并以 JSON 格式输出：{"flashcards": [{"q": "问题", "a": "答案"}]}。确保问题简洁，答案原子化。不要输出任何解释文字。`

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      model: DEEPSEEK_MODEL,
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json({ error: '生成失败' }, { status: 500 })
    }

    let flashcards
    try {
      flashcards = JSON.parse(content)
    } catch (parseError) {
      return NextResponse.json({ error: '解析响应失败' }, { status: 500 })
    }

    return NextResponse.json({ flashcards }, { status: 200 })
  } catch (error) {
    console.error('Error generating flashcards:', error)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
