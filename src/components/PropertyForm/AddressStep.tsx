import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { Address } from '../../types';

interface AddressStepProps {
  cep: string;
  onSubmit: (address: Address) => void;
  onBack: () => void;
}

const AddressStep: React.FC<AddressStepProps> = ({ cep, onSubmit, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [address, setAddress] = useState<Address>({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        
        if (response.data.erro) {
          throw new Error('CEP não encontrado');
        }
        
        setAddress(response.data);
      } catch (err) {
        setError('Não foi possível encontrar o endereço. Por favor, preencha manualmente.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [cep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.localidade) {
      setError('Por favor, preencha a cidade.');
      return;
    }

    const allowedCities = ['Barueri', 'Santana de Parnaíba'];
    if (!allowedCities.includes(address.localidade)) {
      setError('No momento, só podemos avaliar imóveis em Alphaville (Barueri ou Santana de Parnaíba).');
      return;
    }

    onSubmit(address);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Buscando endereço...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Confirme o Endereço</h2>
        <p className="mt-2 text-gray-600">Verifique e complete as informações do endereço</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Endereço</label>
            <input
              type="text"
              value={address.logradouro}
              onChange={(e) => setAddress({ ...address, logradouro: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                value={address.bairro}
                onChange={(e) => setAddress({ ...address, bairro: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Complemento</label>
              <input
                type="text"
                value={address.complemento}
                onChange={(e) => setAddress({ ...address, complemento: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                value={address.localidade}
                onChange={(e) => setAddress({ ...address, localidade: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <input
                type="text"
                value={address.uf}
                onChange={(e) => setAddress({ ...address, uf: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                maxLength={2}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

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

export default AddressStep;