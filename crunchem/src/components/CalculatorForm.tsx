import React from 'react';
import { CalculatorInput } from '../types/calculator';
import { AlertCircle } from 'lucide-react';

interface CalculatorFormProps {
  inputs: CalculatorInput[];
  values: Record<string, any>;
  errors: Record<string, string>;
  onChange: (inputId: string, value: any) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ inputs, values, errors, onChange }) => {
  const formatValue = (value: any, type: string) => {
    if (type === 'number' && value === 0) return '';
    return value;
  };

  return (
    <div className="space-y-6">
      {inputs.map((input, index) => (
        <div key={input.id} className="relative form-group">
          <label className="block text-base font-semibold text-gray-700 mb-3 form-label">
            {input.label}
            {input.required && <span className="text-red-500 ml-1">*</span>}
            {input.unit && (
              <span className="inline-block ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {input.unit}
              </span>
            )}
          </label>
          
          {input.type === 'select' ? (
            <div className="relative">
              <select
                value={values[input.id] || ''}
                onChange={(e) => onChange(input.id, e.target.value)}
                className={`premium-input appearance-none cursor-pointer no-zoom touch-friendly ${errors[input.id] ? 'border-red-300 focus:border-red-500' : ''}`}
              >
                <option value="">{input.placeholder || `Select ${input.label}`}</option>
                {input.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ) : input.type === 'date' ? (
            <input
              type="date"
              value={values[input.id] || ''}
              onChange={(e) => onChange(input.id, e.target.value)}
              className={`premium-input no-zoom touch-friendly ${errors[input.id] ? 'border-red-300 focus:border-red-500' : ''}`}
            />
          ) : (
            <div className="relative">
              <input
                type={input.type}
                value={formatValue(values[input.id], input.type)}
                onChange={(e) => {
                  const value = input.type === 'number' ? Number(e.target.value) || 0 : e.target.value;
                  onChange(input.id, value);
                }}
                placeholder={input.placeholder}
                min={input.min}
                max={input.max}
                step={input.step}
                className={`premium-input font-mono no-zoom touch-friendly ${errors[input.id] ? 'border-red-300 focus:border-red-500' : ''} ${input.type === 'number' ? 'text-right' : ''}`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              
              {/* Input Success Indicator */}
              {values[input.id] && !errors[input.id] && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          )}
          
          {/* Enhanced Error Display */}
          {errors[input.id] && (
            <div className="flex items-center mt-2 text-red-600">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-sm font-medium">{errors[input.id]}</p>
            </div>
          )}
          
          {/* Input Helper Text */}
          {!errors[input.id] && input.min !== undefined && input.max !== undefined && (
            <p className="text-xs text-gray-500 mt-1">
              Range: {input.min} to {input.max}
            </p>
          )}
          
          {/* Loading Animation for Input */}
          <div 
            className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ 
              width: values[input.id] && !errors[input.id] ? '100%' : '0%',
              borderRadius: '2px'
            }}
          />
        </div>
      ))}
      
      {/* Form Summary */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">
            Form Progress:
          </span>
          <span className="font-bold text-blue-600">
            {Object.values(values).filter(v => v !== '' && v !== 0).length} / {inputs.length} fields
          </span>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(Object.values(values).filter(v => v !== '' && v !== 0).length / inputs.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;