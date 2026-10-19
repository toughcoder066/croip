import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image file was provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Please upload a PNG, JPEG, WebP, or GIF image.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit. Please choose a smaller image.' },
        { status: 400 }
      )
    }

    // Determine storage directory outside project tree
    const storageDir =
      process.env.STORAGE_DIR ||
      path.join(process.cwd(), '..', '..', '.storage', 'uploads')
    const avatarsDir = path.join(storageDir, 'avatars')

    await fs.mkdir(avatarsDir, { recursive: true })

    // Generate safe filename
    const ext = file.name.split('.').pop()?.toLowerCase() || (file.type.split('/')[1] || 'png')
    const sanitizedExt = ext.replace(/[^a-z0-9]/g, '')
    const filename = `avatar-${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${sanitizedExt}`
    const targetFilePath = path.join(avatarsDir, filename)

    // Write file buffer to external storage volume
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await fs.writeFile(targetFilePath, buffer)

    const avatarUrl = `/api/uploads/avatars/${filename}`

    // Update session user profile
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')
    if (sessionCookie?.value) {
      try {
        const user = JSON.parse(sessionCookie.value)
        user.imageUrl = avatarUrl
        cookieStore.set('croip_session', JSON.stringify(user), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      } catch {
        // ignore parse error
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Avatar uploaded and stored successfully in container storage.',
      url: avatarUrl
    })
  } catch (error) {
    console.error('Failed to process avatar upload:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while saving the avatar image' },
      { status: 500 }
    )
  }
}
