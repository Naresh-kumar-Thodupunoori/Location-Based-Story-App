import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Story from '@/models/Story'

export async function GET() {
  try {
    await connectDB()
    const stories = await Story.find().sort({ createdAt: -1 })
    return NextResponse.json(stories)
  } catch (error) {
    console.error('Error in GET /api/stories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stories', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    console.log('Starting POST request to /api/stories')
    
    // 1. Connect to database
    console.log('Connecting to database...')
    await connectDB()
    console.log('Database connected successfully')

    // 2. Get form data
    console.log('Getting form data...')
    const formData = await request.formData()
    console.log('Form data received:', {
      title: formData.get('title'),
      description: formData.get('description'),
      lat: formData.get('lat'),
      lng: formData.get('lng'),
      hasImage: !!formData.get('image')
    })
    
    // 3. Validate required fields
    const title = formData.get('title')
    const description = formData.get('description')
    const image = formData.get('image')
    const lat = formData.get('lat')
    const lng = formData.get('lng')

    if (!title || !description || !image || !lat || !lng) {
      console.error('Missing required fields:', {
        hasTitle: !!title,
        hasDescription: !!description,
        hasImage: !!image,
        hasLat: !!lat,
        hasLng: !!lng
      })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 4. Convert image to base64
    console.log('Converting image to base64...')
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const imageBase64 = buffer.toString('base64')
    const imageUrl = `data:${image.type};base64,${imageBase64}`
    console.log('Image converted successfully')

    // 5. Create story document
    console.log('Creating story document...')
    const storyData = {
      title,
      description,
      imageUrl,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
    }
    console.log('Story data:', storyData)

    const story = await Story.create(storyData)
    console.log('Story created successfully:', story)

    return NextResponse.json(story)
  } catch (error) {
    console.error('Detailed error in POST /api/stories:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json(
      { error: 'Failed to add story', details: error.message },
      { status: 500 }
    )
  }
}
