import { useState } from 'react';

const Docs = () => {
  const [activeTab, setActiveTab] = useState('authentication');
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);

  const toggleEndpoint = (endpoint) => {
    setExpandedEndpoint(expandedEndpoint === endpoint ? null : endpoint);
  };

  const formatJSON = (data) => {
    return JSON.stringify(data, null, 2)
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/"/g, '');
  };

  const apiEndpoints = {
    authentication: [
      {
        name: 'Register User',
        method: 'POST',
        path: '/register',
        description: 'Endpoint untuk mendaftarkan pengguna baru',
        request: {
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            name: 'Yudha',
            email: 'yudha@example.com',
            password: 'password123'
          }
        },
        response: {
          success: {
            status: 200,
            body: {
              status: 'success',
              message: 'Registrasi berhasil. Silakan login.'
            }
          }
        }
      },
      {
        name: 'Login User',
        method: 'POST',
        path: '/login',
        description: 'Endpoint untuk login pengguna',
        request: {
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            email: 'yudha@example.com',
            password: 'password123'
          }
        },
        response: {
          success: {
            status: 200,
            body: {
              status: 'success',
              message: 'Login berhasil.',
              data: {
                token: 'your.jwt.token',
                user: {
                  name: 'Yudha',
                  email: 'yudha@example.com'
                }
              }
            }
          }
        }
      }
    ],
    profile: [
      {
        name: 'Get Profile',
        method: 'GET',
        path: '/profile',
        description: 'Endpoint untuk mendapatkan data profil pengguna (Protected)',
        request: {
          headers: {
            'Authorization': 'Bearer <your_token>',
            'Content-Type': 'application/json'
          }
        },
        response: {
          success: {
            status: 200,
            body: {
              status: 'success',
              message: 'Profil pengguna berhasil diambil',
              data: {
                name: 'Yudha',
                email: 'yudha@example.com'
              }
            }
          }
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading leading-tight mb-4">
              Dokumentasi API
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Panduan Untuk Menggunakan API Kami
            </p>
            
            <div className="mt-8 flex justify-center space-x-4">
              <a
                href="#api-endpoints"
                className="px-6 py-3 bg-orange-400 text-white font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Jelajahi Endpoints
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300"
              >
                Bantuan
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg
            className="w-full h-16 text-blue-600"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {Object.keys(apiEndpoints).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="divide-y divide-gray-200">
            {apiEndpoints[activeTab].map((endpoint, index) => (
              <div key={index} className="p-6">
                <div 
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => toggleEndpoint(index)}
                >
                  <div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                        endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {endpoint.method}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900">
                        {endpoint.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {endpoint.path}
                    </p>
                    <p className="mt-2 text-gray-600">
                      {endpoint.description}
                    </p>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-400 transform transition-transform ${
                      expandedEndpoint === index ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {expandedEndpoint === index && (
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Request
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="mb-4">
                          <span className="text-sm font-medium text-gray-700">Headers:</span>
                          <pre className="mt-1 text-sm text-gray-900 bg-white p-3 rounded overflow-x-auto">
                            {formatJSON(endpoint.request.headers)}
                          </pre>
                        </div>
                        
                        {endpoint.request.body && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">Body:</span>
                            <pre className="mt-1 text-sm text-gray-900 bg-white p-3 rounded overflow-x-auto">
                              {formatJSON(endpoint.request.body)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Response
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Success ({endpoint.response.success.status}):</span>
                          <pre className="mt-1 text-sm text-gray-900 bg-white p-3 rounded overflow-x-auto">
                            {formatJSON(endpoint.response.success.body)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Informasi API
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Base URL</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <code className="text-sm font-mono text-gray-900">
                    https://signify-api.onrender.com/
                  </code>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Authentication</h3>
                <p className="text-gray-600 mb-3">
                  Melampirkan JWT Token di header Authorization:
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <pre className="text-sm font-mono text-gray-900">
                    Authorization: Bearer {'<your-token>'}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;