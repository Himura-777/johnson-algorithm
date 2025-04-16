import React from 'react'
import ReactFlow, {Background, Controls} from 'reactflow'
import 'reactflow/dist/style.css'

export default function GraphVisualization({ vertices, edges }) {
	// Преобразуем вершины в узлы для react-flow
	const nodes = vertices.map((vertex, index) => ({
		id: vertex,
		data: { label: vertex },
		position: { x: index * 150, y: 100 },
	}));

	// Преобразуем рёбра в связи для react-flow
	const reactFlowEdges = edges.map((edge, index) => ({
		id: `e${index}`,
		source: edge.source,
		target: edge.target,
		label: edge.weight.toString(),
		type: 'smoothstep',
		animated: false,
	}));

	return (
		<div className="bg-white p-4 rounded-lg shadow-md h-96">
			<h2 className="text-xl font-semibold mb-4">Визуализация графа</h2>
			<div className="w-full h-80 border rounded">
				<ReactFlow
					nodes={nodes}
					edges={reactFlowEdges}
					fitView
				>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
		</div>
	);
}