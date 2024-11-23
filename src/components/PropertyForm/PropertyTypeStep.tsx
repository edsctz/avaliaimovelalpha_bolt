import React from 'react';
import { Building2, Home } from 'lucide-react';
import { PropertyType } from '../../types';

interface PropertyTypeStepProps {
  onSelect: (type: PropertyType) => void;
}

const PropertyTypeStep: React.FC<PropertyTypeStepProps> = ({ onSelect }) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Que tipo de imóvel você quer avaliar?</h1>
        <p className="mt-2 text-gray-600">Selecione o tipo do seu imóvel para começar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelect('apartment')}
          className="flex flex-col items-center p-8 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
        >
          <Building2 className="w-16 h-16 text-indigo-600 mb-4" />
          <span className="text-xl font-semibold text-gray-900">Apartamento</span>
          <span className="mt-2 text-sm text-gray-500">Apartamentos e coberturas</span>
        </button>

        <button
          onClick={() => onSelect('house')}
          className="flex flex-col items-center p-8 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
        >
          <Home className="w-16 h-16 text-indigo-600 mb-4" />
          <span className="text-xl font-semibold text-gray-900">Casa</span>
          <span className="mt-2 text-sm text-gray-500">Casas e sobrados</span>
        </button>
      </div>
    </div>
  );
};

export default PropertyTypeStep;