'use client'

import { useStories } from '@/hooks/use-stories'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

export default function StoryList() {
  const { stories, selectStory, deleteStory } = useStories()

  if (!Array.isArray(stories)) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {stories.length === 0 ? (
        <p className="text-gray-500 col-span-full text-center">No stories yet. Create one by selecting a location on the map!</p>
      ) : (
        stories.map((story) => (
          <Card
            key={story._id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => selectStory(story)}
          >
            <CardContent className="p-4">
              <div className="aspect-video relative mb-4">
                <Image
                  src={story.imageUrl}
                  alt={story.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{story.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{story.description}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteStory(story._id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}