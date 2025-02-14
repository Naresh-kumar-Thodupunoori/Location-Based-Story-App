import Map from '@/components/map'
import StoryForm from '@/components/story-form'
import StoryList from '@/components/story-list'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-black mb-8">Location Stories</h1>
        <div className="space-y-8">
          {/* Screen 1: Map and Story Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Map />
            </div>
            <div>
              <StoryForm />
            </div>
          </div>
          
          {/* Screen 2: Story List */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">Your Stories</h2>
            <StoryList />
          </div>
        </div>
      </div>
    </main>
  )
}