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
    if(process.env.ENABLE_MOCK === 'true'){
      const mockCards =  [
        {"q": "事件驱动架构包含哪四个部分？", "a": "事件队列、分发器、事件通道、事件处理器"},
        {"q": "事件队列在事件驱动架构中的作用是什么？", "a": "接收事件的入口"},
        {"q": "分发器在事件驱动架构中的功能是什么？", "a": "将不同的事件分发到不同的业务逻辑单元"},
        {"q": "事件通道在事件驱动架构中是什么？", "a": "分发器与处理器之间的联系渠道"},
        {"q": "事件处理器在事件驱动架构中的作用是什么？", "a": "实现业务逻辑，处理完成后发出事件触发下一步操作"},
        {"q": "微服务架构的三种实现模式是什么？", "a": "RESTful API模式、RESTful应用模式、集中消息模式"},
        {"q": "RESTful API模式的特点是什么？", "a": "服务通过API提供，云服务属于这一类"},
        {"q": "RESTful应用模式的特点是什么？", "a": "通过传统网络协议或应用协议提供，背后通常是多功能应用程序，常见于企业内部"},
        {"q": "集中消息模式的特点是什么？", "a": "采用消息代理实现消息队列、负载均衡、统一日志和异常处理"},
        {"q": "集中消息模式的缺点是什么？", "a": "会出现单点失败，消息代理可能要做成集群"}
      ]
      return NextResponse.json({ flashcards: mockCards || [] }, { status: 200 })
    }
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
    console.log("content:", content)
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
