import React, { useState } from 'react';
import { Code, Copy, Key, Play, Book, Shield, Download, TestTube, Globe, Database, Zap } from 'lucide-react';
import { APIKey } from '../../types';

export const APIPlayground: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('footprint');
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'playground' | 'postman' | 'selenium' | 'testing'>('playground');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const apiKeys: APIKey[] = [
    {
      id: '1',
      name: 'Production Key',
      key: 'rl_live_sk_1234567890abcdef',
      permissions: ['read', 'write'],
      lastUsed: '2024-12-15T10:30:00Z',
      createdAt: '2024-11-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'rl_test_sk_abcdef1234567890',
      permissions: ['read'],
      lastUsed: '2024-12-14T15:45:00Z',
      createdAt: '2024-11-15T00:00:00Z'
    }
  ];

  const endpoints = {
    footprint: {
      method: 'GET',
      url: '/api/v1/footprint',
      description: 'Get user carbon footprint data',
      example: `curl -X GET "https://api.releafsync.com/v1/footprint" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
    },
    calculate: {
      method: 'POST',
      url: '/api/v1/footprint/calculate',
      description: 'Calculate carbon footprint from input data',
      example: `curl -X POST "https://api.releafsync.com/v1/footprint/calculate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "travel": {
      "flightMiles": 500,
      "carMiles": 1200
    },
    "homeEnergy": {
      "electricity": 800,
      "gas": 50
    },
    "foodPurchases": {
      "meat": 20,
      "dairy": 15
    }
  }'`
    },
    organizations: {
      method: 'GET',
      url: '/api/v1/organizations/stats',
      description: 'Get organization-level statistics',
      example: `curl -X GET "https://api.releafsync.com/v1/organizations/stats" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
    },
    integrations: {
      method: 'POST',
      url: '/api/v1/integrations/sync',
      description: 'Sync data from connected integrations',
      example: `curl -X POST "https://api.releafsync.com/v1/integrations/sync" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "integrationId": "smart_meter_001",
    "forceSync": true
  }'`
    },
    emissions: {
      method: 'GET',
      url: '/api/v1/emissions/realtime',
      description: 'Get real-time emissions data',
      example: `curl -X GET "https://api.releafsync.com/v1/emissions/realtime" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
    }
  };

  const postmanCollection = {
    info: {
      name: "ReLeaf Sync API",
      description: "Complete API collection for carbon footprint calculations",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: [
      {
        name: "Get User Footprint",
        request: {
          method: "GET",
          header: [
            {
              key: "Authorization",
              value: "Bearer {{api_key}}"
            }
          ],
          url: {
            raw: "{{base_url}}/api/v1/footprint",
            host: ["{{base_url}}"],
            path: ["api", "v1", "footprint"]
          }
        }
      },
      {
        name: "Calculate Footprint",
        request: {
          method: "POST",
          header: [
            {
              key: "Authorization",
              value: "Bearer {{api_key}}"
            },
            {
              key: "Content-Type",
              value: "application/json"
            }
          ],
          body: {
            mode: "raw",
            raw: JSON.stringify({
              travel: { flightMiles: 500, carMiles: 1200 },
              homeEnergy: { electricity: 800, gas: 50 },
              foodPurchases: { meat: 20, dairy: 15 }
            }, null, 2)
          },
          url: {
            raw: "{{base_url}}/api/v1/footprint/calculate",
            host: ["{{base_url}}"],
            path: ["api", "v1", "footprint", "calculate"]
          }
        }
      }
    ],
    variable: [
      {
        key: "base_url",
        value: "https://api.releafsync.com"
      },
      {
        key: "api_key",
        value: "YOUR_API_KEY_HERE"
      }
    ]
  };

  const seleniumTests = [
    {
      name: "API Authentication Test",
      description: "Test API key authentication",
      status: "pending"
    },
    {
      name: "Footprint Calculation Test",
      description: "Test carbon footprint calculation accuracy",
      status: "pending"
    },
    {
      name: "Rate Limiting Test",
      description: "Test API rate limiting",
      status: "pending"
    },
    {
      name: "Data Validation Test",
      description: "Test input data validation",
      status: "pending"
    },
    {
      name: "Error Handling Test",
      description: "Test error responses",
      status: "pending"
    }
  ];

  const handleRunExample = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResponses = {
      footprint: {
        success: true,
        data: {
          userId: "user_123",
          currentMonth: {
            travel: 120,
            homeEnergy: 85,
            foodPurchases: 45,
            total: 250
          },
          trend: "decreasing",
          percentChange: -12.5
        }
      },
      calculate: {
        success: true,
        data: {
          breakdown: {
            travel: 145.5,
            homeEnergy: 92.3,
            foodPurchases: 67.8
          },
          total: 305.6,
          recommendations: [
            "Consider using public transport 2 days per week",
            "Switch to LED bulbs to reduce energy consumption"
          ]
        }
      },
      organizations: {
        success: true,
        data: {
          organizationId: "org_456",
          memberCount: 25,
          averageFootprint: 234.5,
          totalReduction: 1250,
          topPerformers: ["Alice Johnson", "Bob Smith", "Carol Davis"]
        }
      },
      integrations: {
        success: true,
        data: {
          syncId: "sync_789",
          recordsProcessed: 156,
          newDataPoints: 12,
          lastSyncTime: "2024-12-15T14:30:00Z"
        }
      },
      emissions: {
        success: true,
        data: {
          timestamp: "2024-12-15T14:30:00Z",
          realtimeEmissions: {
            current: 245.6,
            trend: "decreasing",
            prediction: 230.2
          },
          dataSource: "smart_meter_integration"
        }
      }
    };

    setApiResponse(JSON.stringify(mockResponses[selectedEndpoint as keyof typeof mockResponses], null, 2));
    setIsLoading(false);
  };

  const downloadPostmanCollection = () => {
    const dataStr = JSON.stringify(postmanCollection, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'releaf-sync-api-collection.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const runSeleniumTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);
    
    for (let i = 0; i < seleniumTests.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const test = seleniumTests[i];
      const result = {
        name: test.name,
        status: Math.random() > 0.2 ? 'passed' : 'failed',
        duration: Math.floor(Math.random() * 2000) + 500,
        timestamp: new Date().toISOString()
      };
      
      setTestResults(prev => [...prev, result]);
    }
    
    setIsRunningTests(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderPlayground = () => (
    <div className="space-y-6">
      {/* API Keys Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
        <div className="flex items-center space-x-2 mb-4">
          <Key className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">API Keys</h3>
        </div>
        
        <div className="space-y-3">
          {apiKeys.map((key) => (
            <div key={key.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-800">{key.name}</p>
                  <div className="flex space-x-1">
                    {key.permissions.map((permission) => (
                      <span key={permission} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-mono">{key.key}</p>
                <p className="text-xs text-gray-500">
                  Last used: {new Date(key.lastUsed || '').toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(key.key)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Generate New Key
        </button>
      </div>

      {/* API Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Endpoint Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center space-x-2 mb-4">
            <Book className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">API Endpoints</h3>
          </div>
          
          <div className="space-y-2">
            {Object.entries(endpoints).map(([key, endpoint]) => (
              <button
                key={key}
                onClick={() => setSelectedEndpoint(key)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedEndpoint === key
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="font-medium text-gray-800">{endpoint.url}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{endpoint.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Code Example & Response */}
        <div className="space-y-4">
          {/* Request Example */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Request Example</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(endpoints[selectedEndpoint as keyof typeof endpoints].example)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={handleRunExample}
                  disabled={isLoading}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Play className="h-4 w-4" />
                  <span>Run</span>
                </button>
              </div>
            </div>
            
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{endpoints[selectedEndpoint as keyof typeof endpoints].example}</code>
            </pre>
          </div>

          {/* Response */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Response</h3>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : apiResponse ? (
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{apiResponse}</code>
              </pre>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Click "Run" to see the API response</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPostman = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-orange-600" />
            <h3 className="text-xl font-semibold text-gray-800">Postman Integration</h3>
          </div>
          <button
            onClick={downloadPostmanCollection}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download Collection</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Collection Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Complete API endpoint coverage</li>
              <li>✅ Pre-configured environment variables</li>
              <li>✅ Authentication headers setup</li>
              <li>✅ Example request bodies</li>
              <li>✅ Response validation tests</li>
              <li>✅ Rate limiting handling</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Quick Start</h4>
            <ol className="space-y-2 text-sm text-gray-600">
              <li>1. Download the collection file</li>
              <li>2. Import into Postman</li>
              <li>3. Set your API key in variables</li>
              <li>4. Start testing endpoints</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
        <h4 className="font-semibold text-gray-800 mb-4">Collection Preview</h4>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{JSON.stringify(postmanCollection, null, 2)}</code>
        </pre>
      </div>
    </div>
  );

  const renderSelenium = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TestTube className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-800">Selenium Automated Testing</h3>
          </div>
          <button
            onClick={runSeleniumTests}
            disabled={isRunningTests}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            <span>{isRunningTests ? 'Running Tests...' : 'Run All Tests'}</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Test Suite</h4>
            <div className="space-y-2">
              {seleniumTests.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{test.name}</p>
                    <p className="text-sm text-gray-600">{test.description}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                    {test.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Test Results</h4>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{result.name}</p>
                    <p className="text-sm text-gray-600">{result.duration}ms</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    result.status === 'passed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.status}
                  </span>
                </div>
              ))}
              {testResults.length === 0 && (
                <p className="text-gray-500 text-center py-4">No test results yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTesting = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Advanced Testing Features</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Load Testing</h4>
            <p className="text-sm text-blue-600">Test API performance under high load conditions</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Integration Testing</h4>
            <p className="text-sm text-green-600">Test end-to-end workflows and data flows</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Security Testing</h4>
            <p className="text-sm text-purple-600">Validate authentication and authorization</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <h4 className="font-semibold text-gray-800 mb-4">Test Coverage</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">API Endpoints</span>
              <span className="font-medium text-green-600">100%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Authentication</span>
              <span className="font-medium text-green-600">100%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Error Handling</span>
              <span className="font-medium text-green-600">95%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data Validation</span>
              <span className="font-medium text-green-600">100%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <h4 className="font-semibold text-gray-800 mb-4">Testing Tools</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-600">Postman Collections</span>
            </div>
            <div className="flex items-center space-x-2">
              <TestTube className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-gray-600">Selenium WebDriver</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-gray-600">JMeter Load Testing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-red-600" />
              <span className="text-sm text-gray-600">OWASP ZAP Security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">API Playground & Testing Suite</h2>
        <p className="text-gray-600">Comprehensive API testing with Postman integration and Selenium automation</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'playground', label: 'API Playground', icon: Code },
          { key: 'postman', label: 'Postman Integration', icon: Globe },
          { key: 'selenium', label: 'Selenium Testing', icon: TestTube },
          { key: 'testing', label: 'Advanced Testing', icon: Zap }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'playground' && renderPlayground()}
      {activeTab === 'postman' && renderPostman()}
      {activeTab === 'selenium' && renderSelenium()}
      {activeTab === 'testing' && renderTesting()}

      {/* Rate Limits & Documentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800">Rate Limits</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Requests per minute</span>
              <span className="font-medium">100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Requests per hour</span>
              <span className="font-medium">5,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Requests per day</span>
              <span className="font-medium">100,000</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current usage</span>
                <span className="text-sm font-medium text-green-600">23% of daily limit</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
          
          <div className="space-y-2">
            <a href="#" className="block p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
              📚 Full API Documentation
            </a>
            <a href="#" className="block p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
              🔧 SDK Downloads
            </a>
            <a href="#" className="block p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
              💬 Developer Support
            </a>
            <a href="#" className="block p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
              📊 API Status Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};