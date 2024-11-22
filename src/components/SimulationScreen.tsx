import React, { useEffect, useState } from 'react';
import { CircleDashed } from 'lucide-react';

interface SimulationScreenProps {
  onComplete: () => void;
}

const SimulationScreen: React.FC<SimulationScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 10000; // 10 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      const remaining = Math.max(10 - Math.floor(elapsed / 1000), 0);
      setTimeLeft(remaining);

      if (newProgress >= 100) {
        clearInterval(interval);
        onComplete();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const steps = [
    "Analisando detalhes do imóvel...",
    "Buscando dados do mercado...",
    "Comparando imóveis similares...",
    "Calculando valor estimado..."
  ];

  const currentStep = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="max-w-md mx-auto">
        <CircleDashed className="w-16 h-16 mx-auto text-indigo-600 animate-spin" />
        
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">
          Analisando Seu Imóvel
        </h2>
        
        <p className="mt-2 text-gray-600">
          Por favor, aguarde enquanto processamos seus dados
        </p>

        <div className="mt-8">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-indigo-100">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-200"
              />
            </div>
          </div>
          
          <p className="text-sm font-medium text-indigo-600">
            {steps[currentStep]}
          </p>
          
          <p className="mt-4 text-sm text-gray-500">
            Tempo restante estimado: {timeLeft} segundos
          </p>
        </div>

        <div className="mt-8 space-y-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center space-x-3 ${
                index <= currentStep ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              <svg
                className={`h-5 w-5 ${
                  index < currentStep ? 'text-green-500' : 'text-gray-300'
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {index < currentStep ? (
                  <path d="M5 13l4 4L19 7" />
                ) : (
                  <circle cx="12" cy="12" r="10" />
                )}
              </svg>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationScreen;