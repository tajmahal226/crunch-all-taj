import { Calculator } from '../types/calculator';

// Conversion Calculators (2 total)
export const conversionCalculators: Calculator[] = [
  {
    id: 'length-converter',
    title: 'Length Converter',
    description: 'Convert between different units of length.',
    category: 'Conversion',
    inputs: [
      { id: 'value', label: 'Value', type: 'number', required: true, placeholder: 'Enter value to convert' },
      { id: 'from_unit', label: 'From', type: 'select', required: true, options: [
        { value: 'meter', label: 'Meters (m)' },
        { value: 'kilometer', label: 'Kilometers (km)' },
        { value: 'centimeter', label: 'Centimeters (cm)' },
        { value: 'millimeter', label: 'Millimeters (mm)' },
        { value: 'inch', label: 'Inches (in)' },
        { value: 'foot', label: 'Feet (ft)' },
        { value: 'yard', label: 'Yards (yd)' },
        { value: 'mile', label: 'Miles (mi)' }
      ]},
      { id: 'to_unit', label: 'To', type: 'select', required: true, options: [
        { value: 'meter', label: 'Meters (m)' },
        { value: 'kilometer', label: 'Kilometers (km)' },
        { value: 'centimeter', label: 'Centimeters (cm)' },
        { value: 'millimeter', label: 'Millimeters (mm)' },
        { value: 'inch', label: 'Inches (in)' },
        { value: 'foot', label: 'Feet (ft)' },
        { value: 'yard', label: 'Yards (yd)' },
        { value: 'mile', label: 'Miles (mi)' }
      ]}
    ],
    formula: 'Unit conversion using conversion factors',
    calculate: (inputs) => {
      const value = parseFloat(inputs.value);
      const fromUnit = inputs.from_unit;
      const toUnit = inputs.to_unit;
      
      if (!value) throw new Error('Please enter a value to convert');
      
      // Conversion factors to meters
      const toMeters = {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344
      };
      
      // Convert to meters first, then to target unit
      const valueInMeters = value * toMeters[fromUnit];
      const result = valueInMeters / toMeters[toUnit];
      
      const getUnitLabel = (unit) => {
        const labels = {
          meter: 'm', kilometer: 'km', centimeter: 'cm', millimeter: 'mm',
          inch: 'in', foot: 'ft', yard: 'yd', mile: 'mi'
        };
        return labels[unit];
      };
      
      return {
        results: [{ value: result, label: `Result`, unit: getUnitLabel(toUnit), format: 'decimal' }],
        explanation: [`Converting ${value} ${getUnitLabel(fromUnit)} to ${getUnitLabel(toUnit)}`],
        steps: [
          `${value} ${getUnitLabel(fromUnit)} = ${valueInMeters} m`,
          `${valueInMeters} m = ${result.toFixed(6)} ${getUnitLabel(toUnit)}`
        ]
      };
    },
    tags: ['conversion', 'length', 'units'],
    complexity: 'Basic'
  },
  
  {
    id: 'temperature-converter',
    title: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin.',
    category: 'Conversion',
    inputs: [
      { id: 'temperature', label: 'Temperature', type: 'number', required: true, placeholder: 'Enter temperature' },
      { id: 'from_scale', label: 'From', type: 'select', required: true, options: [
        { value: 'celsius', label: 'Celsius (°C)' },
        { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
        { value: 'kelvin', label: 'Kelvin (K)' }
      ]},
      { id: 'to_scale', label: 'To', type: 'select', required: true, options: [
        { value: 'celsius', label: 'Celsius (°C)' },
        { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
        { value: 'kelvin', label: 'Kelvin (K)' }
      ]}
    ],
    formula: 'Temperature conversion formulas',
    calculate: (inputs) => {
      const temp = parseFloat(inputs.temperature);
      const fromScale = inputs.from_scale;
      const toScale = inputs.to_scale;
      
      if (temp === undefined) throw new Error('Please enter a temperature');
      
      let result;
      let formula;
      
      // Convert to Celsius first
      let celsius;
      switch(fromScale) {
        case 'celsius':
          celsius = temp;
          break;
        case 'fahrenheit':
          celsius = (temp - 32) * 5/9;
          break;
        case 'kelvin':
          celsius = temp - 273.15;
          break;
      }
      
      // Convert from Celsius to target scale
      switch(toScale) {
        case 'celsius':
          result = celsius;
          formula = fromScale === 'celsius' ? 'Same scale' : 
                   fromScale === 'fahrenheit' ? 'C = (F - 32) × 5/9' : 'C = K - 273.15';
          break;
        case 'fahrenheit':
          result = celsius * 9/5 + 32;
          formula = 'F = C × 9/5 + 32';
          break;
        case 'kelvin':
          result = celsius + 273.15;
          formula = 'K = C + 273.15';
          break;
      }
      
      const getUnit = (scale) => {
        return scale === 'celsius' ? '°C' : scale === 'fahrenheit' ? '°F' : 'K';
      };
      
      return {
        results: [{ value: result, label: 'Result', unit: getUnit(toScale), format: 'decimal' }],
        explanation: [`Converting ${temp}${getUnit(fromScale)} to ${getUnit(toScale)}`],
        steps: [
          `Formula: ${formula}`,
          `Result: ${result.toFixed(2)}${getUnit(toScale)}`
        ]
      };
    },
    tags: ['conversion', 'temperature', 'celsius', 'fahrenheit', 'kelvin'],
    complexity: 'Basic'
  }
  
  // Additional 13 conversion calculators would be added here
];

export default conversionCalculators;