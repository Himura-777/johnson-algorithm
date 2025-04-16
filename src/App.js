import React, {useState} from 'react'
import GraphInput from './components/GraphInput.jsx'
import GraphVisualization from './components/GraphVisualization.jsx'
import ResultTable from './components/ResultTable.jsx'
import StepByStep from './components/StepByStep.jsx'
import Controls from './components/Controls.jsx'
import {johnsonAlgorithm} from './algorithms/johnson.js'

function App() {
  const [vertices, setVertices] = useState(['A', 'B', 'C']);
  const [edges, setEdges] = useState([
    { source: 'A', target: 'B', weight: 2 },
    { source: 'B', target: 'C', weight: -1 },
  ]);
  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);

  const runJohnson = () => {
    const { result, steps } = johnsonAlgorithm(vertices, edges);
    setResult(result);
    setSteps(steps);
    setCurrentStep(0);
  };

  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Алгоритм Джонсона</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <GraphInput
                vertices={vertices}
                edges={edges}
                setVertices={setVertices}
                setEdges={setEdges}
            />
            <Controls
                runAlgorithm={runJohnson}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                maxStep={steps.length - 1}
            />
          </div>

          <div className="space-y-6">
            <GraphVisualization vertices={vertices} edges={edges} />
            {steps.length > 0 && (
                <StepByStep
                    step={steps[currentStep]}
                    vertices={vertices}
                />
            )}
            {result && <ResultTable result={result} vertices={vertices} />}
          </div>
        </div>
      </div>
  );
}

export default App;