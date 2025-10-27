import React, { useState, useEffect, useCallback } from 'react';
import { X, Calculator, Star, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Calculator as CalculatorType, CalculatorResult } from '../types/calculator';

interface CalculatorModalProps {
  calculator: CalculatorType;
  onClose: () => void;
}

const CalculatorModal: React.FC<CalculatorModalProps> = ({ calculator, onClose }) => {
  const { toggleFavorite, isFavorite } = useApp();
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [results, setResults] = useState<CalculatorResult[]>([]);
  const [explanation, setExplanation] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);

  // Handle escape key and prevent body scroll
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Cleanup
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [handleEscapeKey]);

  // Enhanced close handler with event prevention
  const handleClose = useCallback((event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    onClose();
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose(event);
    }
  }, [handleClose]);

  const handleInputChange = (inputId: string, value: any) => {
    setInputs(prev => ({ ...prev, [inputId]: value }));
    setError(''); // Clear error when user changes inputs
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setError('');

    try {
      // Validate required inputs while respecting falsy-but-valid values (like 0)
      const missingInputs = calculator.inputs
        .filter(input => {
          if (!input.required) return false;

          const hasUserValue = Object.prototype.hasOwnProperty.call(inputs, input.id);
          const value = hasUserValue ? inputs[input.id] : input.defaultValue;

          if (value === undefined || value === null) {
            return true;
          }

          if (typeof value === 'string') {
            return value.trim() === '';
          }

          return false;
        })
        .map(input => input.label);

      if (missingInputs.length > 0) {
        throw new Error(`Please fill in: ${missingInputs.join(', ')}`);
      }

      // Merge provided inputs with defaults for calculation
      const calculationInputs = calculator.inputs.reduce<Record<string, any>>((acc, input) => {
        const hasUserValue = Object.prototype.hasOwnProperty.call(inputs, input.id);
        const value = hasUserValue ? inputs[input.id] : input.defaultValue;

        if (value !== undefined) {
          acc[input.id] = value;
        }

        return acc;
      }, {});

      // Perform calculation
      const result = calculator.calculate(calculationInputs);
      setResults(result.results);
      setExplanation(result.explanation);
      setSteps(result.steps);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed');
      setResults([]);
      setExplanation([]);
      setSteps([]);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setInputs({});
    setResults([]);
    setExplanation([]);
    setSteps([]);
    setError('');
  };

  const formatValue = (result: CalculatorResult): string => {
    if (typeof result.value === 'string') return result.value;
    
    const numValue = typeof result.value === 'number' ? result.value : 0;
    
    switch (result.format) {
      case 'currency':
        return `$${numValue.toFixed(2)}`;
      case 'percentage':
        return `${numValue.toFixed(2)}%`;
      case 'integer':
        return Math.round(numValue).toString();
      case 'decimal':
        return numValue.toFixed(4).replace(/\.?0+$/, '');
      default:
        return numValue.toString();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleBackdropClick} />
        
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full modal-content">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {calculator.title}
                  </h3>
                  <p className="text-blue-100 text-sm">
                    {calculator.category} • {calculator.complexity || 'Intermediate'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleFavorite(calculator.id)}
                  className={`p-2 rounded-lg transition-colors touch-friendly ${
                    isFavorite(calculator.id)
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                  }`}
                  title={isFavorite(calculator.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Star className={`h-5 w-5 ${isFavorite(calculator.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleClose}
                  className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 p-2 rounded-lg transition-colors touch-friendly"
                  title="Close (Esc)"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column - Inputs */}
              <div>
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {calculator.description}
                  </p>
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-200">Formula:</span>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-300 mt-1 font-mono">
                      {calculator.formula}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Inputs</h4>
                  
                  {calculator.inputs.map((input) => {
                    const inputValue = inputs[input.id] ?? input.defaultValue ?? '';
                    
                    return (
                      <div key={input.id}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {input.label}
                          {input.required && <span className="text-red-500 ml-1">*</span>}
                          {input.unit && <span className="text-gray-500 ml-1">({input.unit})</span>}
                        </label>
                        
                        {input.type === 'select' ? (
                          <select
                            value={inputValue}
                            onChange={(e) => handleInputChange(input.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white no-zoom touch-friendly"
                          >
                            <option value="">{input.placeholder || 'Select option'}</option>
                            {input.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : input.type === 'range' ? (
                          <div>
                            <input
                              type="range"
                              min={input.min}
                              max={input.max}
                              step={input.step || 1}
                              value={inputValue}
                              onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value))}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <span>{input.min}</span>
                              <span className="font-medium text-blue-600 dark:text-blue-400">{inputValue}</span>
                              <span>{input.max}</span>
                            </div>
                          </div>
                        ) : (
                          <input
                            type={input.type}
                            value={inputValue}
                            onChange={(e) => handleInputChange(input.id, e.target.value)}
                            placeholder={input.placeholder}
                            min={input.min}
                            max={input.max}
                            step={input.step}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 no-zoom touch-friendly"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                          />
                        )}
                      </div>
                    );
                  })}
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleCalculate}
                      disabled={isCalculating}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 touch-friendly"
                    >
                      <Calculator className="h-4 w-4" />
                      <span>{isCalculating ? 'Calculating...' : 'Calculate'}</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200 touch-friendly"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Results */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Results</h4>
                
                {error && (
                  <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="font-medium text-red-800 dark:text-red-200">Error</span>
                    </div>
                    <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
                  </div>
                )}
                
                {results.length > 0 && (
                  <div className="space-y-6">
                    {/* Results */}
                    <div className="space-y-3">
                      {results.map((result, index) => (
                        <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-green-800 dark:text-green-200">
                              {result.label}
                            </span>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              <span className="text-2xl font-bold text-green-900 dark:text-green-100">
                                {formatValue(result)}
                                {result.unit && <span className="text-sm ml-1 font-normal">{result.unit}</span>}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Explanation */}
                    {explanation.length > 0 && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <h5 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Explanation</h5>
                        <div className="space-y-1">
                          {explanation.map((exp, index) => (
                            <p key={index} className="text-blue-800 dark:text-blue-300 text-sm">
                              {exp}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Steps */}
                    {steps.length > 0 && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Step-by-Step Solution</h5>
                        <div className="space-y-2">
                          {steps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-medium rounded-full flex items-center justify-center">
                                {index + 1}
                              </span>
                              <p className="text-gray-700 dark:text-gray-300 text-sm font-mono">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {results.length === 0 && !error && (
                  <div className="text-center py-12">
                    <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Enter your values and click Calculate to see results
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorModal;