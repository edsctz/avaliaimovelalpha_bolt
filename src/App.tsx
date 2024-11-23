import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import PropertyForm from './components/PropertyForm';
import SimulationScreen from './components/SimulationScreen';
import ResultScreen from './components/ResultScreen';
import LeadForm from './components/LeadForm';
import { PropertyData, LeadData } from './types';

function App() {
  const [step, setStep] = useState(1);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  const handlePropertySubmit = (data: PropertyData) => {
    setPropertyData(data);
    setStep(2);
  };

  const handleSimulationComplete = () => {
    setStep(3);
  };

  const handleLeadSubmit = (data: LeadData) => {
    setLeadData(data);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">ValorImóvel</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-500">Etapa {step} de 4</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {step === 1 && <PropertyForm onSubmit={handlePropertySubmit} />}
          {step === 2 && <SimulationScreen onComplete={handleSimulationComplete} />}
          {step === 3 && propertyData && <ResultScreen propertyData={propertyData} onNext={() => setStep(4)} />}
          {step === 4 && <LeadForm onSubmit={handleLeadSubmit} />}
        </div>
      </main>

      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            © 2024 ValorImóvel. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;