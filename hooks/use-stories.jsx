'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const StoriesContext = createContext(undefined)

export function StoriesProvider({ children }) {
  const [stories, setStories] = useState([])
  const [selectedStory, setSelectedStory] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories')
      if (!response.ok) {
        throw new Error('Failed to fetch stories')
      }
      const data = await response.json()
      if (Array.isArray(data)) {
        setStories(data)
      } else {
        console.error('Received non-array data:', data)
        setStories([])
      }
    } catch (error) {
      console.error('Error fetching stories:', error)
      setStories([])
    }
  }

  const addStory = async (formData) => {
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Failed to add story')
      }
      
      const newStory = await response.json()
      setStories((prev) => [newStory, ...prev])
      setSelectedLocation(null)
      setSelectedStory(null)
    } catch (error) {
      console.error('Error adding story:', error)
      throw error
    }
  }

  const deleteStory = async (id) => {
    try {
      await fetch(`/api/stories/${id}`, {
        method: 'DELETE',
      })
      setStories((prev) => prev.filter((story) => story._id !== id))
      if (selectedStory?._id === id) {
        setSelectedStory(null)
      }
    } catch (error) {
      console.error('Error deleting story:', error)
    }
  }

  const selectStory = (story) => {
    if (story?.location?.coordinates) {
      setSelectedStory(story)
      if (story.location.coordinates) {
        const [lng, lat] = story.location.coordinates
        setSelectedLocation({
          lat,
          lng
        })
      }
    } else {
      console.warn('Attempted to select story with invalid location data:', story)
    }
  }

  return (
    <StoriesContext.Provider
      value={{
        stories,
        selectedStory,
        selectedLocation,
        setSelectedLocation,
        selectStory,
        addStory,
        deleteStory,
      }}
    >
      {children}
    </StoriesContext.Provider>
  )
}

export function useStories() {
  const context = useContext(StoriesContext)
  if (context === undefined) {
    throw new Error('useStories must be used within a StoriesProvider')
  }
  return context
}