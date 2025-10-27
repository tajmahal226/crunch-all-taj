import React from 'react';
import { Calculator as CalculatorIcon, Zap } from 'lucide-react';
import { Calculator } from '../types/calculator';

interface CalculatorCardProps {
  calculator: Calculator;
  onClick: () => void;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator, onClick }) => {
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'Finance':
        return 'from-blue-600 to-blue-700';
      case 'Health & Fitness':
        return 'from-emerald-600 to-emerald-700';
      case 'Business & Freelance':
        return 'from-purple-600 to-purple-700';
      case 'Everyday Life':
        return 'from-orange-600 to-orange-700';
      default:
        return 'from-blue-600 to-blue-700';
    }
  };

  const categoryGradient = getCategoryGradient(calculator.category);

  return (
    <div className="professional-calculator-card gpu-accelerated will-change-transform group calculator-card touch-feedback">
      <div className="relative z-10 h-full flex flex-col">
        {/* Icon Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${categoryGradient} shadow-lg transform group-hover:scale-110 transition-transform duration-200`}>
            <CalculatorIcon className="h-6 w-6 text-white" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
          </div>
        </div>
        
        {/* Content */}
        <div className="mb-6 flex-grow">
          <h4 className="card-heading mb-3 group-hover:text-blue-600 transition-colors duration-200">
            {calculator.title}
          </h4>
          <p className="card-description line-clamp-4">
            {calculator.description}
          </p>
        </div>
        
        {/* Category Badge */}
        <div className="mb-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryGradient} text-white shadow-sm`}>
            {calculator.category}
          </span>
        </div>
        
        {/* Action Button - Always at bottom */}
        <button 
          className="professional-card-button w-full mt-auto touch-friendly"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <span className="flex items-center justify-center">
            <CalculatorIcon className="h-4 w-4 mr-2" />
            Calculate Now
          </span>
        </button>
      </div>
    </div>
  );
};

export default CalculatorCard;