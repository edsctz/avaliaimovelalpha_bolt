import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { PropertyData } from '../types';

interface ResultScreenProps {
  propertyData: PropertyData;
  onNext: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ propertyData, onNext }) => {
  const basePrice = propertyData.squareMeters * 10000;
  
  const pricePoints = [-3, -2, -1, 0, 1, 2, 3].map(stdDev => {
    const variance = basePrice * 0.15;
    const price = basePrice + (stdDev * variance);
    const probability = Math.exp(-(stdDev * stdDev) / 2) / Math.sqrt(2 * Math.PI);
    return {
      label: getPriceLabel(stdDev),
      price,
      probability: probability * 100,
      description: getPriceDescription(stdDev),
    };
  });

  function getPriceLabel(stdDev: number): string {
    switch (stdDev) {
      case -3: return 'Necessita Reformas';
      case -2: return 'Abaixo da Média';
      case -1: return 'Pouco Abaixo';
      case 0: return 'Valor Estimado';
      case 1: return 'Bem Conservado';
      case 2: return 'Recém Reformado';
      case 3: return 'Acabamento Premium';
      default: return '';
    }
  }

  function getPriceDescription(stdDev: number): string {
    switch (stdDev) {
      case -3: return 'Imóvel necessitando reforma significativa';
      case -2: return 'Imóvel com alguns problemas de manutenção';
      case -1: return 'Imóvel em condição regular';
      case 0: return 'Valor base estimado';
      case 1: return 'Imóvel bem conservado';
      case 2: return 'Imóvel com reformas recentes';
      case 3: return 'Imóvel com acabamentos premium';
      default: return '';
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Valor Estimado do Imóvel
        </h2>
        <p className="mt-2 text-xl font-semibold text-green-600">
          {formatCurrency(basePrice)}
        </p>
        </div>

      <div className="h-80 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={pricePoints} margin={{ top: 20, right: 30, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="price"
              tickFormatter={formatCurrency}
              interval={1}
              tick={{ fontSize: 12 }}
            />
            <YAxis hide />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-4 shadow-lg rounded-lg border">
                      <p className="font-semibold text-gray-900">{data.label}</p>
                      <p className="text-gray-600">{formatCurrency(data.price)}</p>
                      <p className="text-sm text-gray-500 mt-1">{data.description}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine
              x={basePrice}
              stroke="#4F46E5"
              strokeDasharray="3 3"
              label={{
                value: "Estimativa Base",
                position: "top",
                fill: "#4F46E5",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="probability"
              stroke="#4F46E5"
              fill="url(#colorGradient)"
              baseLine={8}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-indigo-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4">
          Faixas de Valor
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pricePoints.map((point, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 ${
                index === 3 ? 'bg-indigo-600' : 'bg-indigo-300'
              }`} />
              <div>
                <p className="font-medium text-gray-900">{point.label}</p>
                <p className="text-sm text-gray-600">{formatCurrency(point.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Quer uma avaliação mais precisa? Conecte-se com um especialista
          imobiliário para uma análise detalhada do seu imóvel.
        </p>
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
        >
          Falar com Especialista
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;