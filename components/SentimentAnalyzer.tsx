import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

type Sentiment = 'Positive' | 'Negative' | 'Neutral';

interface AnalysisResult {
  sentiment: Sentiment;
  confidence: number;
}

const SentimentIcon: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
    // FIX: Changed JSX.Element to React.ReactElement to resolve namespace error.
    const iconMap: Record<Sentiment, { icon: React.ReactElement, color: string }> = {
        Positive: {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            color: 'text-green-400'
        },
        Negative: {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            color: 'text-red-400'
        },
        Neutral: {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            color: 'text-yellow-400'
        },
    };
    return <div className={iconMap[sentiment].color}>{iconMap[sentiment].icon}</div>;
};

const ResultPanel: React.FC<{ result: AnalysisResult }> = ({ result }) => {
    const sentimentColors: Record<Sentiment, { bg: string, text: string, border: string }> = {
        Positive: { bg: 'bg-green-500/10', text: 'text-green-300', border: 'border-green-500/30' },
        Negative: { bg: 'bg-red-500/10', text: 'text-red-300', border: 'border-red-500/30' },
        Neutral: { bg: 'bg-yellow-500/10', text: 'text-yellow-300', border: 'border-yellow-500/30' },
    };
    const { bg, text, border } = sentimentColors[result.sentiment];

    return (
        <div className={`mt-8 p-6 rounded-2xl border ${border} ${bg} backdrop-blur-sm flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-left`}>
            <div className="flex items-center space-x-4">
                <SentimentIcon sentiment={result.sentiment} />
                <div>
                    <p className="text-sm text-gray-400">Dominant Sentiment</p>
                    <p className={`text-2xl font-bold ${text}`}>{result.sentiment}</p>
                </div>
            </div>
            <div className="text-center md:text-right">
                <p className="text-sm text-gray-400">Confidence Score</p>
                <p className="text-3xl font-bold text-white">{(result.confidence * 100).toFixed(1)}%</p>
            </div>
        </div>
    );
};

const SentimentAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!text.trim()) {
        setError('Please enter text to analyze.');
        return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
        // FIX: Replaced simulation logic with a call to the Gemini API.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const systemInstruction = `You are a sentiment analysis expert. Analyze the user's text and return a JSON object with two keys: "sentiment" (string, can be "Positive", "Negative", or "Neutral") and "confidence" (number, from 0.0 to 1.0). Do not include any other text or explanation.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: text,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sentiment: {
                            type: Type.STRING,
                            description: "The sentiment of the text. Must be one of: Positive, Negative, or Neutral."
                        },
                        confidence: {
                            type: Type.NUMBER,
                            description: "A confidence score between 0.0 and 1.0."
                        },
                    },
                    required: ['sentiment', 'confidence'],
                },
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (['Positive', 'Negative', 'Neutral'].includes(data.sentiment) && typeof data.confidence === 'number') {
            setResult(data);
        } else {
            throw new Error('Received an invalid response format from the AI model.');
        }

    } catch (err) {
        setError(err instanceof Error ? `API Error: ${err.message}. Please check your API key and network connection.` : 'An unknown error occurred.');
    } finally {
        setLoading(false);
    }
  }, [text]);

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
        <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              Unlock the Emotion in Your Text
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
              Instantly analyze sentiment with the power of Google's Gemini AI. Discover if your text is Positive, Negative, or Neutral with unparalleled accuracy.
            </p>
            <a 
              href="#article"
              className="inline-block bg-gray-700/50 border border-gray-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-700/80 transition-colors"
            >
              Read Me: Learn More
            </a>
        </div>

      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8 text-left">
        <div className="flex flex-col space-y-6">
          {/* FIX: Removed the API endpoint URL input to use the Gemini API directly. */}
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-2">
              Enter Text for Analysis
            </label>
            <textarea
              id="text-input"
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here..."
              className="w-full bg-gray-800 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              'Analyze Sentiment'
            )}
          </button>
        </div>
      </div>
      
      {error && <div className="mt-6 text-center text-red-400 bg-red-500/10 p-4 rounded-lg">{error}</div>}
      {result && !loading && <ResultPanel result={result} />}
    </div>
  );
};

export default SentimentAnalyzer;