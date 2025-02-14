'use client'

import { useCallback, useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useStories } from '@/hooks/use-stories'

const center = {
  lat: 12.9716,
  lng: 77.5946,
}

export default function Map() {
  const MAPS_API = process.env.GOOGLE_MAPS_API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:MAPS_API,
  })

  const [map, setMap] = useState(null)
  const { stories, selectedStory, selectedLocation, setSelectedLocation, selectStory } = useStories()

  const onLoad = useCallback((map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  useEffect(() => {
    if (map && selectedStory?.location?.coordinates) {
      map.panTo({
        lat: selectedStory.location.coordinates[1],
        lng: selectedStory.location.coordinates[0],
      })
      map.setZoom(15)
    }
  }, [map, selectedStory])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={(e) => {
        if (e.latLng) {
          setSelectedLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          })
        }
      }}
    >
      {stories.map((story) => (
        story.location?.coordinates ? (
          <Marker
            key={story._id}
            position={{
              lat: story.location.coordinates[1],
              lng: story.location.coordinates[0],
            }}
            animation={selectedStory?._id === story._id ? google.maps.Animation.BOUNCE : undefined}
            onClick={() => selectStory(story)}
          />
        ) : null
      ))}
      
      {selectedLocation && (
        <Marker
          position={{
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
          }}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
        />
      )}
    </GoogleMap>
  )
}