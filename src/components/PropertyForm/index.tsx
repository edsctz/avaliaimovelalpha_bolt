import React, { useState } from 'react';
import { PropertyData, FormStep } from '../../types';
import PropertyTypeStep from './PropertyTypeStep';
import CepStep from './CepStep';
import AddressStep from './AddressStep';
import DetailsStep from './DetailsStep';

interface PropertyFormProps {
  onSubmit: (data: PropertyData) => void;
}

const initialFormState: FormStep = {
  type: null,
  cep: '',
  address: null,
  details: null,
};

const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormStep>(initialFormState);

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleTypeSelect = (type: 'apartment' | 'house') => {
    setFormData({ ...initialFormState, type });
    setStep(2);
  };

  const handleCepSubmit = (cep: string) => {
    setFormData(prev => ({ ...prev, cep }));
    setStep(3);
  };

  const handleAddressSubmit = (address: FormStep['address']) => {
    setFormData(prev => ({ ...prev, address }));
    setStep(4);
  };

  const handleDetailsSubmit = (details: FormStep['details']) => {
    if (formData.type && formData.address && details) {
      const finalData: PropertyData = {
        type: formData.type,
        address: formData.address,
        ...details,
      };
      onSubmit(finalData);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {step === 1 && (
        <PropertyTypeStep onSelect={handleTypeSelect} />
      )}
      {step === 2 && (
        <CepStep 
          onSubmit={handleCepSubmit}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <AddressStep
          cep={formData.cep}
          onSubmit={handleAddressSubmit}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <DetailsStep
          onSubmit={handleDetailsSubmit}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default PropertyForm;