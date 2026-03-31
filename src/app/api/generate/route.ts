import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const ARK_BASE_URL = 'https://ark.cn-beijing.volces.com/api/coding/v3'
const ARK_MODEL = 'kimi-k2.5'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text cannot be empty' }, { status: 400 })
    }

    const apiKey = process.env.ARK_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not configured' }, { status: 500 })
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: ARK_BASE_URL,
    })

    const systemPrompt = `You are an exam preparation expert. Please extract key points from the user's input text and output them in JSON format: {"flashcards": [{"q": "question", "a": "answer"}]}. Ensure questions are concise and answers are atomic. Do not output any explanatory text.`

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      model: ARK_MODEL,
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
    }

    let flashcards
    try {
      flashcards = JSON.parse(content)
    } catch (parseError) {
      return NextResponse.json({ error: 'Failed to parse response' }, { status: 500 })
    }

    return NextResponse.json({ flashcards }, { status: 200 })
  } catch (error) {
    console.error('Error generating flashcards:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
