import React from 'react';
import { CheckCircle } from 'lucide-react';

interface BrokerageStatusStepperProps {
  currentStep: 1 | 2 | 3 | 4 | 5;
}

const steps = [
  { label: 'Corretaje solicitado' },
  { label: 'Propiedad publicada' },
  { label: 'En creación de contrato' },
  { label: 'Propiedad entregada' }
];

const BrokerageStatusStepper: React.FC<BrokerageStatusStepperProps> = ({ currentStep }) => {
  const progressWidth = { 1: '10%', 2: '37%', 3: '60%', 4: '87%', 5: '100%' }[currentStep];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-6">Estado del Corretaje</h2>

      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 z-0"></div>
        <div className="absolute top-4 left-4 h-0.5 bg-primary z-10 transition-all duration-500"style={{ width: progressWidth }}></div>

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={step.label} className="flex-1 flex flex-col items-center relative z-20">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted || (isActive && currentStep === 2)
                    ? 'bg-primary text-white border-primary'
                    : isActive
                    ? 'bg-white text-primary border-primary'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
              >
                {isCompleted || (isActive && currentStep === 2) ? (<CheckCircle className="w-5 h-5" />) : (stepNumber)}
              </div>
              <p className="text-xs mt-2 text-center text-gray-700">{step.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrokerageStatusStepper;
