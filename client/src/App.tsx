import { TaxCalculator } from "./components/TaxCalculator"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Tax Calculator</h1>
        <TaxCalculator />
      </div>
    </div>
  )
}

export default App
