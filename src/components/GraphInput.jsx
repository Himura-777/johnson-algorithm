import React, { useState } from 'react';

export default function GraphInput({ vertices, edges, setVertices, setEdges }) {
	const [newVertex, setNewVertex] = useState('');
	const [source, setSource] = useState('');
	const [target, setTarget] = useState('');
	const [weight, setWeight] = useState('');
	const [error, setError] = useState('');
	const [editingIndex, setEditingIndex] = useState(null); // Для хранения индекса редактируемого ребра

	const addVertex = () => {
		if (!newVertex.trim()) {
			setError('Имя вершины не может быть пустым');
			return;
		}
		if (vertices.includes(newVertex)) {
			setError('Вершина уже существует');
			return;
		}
		setVertices([...vertices, newVertex]);
		setNewVertex('');
		setError('');
	};

	const handleAddOrUpdateEdge = () => {
		if (!source || !target) {
			setError('Выберите вершины');
			return;
		}
		if (source === target) {
			setError('Нельзя создать ребро между одинаковыми вершинами');
			return;
		}
		if (isNaN(weight)) {
			setError('Вес должен быть числом');
			return;
		}

		// Проверка на дублирование (кроме редактируемого ребра)
		const duplicate = edges.some((e, i) =>
			e.source === source &&
			e.target === target &&
			i !== editingIndex
		);
		if (duplicate) {
			setError('Такое ребро уже существует');
			return;
		}

		if (editingIndex !== null) {
			// Обновляем существующее ребро
			const updatedEdges = [...edges];
			updatedEdges[editingIndex] = { source, target, weight: parseInt(weight) };
			setEdges(updatedEdges);
			setEditingIndex(null);
		} else {
			// Добавляем новое ребро
			setEdges([...edges, { source, target, weight: parseInt(weight) }]);
		}

		setSource('');
		setTarget('');
		setWeight('');
		setError('');
	};

	const removeVertex = (vertex) => {
		setVertices(vertices.filter(v => v !== vertex));
		setEdges(edges.filter(e => e.source !== vertex && e.target !== vertex));
	};

	const removeEdge = (index) => {
		setEdges(edges.filter((_, i) => i !== index));
		if (editingIndex === index) {
			cancelEdit();
		}
	};

	const startEdit = (index) => {
		const edge = edges[index];
		setSource(edge.source);
		setTarget(edge.target);
		setWeight(edge.weight.toString());
		setEditingIndex(index);
	};

	const cancelEdit = () => {
		setSource('');
		setTarget('');
		setWeight('');
		setEditingIndex(null);
		setError('');
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4">Ввод графа</h2>

			{error && <div className="text-red-500 mb-2">{error}</div>}

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
				<label className="block mb-2">
					{editingIndex !== null ? 'Редактировать ребро' : 'Добавить ребро'}:
				</label>
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
				<div className="flex space-x-2">
					<button
						onClick={handleAddOrUpdateEdge}
						className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex-grow ${
							editingIndex !== null ? 'bg-yellow-500 hover:bg-yellow-600' : ''
						}`}
					>
						{editingIndex !== null ? 'Обновить' : 'Добавить'}
					</button>
					{editingIndex !== null && (
						<button
							onClick={cancelEdit}
							className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
						>
							Отмена
						</button>
					)}
				</div>
			</div>

			<div className="mb-4">
				<h3 className="font-semibold mb-2">Вершины:</h3>
				<ul className="space-y-1">
					{vertices.map(vertex => (
						<li key={vertex} className="flex justify-between items-center">
							{vertex}
							<button
								onClick={() => removeVertex(vertex)}
								className="text-white bg-red-500 py-1 px-2 rounded-lg"
							>
								Удалить
							</button>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className="font-semibold mb-2">Рёбра:</h3>
				<ul className="space-y-1">
					{edges.map((edge, i) => (
						<li key={i} className="flex justify-between items-center">
                            <span>
                                {edge.source} → {edge.target} (вес: {edge.weight})
                            </span>
							<div className="flex space-x-2">
								<button
									onClick={() => startEdit(i)}
									className="text-white bg-blue-500 py-1 px-2 rounded-lg"
								>
									Изменить
								</button>
								<button
									onClick={() => removeEdge(i)}
									className="text-white bg-red-500 py-1 px-2 rounded-lg"
								>
									Удалить
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}