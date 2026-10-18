import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const MIME_MAP: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml'
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params
    const sanitizedFilename = path.basename(filename)

    const storageDir =
      process.env.STORAGE_DIR ||
      path.join(process.cwd(), '..', '..', '.storage', 'uploads')
    const filePath = path.join(storageDir, 'avatars', sanitizedFilename)

    try {
      const fileBuffer = await fs.readFile(filePath)
      const ext = sanitizedFilename.split('.').pop()?.toLowerCase() || 'png'
      const contentType = MIME_MAP[ext] || 'application/octet-stream'

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200'
        }
      })
    } catch {
      return new NextResponse('Avatar not found', { status: 404 })
    }
  } catch (error) {
    console.error('Error serving avatar:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
