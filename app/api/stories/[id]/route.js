import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Story from '@/models/Story'

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    await Story.findByIdAndDelete(params.id)
    return NextResponse.json({ message: 'Story deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 })
  }
}