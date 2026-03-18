import { Wallet } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100">
        <div className="flex justify-center mb-4">
          <Wallet className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welfare Fund <span className="text-blue-600">Management System</span>
        </h1>
        <p className="mt-4 text-gray-500">
          System Architect Environment: <span className="font-mono bg-gray-100 px-2 py-1 rounded">Node v24.11.1</span>
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">Stable</div>
          <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">Ready for Team</div>
        </div>
      </div>
    </div>
  )
}

export default App