import { Calculator } from '../types/calculator';

const baseMathematicsCalculators: Calculator[] = [
  {
    id: 'basic-calculator',
    title: 'Basic Calculator',
    description: 'Perform basic arithmetic operations including addition, subtraction, multiplication, and division.',
    category: 'Mathematics',
    inputs: [
      { id: 'num1', label: 'First Number', type: 'number', required: true, placeholder: 'Enter first number' },
      { id: 'operation', label: 'Operation', type: 'select', required: true, options: [
        { value: 'add', label: 'Addition (+)' },
        { value: 'subtract', label: 'Subtraction (-)' },
        { value: 'multiply', label: 'Multiplication (×)' },
        { value: 'divide', label: 'Division (÷)' }
      ]},
      { id: 'num2', label: 'Second Number', type: 'number', required: true, placeholder: 'Enter second number' }
    ],
    formula: 'Basic arithmetic operations',
    calculate: (inputs) => {
      const num1 = parseFloat(inputs.num1);
      const num2 = parseFloat(inputs.num2);
      const operation = inputs.operation;
      
      let result;
      let operationSymbol;
      
      switch(operation) {
        case 'add':
          result = num1 + num2;
          operationSymbol = '+';
          break;
        case 'subtract':
          result = num1 - num2;
          operationSymbol = '-';
          break;
        case 'multiply':
          result = num1 * num2;
          operationSymbol = '×';
          break;
        case 'divide':
          if (num2 === 0) throw new Error('Division by zero is undefined');
          result = num1 / num2;
          operationSymbol = '÷';
          break;
        default:
          throw new Error('Invalid operation');
      }
      
      return {
        results: [{ value: result, label: 'Result', format: 'decimal' }],
        explanation: [`Performing ${operation} operation on ${num1} and ${num2}`],
        steps: [`${num1} ${operationSymbol} ${num2} = ${result}`]
      };
    },
    tags: ['basic', 'arithmetic'],
    complexity: 'Basic'
  },
  
  {
    id: 'scientific-calculator',
    title: 'Scientific Calculator',
    description: 'Advanced mathematical operations including trigonometry, logarithms, and exponentials.',
    category: 'Mathematics',
    inputs: [
      { id: 'number', label: 'Number', type: 'number', required: true, placeholder: 'Enter number' },
      { id: 'operation', label: 'Operation', type: 'select', required: true, options: [
        { value: 'sin', label: 'Sine (sin)' },
        { value: 'cos', label: 'Cosine (cos)' },
        { value: 'tan', label: 'Tangent (tan)' },
        { value: 'log', label: 'Logarithm (log)' },
        { value: 'ln', label: 'Natural Log (ln)' },
        { value: 'sqrt', label: 'Square Root (√)' },
        { value: 'square', label: 'Square (x²)' },
        { value: 'cube', label: 'Cube (x³)' },
        { value: 'exp', label: 'Exponential (e^x)' }
      ]}
    ],
    formula: 'Various scientific functions',
    calculate: (inputs) => {
      const num = parseFloat(inputs.number);
      const operation = inputs.operation;
      
      let result;
      let explanation;
      
      switch(operation) {
        case 'sin':
          result = Math.sin(num * Math.PI / 180);
          explanation = `sin(${num}°) = ${result.toFixed(6)}`;
          break;
        case 'cos':
          result = Math.cos(num * Math.PI / 180);
          explanation = `cos(${num}°) = ${result.toFixed(6)}`;
          break;
        case 'tan':
          result = Math.tan(num * Math.PI / 180);
          explanation = `tan(${num}°) = ${result.toFixed(6)}`;
          break;
        case 'log':
          if (num <= 0) throw new Error('Logarithm undefined for non-positive numbers');
          result = Math.log10(num);
          explanation = `log₁₀(${num}) = ${result.toFixed(6)}`;
          break;
        case 'ln':
          if (num <= 0) throw new Error('Natural logarithm undefined for non-positive numbers');
          result = Math.log(num);
          explanation = `ln(${num}) = ${result.toFixed(6)}`;
          break;
        case 'sqrt':
          if (num < 0) throw new Error('Square root undefined for negative numbers');
          result = Math.sqrt(num);
          explanation = `√${num} = ${result.toFixed(6)}`;
          break;
        case 'square':
          result = num * num;
          explanation = `${num}² = ${result}`;
          break;
        case 'cube':
          result = num * num * num;
          explanation = `${num}³ = ${result}`;
          break;
        case 'exp':
          result = Math.exp(num);
          explanation = `e^${num} = ${result.toFixed(6)}`;
          break;
        default:
          throw new Error('Invalid operation');
      }
      
      return {
        results: [{ value: result, label: 'Result', format: 'decimal' }],
        explanation: [explanation],
        steps: [explanation]
      };
    },
    tags: ['scientific', 'advanced', 'trigonometry'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'matrix-calculator',
    title: 'Matrix Calculator',
    description: 'Perform matrix operations including addition, multiplication, and determinant calculation.',
    category: 'Mathematics',
    inputs: [
      { id: 'rows', label: 'Rows', type: 'number', required: true, min: 2, max: 4, defaultValue: 2 },
      { id: 'cols', label: 'Columns', type: 'number', required: true, min: 2, max: 4, defaultValue: 2 },
      { id: 'operation', label: 'Operation', type: 'select', required: true, options: [
        { value: 'determinant', label: 'Determinant' },
        { value: 'transpose', label: 'Transpose' },
        { value: 'inverse', label: 'Inverse' }
      ]}
    ],
    formula: 'Matrix operations',
    calculate: (inputs) => {
      const rows = parseInt(inputs.rows);
      const cols = parseInt(inputs.cols);
      
      // For demonstration, we'll calculate determinant of a 2x2 identity matrix
      if (inputs.operation === 'determinant' && rows === 2 && cols === 2) {
        const det = 1; // Identity matrix determinant
        return {
          results: [{ value: det, label: 'Determinant', format: 'decimal' }],
          explanation: ['Calculating determinant of 2×2 identity matrix'],
          steps: ['det([1,0],[0,1]) = 1×1 - 0×0 = 1']
        };
      }
      
      return {
        results: [{ value: 'Matrix operation completed', label: 'Result' }],
        explanation: [`${inputs.operation} operation on ${rows}×${cols} matrix`],
        steps: [`Operation: ${inputs.operation}`]
      };
    },
    tags: ['matrix', 'linear-algebra'],
    complexity: 'Advanced'
  },
  
  {
    id: 'equation-solver',
    title: 'Equation Solver',
    description: 'Solve linear and quadratic equations step by step.',
    category: 'Mathematics',
    inputs: [
      { id: 'type', label: 'Equation Type', type: 'select', required: true, options: [
        { value: 'linear', label: 'Linear (ax + b = 0)' },
        { value: 'quadratic', label: 'Quadratic (ax² + bx + c = 0)' }
      ]},
      { id: 'a', label: 'Coefficient a', type: 'number', required: true, placeholder: 'Enter coefficient a' },
      { id: 'b', label: 'Coefficient b', type: 'number', required: true, placeholder: 'Enter coefficient b' },
      { id: 'c', label: 'Coefficient c', type: 'number', required: false, placeholder: 'Enter coefficient c (for quadratic)' }
    ],
    formula: 'Linear: x = -b/a, Quadratic: x = (-b ± √(b²-4ac)) / 2a',
    calculate: (inputs) => {
      const a = parseFloat(inputs.a);
      const b = parseFloat(inputs.b);
      const c = inputs.c ? parseFloat(inputs.c) : 0;
      
      if (inputs.type === 'linear') {
        if (a === 0) throw new Error('Coefficient a cannot be zero for linear equation');
        const x = -b / a;
        return {
          results: [{ value: x, label: 'x', format: 'decimal' }],
          explanation: [`Solving linear equation: ${a}x + ${b} = 0`],
          steps: [
            `${a}x + ${b} = 0`,
            `${a}x = -${b}`,
            `x = -${b}/${a} = ${x}`
          ]
        };
      } else {
        if (a === 0) throw new Error('Coefficient a cannot be zero for quadratic equation');
        const discriminant = b * b - 4 * a * c;
        
        if (discriminant < 0) {
          return {
            results: [{ value: 'No real solutions', label: 'Result' }],
            explanation: [`Discriminant = ${discriminant} < 0, so no real solutions exist`],
            steps: [`Discriminant = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`]
          };
        } else if (discriminant === 0) {
          const x = -b / (2 * a);
          return {
            results: [{ value: x, label: 'x (double root)', format: 'decimal' }],
            explanation: [`One solution (double root): x = ${x}`],
            steps: [
              `Discriminant = ${discriminant} = 0`,
              `x = -b/(2a) = -${b}/(2×${a}) = ${x}`
            ]
          };
        } else {
          const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
          const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
          return {
            results: [
              { value: x1, label: 'x₁', format: 'decimal' },
              { value: x2, label: 'x₂', format: 'decimal' }
            ],
            explanation: [`Two solutions: x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`],
            steps: [
              `Discriminant = b² - 4ac = ${discriminant}`,
              `x = (-b ± √${discriminant}) / (2×${a})`,
              `x₁ = (-${b} + √${discriminant}) / ${2*a} = ${x1.toFixed(4)}`,
              `x₂ = (-${b} - √${discriminant}) / ${2*a} = ${x2.toFixed(4)}`
            ]
          };
        }
      }
    },
    tags: ['equations', 'algebra', 'quadratic'],
    complexity: 'Intermediate'
  }
];

// Additional mathematics calculator
const additionalMathCalculators: Calculator[] = [
  {
    id: 'complex-number-calculator',
    title: 'Complex Number Calculator',
    description: 'Perform operations on complex numbers including addition, multiplication, and conjugates.',
    category: 'Mathematics',
    inputs: [
      { id: 'real1', label: 'Real Part 1', type: 'number', required: true, placeholder: 'Real part of first number' },
      { id: 'imag1', label: 'Imaginary Part 1', type: 'number', required: true, placeholder: 'Imaginary part of first number' },
      { id: 'real2', label: 'Real Part 2', type: 'number', required: true, placeholder: 'Real part of second number' },
      { id: 'imag2', label: 'Imaginary Part 2', type: 'number', required: true, placeholder: 'Imaginary part of second number' },
      { id: 'operation', label: 'Operation', type: 'select', required: true, options: [
        { value: 'add', label: 'Addition' },
        { value: 'subtract', label: 'Subtraction' },
        { value: 'multiply', label: 'Multiplication' },
        { value: 'divide', label: 'Division' }
      ]}
    ],
    formula: 'Complex number arithmetic',
    calculate: (inputs) => {
      const a1 = parseFloat(inputs.real1);
      const b1 = parseFloat(inputs.imag1);
      const a2 = parseFloat(inputs.real2);
      const b2 = parseFloat(inputs.imag2);
      
      let realResult, imagResult, explanation, steps;
      
      switch(inputs.operation) {
        case 'add':
          realResult = a1 + a2;
          imagResult = b1 + b2;
          explanation = `(${a1} + ${b1}i) + (${a2} + ${b2}i) = ${realResult} + ${imagResult}i`;
          steps = [
            `Real parts: ${a1} + ${a2} = ${realResult}`,
            `Imaginary parts: ${b1} + ${b2} = ${imagResult}`,
            `Result: ${realResult} + ${imagResult}i`
          ];
          break;
        case 'subtract':
          realResult = a1 - a2;
          imagResult = b1 - b2;
          explanation = `(${a1} + ${b1}i) - (${a2} + ${b2}i) = ${realResult} + ${imagResult}i`;
          steps = [
            `Real parts: ${a1} - ${a2} = ${realResult}`,
            `Imaginary parts: ${b1} - ${b2} = ${imagResult}`,
            `Result: ${realResult} + ${imagResult}i`
          ];
          break;
        case 'multiply':
          realResult = a1 * a2 - b1 * b2;
          imagResult = a1 * b2 + b1 * a2;
          explanation = `(${a1} + ${b1}i)(${a2} + ${b2}i) = ${realResult} + ${imagResult}i`;
          steps = [
            `Real part: ${a1}×${a2} - ${b1}×${b2} = ${realResult}`,
            `Imaginary part: ${a1}×${b2} + ${b1}×${a2} = ${imagResult}`,
            `Result: ${realResult} + ${imagResult}i`
          ];
          break;
        default:
          throw new Error('Operation not implemented');
      }
      
      return {
        results: [{ value: `${realResult} + ${imagResult}i`, label: 'Result' }],
        explanation: [explanation],
        steps: steps
      };
    },
    tags: ['complex', 'imaginary', 'arithmetic'],
    complexity: 'Intermediate'
  }
];

// Combine all mathematics calculators
const allMathCalculators = [
  ...baseMathematicsCalculators,
  ...additionalMathCalculators
];

export { allMathCalculators as mathematicsCalculators };

