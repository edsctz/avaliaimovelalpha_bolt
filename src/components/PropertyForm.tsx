import React from 'react';
import { Home, Building2, Ruler, Calendar, ArrowRight } from 'lucide-react';
import { PropertyData } from '../types';

interface PropertyFormProps {
  onSubmit: (data: PropertyData) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data: PropertyData = {
      zip: formData.get('zip') as string,
      bedrooms: parseInt(formData.get('bedrooms') as string),
      bathrooms: parseInt(formData.get('bathrooms') as string),
      squareMeters: parseInt(formData.get('squareMeters') as string),
      yearBuilt: parseInt(formData.get('yearBuilt') as string),
    };
    
    onSubmit(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Avalie Seu Imóvel</h1>
        <p className="mt-2 text-gray-600">Insira os detalhes do seu imóvel para obter uma avaliação instantânea</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Home className="w-4 h-4 mr-2" />
              CEP
            </label>
            <input
              type="text"
              name="zip"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Digite o CEP"
            />
          </div>

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

          <div className="space-y-2 md:col-span-2">
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

        <button
          type="submit"
          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
        >
          Avaliar Imóvel
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;