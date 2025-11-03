'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api/client';

export default function ApiTestComponent() {
  const [status, setStatus] = useState<string>('Not tested');
  const [loading, setLoading] = useState(false);

  const testBackendConnection = async () => {
    setLoading(true);
    try {
      // Test the health endpoint directly with fetch since API client uses different paths
      const response = await fetch('http://localhost:4000/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setStatus(`✅ Backend Connected! Server time: ${data.time}`);
      } else {
        setStatus(`❌ Backend Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setStatus(`❌ Connection Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Backend Connection Test</h2>
      
      <div className="space-y-4">
        <button
          onClick={testBackendConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Backend Connection'}
        </button>
        
        <div className="p-3 bg-white rounded border">
          <strong>Status:</strong> {status}
        </div>
        
        <div className="text-sm text-gray-600">
          <p><strong>Frontend URL:</strong> http://localhost:3000</p>
          <p><strong>Backend URL:</strong> http://localhost:4000</p>
          <p><strong>Test Endpoint:</strong> /api/health</p>
        </div>
      </div>
    </div>
  );
}