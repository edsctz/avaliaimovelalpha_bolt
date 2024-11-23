import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

interface CepStepProps {
  onSubmit: (cep: string) => void;
  onBack: () => void;
}

const CepStep: React.FC<CepStepProps> = ({ onSubmit, onBack }) => {
  const [cep, setCep] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      setError('CEP inválido. Digite um CEP com 8 números.');
      return;
    }

    setError('');
    onSubmit(cleanCep);
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
    setError('');
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
          <MapPin className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Qual é o CEP do imóvel?</h2>
        <p className="mt-2 text-gray-600">Digite o CEP para buscarmos o endereço automaticamente</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            value={cep}
            onChange={handleChange}
            maxLength={9}
            placeholder="00000-000"
            className={`w-full px-4 py-3 text-center text-2xl font-medium border ${
              error ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </button>

          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Continuar
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CepStep;