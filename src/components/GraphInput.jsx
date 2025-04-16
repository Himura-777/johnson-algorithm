import React, {useState} from 'react'

export default function GraphInput({ vertices, edges, setVertices, setEdges }) {
	const [newVertex, setNewVertex] = useState('');
	const [source, setSource] = useState('');
	const [target, setTarget] = useState('');
	const [weight, setWeight] = useState('');

	const addVertex = () => {
		if (newVertex && !vertices.includes(newVertex)) {
			setVertices([...vertices, newVertex]);
			setNewVertex('');
		}
	};

	const addEdge = () => {
		if (source && target && weight && vertices.includes(source) && vertices.includes(target)) {
			setEdges([...edges, { source, target, weight: parseInt(weight) }]);
			setSource('');
			setTarget('');
			setWeight('');
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4">Ввод графа</h2>

			<div className="mb-4">
				<label className="block mb-2">Добавить вершину:</label>
				<div className="flex">
					<input
						type="text"
						value={newVertex}
						onChange={(e) => setNewVertex(e.target.value)}
						className="border p-2 rounded-l flex-grow"
						placeholder="Имя вершины"
					/>
					<button
						onClick={addVertex}
						className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
					>
						Добавить
					</button>
				</div>
			</div>

			<div className="mb-4">
				<label className="block mb-2">Добавить ребро:</label>
				<div className="grid grid-cols-3 gap-2 mb-2">
					<select
						value={source}
						onChange={(e) => setSource(e.target.value)}
						className="border p-2 rounded"
					>
						<option value="">Из</option>
						{vertices.map(v => <option key={v} value={v}>{v}</option>)}
					</select>
					<select
						value={target}
						onChange={(e) => setTarget(e.target.value)}
						className="border p-2 rounded"
					>
						<option value="">В</option>
						{vertices.map(v => <option key={v} value={v}>{v}</option>)}
					</select>
					<input
						type="number"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
						className="border p-2 rounded"
						placeholder="Вес"
					/>
				</div>
				<button
					onClick={addEdge}
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
				>
					Добавить ребро
				</button>
			</div>

			<div className="mb-4">
				<h3 className="font-semibold">Вершины: {vertices.join(', ')}</h3>
				<h3 className="font-semibold">Рёбра:</h3>
				<ul>
					{edges.map((edge, i) => (
						<li key={i}>{edge.source} → {edge.target} (вес: {edge.weight})</li>
					))}
				</ul>
			</div>
		</div>
	);
}