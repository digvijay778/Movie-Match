# 🎬 Movie Match App

**Movie Match** is a full-stack social web application that allows users to **make friends**, **chat**, **video call**, **share movie reviews** and **connect through favorite movie genres**. Built with the **MERN stack**, **Tailwind CSS**, and **Stream SDK**, it provides a real-time, interactive experience for movie lovers to discover and interact with like-minded people.

---

## 🌟 Features

- 👥 **User Registration & Login**  
  Secure authentication using JWT.
  
- 👤 **User Profiles**
  View user profiles displaying their bio, favorite genres, and a full list of their movie reviews.
  
- ⭐ **Movie Review System**
  Share your thoughts on movies, give them a rating out of 10, and browse a public feed of reviews from the    community.
  
- 🎭 **Set Favorite Movie Genres**  
  Choose your favorite genres to personalize your profile.

- 🔍 **Find Users by Genre**  
  Discover and connect with people who share similar movie interests.

- 💬 **Real-time Chat**  
  Instant messaging powered by **Stream Chat SDK**.

- 🎥 **Video Calling**  
  One-on-one video calling with friends (powered by WebRTC or Stream).

- 📇 **Friend System**  
  Send/accept friend requests and manage your connections.

- 🖥️ **Responsive Design**  
  Styled with **Tailwind CSS** for a clean, mobile-friendly UI.

---

## 🛠️ Tech Stack

### 🧠 Frontend
- React.js (with Hooks & Context)
- Tailwind CSS
- Stream Chat & Call SDK
- Axios

### 🔧 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Stream Server SDK

###📁 Project Structure
MovieMatch/
├── frontend/ → React + Tailwind CSS
├── backend/ → Express + MongoDB server

###🚀 Getting Started
1. Clone the repository
  git clone https://github.com/digvijay778/MovieMatch.git
  cd MovieMatch
  
2. Install Dependencies
   cd frontend npm install
   cd ../backend npm install

3. Set up environment variables
   Create .env files in both frontend and backend folders: frontend/.env VITE_STREAM_API_KEY=your_stream_key
   backend/.env MONGODB_URI=your_mongo_connection_string JWT_SECRET=your_jwt_secret STEAM_API_KEY=your_stream_key STEAM_API_SECRET=your_stream_secret

4. Run the app locally
    Frontend: cd frontend
              npm run dev
    Backend: cd backend
             npm run dev
   

###🛠️ Tech Stack 
         Frontend: React, Tailwind CSS, Stream Chat SDK
         Backend: Node.js, Express, MongoDB Authentication: JWT Real-time Messaging: Stream API Deployment:
         

###📸 Demo  
