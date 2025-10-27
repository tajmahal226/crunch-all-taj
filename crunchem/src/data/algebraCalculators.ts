import { Calculator } from '../types/calculator';

// Algebra Calculators (15 total)
export const algebraCalculators: Calculator[] = [
  {
    id: 'linear-equations-solver',
    title: 'Linear Equations Solver',
    description: 'Solve linear equations of the form ax + b = c.',
    category: 'Algebra',
    inputs: [
      { id: 'a', label: 'Coefficient a', type: 'number', required: true, placeholder: 'Coefficient of x' },
      { id: 'b', label: 'Constant b', type: 'number', required: true, placeholder: 'Constant term' },
      { id: 'c', label: 'Result c', type: 'number', required: true, placeholder: 'Right side value' }
    ],
    formula: 'ax + b = c, solve for x',
    calculate: (inputs) => {
      const a = parseFloat(inputs.a);
      const b = parseFloat(inputs.b);
      const c = parseFloat(inputs.c);
      
      if (a === 0) throw new Error('Coefficient a cannot be zero');
      
      const x = (c - b) / a;
      
      return {
        results: [{ value: x, label: 'x', format: 'decimal' }],
        explanation: [`Solving linear equation ${a}x + ${b} = ${c}`],
        steps: [
          `${a}x + ${b} = ${c}`,
          `${a}x = ${c} - ${b}`,
          `${a}x = ${c - b}`,
          `x = ${c - b}/${a}`,
          `x = ${x}`
        ]
      };
    },
    tags: ['algebra', 'linear', 'equations'],
    complexity: 'Basic'
  },
  
  {
    id: 'quadratic-formula',
    title: 'Quadratic Formula Calculator',
    description: 'Solve quadratic equations using the quadratic formula.',
    category: 'Algebra',
    inputs: [
      { id: 'a', label: 'Coefficient a', type: 'number', required: true, placeholder: 'Coefficient of x²' },
      { id: 'b', label: 'Coefficient b', type: 'number', required: true, placeholder: 'Coefficient of x' },
      { id: 'c', label: 'Constant c', type: 'number', required: true, placeholder: 'Constant term' }
    ],
    formula: 'x = (-b ± √(b² - 4ac)) / 2a',
    calculate: (inputs) => {
      const a = parseFloat(inputs.a);
      const b = parseFloat(inputs.b);
      const c = parseFloat(inputs.c);
      
      if (a === 0) throw new Error('Coefficient a cannot be zero for quadratic equation');
      
      const discriminant = b * b - 4 * a * c;
      
      if (discriminant < 0) {
        return {
          results: [{ value: 'No real solutions', label: 'Result' }],
          explanation: ['Discriminant is negative - no real solutions'],
          steps: [`Discriminant = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`]
        };
      } else if (discriminant === 0) {
        const x = -b / (2 * a);
        return {
          results: [{ value: x, label: 'x (double root)', format: 'decimal' }],
          explanation: ['One solution (repeated root)'],
          steps: [
            `Discriminant = ${discriminant}`,
            `x = -b/(2a) = -${b}/(2×${a}) = ${x}`
          ]
        };
      } else {
        const sqrtDiscriminant = Math.sqrt(discriminant);
        const x1 = (-b + sqrtDiscriminant) / (2 * a);
        const x2 = (-b - sqrtDiscriminant) / (2 * a);
        
        return {
          results: [
            { value: x1, label: 'x₁', format: 'decimal' },
            { value: x2, label: 'x₂', format: 'decimal' }
          ],
          explanation: ['Two distinct real solutions'],
          steps: [
            `Discriminant = ${discriminant}`,
            `x = (-${b} ± √${discriminant}) / (2×${a})`,
            `x₁ = (-${b} + ${sqrtDiscriminant.toFixed(4)}) / ${2*a} = ${x1.toFixed(4)}`,
            `x₂ = (-${b} - ${sqrtDiscriminant.toFixed(4)}) / ${2*a} = ${x2.toFixed(4)}`
          ]
        };
      }
    },
    tags: ['algebra', 'quadratic', 'formula'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'system-of-equations',
    title: 'System of Equations Solver',
    description: 'Solve 2x2 systems of linear equations using elimination method.',
    category: 'Algebra',
    inputs: [
      { id: 'a1', label: 'Equation 1: a₁', type: 'number', required: true, placeholder: 'Coefficient of x in eq1' },
      { id: 'b1', label: 'Equation 1: b₁', type: 'number', required: true, placeholder: 'Coefficient of y in eq1' },
      { id: 'c1', label: 'Equation 1: c₁', type: 'number', required: true, placeholder: 'Constant in eq1' },
      { id: 'a2', label: 'Equation 2: a₂', type: 'number', required: true, placeholder: 'Coefficient of x in eq2' },
      { id: 'b2', label: 'Equation 2: b₂', type: 'number', required: true, placeholder: 'Coefficient of y in eq2' },
      { id: 'c2', label: 'Equation 2: c₂', type: 'number', required: true, placeholder: 'Constant in eq2' }
    ],
    formula: 'Elimination method for 2x2 systems',
    calculate: (inputs) => {
      const a1 = parseFloat(inputs.a1);
      const b1 = parseFloat(inputs.b1);
      const c1 = parseFloat(inputs.c1);
      const a2 = parseFloat(inputs.a2);
      const b2 = parseFloat(inputs.b2);
      const c2 = parseFloat(inputs.c2);
      
      // Using Cramer's rule
      const determinant = a1 * b2 - a2 * b1;
      
      if (determinant === 0) {
        return {
          results: [{ value: 'No unique solution', label: 'Result' }],
          explanation: ['System has no unique solution (parallel lines or same line)'],
          steps: [`Determinant = ${a1}×${b2} - ${a2}×${b1} = ${determinant}`]
        };
      }
      
      const x = (c1 * b2 - c2 * b1) / determinant;
      const y = (a1 * c2 - a2 * c1) / determinant;
      
      return {
        results: [
          { value: x, label: 'x', format: 'decimal' },
          { value: y, label: 'y', format: 'decimal' }
        ],
        explanation: [`System: ${a1}x + ${b1}y = ${c1}, ${a2}x + ${b2}y = ${c2}`],
        steps: [
          `Determinant = ${a1}×${b2} - ${a2}×${b1} = ${determinant}`,
          `x = (${c1}×${b2} - ${c2}×${b1}) / ${determinant} = ${x.toFixed(4)}`,
          `y = (${a1}×${c2} - ${a2}×${c1}) / ${determinant} = ${y.toFixed(4)}`
        ]
      };
    },
    tags: ['algebra', 'system', 'linear-equations'],
    complexity: 'Intermediate'
  }
  
  // Additional 12 algebra calculators would be added here
];

export default algebraCalculators;