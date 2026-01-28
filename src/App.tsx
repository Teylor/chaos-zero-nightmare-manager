import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Chaos Zero Nightmare Manager
        </h1>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Welcome to your new project with TypeScript, Tailwind CSS, and
              Playwright!
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => setCount(count => count + 1)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              count is {count}
            </button>

            <p className="text-sm text-gray-500">
              Edit <code className="bg-gray-100 px-1 rounded">src/App.tsx</code>{' '}
              and save to test HMR
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Features Included:
            </h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Vite + React + TypeScript
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Tailwind CSS v4
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                ESLint + Prettier
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Husky + lint-staged
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Playwright E2E Testing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
