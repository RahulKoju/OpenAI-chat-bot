# OpenAI-Powered Chatbot

A scalable and type-safe chatbot application built using TypeScript and powered by Groq's open-source models. The project features a clean, modern interface and robust backend architecture.

## Live Demo

🤖 [Try the Chatbot](https://chat-bot-frontend-um49.onrender.com) - Frontend deployed on Render

## Overview

This project implements a modern chatbot with the following key features:
- Powered by Groq's open-source models
- Type-safe backend implementation using TypeScript
- Scalable architecture
- Real-time chat interactions
- Modern, responsive user interface

## Tech Stack

### Frontend
- React
- TypeScript
- Modern UI frameworks
- WebSocket for real-time communication

### Backend
- Node.js
- TypeScript
- Groq API integration
- RESTful architecture
- WebSocket server

## Architecture

The application is split into two main components:
- Frontend: [https://chat-bot-frontend-um49.onrender.com](https://chat-bot-frontend-um49.onrender.com)
- Backend: [https://chat-bot-backend-kjvf.onrender.com](https://chat-bot-backend-kjvf.onrender.com)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Groq API credentials

### Installation

1. Clone the repository
```bash
git clone https://github.com/RahulKoju/OpenAI-chat-bot.git
cd OpenAI-chat-bot
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables

Backend `.env`:
```env
PORT=3000
GROQ_API_KEY=your_groq_api_key
```

Frontend `.env`:
```env
REACT_APP_BACKEND_URL=your_backend_url
```

4. Start the development servers
```bash
# Start backend
cd backend
npm run dev

# Start frontend (in a new terminal)
cd frontend
npm start
```

## Deployment

The application is deployed on Render:

- Frontend: [https://chat-bot-frontend-um49.onrender.com](https://chat-bot-frontend-um49.onrender.com)
- Backend: [https://chat-bot-backend-kjvf.onrender.com](https://chat-bot-backend-kjvf.onrender.com)

### Deployment Configuration

1. Frontend Deployment
```bash
cd frontend
npm run build
```

2. Backend Deployment
```bash
cd backend
npm run build
```

## Project Structure

```
OpenAI-chat-bot/
├── frontend/           # React frontend application
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── backend/           # TypeScript backend server
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
