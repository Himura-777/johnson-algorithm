export default function Controls({ runAlgorithm, currentStep, setCurrentStep, maxStep }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<div className="flex space-x-4">
				<button
					onClick={runAlgorithm}
					className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
				>
					Запустить алгоритм
				</button>

				{maxStep > 0 && (
					<div className="flex items-center space-x-2">
						<button
							onClick={() => setCurrentStep(p => Math.max(0, p - 1))}
							disabled={currentStep === 0}
							className="bg-blue-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
						>
							Назад
						</button>
						<span>{currentStep + 1} / {maxStep + 1}</span>
						<button
							onClick={() => setCurrentStep(p => Math.min(maxStep, p + 1))}
							disabled={currentStep === maxStep}
							className="bg-blue-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
						>
							Вперёд
						</button>
					</div>
				)}
			</div>
		</div>
	);
}