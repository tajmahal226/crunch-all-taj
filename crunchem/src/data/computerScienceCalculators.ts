import { Calculator } from '../types/calculator';

// Computer Science Calculators (10 total)
export const computerScienceCalculators: Calculator[] = [
  {
    id: 'binary-calculator',
    title: 'Binary Calculator',
    description: 'Convert between decimal, binary, octal, and hexadecimal number systems.',
    category: 'Computer Science',
    inputs: [
      { id: 'number', label: 'Number', type: 'text', required: true, placeholder: 'Enter number to convert' },
      { id: 'from_base', label: 'From Base', type: 'select', required: true, options: [
        { value: '10', label: 'Decimal (Base 10)' },
        { value: '2', label: 'Binary (Base 2)' },
        { value: '8', label: 'Octal (Base 8)' },
        { value: '16', label: 'Hexadecimal (Base 16)' }
      ]},
      { id: 'to_base', label: 'To Base', type: 'select', required: true, options: [
        { value: '10', label: 'Decimal (Base 10)' },
        { value: '2', label: 'Binary (Base 2)' },
        { value: '8', label: 'Octal (Base 8)' },
        { value: '16', label: 'Hexadecimal (Base 16)' }
      ]}
    ],
    formula: 'Number base conversion',
    calculate: (inputs) => {
      const number = inputs.number.trim();
      const fromBase = parseInt(inputs.from_base);
      const toBase = parseInt(inputs.to_base);
      
      if (!number) throw new Error('Please enter a number');
      
      try {
        const decimal = parseInt(number, fromBase);
        if (isNaN(decimal)) throw new Error('Invalid number for the specified base');
        
        const result = decimal.toString(toBase).toUpperCase();
        
        return {
          results: [{ value: result, label: `Result` }],
          explanation: [`Converting ${number} from base ${fromBase} to base ${toBase}`],
          steps: [`${number} (base ${fromBase}) = ${decimal} (decimal) = ${result} (base ${toBase})`]
        };
      } catch (error) {
        throw new Error('Invalid number for the specified base');
      }
    },
    tags: ['computer-science', 'binary', 'conversion'],
    complexity: 'Intermediate'
  }
];

export default computerScienceCalculators;