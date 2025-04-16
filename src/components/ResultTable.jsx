import React from 'react'

export default function ResultTable({ result, vertices }) {
	if (!result) return null;

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4">Матрица кратчайших расстояний</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full border-collapse border">
					<thead>
					<tr>
						<th className="border p-2 bg-gray-100">→</th>
						{vertices.map(vertex => (
							<th key={vertex} className="border p-2 bg-gray-100">{vertex}</th>
						))}
					</tr>
					</thead>
					<tbody>
					{result.map((row, rowIndex) => (
						<tr key={rowIndex}>
							<td className="border p-2 font-semibold bg-gray-50">{vertices[rowIndex]}</td>
							{row.map((cell, cellIndex) => (
								<td key={cellIndex} className="border p-2 text-center">
									{cell === Infinity ? '∞' : cell}
								</td>
							))}
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
}