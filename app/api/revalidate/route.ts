import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const topic = req.headers.get('x-shopify-topic') ?? ''

  if (topic.startsWith('products/')) {
    const body = await req.json()
    revalidateTag(`product-${body.handle}`)
    revalidateTag('products')
  }

  if (topic.startsWith('collections/')) {
    const body = await req.json()
    revalidateTag(`collection-${body.handle}`)
  }

  return NextResponse.json({ revalidated: true, topic })
}
