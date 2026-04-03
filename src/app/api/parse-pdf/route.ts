import { NextRequest, NextResponse } from 'next/server'

// 必须强制指定为 nodejs 运行环境，因为 pdf-parse 依赖 fs/path 等原生模块
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // 限制文件大小 (10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024 
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 })
    }

    // 检查文件类型 (部分浏览器下 file.type 可能为空，建议补充判断后缀)
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // const pdf = null//require('pdf-parse-debugging-disabled')
    // // 在函数内动态加载 pdf-parse 避开 ESM 编译限制
    // const data = await pdf(buffer, {
    //   // 随便定义一个 pagerender 函数，或者留空，通常能阻止它进入调试模式
    //   pagerender: function(pageData: any) {
    //     return pageData.getTextContent().then(function(textContent: any) {
    //       return textContent.items.map((item: any) => item.str).join(' ');
    //     });
    //   }
    // });

    return NextResponse.json({
      text: '',//data.text,
      pageCount: 0//data.numpages
    })
  } catch (error) {
    console.error('Error handling PDF upload:', error)
    return NextResponse.json(
      { error: 'Failed to process PDF: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
