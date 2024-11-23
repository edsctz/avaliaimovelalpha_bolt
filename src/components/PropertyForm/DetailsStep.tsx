import React from 'react';
import { ArrowLeft, ArrowRight, Building2, Ruler, Calendar } from 'lucide-react';
import { FormStep } from '../../types';

interface DetailsStepProps {
  onSubmit: (details: NonNullable<FormStep['details']>) => void;
  onBack: () => void;
}

const DetailsStep: React.FC<DetailsStepProps> = ({ onSubmit, onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const details = {
      bedrooms: parseInt(formData.get('bedrooms') as string),
      bathrooms: parseInt(formData.get('bathrooms') as string),
      squareMeters: parseInt(formData.get('squareMeters') as string),
      yearBuilt: parseInt(formData.get('yearBuilt') as string),
    };
    
    onSubmit(details);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Detalhes do Imóvel</h2>
        <p className="mt-2 text-gray-600">Preencha as características do seu imóvel</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Building2 className="w-4 h-4 mr-2" />
              Quartos
            </label>
            <select
              name="bedrooms"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Building2 className="w-4 h-4 mr-2" />
              Banheiros
            </label>
            <select
              name="bathrooms"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Ruler className="w-4 h-4 mr-2" />
              Metros Quadrados
            </label>
            <input
              type="number"
              name="squareMeters"
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Área total"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 mr-2" />
              Ano de Construção
            </label>
            <input
              type="number"
              name="yearBuilt"
              required
              min="1900"
              max={new Date().getFullYear()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ano de construção"
            />
          </div>
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
            Avaliar Imóvel
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailsStep;