# AI Memory Preservation Platform

An AI-powered platform that preserves communication patterns from historical conversations and uses them to generate natural, context-aware conversations.

🚀 Live Demo: https://ai-memory-preservation-platform.vercel.app/

## Overview

People change over time, and their way of communicating can change with them.

The AI Memory Preservation Platform allows users to upload historical conversations, describe a person's personality and relationship, and interact with an AI reconstruction inspired by those conversations.

The system does not recreate or claim to be the actual person. It uses historical conversations to identify communication patterns and generate AI responses influenced by those patterns.

## Features

* User authentication with JWT
* Personality profile creation
* Historical conversation upload
* Conversation analysis
* Communication-style analysis
* Frequently used word extraction
* Emoji usage analysis
* Historical example extraction
* LLM-powered response generation
* Conversation history
* Context-aware responses
* Groq API integration
* MongoDB data persistence
* Backend security middleware

## How It Works

```text
Create Personality
        ↓
Upload Historical Conversations
        ↓
Parse Conversations
        ↓
Analyze Conversation
        ↓
Extract Communication Style
        ↓
Build AI Personality Profile
        ↓
Use Historical Examples
        ↓
Build Dynamic Prompt
        ↓
Send Prompt to Groq LLM
        ↓
Generate Response
```

## AI Implementation

The project does not train or fine-tune an LLM.

Instead, it uses a prompt-based personality conditioning approach.

Historical conversations are analyzed to extract communication patterns. These patterns, historical examples, personality information, and recent conversation history are then combined into a dynamically generated prompt.

### Conversation Analysis

The application analyzes uploaded conversations and extracts:

* Total number of messages
* Participants
* Message count per participant
* Average message length

Implementation:

```text
backend/src/ai/analyzeConversation.js
```

### Communication Style Analysis

The application performs lightweight NLP/statistical analysis to identify:

* Frequently used words
* Emoji usage
* Question frequency
* Link frequency
* Average words per message
* Word-frequency statistics

Implementation:

```text
backend/src/ai/styleAnalyzer.js
```

### Historical Examples

Historical conversation examples are extracted and provided to the LLM as examples of how the person communicates.

This is a form of **few-shot prompting**.

### Dynamic Prompt Construction

The prompt combines:

* Personality description
* Relationship information
* Communication-style statistics
* Frequently used words
* Historical conversation examples
* Recent conversation history
* Current user message

Implementation:

```text
backend/src/ai/promptBuilder.js
```

### LLM Generation

The backend uses the **Groq SDK** to communicate with the LLM.

Current model:

```text
openai/gpt-oss-120b
```

The service is currently located at:

```text
backend/src/services/geminiService.js
```

The filename is a legacy name; the implementation uses Groq.

## AI Architecture

```text
Historical Conversations
          ↓
Conversation Parser
          ↓
Conversation Analysis
          ↓
Style Analysis
          ↓
AI Personality Profile
          ↓
Historical Examples
          ↓
Dynamic Prompt Builder
          ↓
Groq API
          ↓
openai/gpt-oss-120b
          ↓
Generated Response
```

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* Mongoose
* JWT
* bcrypt
* Multer
* Helmet
* express-rate-limit

### Database

* MongoDB
* MongoDB Atlas

### AI

* Groq SDK
* `openai/gpt-oss-120b`
* Prompt Engineering
* Few-Shot Prompting
* Conversation Context
* Lightweight NLP/statistical analysis

## Project Structure

```text
AI-Memory-Preservation-Platform/
│
├── backend/
│   ├── src/
│   │   ├── ai/
│   │   │   ├── analyzeConversation.js
│   │   │   ├── exampleExtractor.js
│   │   │   ├── promptBuilder.js
│   │   │   ├── styleAnalyzer.js
│   │   │   └── trainMemory.js
│   │   │
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Getting Started

### Prerequisites

Install:

* Node.js
* npm
* MongoDB Atlas account
* Groq API key

### Clone the Repository

```bash
git clone https://github.com/luckypathak78/AI-Memory-Preservation-Platform.git

cd AI-Memory-Preservation-Platform
```

### Backend Setup

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

Never commit `.env` to GitHub.

Start the backend:

```bash
npm run dev
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite.

## Application Flow

### 1. Create an Account

Users register and authenticate using JWT-based authentication.

### 2. Create a Personality

Users provide information about the person, including their personality and relationship.

### 3. Upload Historical Conversations

Historical conversations are uploaded and processed by the backend.

### 4. Analyze Conversations

The application extracts communication statistics and style features.

### 5. Build the AI Profile

The extracted information and historical examples are stored as part of the personality profile.

### 6. Chat

When a user sends a message, the system combines:

```text
Personality Profile
+
Style Information
+
Historical Examples
+
Recent Conversation
+
Current Message
```

and sends the resulting context to the LLM.

### 7. Generate Response

The Groq-hosted LLM generates a response based on the supplied context and communication style.

## Security & Privacy

The backend includes:

* JWT authentication
* Password hashing using bcrypt
* Helmet security middleware
* API rate limiting
* Environment variables for secrets
* `.gitignore` protection for `.env`
* Uploaded files excluded from version control

### Ethical Considerations

This project is intended as an AI reconstruction of communication patterns rather than an attempt to impersonate a real person.

The system should be presented transparently as an AI-generated reconstruction based on historical conversations.

Users should only upload conversation data that they have the right and permission to process.

## Current AI Approach

The current system uses:

```text
Conversation Analysis
        +
Style Feature Extraction
        +
Few-Shot Prompting
        +
Dynamic Prompt Engineering
        +
Conversation History
        +
LLM Generation
```

The current implementation does not use:

* LLM fine-tuning
* Training a model from scratch
* Custom neural networks
* Vector database retrieval
* Embedding-based RAG

These can be explored as future improvements.

## Future Improvements

* Semantic embeddings for better memory retrieval
* Vector database integration
* RAG-based long-term memory
* Improved conversation parsing
* Emotion and sentiment detection
* More advanced personality feature extraction
* Conversation summarization
* Improved privacy safeguards
* AI response evaluation
* Streaming responses
* Improved safety controls

## Resume Description

**AI Memory Preservation Platform** — React, Node.js, Express, MongoDB, Groq, LLMs

Built an AI-powered personality reconstruction platform using lightweight NLP-based conversation analysis, communication-style feature extraction, few-shot prompting, historical examples, and contextual conversation history to generate style-consistent responses through Groq's `openai/gpt-oss-120b` model.

## Author

**Lucky Pathak**

B.Tech CSE — GGSIPU

GitHub: `luckypathak78`

## License

This project is intended for educational, research, and portfolio purposes.
