import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function HtractionAI() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m htraction AI. I can help you scout startups, analyze founders, and access private market data instantly. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockResponses: Record<string, string> = {
    'show me ai startups': `Here are some top AI startups in the pipeline:

**Star AI** (Hyderabad)
- Stage: MVP Stage | Seed Round
- HScore: 78/100
- Target Raise: $250K - $500K
- Focus: AI/ML solutions for enterprise automation
- Key Metrics: 10-20% MoM revenue growth, <$10K ARR
- Founders: Experienced team with prior startup experience

**DeepMind India** (Bangalore)
- Stage: Early Stage | Seed Round  
- HScore: 85/100
- Target Raise: $500K - $1M
- Focus: Deep learning for healthcare diagnostics
- Key Metrics: Strong PMF indicators, defensible IP

Would you like more details on any of these?`,

    'tell me about star ai': `**Star AI** - Detailed Analysis

**Company Overview:**
- Industry: Artificial Intelligence / ML
- Location: Hyderabad, India
- Stage: MVP (Minimum Viable Product)
- Funding Round: Seed

**Financial Health:**
- Annual Revenue: <$10K
- Revenue Growth: 10-20% MoM
- Gross Margins: 50-70%
- Cash Runway: 6-12 months
- LTV:CAC Ratio: 2-3x

**Market Opportunity:**
- TAM: $1B+ (with strong data backing)
- Market Growth: 10-15% CAGR projected
- Operating Region: India & International

**Team:**
- 3 founders with complementary skills (CEO, COO, CFO)
- Prior entrepreneurial experience
- Key functions: Tech, Product, Sales/Marketing, Strategy/Operations, Finance

**Competitive Advantage:**
- Technology is core differentiator (deep tech/IP)
- Patents/IP granted
- Product differentiation consistently validated

**Investment Highlights:**
- Strong innovation with defensible IP
- Good PMF indicators
- Experienced founding team
- Scalable business model

Would you like to see their full report or compare with similar startups?`,

    'who are the founders': `**Star AI - Founding Team:**

**Founder 1 (CEO)**
- Role: Chief Executive Officer
- Ownership: 33%
- Investment: $40,000
- Background: Prior startup experience, strong domain expertise

**Founder 2 (COO)**
- Role: Chief Operating Officer  
- Ownership: 33%
- Investment: $30,000
- Background: Operations and strategy expert

**Founder 3 (CFO)**
- Role: Chief Financial Officer
- Ownership: 34%
- Investment: $40,000
- Background: Financial planning and fundraising experience

**Team Strengths:**
- All founders have prior entrepreneurial experience
- Well-balanced skill set across key functions
- Fair equity distribution
- Significant personal investment shows commitment

Would you like to see their LinkedIn profiles or compare with other founding teams?`,

    'show me fintech startups': `Here are FinTech startups currently raising:

**FinFlow** (Bangalore)
- Stage: Early Stage | Seed Round
- HScore: 88/100
- Target Raise: $750K - $1.5M
- Focus: Payment infrastructure for SMEs
- Key Metrics: Strong traction, 15-25% MoM growth
- Competitive Position: Unique technology stack

**PaySecure** (Mumbai)
- Stage: MVP Stage | Pre-Seed Round
- HScore: 75/100
- Target Raise: $200K - $400K
- Focus: Digital wallet solutions
- Key Metrics: Early validation, growing user base

**CryptoBank** (Delhi)
- Stage: Growth Stage | Series A
- HScore: 90/100
- Target Raise: $2M - $5M
- Focus: Crypto banking infrastructure
- Key Metrics: Strong revenue, proven PMF

Would you like detailed analysis on any of these?`,

    'what startups match my thesis': `Based on your configured investment thesis, here are matching startups:

**High Matches (85%+):**
1. **Star AI** - 92% match
   - Meets: AI/ML focus, experienced founders, defensible IP
   - Stage: MVP → Seed (aligned with your criteria)

2. **FinFlow** - 88% match
   - Meets: B2B SaaS model, strong unit economics, proven traction
   - Stage: Early → Seed (aligned)

**Medium Matches (75-85%):**
3. **CloudSync** - 82% match
   - Meets: SaaS focus, good growth metrics
   - Gap: Earlier stage than preferred

Would you like me to adjust your thesis criteria or show more details?`,
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const lowerInput = inputValue.toLowerCase();
    let response = 'I can help you scout startups, analyze founders, and access private market data. Try asking me about specific startups, founders, or investment opportunities.';

    // Simple keyword matching for mock responses
    for (const [key, value] of Object.entries(mockResponses)) {
      if (lowerInput.includes(key.toLowerCase())) {
        response = value;
        break;
      }
    }

    const assistantMessage: Message = {
      id: messages.length + 2,
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    'Show me AI startups',
    'Tell me about Star AI',
    'Who are the founders?',
    'Show me FinTech startups',
    'What startups match my thesis?',
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFBFC' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/investor')}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F3F6FF' }}>
                <svg className="w-6 h-6" style={{ color: '#3B82F6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold" style={{ color: '#111928' }}>htraction AI</h1>
                <p className="text-xs text-gray-500">Private market data at your fingertips—instantly</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'rounded-br-sm'
                    : 'rounded-bl-sm bg-white border border-gray-200/50'
                }`}
                style={message.role === 'user' ? { backgroundColor: '#111928', color: '#FFFFFF' } : {}}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <p className="text-xs mt-2 opacity-60">
                  {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200/50 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(question);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  style={{ color: '#111928' }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white rounded-xl border border-gray-200/50 p-4 shadow-sm">
          <div className="flex gap-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about startups, founders, or market data..."
              className="flex-1 resize-none border-none outline-none text-sm"
              style={{ color: '#111928' }}
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: inputValue.trim() && !isTyping ? '#111928' : '#F3F4F6',
                color: inputValue.trim() && !isTyping ? '#FFFFFF' : '#9CA3AF',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

