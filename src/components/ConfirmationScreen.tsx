import React from 'react';
import { CheckCircle, Calendar } from 'lucide-react';

const ConfirmationScreen: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Solicitação Recebida com Sucesso!
        </h2>

        <div className="text-gray-600 space-y-4">
          <p>
            Obrigado por confiar em nossos serviços. Um especialista imobiliário entrará
            em contato em breve para uma análise mais detalhada do seu imóvel.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Tempo médio de resposta: até 24 horas úteis</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Em caso de dúvidas, entre em contato através do nosso canal de suporte.
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;