"""
Rêve Eco — FastAPI Backend Server with LangChain RAG Integration
"""

import os
from pathlib import Path
from typing import List, Dict, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from .rag import engine, SUPPORT_CONTACT

app = FastAPI(title="Rêve Eco Chatbot API", version="1.0.0")

# Enable CORS for localhost frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = None

class ChatResponse(BaseModel):
    reply: str
    source: str
    escalated: bool

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "dataset": "Eco_Friendly_Shoes_Chatbot_Training.pdf",
        "chunks_indexed": len(engine.chunks),
        "qa_pairs": len(engine.qa_pairs),
        "llm_active": engine.llm is not None
    }

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatMessage):
    user_query = payload.message.strip()
    if not user_query:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    result = engine.answer_query(user_query, payload.history)
    return ChatResponse(
        reply=result["reply"],
        source=result.get("source", "Eco Friendly Shoes Knowledge Base"),
        escalated=result.get("escalated", False)
    )

# Mount static files of the website root so the whole site can also run on FastAPI
ROOT_DIR = Path(__file__).resolve().parent.parent
app.mount("/", StaticFiles(directory=str(ROOT_DIR), html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server.app:app", host="0.0.0.0", port=8000, reload=True)
