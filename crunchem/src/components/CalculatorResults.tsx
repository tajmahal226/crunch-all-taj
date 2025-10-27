import React from 'react';
import { TrendingUp, Info, Calculator, Zap, CheckCircle, Star } from 'lucide-react';
import { CalculationOutput } from '../types/calculator';

interface CalculatorResultsProps {
  results: CalculationOutput;
}

const CalculatorResults: React.FC<CalculatorResultsProps> = ({ results }) => {
  const formatResult = (value: number | string, format?: string) => {
    if (typeof value === 'string') return value;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'percentage':
        return `${value.toFixed(2)}%`;
      case 'decimal':
        return value.toFixed(2);
      case 'integer':
        return Math.round(value).toString();
      case 'date':
        return new Date(value).toLocaleDateString();
      default:
        return typeof value === 'number' ? value.toLocaleString() : String(value);
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Results - Premium Card */}
      <div className="relative overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl opacity-20 blur-sm animate-pulse" />
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h5 className="text-xl font-bold text-green-800">Results</h5>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Calculated</span>
            </div>
          </div>
          
          <div className="space-y-5">
            {results.results.map((result, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100 hover:bg-white/80 transition-all duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                  <span className="text-green-800 font-semibold">{result.label}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-900 font-mono">
                    {formatResult(result.value, result.format)}
                    {result.unit && <span className="text-sm font-normal ml-2 text-green-700">{result.unit}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation Section */}
      {results.explanation.length > 0 && (
        <div className="relative overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-sm" />
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Info className="h-5 w-5 text-white" />
              </div>
              <h5 className="text-xl font-bold text-blue-800">Explanation</h5>
            </div>
            <div className="space-y-4">
              {results.explanation.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-blue-800 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step-by-step Calculation */}
      {results.steps.length > 0 && (
        <div className="relative overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 rounded-2xl opacity-20 blur-sm" />
          <div className="relative bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h5 className="text-xl font-bold text-purple-800">Step-by-step Calculation</h5>
            </div>
            <div className="space-y-4">
              {results.steps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 hover:bg-white/80 transition-all duration-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <code className="text-purple-900 font-mono text-sm leading-relaxed block bg-purple-100/50 p-3 rounded-lg">
                      {step}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Premium Success Footer */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl opacity-20 blur-sm" />
        <div className="relative bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              </div>
              <span className="text-sm font-medium text-orange-800">Calculation Complete</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-orange-600 font-medium">Premium Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced JSON Output (Collapsible) */}
      <details className="group relative overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl opacity-10 blur-sm group-open:opacity-20 transition-opacity" />
        <div className="relative bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
          <summary className="text-sm font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors flex items-center space-x-2">
            <div className="p-1 bg-gray-200 rounded-lg">
              <Calculator className="h-3 w-3 text-gray-600" />
            </div>
            <span>View Technical Details</span>
            <div className="ml-auto text-xs text-gray-500">Click to expand</div>
          </summary>
          <div className="mt-6 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-200 to-slate-200 rounded-xl opacity-50 blur-sm" />
            <pre className="relative text-xs text-gray-700 bg-white p-6 rounded-xl border border-gray-200 overflow-x-auto font-mono leading-relaxed shadow-inner">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        </div>
      </details>
    </div>
  );
};

export default CalculatorResults;