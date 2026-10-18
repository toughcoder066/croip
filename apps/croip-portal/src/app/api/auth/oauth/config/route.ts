import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

export async function GET() {
  return NextResponse.json({
    google: Boolean(process.env.GOOGLE_CLIENT_ID),
    github: Boolean(process.env.GITHUB_CLIENT_ID),
    microsoft: Boolean(process.env.MICROSOFT_CLIENT_ID)
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { provider, clientId, clientSecret } = body

    if (!provider || !clientId) {
      return NextResponse.json({ error: 'Missing required credentials' }, { status: 400 })
    }

    const envKeyId = `${provider.toUpperCase()}_CLIENT_ID`
    const envKeySecret = `${provider.toUpperCase()}_CLIENT_SECRET`

    process.env[envKeyId] = clientId
    if (clientSecret) {
      process.env[envKeySecret] = clientSecret
    }

    // Persist to .env file in apps/croip-portal
    const envPath = path.resolve(process.cwd(), '.env')
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : ''

    const regexId = new RegExp(`^${envKeyId}=.*$`, 'm')
    if (regexId.test(envContent)) {
      envContent = envContent.replace(regexId, `${envKeyId}=${clientId}`)
    } else {
      envContent += `\n${envKeyId}=${clientId}`
    }

    if (clientSecret) {
      const regexSecret = new RegExp(`^${envKeySecret}=.*$`, 'm')
      if (regexSecret.test(envContent)) {
        envContent = envContent.replace(regexSecret, `${envKeySecret}=${clientSecret}`)
      } else {
        envContent += `\n${envKeySecret}=${clientSecret}`
      }
    }

    fs.writeFileSync(envPath, envContent, 'utf8')

    return NextResponse.json({
      success: true,
      message: `Configured ${provider} credentials successfully!`
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update credentials' }, { status: 500 })
  }
}
