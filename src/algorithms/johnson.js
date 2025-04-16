export const johnsonAlgorithm = (vertices, edges) => {
	const steps = [];

	// Шаг 1: Добавляем фиктивную вершину
	const fakeVertex = "s";
	const modifiedEdges = [
		...edges,
		...vertices.map(v => ({ source: fakeVertex, target: v, weight: 0 })),
	];

	steps.push({
		name: "Добавление фиктивной вершины",
		edges: modifiedEdges,
		h: {},
	});

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

	steps.push({
		name: "Запуск Беллмана-Форда",
		h: { ...h },
	});

	// Проверка на отрицательные циклы
	const hasNegativeCycle = modifiedEdges.some(
		({ source, target, weight }) => h[source] + weight < h[target]
	);
	if (hasNegativeCycle) throw new Error("Граф содержит отрицательный цикл!");

	// Шаг 3: Перевзвешивание рёбер
	const reweightedEdges = edges.map(({ source, target, weight }) => ({
		source,
		target,
		weight: weight + h[source] - h[target],
	}));

	steps.push({
		name: "Перевзвешивание рёбер",
		edges: reweightedEdges,
	});

	// Шаг 4: Дейкстра для каждой вершины
	const distances = {};
	vertices.forEach(u => {
		const dist = {};
		vertices.forEach(v => dist[v] = Infinity);
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
					}
				});
		}

		vertices.forEach(v => {
			distances[`${u}-${v}`] = dist[v] - h[u] + h[v];
		});

		steps.push({
			name: `Дейкстра из вершины ${u}`,
			dist: { ...dist },
		});
	});

	// Формируем матрицу
	const result = vertices.map(u =>
		vertices.map(v => distances[`${u}-${v}`])
	);

	return { result, steps };
};