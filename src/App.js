import React, { useState } from 'react';
import GraphInput from './components/GraphInput.jsx';
import Controls from './components/Controls.jsx';
import ResultTable from './components/ResultTable.jsx';
import { johnsonAlgorithm } from './algorithms/johnson.js';

function App() {
  const [vertices, setVertices] = useState(['A', 'B', 'C']);
  const [edges, setEdges] = useState([

  ]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const runJohnson = () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = johnsonAlgorithm(vertices, edges);
      setResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Алгоритм Джонсона</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <GraphInput
                vertices={vertices}
                edges={edges}
                setVertices={setVertices}
                setEdges={setEdges}
            />
            <Controls
                runAlgorithm={runJohnson}
                isLoading={isLoading}
            />
          </div>

          <div className="space-y-6">
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  {error}
                </div>
            )}
            {result && <ResultTable result={result} vertices={vertices} />}
          </div>
        </div>
      </div>
  );
}

export default App;