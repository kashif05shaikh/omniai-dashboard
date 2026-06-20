export const mockProviders = [
  { id: 'prv_openai', name: 'OpenAI', color: '#10a37f', accountName: 'Production-Main', status: 'connected', stats: { requests: 4250, inputTokens: 1200500, outputTokens: 450200, totalTokens: 1650700, cost: 145.20 }, lastActivity: '2 minutes ago' },
  { id: 'prv_gemini', name: 'Gemini', color: '#4285f4', accountName: 'Google-Cloud-Prod', status: 'connected', stats: { requests: 3100, inputTokens: 850000, outputTokens: 210000, totalTokens: 1060000, cost: 82.50 }, lastActivity: '15 minutes ago' },
  { id: 'prv_claude', name: 'Claude', color: '#d97757', accountName: 'Anthropic-Org', status: 'connected', stats: { requests: 2800, inputTokens: 920000, outputTokens: 380000, totalTokens: 1300000, cost: 112.80 }, lastActivity: '5 minutes ago' },
  { id: 'prv_grok', name: 'Grok', color: '#ffffff', accountName: 'X-AI-Team', status: 'disconnected', stats: { requests: 450, inputTokens: 120000, outputTokens: 45000, totalTokens: 165000, cost: 12.40 }, lastActivity: '2 days ago' },
  { id: 'prv_deepseek', name: 'DeepSeek', color: '#4d6bfe', accountName: 'DeepSeek-APAC', status: 'connected', stats: { requests: 5200, inputTokens: 2500000, outputTokens: 800000, totalTokens: 3300000, cost: 45.00 }, lastActivity: 'Just now' },
  { id: 'prv_perplexity', name: 'Perplexity', color: '#22b8cd', accountName: 'PPLX-Search', status: 'connected', stats: { requests: 1200, inputTokens: 300000, outputTokens: 150000, totalTokens: 450000, cost: 25.50 }, lastActivity: '1 hour ago' },
  { id: 'prv_openrouter', name: 'OpenRouter', color: '#3b82f6', accountName: 'OR-Fallback', status: 'connected', stats: { requests: 850, inputTokens: 150000, outputTokens: 50000, totalTokens: 200000, cost: 8.20 }, lastActivity: '3 hours ago' },
  { id: 'prv_groq', name: 'Groq', color: '#f55036', accountName: 'Groq-Fast', status: 'disconnected', stats: { requests: 0, inputTokens: 0, outputTokens: 0, totalTokens: 0, cost: 0 }, lastActivity: 'Never' }
];

export const mockModels = [
  { id: 'gpt-4o', provider: 'OpenAI', latency: 450, tps: 85, costPer1k: 0.005, status: 'healthy', requests: 2500 },
  { id: 'gpt-3.5-turbo', provider: 'OpenAI', latency: 250, tps: 120, costPer1k: 0.0015, status: 'healthy', requests: 1750 },
  { id: 'claude-3-opus', provider: 'Claude', latency: 850, tps: 45, costPer1k: 0.015, status: 'healthy', requests: 800 },
  { id: 'claude-3-sonnet', provider: 'Claude', latency: 420, tps: 75, costPer1k: 0.003, status: 'healthy', requests: 1500 },
  { id: 'claude-3-haiku', provider: 'Claude', latency: 180, tps: 150, costPer1k: 0.00025, status: 'healthy', requests: 500 },
  { id: 'gemini-1.5-pro', provider: 'Gemini', latency: 380, tps: 90, costPer1k: 0.0035, status: 'healthy', requests: 2100 },
  { id: 'gemini-1.5-flash', provider: 'Gemini', latency: 220, tps: 140, costPer1k: 0.001, status: 'healthy', requests: 1000 },
  { id: 'deepseek-coder', provider: 'DeepSeek', latency: 350, tps: 110, costPer1k: 0.001, status: 'healthy', requests: 4500 },
  { id: 'mixtral-8x7b', provider: 'Groq', latency: 80, tps: 450, costPer1k: 0.0006, status: 'offline', requests: 0 }
];

export const mockAnalytics = {
  dailyTokens: Array.from({ length: 14 }).map((_, i) => ({
    date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    OpenAI: Math.floor(Math.random() * 500) + 100,
    Claude: Math.floor(Math.random() * 400) + 50,
    Gemini: Math.floor(Math.random() * 300) + 80,
  })),
  monthlyCosts: Array.from({ length: 6 }).map((_, i) => ({
    month: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
    cost: Math.floor(Math.random() * 300) + 150,
  })),
  providerDist: [
    { name: 'OpenAI', value: 45, color: '#10a37f' },
    { name: 'Claude', value: 25, color: '#d97757' },
    { name: 'Gemini', value: 20, color: '#4285f4' },
    { name: 'DeepSeek', value: 10, color: '#4d6bfe' },
  ],
  heatmap: Array.from({ length: 90 }).map(() => Math.floor(Math.random() * 100))
};

export const mockActivities = [
  { id: 'act_1', provider: 'OpenAI', model: 'gpt-4o', action: 'API call', details: 'Routed 1,200 tokens (success)', time: 'Just now', type: 'success' },
  { id: 'act_2', provider: 'Claude', model: 'claude-3-opus', action: 'Latency spike', details: 'Detected 1200ms latency, triggering fallback', time: '2m ago', type: 'warning' },
  { id: 'act_3', provider: 'Gemini', model: 'gemini-1.5-pro', action: 'Fallback route', details: 'Successfully handled fallback request (850 tokens)', time: '2m ago', type: 'success' },
  { id: 'act_4', provider: 'System', model: 'System', action: 'Rate limit refreshed', details: 'Rate limits reset for DeepSeek provider', time: '12m ago', type: 'info' },
  { id: 'act_5', provider: 'DeepSeek', model: 'deepseek-coder', action: 'Batch processed', details: 'Completed processing 450 items', time: '18m ago', type: 'success' },
  { id: 'act_6', provider: 'OpenAI', model: 'gpt-3.5-turbo', action: 'API call', details: 'Routed 4,500 tokens (success)', time: '22m ago', type: 'success' },
];
