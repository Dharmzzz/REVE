/* =============================================
   RÊVE ECO — Chatbot Client Controller (chat.js)
   Trained on Eco_Friendly_Shoes_Chatbot_Training.pdf
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Determine API endpoint:
  // - If running on separate local dev server (port 5500), connect to port 8000
  // - In production (Render, etc.) or when served from FastAPI directly, use relative "/api/chat"
  const isLocalDevSplit = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && window.location.port === "5500";
  const API_URL = isLocalDevSplit ? "http://127.0.0.1:8000/api/chat" : "/api/chat";

  // Elements
  const chatToggle = document.getElementById("chatToggle");
  const chatWindow = document.getElementById("chatWindow");
  const chatClose = document.getElementById("chatClose");
  const chatMinimize = document.getElementById("chatMinimize");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const chatPills = document.querySelectorAll(".chat-pill");

  let conversationHistory = [];
  let isWaitingForResponse = false;

  // Toggle Chat
  function openChat() {
    chatWindow.classList.add("open");
    chatInput.focus();
    scrollToBottom();
  }

  function closeChat() {
    chatWindow.classList.remove("open");
  }

  if (chatToggle) chatToggle.addEventListener("click", () => {
    if (chatWindow.classList.contains("open")) {
      closeChat();
    } else {
      openChat();
    }
  });

  if (chatClose) chatClose.addEventListener("click", closeChat);
  if (chatMinimize) chatMinimize.addEventListener("click", closeChat);

  // Quick Action Suggestions
  chatPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const query = pill.getAttribute("data-query") || pill.textContent.trim();
      sendUserMessage(query);
    });
  });

  // Input & Send button
  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener("click", handleSend);
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
  }

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text || isWaitingForResponse) return;
    chatInput.value = "";
    sendUserMessage(text);
  }

  // Parse markdown bold, bullet lists, and links into clean HTML
  function formatMarkdown(text) {
    if (!text) return "";
    let formatted = text
      // Escape HTML
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Links [text](url)
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Bullet points
      .replace(/^[•\-\*]\s+(.*)$/gm, "<li>$1</li>")
      // Line breaks
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");

    // Wrap multiple <li> into <ul>
    if (formatted.includes("<li>")) {
      formatted = formatted.replace(/(<li>.*?<\/li>)+/gs, "<ul>$&</ul>");
    }

    return formatted;
  }

  function appendMessage(sender, text, meta = "") {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg chat-msg--${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "chat-msg-bubble";

    if (sender === "bot") {
      bubble.innerHTML = formatMarkdown(text);
    } else {
      bubble.textContent = text;
    }

    msgDiv.appendChild(bubble);

    if (meta) {
      const metaSpan = document.createElement("span");
      metaSpan.className = "chat-msg-meta";
      metaSpan.textContent = meta;
      msgDiv.appendChild(metaSpan);
    }

    chatMessages.appendChild(msgDiv);
    scrollToBottom();

    // Re-initialize Lucide icons if any rendered inside
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.id = "typingIndicator";
    indicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("typingIndicator");
    if (indicator) indicator.remove();
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendUserMessage(message) {
    appendMessage("user", message);
    conversationHistory.push({ role: "user", content: message });

    isWaitingForResponse = true;
    chatSendBtn.disabled = true;
    showTypingIndicator();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          history: conversationHistory.slice(-6)
        })
      });

      removeTypingIndicator();

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || "I apologize, but I couldn't process your request. Please try again.";
      const source = data.source ? `📚 ${data.source}` : "";

      appendMessage("bot", reply, source);
      conversationHistory.push({ role: "assistant", content: reply });
    } catch (err) {
      removeTypingIndicator();
      console.warn("[Chatbot] Connection notice:", err);
      // Fallback response if local backend is not yet started or accessible
      appendMessage(
        "bot",
        "Hello! I am Rêve Eco's AI Assistant. Our LangChain backend is actively running on `http://127.0.0.1:8000`. If you see this message, please ensure the backend server is running (`python -m uvicorn server.app:app --port 8000`).\n\nIn the meantime, you can use discount code **WELCOME15** for 15% off your first order, or enjoy our 60-day money-back guarantee with free returns!",
        "Rêve Eco Offline Notice"
      );
    } finally {
      isWaitingForResponse = false;
      chatSendBtn.disabled = false;
      chatInput.focus();
    }
  }
});
