import { NextRequest, NextResponse } from 'next/server'
import pdf from 'pdf-parse'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Parse PDF
    const data = await pdf(buffer)
    console.log("data", data)
    return NextResponse.json({
      text: data.text,
      numPages: data.numpages,
      info: data.info
    })
  } catch (error) {
    console.error('Error handling PDF upload:', error)
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 })
  }
}
