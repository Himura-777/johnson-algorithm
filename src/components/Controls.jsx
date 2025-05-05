export default function Controls({ runAlgorithm }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<button
				onClick={runAlgorithm}
				className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 w-full"
			>
				Запустить алгоритм Джонсона
			</button>
		</div>
	);
}