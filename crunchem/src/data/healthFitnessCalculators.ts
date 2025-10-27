import { Calculator } from '../types/calculator';

// Health/Fitness Calculators (1 total)
export const healthFitnessCalculators: Calculator[] = [
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Calculate Body Mass Index and determine weight status.',
    category: 'Health/Fitness',
    inputs: [
      { id: 'weight', label: 'Weight', type: 'number', required: true, placeholder: 'Your weight' },
      { id: 'height', label: 'Height', type: 'number', required: true, placeholder: 'Your height' },
      { id: 'unit_system', label: 'Unit System', type: 'select', required: true, options: [
        { value: 'metric', label: 'Metric (kg, cm)' },
        { value: 'imperial', label: 'Imperial (lbs, inches)' }
      ]}
    ],
    formula: 'BMI = weight / height²',
    calculate: (inputs) => {
      let weight = parseFloat(inputs.weight);
      let height = parseFloat(inputs.height);
      const unitSystem = inputs.unit_system;
      
      if (!weight || !height) throw new Error('Weight and height are required');
      
      if (unitSystem === 'imperial') {
        weight = weight * 0.453592;
        height = height * 2.54;
      }
      
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      
      let category;
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      return {
        results: [
          { value: bmi, label: 'BMI', format: 'decimal' },
          { value: category, label: 'Category' }
        ],
        explanation: [`BMI: ${bmi.toFixed(1)}, Category: ${category}`],
        steps: [`BMI = ${weight.toFixed(1)} / (${heightInMeters.toFixed(2)})² = ${bmi.toFixed(1)}`]
      };
    },
    tags: ['health', 'fitness', 'bmi'],
    complexity: 'Basic'
  }
];

export default healthFitnessCalculators;