# Student Notes CRUD Micro-App

**Student Name:** Shaifali Vashistha
**Roll No.:** 2026204018
**GitHub Repository Link:** [https://github.com/shaifalivashistha/MERN_lab_assignment](https://github.com/shaifalivashistha/MERN_lab_assignment)

## Project Description
A decoupled, end-to-end full-stack notes management application using the MERN stack. Features a React/Vite client and an Express/MongoDB backend.

## Setup Instructions

### Prerequisites
- Node.js
- Local MongoDB running on port 27017

### Backend Setup
1. `cd server`
2. `npm install`
3. `npm start` (Runs Express on port 8000)

### Frontend Setup
1. `cd client`
2. `npm install`
3. `npm run dev` (Runs Vite on port 5173)

## API Endpoints
- `GET /api/notes` - Fetch all notes chronologically descending
- `POST /api/notes` - Create a new note
- `DELETE /api/notes/:id` - Delete a specific note