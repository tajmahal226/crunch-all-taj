export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'date' | 'range';
  placeholder?: string;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  unit?: string;
  defaultValue?: any;
}

export interface CalculatorResult {
  value: number | string;
  label: string;
  unit?: string;
  format?: 'currency' | 'percentage' | 'decimal' | 'integer' | 'date';
}

export type CalculatorCategory = 
  | 'Mathematics'
  | 'Physics'
  | 'Chemistry'
  | 'Algebra'
  | 'Geometry'
  | 'Trigonometry'
  | 'Calculus'
  | 'Statistics'
  | 'Finance'
  | 'Conversion'
  | 'Engineering'
  | 'Computer Science'
  | 'Health/Fitness'
  | 'Cooking'
  | 'Sports'
  | 'Daily Life';

export interface Calculator {
  id: string;
  title: string;
  description: string;
  category: CalculatorCategory;
  inputs: CalculatorInput[];
  formula: string;
  calculate: (inputs: Record<string, any>) => {
    results: CalculatorResult[];
    explanation: string[];
    steps: string[];
  };
  tags?: string[];
  complexity?: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface CalculationOutput {
  results: CalculatorResult[];
  explanation: string[];
  steps: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ConversationHistory {
  role: 'user' | 'assistant';
  content: string;
}