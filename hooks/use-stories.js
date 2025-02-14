'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const StoriesContext = createContext()

export function StoriesProvider({ children }) {
  const [stories, setStories] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedStory, setSelectedStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/stories')
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || 'Failed to fetch stories')
      }
      const data = await response.json()
      setStories(data)
    } catch (error) {
      console.error('Error fetching stories:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const addStory = async (formData) => {
    try {
      console.log('Adding story with data:', {
        title: formData.get('title'),
        description: formData.get('description'),
        lat: formData.get('lat'),
        lng: formData.get('lng'),
        hasImage: !!formData.get('image')
      })

      const response = await fetch('/api/stories', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || 'Failed to add story')
      }

      const newStory = await response.json()
      console.log('Story added successfully:', newStory)
      
      setStories(prevStories => [...prevStories, newStory])
      return newStory
    } catch (error) {
      console.error('Error adding story:', error)
      throw error
    }
  }

  const selectStory = (story) => {
    setSelectedStory(story)
    if (story) {
      setSelectedLocation({
        lat: story.location.coordinates[1],
        lng: story.location.coordinates[0]
      })
    }
  }

  const deleteStory = async (storyId) => {
    try {
      const response = await fetch(`/api/stories/${storyId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || 'Failed to delete story')
      }

      setStories((prevStories) => prevStories.filter(story => story._id !== storyId))
      if (selectedStory?._id === storyId) {
        setSelectedStory(null)
        setSelectedLocation(null)
      }
    } catch (error) {
      console.error('Error deleting story:', error)
      throw error
    }
  }

  return (
    <StoriesContext.Provider 
      value={{ 
        stories, 
        loading,
        error,
        selectedLocation, 
        setSelectedLocation,
        selectedStory,
        selectStory,
        deleteStory,
        addStory,
        refreshStories: fetchStories
      }}
    >
      {children}
    </StoriesContext.Provider>
  )
}

export function useStories() {
  const context = useContext(StoriesContext)
  if (!context) {
    throw new Error('useStories must be used within a StoriesProvider')
  }
  return context
}
