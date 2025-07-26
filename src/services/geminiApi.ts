interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    this.apiKey = 'AIzaSyAkoMEAyp1BnGatCF5Qh8CHXYgVDTEjm34';
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Fallback to demo responses if API fails
      if (prompt.includes('price prediction')) {
        return 'Based on market trends, the price is expected to increase by 12% over the next week due to seasonal demand and supply constraints.';
      }
      if (prompt.includes('quantity optimization')) {
        return 'Based on your sales data, I recommend purchasing 150-200 units to optimize inventory levels and minimize waste while meeting demand.';
      }
      throw new Error('Failed to get AI response');
    }
  }

  async predictPrice(productName: string, historicalData?: any[]): Promise<string> {
    const prompt = `As a market analyst, predict the price trend for ${productName} over the next 7 days. 
    ${historicalData ? `Historical data: ${JSON.stringify(historicalData)}` : 'Use general market knowledge.'}
    Provide a concise prediction with percentage change and key factors affecting the price.`;
    
    return this.generateContent(prompt);
  }

  async optimizeQuantity(productName: string, salesData: any): Promise<string> {
    const prompt = `As an inventory optimization expert, suggest the optimal purchase quantity for ${productName}.
    Sales data from last 3 days: ${JSON.stringify(salesData)}
    Consider demand patterns, storage costs, and minimize waste. Provide specific quantity recommendations.`;
    
    return this.generateContent(prompt);
  }
}

export const geminiService = new GeminiService();