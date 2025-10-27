import { Calculator } from '../types/calculator';

// Engineering Calculators (10 total)
export const engineeringCalculators: Calculator[] = [
  {
    id: 'ohms-law-calculator',
    title: "Ohm's Law Calculator",
    description: "Calculate voltage, current, resistance, and power using Ohm's Law.",
    category: 'Engineering',
    inputs: [
      { id: 'known_values', label: 'Known Values', type: 'select', required: true, options: [
        { value: 'voltage_current', label: 'Voltage and Current' },
        { value: 'voltage_resistance', label: 'Voltage and Resistance' },
        { value: 'current_resistance', label: 'Current and Resistance' }
      ]},
      { id: 'voltage', label: 'Voltage (V)', type: 'number', required: false, placeholder: 'Voltage in volts' },
      { id: 'current', label: 'Current (A)', type: 'number', required: false, placeholder: 'Current in amperes' },
      { id: 'resistance', label: 'Resistance (Ω)', type: 'number', required: false, placeholder: 'Resistance in ohms' }
    ],
    formula: "V = IR, P = VI = I²R = V²/R",
    calculate: (inputs) => {
      const knownValues = inputs.known_values;
      const V = parseFloat(inputs.voltage);
      const I = parseFloat(inputs.current);
      const R = parseFloat(inputs.resistance);
      
      switch(knownValues) {
        case 'voltage_current':
          if (!V || !I) throw new Error('Voltage and current are required');
          const resistance = V / I;
          const power = V * I;
          return {
            results: [
              { value: resistance, label: 'Resistance', unit: 'Ω', format: 'decimal' },
              { value: power, label: 'Power', unit: 'W', format: 'decimal' }
            ],
            explanation: [`Calculating resistance and power from V = ${V}V and I = ${I}A`],
            steps: [
              `R = V/I = ${V}/${I} = ${resistance.toFixed(4)} Ω`,
              `P = VI = ${V} × ${I} = ${power.toFixed(4)} W`
            ]
          };
        
        case 'voltage_resistance':
          if (!V || !R) throw new Error('Voltage and resistance are required');
          const current = V / R;
          const powerVR = V * V / R;
          return {
            results: [
              { value: current, label: 'Current', unit: 'A', format: 'decimal' },
              { value: powerVR, label: 'Power', unit: 'W', format: 'decimal' }
            ],
            explanation: [`Calculating current and power from V = ${V}V and R = ${R}Ω`],
            steps: [
              `I = V/R = ${V}/${R} = ${current.toFixed(4)} A`,
              `P = V²/R = ${V}²/${R} = ${powerVR.toFixed(4)} W`
            ]
          };
        
        case 'current_resistance':
          if (!I || !R) throw new Error('Current and resistance are required');
          const voltage = I * R;
          const powerIR = I * I * R;
          return {
            results: [
              { value: voltage, label: 'Voltage', unit: 'V', format: 'decimal' },
              { value: powerIR, label: 'Power', unit: 'W', format: 'decimal' }
            ],
            explanation: [`Calculating voltage and power from I = ${I}A and R = ${R}Ω`],
            steps: [
              `V = IR = ${I} × ${R} = ${voltage.toFixed(4)} V`,
              `P = I²R = ${I}² × ${R} = ${powerIR.toFixed(4)} W`
            ]
          };
        
        default:
          throw new Error('Invalid known values selection');
      }
    },
    tags: ['engineering', 'electrical', 'ohms-law', 'circuits'],
    complexity: 'Intermediate'
  }
];

export default engineeringCalculators;