export const johnsonAlgorithm = (vertices, edges) => {
	// Шаг 1: Добавляем фиктивную вершину
	const fakeVertex = "s";
	const modifiedEdges = [
		...edges,
		...vertices.map(v => ({ source: fakeVertex, target: v, weight: 0 })),
	];

	// Шаг 2: Беллман-Форд для h(v)
	const h = {};
	vertices.forEach(v => h[v] = 0);
	h[fakeVertex] = 0;

	for (let i = 0; i < vertices.length; i++) {
		let updated = false;
		modifiedEdges.forEach(({ source, target, weight }) => {
			if (h[source] + weight < h[target]) {
				h[target] = h[source] + weight;
				updated = true;
			}
		});
		if (!updated) break;
	}

	// Проверка на отрицательные циклы
	if (modifiedEdges.some(({ source, target, weight }) => h[source] + weight < h[target])) {
		throw new Error("Граф содержит отрицательный цикл!");
	}

	// Шаг 3: Перевзвешивание рёбер
	const reweightedEdges = edges.map(({ source, target, weight }) => ({
		source, target, weight: weight + h[source] - h[target]
	}));

	// Шаг 4: Дейкстра для каждой вершины
	const distances = {};
	const paths = {};

	vertices.forEach(u => {
		const dist = {};
		const prev = {};
		vertices.forEach(v => {
			dist[v] = Infinity;
			prev[v] = null;
		});
		dist[u] = 0;

		const queue = [...vertices];
		while (queue.length) {
			queue.sort((a, b) => dist[a] - dist[b]);
			const current = queue.shift();

			reweightedEdges
				.filter(edge => edge.source === current)
				.forEach(({ target, weight }) => {
					if (dist[current] + weight < dist[target]) {
						dist[target] = dist[current] + weight;
						prev[target] = current;
					}
				});
		}

		vertices.forEach(v => {
			const key = `${u}-${v}`;
			distances[key] = dist[v] === Infinity ? Infinity : dist[v] - h[u] + h[v];

			// Восстановление пути
			if (u !== v && dist[v] !== Infinity) {
				const path = [];
				let node = v;
				while (node !== null) {
					path.unshift(node);
					node = prev[node];
				}
				paths[key] = path.join(' → ');
			} else {
				paths[key] = "нет пути";
			}
		});
	});

	// Формируем матрицу расстояний
	const matrix = vertices.map(u =>
		vertices.map(v => distances[`${u}-${v}`] === Infinity ? '∞' : distances[`${u}-${v}`]
		))

	return { matrix, paths };
};