export default function StepByStep({ step, vertices }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4">Шаг: {step.name}</h2>

			{step.h && (
				<div className="mb-4">
					<h3 className="font-semibold">Значения h(v):</h3>
					<ul>
						{Object.entries(step.h).map(([v, value]) => (
							<li key={v}>{v}: {value}</li>
						))}
					</ul>
				</div>
			)}

			{step.dist && (
				<div className="mb-4">
					<h3 className="font-semibold">Расстояния:</h3>
					<ul>
						{vertices.map(v => (
							<li key={v}>{v}: {step.dist[v]}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}