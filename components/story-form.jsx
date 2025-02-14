'use client'

import { useState } from 'react'
import { useStories } from '@/hooks/use-stories'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload } from 'lucide-react'
import Image from 'next/image'

export default function StoryForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const { selectedLocation, addStory } = useStories()

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedLocation) {
      alert('Please select a location on the map first')
      return
    }
    if (!image) {
      alert('Please upload an image')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', image)
    formData.append('lat', selectedLocation.lat.toString())
    formData.append('lng', selectedLocation.lng.toString())

    try {
      await addStory(formData)
      setTitle('')
      setDescription('')
      setImage(null)
      setPreview('')
    } catch (error) {
      console.error('Error adding story:', error)
      alert('Failed to add story')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div 
            className={`aspect-video relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden ${
              !preview ? 'hover:bg-gray-50' : ''
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <Upload className="h-12 w-12 mb-2" />
                <p>Click here to upload image</p>
              </div>
            )}
          </div>
          
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of story"
            required
          />
          
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description of story"
            required
            rows={4}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!selectedLocation || !image}
          >
            Save Story
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}