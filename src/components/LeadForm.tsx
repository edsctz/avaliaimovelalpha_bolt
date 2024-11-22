import React from 'react';
import { Send, Phone, Mail, User, ArrowRight } from 'lucide-react';
import { LeadData } from '../types';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data: LeadData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };
    
    onSubmit(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
          <Send className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Receba Sua Avaliação Detalhada
        </h2>
        <p className="mt-2 text-gray-600">
          Insira seus dados de contato para receber uma avaliação completa de nossos especialistas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4 mr-2" />
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-4 h-4 mr-2" />
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Phone className="w-4 h-4 mr-2" />
              Telefone
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Digite seu telefone"
            />
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Ao enviar este formulário, você concorda em ser contatado por nossos especialistas imobiliários sobre a avaliação do seu imóvel.
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
        >
          Receber Avaliação
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default LeadForm;