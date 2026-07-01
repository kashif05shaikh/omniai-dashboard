const API_BASE_URL = 'https://sturdy-space-succotash-6vrgwgxrxx5c5qv4-5000.app.github.dev/api';

interface RequestOptions extends RequestInit {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

// Clerk attaches itself to window once loaded
declare global {
  interface Window {
    Clerk?: {
      session?: {
        getToken: (options?: { template?: string }) => Promise<string | null>;
      };
    };
  }
}

export const apiCall = async (endpoint: string, options: RequestOptions = {}) => {
  console.log(`📡 [apiCall] Starting request: ${options.method || 'GET'} ${endpoint}`);
  
  try {
    console.log(`🔑 [apiCall] Attempting to get token from window.Clerk...`);
    console.log(`   window.Clerk exists:`, !!window.Clerk);
    console.log(`   window.Clerk.session exists:`, !!window.Clerk?.session);
    console.log(`   window.Clerk.session.getToken exists:`, typeof window.Clerk?.session?.getToken);
    
    const token = await window.Clerk?.session?.getToken();
    console.log(`🔑 [apiCall] Token result:`, {
      exists: !!token,
      length: token?.length || 0,
      prefix: token ? `${token.substring(0, 30)}...` : 'null',
      type: typeof token,
    });

    if (!token) {
      console.warn(`⚠️  [apiCall] No token available! User might not be signed in`);
    }

    const fullUrl = `${API_BASE_URL}${endpoint}`;
    console.log(`🌐 [apiCall] Full URL: ${fullUrl}`);
    
    const fetchOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    };
    
    console.log(`📤 [apiCall] Fetch options:`, {
      method: fetchOptions.method || 'GET',
      headers: Object.keys(fetchOptions.headers || {}),
      hasAuth: !!fetchOptions.headers['Authorization'],
      bodyLength: fetchOptions.body ? fetchOptions.body.length : 0,
    });

    const response = await fetch(fullUrl, fetchOptions);
    
    console.log(`📥 [apiCall] Response received: ${response.status} ${response.statusText}`);
    console.log(`📥 [apiCall] Response headers:`, {
      contentType: response.headers.get('content-type'),
      contentLength: response.headers.get('content-length'),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ [apiCall] Response not OK. Status: ${response.status}, Body:`, errorText);
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ [apiCall] Success! Response data:`, data);
    return data;
  } catch (error) {
    console.error(`❌ [apiCall] Exception caught:`, error);
    throw error;
  }
};

/**
 * Fetch all providers for the authenticated user
 */
export const getProviders = () => apiCall('/providers');

/**
 * Create a new provider
 */
export const createProvider = (data: any) => 
  apiCall('/providers', { method: 'POST', body: JSON.stringify(data) });

/**
 * Delete a provider
 */
export const deleteProvider = (id: string) => 
  apiCall(`/providers/${id}`, { method: 'DELETE' });

/**
 * Fetch usage logs with optional filters
 */
export const getUsageLogs = (filters?: { provider?: string; startDate?: string; endDate?: string }) => {
  const params = new URLSearchParams();
  if (filters?.provider) params.append('provider', filters.provider);
  if (filters?.startDate) params.append('startDate', filters.startDate);
  if (filters?.endDate) params.append('endDate', filters.endDate);
  
  const queryString = params.toString();
  return apiCall(`/usage${queryString ? `?${queryString}` : ''}`);
};

/**
 * Create a usage log entry
 */
export const createUsageLog = (data: any) => 
  apiCall('/usage', { method: 'POST', body: JSON.stringify(data) });

/**
 * Fetch analytics summary
 */
export const getAnalytics = () => apiCall('/analytics');

/**
 * Fetch cost breakdown
 */
export const getCosts = () => apiCall('/costs');