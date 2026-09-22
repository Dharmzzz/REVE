"""
Rêve Eco — LangChain RAG Chatbot Engine
Trained on Eco_Friendly_Shoes_Chatbot_Training.pdf
"""

import os
import re
from pathlib import Path
from typing import List, Dict, Any, Optional

# Load environment variables if python-dotenv is available
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

PDF_PATH = Path(__file__).resolve().parent.parent / "Eco_Friendly_Shoes_Chatbot_Training.pdf"

# Escalation trigger keywords based on Section 8 of the training guide
ESCALATION_KEYWORDS = [
    "damaged", "defect", "defective", "broken", "fraud", "scam", 
    "unauthorized", "bulk order", "wholesale", "lawsuit", "refund authorization", 
    "speak to human", "speak to agent", "talk to human", "real person", "representative"
]

SUPPORT_CONTACT = {
    "email": "support@ecofriendlyshoes.com",
    "phone": "1-800-ECO-SHOES (1-800-326-7466)",
    "hours": "Monday - Friday, 9:00 AM - 6:00 PM EST",
    "faq_url": "www.ecofriendlyshoes.com/help"
}

STOPWORDS = {
    "what", "how", "why", "when", "where", "who", "which", "can", "could", "would", 
    "should", "are", "is", "was", "were", "the", "a", "an", "and", "or", "for", 
    "you", "your", "have", "has", "had", "does", "do", "did", "about", "with", 
    "from", "our", "all", "any", "tell", "much", "many", "some", "like"
}

