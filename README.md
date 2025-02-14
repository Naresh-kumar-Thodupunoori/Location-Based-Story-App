# TalkingLands - Location-Based Storytelling App

A Next.js application that allows users to share stories tied to specific locations on a map. Users can create, view, and interact with location-based stories, each with text content and images.
Hash your favourite stories at the places you want!.

## 🚀 Features

- 📍 Interactive map interface for story placement
- 📸 Image upload support
- 📝 Rich text story creation
- 🗺️ Location-based story browsing
- 🎯 Story selection and map centering
- 💾 MongoDB integration for data persistence

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14.2.16
- **State Management**: React Context
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI
- **Map Integration**: GoogleMaps API

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "14.2.16",
    "react": "latest",
    "react-dom": "latest",
    "mongoose": "latest",
    "@radix-ui/react-slot": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "lucide-react": "latest"
  }
}
```

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url](https://github.com/Naresh-kumar-Thodupunoori/Location-Based-Story-App)
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3002](http://localhost:3002)

## 📁 Project Structure

```
map/
├── app/
│   ├── api/
│   │   └── stories/
│   │       ├── route.js
│   │       └── [id]/
│   │           └── route.js
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── map.jsx
│   ├── story-form.jsx
│   ├── story-list.jsx
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       └── textarea.jsx
├── hooks/
│   └── use-stories.js
├── lib/
│   ├── db.js
│   └── utils.js
├── models/
│   └── Story.js
├── next.config.js
└── package.json
```

## 💡 Usage

1. **Creating a Story**
   - Click on the map to select a location
   - Fill in the story form with title, description, and image
   - Submit to save your story

2. **Viewing Stories**
   - Browse stories in the story list
   - Click on a story to center the map on its location
   - View story details including image and description

3. **Managing Stories**
   - Delete stories you've created
   - Select stories to view their locations
   - Navigate through the map to discover stories

## 🔧 Configuration

### MongoDB Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to `.env.local`

### Next.js Configuration

The `next.config.js` file includes:
- File upload configurations
- Image optimization settings
- Server-side rendering options

## 🐛 Troubleshooting

Common issues and solutions:

1. **MongoDB Connection Issues**
   - Verify your connection string
   - Check network connectivity
   - Ensure IP whitelist settings

2. **Image Upload Problems**
   - Check file size limits
   - Verify supported formats
   - Check browser console for errors

3. **Map Issues**
   - Ensure location services are enabled
   - Check browser console for API errors
   - Verify map provider credentials

## 🔒 Security

- Environment variables for sensitive data
- Input validation and sanitization
- Secure file upload handling
- MongoDB connection security

## 📚 API Documentation

### Story Endpoints

#### GET /api/stories
- Fetches all stories
- Returns array of story objects

#### POST /api/stories
- Creates a new story
- Requires: title, description, image, lat, lng

#### DELETE /api/stories/[id]
- Deletes a story by ID
- Requires: story ID
