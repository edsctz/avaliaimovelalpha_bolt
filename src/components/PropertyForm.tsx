import React, { useState } from 'react';
import { PropertyData, FormState, PropertyType, Address, PropertyDetails } from '../types';
import PropertyTypeStep from './PropertyForm/PropertyTypeStep';
import CepStep from './PropertyForm/CepStep';
import AddressStep from './PropertyForm/AddressStep';
import DetailsStep from './PropertyForm/DetailsStep';

interface PropertyFormProps {
  onSubmit: (data: PropertyData) => void;
}

const initialState: FormState = {
  step: 1,
  type: null,
  cep: '',
  address: null,
  details: null,
};

const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit }) => {
  const [formState, setFormState] = useState<FormState>(initialState);

  const handleTypeSelect = (type: PropertyType) => {
    setFormState({ ...initialState, step: 2, type });
  };

  const handleCepSubmit = (cep: string) => {
    setFormState(prev => ({ ...prev, step: 3, cep }));
  };

  const handleAddressSubmit = (address: Address) => {
    setFormState(prev => ({ ...prev, step: 4, address }));
  };

  const handleDetailsSubmit = (details: PropertyDetails) => {
    if (formState.type && formState.address) {
      onSubmit({
        type: formState.type,
        address: formState.address,
        ...details,
      });
    }
  };

  const handleBack = () => {
    setFormState(prev => ({ ...prev, step: prev.step - 1 }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {formState.step === 1 && (
        <PropertyTypeStep onSelect={handleTypeSelect} />
      )}
      {formState.step === 2 && (
        <CepStep 
          onSubmit={handleCepSubmit}
          onBack={handleBack}
        />
      )}
      {formState.step === 3 && (
        <AddressStep
          cep={formState.cep}
          onSubmit={handleAddressSubmit}
          onBack={handleBack}
        />
      )}
      {formState.step === 4 && (
        <DetailsStep
          onSubmit={handleDetailsSubmit}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default PropertyForm;