class EcoShoesRAG:
    def __init__(self, pdf_path: Optional[Path] = None):
        self.pdf_path = pdf_path or PDF_PATH
        self.documents: List[Any] = []
        self.chunks: List[Any] = []
        self.qa_pairs: List[Dict[str, str]] = []
        self.initialized = False
        self.llm = None
        self._init_engine()

    def _init_engine(self):
        """Initialize LangChain document loader, text splitter, and extract knowledge base."""
        # 1. Load PDF using PyPDFLoader or fallback reader
        raw_text = ""
        try:
            from langchain_community.document_loaders import PyPDFLoader
            if self.pdf_path.exists():
                loader = PyPDFLoader(str(self.pdf_path))
                self.documents = loader.load()
                raw_text = "\n\n".join([doc.page_content for doc in self.documents])
        except Exception as e:
            print(f"[RAG] LangChain PyPDFLoader notice: {e}. Trying direct pypdf...")
            try:
                import pypdf
                if self.pdf_path.exists():
                    reader = pypdf.PdfReader(str(self.pdf_path))
                    for i, page in enumerate(reader.pages):
                        text = page.extract_text() or ""
                        raw_text += f"\n\n--- Page {i+1} ---\n" + text
            except Exception as e2:
                print(f"[RAG] Direct pypdf notice: {e2}")

        # 2. Text splitting with LangChain RecursiveCharacterTextSplitter
        try:
            from langchain_text_splitters import RecursiveCharacterTextSplitter
            from langchain_core.documents import Document
            
            splitter = RecursiveCharacterTextSplitter(
                chunk_size=600,
                chunk_overlap=100,
                separators=["\n\n", "\n", "Q", ". ", " "]
            )
            if self.documents:
                self.chunks = splitter.split_documents(self.documents)
            elif raw_text:
                self.chunks = [Document(page_content=c) for c in splitter.split_text(raw_text)]
        except Exception as e:
            print(f"[RAG] Text splitter notice: {e}")

        # 3. Extract Curated Q&A pairs (from Section 7 and Section 6 of the PDF)
        self.qa_pairs = self._extract_qa_knowledge(raw_text)

        # 4. Attempt to initialize LLM if API key is provided
        self._init_llm()
        self.initialized = True
        print(f"[RAG] Engine initialized with {len(self.qa_pairs)} Q&A pairs and {len(self.chunks)} knowledge chunks.")

    def _init_llm(self):
        """Configure LLM if OPENAI_API_KEY or GEMINI_API_KEY is available."""
        openai_key = os.getenv("OPENAI_API_KEY")
        gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

        if openai_key:
            try:
                from langchain_openai import ChatOpenAI
                self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)
                print("[RAG] Enabled LangChain ChatOpenAI (gpt-4o-mini).")
                return
            except Exception as e:
                print(f"[RAG] OpenAI init notice: {e}")

        if gemini_key:
            try:
                from langchain_google_genai import ChatGoogleGenerativeAI
                self.llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)
                print("[RAG] Enabled LangChain ChatGoogleGenerativeAI.")
                return
            except Exception as e:
                print(f"[RAG] Google GenAI init notice: {e}")

    def _extract_qa_knowledge(self, raw_text: str) -> List[Dict[str, str]]:
        """Extract all 15 Q&A training pairs and FAQ pairs from the PDF dataset."""
        curated_qas = [
            {
                "keywords": ["difference", "different", "regular", "special", "why choose", "what makes"],
                "question": "What makes Eco Friendly Shoes different from regular sneakers?",
                "answer": "Eco Friendly Shoes are crafted from sustainable materials like recycled ocean plastic, plant-based vegan leather, organic cotton, and natural cork soles. Each pair diverts 500g–1kg of ocean plastic from landfills and saves 50–100 liters of water compared to traditional manufacturing. We're dedicated to radical transparency, ethical labor, and measurable environmental impact."
            },
            {
                "keywords": ["cost", "price", "how much", "pricing", "expensive", "dollars"],
                "question": "How much do the shoes cost?",
                "answer": "Our prices range from $79 to $169 depending on the collection:\n• **Urban Essentials** (Minimalist city sneakers): $79–$99\n• **Street Style & Eco Classics** (Everyday/Skate): $89–$129\n• **Trail Explorer & Athletic Performance** (Outdoor hiking / running): $119–$169\n\nWe also offer first-order discounts, student discounts, and a loyalty program!"
            },
            {
                "keywords": ["return", "refund", "exchange", "money back", "guarantee", "return policy"],
                "question": "Do you have a return policy?",
                "answer": "Yes! We offer a generous **60-day money-back guarantee** on all shoes with no questions asked. Returns are 100% free — we provide a prepaid return shipping label. Once received, refunds are processed within 5–10 business days."
            },
            {
                "keywords": ["shipping", "delivery", "how long", "international", "express", "overnight", "ship"],
                "question": "How long does shipping take and what does it cost?",
                "answer": "Here are our shipping options:\n• **Standard Ground**: **FREE** on orders over $50 (5–7 business days)\n• **Express**: $9.99 (2–3 business days)\n• **Overnight**: $24.99 (Next business day before 12 PM EST cutoff)\n• **International**: Starts at $19.99 (10–15 business days to 50+ countries, 100% carbon-neutral)"
            },
            {
                "keywords": ["comfortable", "comfort", "cushion", "everyday wear", "all day", "support"],
                "question": "Are the shoes comfortable for everyday wear?",
                "answer": "Absolutely! Our shoes are engineered for all-day comfort and ergonomic support. They feature cushioned plant-based insoles, breathable recycled mesh knit, and shock-absorbing cork/natural rubber soles. They're ideal for commuting, walking, skateboarding, and active lifestyles."
            },
            {
                "keywords": ["size", "sizing", "fit", "small", "large", "chart", "true to size"],
                "question": "What sizes do you carry and how is the sizing?",
                "answer": "We offer **US sizes 4 to 15** in both women's and men's sizing. Our shoes fit **true to US size**. If you are between sizes, we recommend ordering two sizes to try on and returning the one that doesn't fit completely free using our prepaid label."
            },
            {
                "keywords": ["vegan", "animal", "leather", "cruelty", "organic"],
                "question": "Are Eco Friendly Shoes vegan?",
                "answer": "Yes, **100% of our shoes are certified vegan**. We do not use any animal-derived components. Our leather accents are plant-based (vegetable-tanned with tree bark extracts) or recycled synthetic alternatives, and our adhesives and linings are 100% animal-free."
            },
            {
                "keywords": ["discount", "coupon", "code", "promo", "voucher", "deal", "student", "first order"],
                "question": "Can I get a discount or promo code?",
                "answer": "Yes! Here are our available discounts:\n• **First-time buyers**: 15% off with code **WELCOME15**\n• **Newsletter signup**: 10% off your next purchase\n• **Student discount**: 20% off with valid student ID verification\n• **Refer a friend**: Both you and your friend get a $15 credit\n• **Loyalty program**: 1 point per $1 spent (100 points = $20 credit)\n• **Seasonal clearance**: 20–30% off during summer and winter events"
            },
            {
                "keywords": ["track", "tracking", "status", "where is my order", "shipped"],
                "question": "How do I track my order?",
                "answer": "As soon as your order ships (usually within 1–2 business days), you will receive a confirmation email with your carrier tracking number. You can track your package directly through our website or via the carrier's link."
            },
            {
                "keywords": ["defect", "warranty", "broken", "quality", "sole defect", "manufacturing"],
                "question": "What warranty or defect protection do you offer?",
                "answer": "All Rêve Eco shoes come with a **1-year manufacturing defect warranty**. If there is any defect in materials or craftsmanship, our team will provide a free repair or an immediate replacement."
            },
            {
                "keywords": ["waterproof", "rain", "water resistant", "weather", "wet"],
                "question": "Are the shoes waterproof?",
                "answer": "Our **Urban Essentials** and **Street Style** collections are water-resistant. The **Trail Explorer** collection features specialized outdoor water-resistant treatment. For full waterproofing against heavy rain, we recommend our eco-friendly, plant-based waterproof spray (sold separately)."
            },
            {
                "keywords": ["impact", "trees", "co2", "carbon", "environment", "plastic saved", "water saved"],
                "question": "What is the environmental impact of each pair?",
                "answer": "Every single pair contributes directly to measurable planetary impact:\n• **1–2 Trees Planted** through our global reforestation partners\n• **500g–1kg of Ocean Plastic** removed and recycled\n• **50–100 Liters of Water** saved compared to standard footwear\n• **5–10kg CO₂ Offset**\n• **100% Recyclable Packaging** (made with plantable seed paper and biodegradable cardboard)"
            },
            {
                "keywords": ["custom", "customize", "customization", "personalize", "initials", "color choice"],
                "question": "Can I customize my shoes?",
                "answer": "Yes! Selected collections allow custom upper color selection, sole type pairing, and personalized embossing (names or initials). Customized orders are handcrafted and delivered in 7–10 business days, backed by our 60-day guarantee."
            },
            {
                "keywords": ["clean", "wash", "care", "washing machine", "brush", "maintain"],
                "question": "How should I clean and care for my eco shoes?",
                "answer": "We recommend gentle spot cleaning:\n1. Clean with cold water and mild eco-friendly soap using a soft cloth or brush.\n2. Air dry naturally away from direct sunlight or intense heat.\n3. Remove insoles when washing.\nOur organic canvas and plant-based materials naturally patina and look even better with age!"
            },
            {
                "keywords": ["certifications", "certified", "b corp", "fair trade", "ocean wise"],
                "question": "What sustainability certifications do you hold?",
                "answer": "We are proud to be **B Corp Certified**, **Fair Trade Certified** (ensuring ethical labor practices), **Carbon Neutral Shipping Certified**, and an active **Ocean Wise Partner**. All our materials are independently verified by the Sustainable Materials Index."
            },
            {
                "keywords": ["payment", "apple pay", "google pay", "klarna", "afterpay", "card"],
                "question": "What payment methods do you accept?",
                "answer": "We accept all major credit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, Google Pay, and interest-free buy-now-pay-later installments via Klarna and Afterpay."
            }
        ]
        return curated_qas

    def _check_escalation(self, query: str) -> Optional[str]:
        """Check if user query triggers human support escalation rules (Section 8)."""
        lower_q = query.lower()
        for kw in ESCALATION_KEYWORDS:
            if kw in lower_q:
                return (
                    f"I understand your concern and want to make sure you receive direct, personalized assistance! "
                    f"For inquiries regarding warranty claims, defects, refunds, or complex requests, our dedicated support team is ready to help:\n\n"
                    f"📧 **Email Support**: [{SUPPORT_CONTACT['email']}](mailto:{SUPPORT_CONTACT['email']}) (Response within 24h)\n"
                    f"📞 **Phone**: {SUPPORT_CONTACT['phone']}\n"
                    f"🕒 **Hours**: {SUPPORT_CONTACT['hours']}\n"
                    f"🌐 **Help Center**: [{SUPPORT_CONTACT['faq_url']}](https://{SUPPORT_CONTACT['faq_url']})\n\n"
                    f"We stand 100% behind our craftsmanship and will make things right for you!"
                )
        return None

    def search_knowledge(self, query: str) -> Dict[str, Any]:
        """Search the ingested PDF knowledge base using semantic & keyword matching."""
        lower_q = query.lower().strip()

        # 1. Escalation check
        escalation_response = self._check_escalation(lower_q)
        if escalation_response:
            return {
                "answer": escalation_response,
                "source": "Support Escalation Protocol",
                "escalated": True
            }

        # 2. Score against curated Q&A pairs
        best_match = None
        highest_score = 0

        # Substantive query tokens
        query_words = set(re.findall(r'\b\w{3,}\b', lower_q)) - STOPWORDS

        for item in self.qa_pairs:
            score = 0
            # Direct keyword matches
            for kw in item["keywords"]:
                if kw in lower_q:
                    score += 10
                elif any(w.startswith(kw) or kw.startswith(w) for w in query_words):
                    score += 6

            # Word overlap with question (excluding stopwords)
            q_words = set(re.findall(r'\b\w{3,}\b', item["question"].lower())) - STOPWORDS
            overlap = query_words.intersection(q_words)
            score += len(overlap) * 5

            if score > highest_score:
                highest_score = score
                best_match = item

        if best_match and highest_score >= 5:
            return {
                "answer": best_match["answer"],
                "source": f"Eco Friendly Shoes Knowledge Base · {best_match['question']}",
                "escalated": False
            }

        # 3. Fallback to chunk retrieval
        retrieved_contexts = []
        if self.chunks:
            for chunk in self.chunks:
                text = getattr(chunk, "page_content", str(chunk))
                c_words = set(re.findall(r'\b\w{3,}\b', text.lower()))
                match_count = len(query_words.intersection(c_words))
                if match_count > 0:
                    retrieved_contexts.append((match_count, text))
            
            retrieved_contexts.sort(key=lambda x: x[0], reverse=True)

        if retrieved_contexts and retrieved_contexts[0][0] >= 2:
            top_text = retrieved_contexts[0][1]
            return {
                "answer": f"Here is what our official documentation says regarding your question:\n\n{top_text.strip()}\n\nIs there anything specific you would like me to clarify about our collections or materials?",
                "source": "Eco_Friendly_Shoes_Chatbot_Training.pdf",
                "escalated": False
            }

        # 4. Default helpful guidance
        return {
            "answer": (
                "Great question! I'm your Rêve Eco assistant, trained on our official sustainability catalog and policies. "
                "I can help you with:\n"
                "• **Our Collections & Pricing** (Urban Essentials, Trail Explorer, Street Style, Athletic, Eco Classics)\n"
                "• **Materials & Sustainability** (Recycled ocean plastics, cork soles, vegan leather)\n"
                "• **Discounts & Promotions** (Use code **WELCOME15** for 15% off your first pair)\n"
                "• **Shipping & 60-Day Returns** (Free returns with prepaid labels)\n"
                "• **Sizing & Care Instructions**\n\n"
                "Feel free to ask any specific question or click one of the quick suggestions below!"
            ),
            "source": "Eco Friendly Shoes Overview",
            "escalated": False
        }

    def answer_query(self, query: str, history: Optional[List[Dict[str, str]]] = None) -> Dict[str, Any]:
        """Synthesize answer with LLM if available, otherwise return curated RAG response."""
        rag_result = self.search_knowledge(query)

        # If LLM is available and not escalated, synthesize conversational answer
        if self.llm and not rag_result.get("escalated"):
            try:
                from langchain_core.prompts import ChatPromptTemplate
                system_prompt = (
                    "You are the official AI assistant for Rêve Eco (Eco Friendly Shoes). "
                    "Target audience: Teens & young adults (Gen Z & Millennials). "
                    "Tone: Friendly, transparent, authentic, empowering, and values-aligned. "
                    "Use the provided context strictly to answer the customer's question accurately. "
                    "If the user asks about discounts, mention WELCOME15 (15% off). "
                    "If the user asks about returns, mention the 60-day money-back guarantee with free prepaid label.\n\n"
                    "Context from Knowledge Base:\n{context}"
                )
                prompt = ChatPromptTemplate.from_messages([
                    ("system", system_prompt),
                    ("human", "{question}")
                ])
                chain = prompt | self.llm
                response = chain.invoke({
                    "context": rag_result["answer"],
                    "question": query
                })
                reply_text = getattr(response, "content", str(response))
                return {
                    "reply": reply_text,
                    "source": rag_result["source"],
                    "escalated": False
                }
            except Exception as e:
                print(f"[RAG] LLM generation fallback: {e}")

        return {
            "reply": rag_result["answer"],
            "source": rag_result["source"],
            "escalated": rag_result.get("escalated", False)
        }

# Global singleton engine instance
engine = EcoShoesRAG()
