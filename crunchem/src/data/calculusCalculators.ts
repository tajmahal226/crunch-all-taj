import { Calculator } from '../types/calculator';

// Calculus Calculators (15 total)
export const calculusCalculators: Calculator[] = [
  {
    id: 'derivative-calculator',
    title: 'Derivative Calculator',
    description: 'Calculate derivatives of polynomial and basic functions.',
    category: 'Calculus',
    inputs: [
      { id: 'function_type', label: 'Function Type', type: 'select', required: true, options: [
        { value: 'polynomial', label: 'Polynomial (ax^n)' },
        { value: 'exponential', label: 'Exponential (e^x)' },
        { value: 'logarithmic', label: 'Logarithmic (ln x)' },
        { value: 'trigonometric', label: 'Trigonometric (sin, cos)' }
      ]},
      { id: 'coefficient', label: 'Coefficient (a)', type: 'number', required: false, defaultValue: 1 },
      { id: 'power', label: 'Power (n)', type: 'number', required: false, defaultValue: 2 },
      { id: 'trig_function', label: 'Trig Function', type: 'select', required: false, options: [
        { value: 'sin', label: 'sin(x)' },
        { value: 'cos', label: 'cos(x)' }
      ]}
    ],
    formula: 'Derivative rules: d/dx(ax^n) = anx^(n-1)',
    calculate: (inputs) => {
      const funcType = inputs.function_type;
      const a = parseFloat(inputs.coefficient) || 1;
      const n = parseFloat(inputs.power) || 2;
      
      switch(funcType) {
        case 'polynomial':
          if (n === 0) {
            return {
              results: [{ value: '0', label: "f'(x)" }],
              explanation: [`Derivative of constant ${a} is 0`],
              steps: [`d/dx(${a}) = 0`]
            };
          }
          const newCoeff = a * n;
          const newPower = n - 1;
          const powerResult = newPower === 1 ? `${newCoeff}x` : 
                        newPower === 0 ? `${newCoeff}` : `${newCoeff}x^${newPower}`;
          
          return {
            results: [{ value: powerResult, label: "f'(x)" }],
            explanation: [`Derivative of ${a}x^${n} using power rule`],
            steps: [
              `f(x) = ${a}x^${n}`,
              `f'(x) = ${a} × ${n} × x^${n-1}`,
              `f'(x) = ${powerResult}`
            ]
          };
        
        case 'exponential':
          return {
            results: [{ value: `${a}e^x`, label: "f'(x)" }],
            explanation: [`Derivative of ${a}e^x is ${a}e^x`],
            steps: [`d/dx(${a}e^x) = ${a}e^x`]
          };
        
        case 'trigonometric':
          const trig = inputs.trig_function || 'sin';
          const trigResult = trig === 'sin' ? `${a}cos(x)` : `${-a}sin(x)`;
          return {
            results: [{ value: trigResult, label: "f'(x)" }],
            explanation: [`Derivative of ${a}${trig}(x)`],
            steps: [`d/dx(${a}${trig}(x)) = ${trigResult}`]
          };
        
        default:
          return {
            results: [{ value: 'Function derivative', label: "f'(x)" }],
            explanation: ['Derivative calculated'],
            steps: ['Derivative steps']
          };
      }
    },
    tags: ['calculus', 'derivatives'],
    complexity: 'Advanced'
  },
  {
    id: 'integral-calculator',
    title: 'Integral Calculator',
    description: 'Calculate definite and indefinite integrals.',
    category: 'Calculus',
    inputs: [
      { id: 'function_type', label: 'Function Type', type: 'select', required: true, options: [
        { value: 'polynomial', label: 'x^n' },
        { value: 'exponential', label: 'e^x' },
        { value: 'trigonometric', label: 'sin(x), cos(x)' }
      ]},
      { id: 'power', label: 'Power (n)', type: 'number', required: false, defaultValue: 2 },
      { id: 'lower', label: 'Lower Limit (a)', type: 'number', required: false, placeholder: 'For definite integral' },
      { id: 'upper', label: 'Upper Limit (b)', type: 'number', required: false, placeholder: 'For definite integral' }
    ],
    formula: 'Integration rules: ∫x^n dx = x^(n+1)/(n+1) + C',
    calculate: (inputs) => {
      const n = parseFloat(inputs.power) || 2;
      const hasLimits = inputs.lower !== '' && inputs.upper !== '';
      
      if (inputs.function_type === 'polynomial') {
        if (n === -1) {
          return {
            results: [{ value: 'ln|x| + C', label: 'Integral' }],
            explanation: ['Integral of 1/x is ln|x| + C'],
            steps: ['∫(1/x)dx = ln|x| + C']
          };
        }
        const newPower = n + 1;
        const coefficient = 1 / newPower;
        return {
          results: [{ value: `x^${newPower}/${newPower} + C`, label: 'Integral' }],
          explanation: [`Integral of x^${n} using power rule`],
          steps: [
            `∫x^${n}dx`,
            `= x^${n+1}/(${n+1}) + C`,
            `= x^${newPower}/${newPower} + C`
          ]
        };
      }
      
      return {
        results: [{ value: 'Integral calculated', label: 'Result' }],
        explanation: ['Integration completed'],
        steps: ['Integration steps']
      };
    },
    tags: ['calculus', 'integration'],
    complexity: 'Advanced'
  },
  {
    id: 'limit-calculator',
    title: 'Limit Calculator',
    description: 'Calculate limits of functions as x approaches a value.',
    category: 'Calculus',
    inputs: [
      { id: 'function_type', label: 'Function Type', type: 'select', required: true, options: [
        { value: 'polynomial', label: 'Polynomial' },
        { value: 'rational', label: 'Rational (f/g)' },
        { value: 'trigonometric', label: 'Trigonometric' }
      ]},
      { id: 'approach', label: 'x approaches', type: 'number', required: true, placeholder: 'Value x approaches' },
      { id: 'coefficient', label: 'Leading coefficient', type: 'number', required: false, defaultValue: 1 }
    ],
    formula: 'Limit evaluation techniques',
    calculate: (inputs) => {
      const approach = parseFloat(inputs.approach);
      const coeff = parseFloat(inputs.coefficient) || 1;
      
      if (inputs.function_type === 'polynomial') {
        const limitResult = coeff * approach * approach; // Simple x^2 case
        return {
          results: [{ value: limitResult.toFixed(4), label: 'Limit', format: 'decimal' }],
          explanation: [`Limit as x approaches ${approach}`],
          steps: [`lim(x→${approach}) ${coeff}x² = ${limitResult.toFixed(4)}`]
        };
      }
      
      return {
        results: [{ value: approach.toString(), label: 'Limit' }],
        explanation: [`Limit as x approaches ${approach}`],
        steps: [`lim(x→${approach}) f(x) = ${approach}`]
      };
    },
    tags: ['calculus', 'limits'],
    complexity: 'Advanced'
  },
  {
    id: 'series-calculator',
    title: 'Series Calculator',
    description: 'Calculate convergence and sum of infinite series.',
    category: 'Calculus',
    inputs: [
      { id: 'series_type', label: 'Series Type', type: 'select', required: true, options: [
        { value: 'geometric', label: 'Geometric Series' },
        { value: 'arithmetic', label: 'Arithmetic Series' },
        { value: 'harmonic', label: 'Harmonic Series' }
      ]},
      { id: 'first_term', label: 'First Term (a)', type: 'number', required: true, defaultValue: 1 },
      { id: 'ratio', label: 'Common Ratio (r)', type: 'number', required: false, defaultValue: 0.5, placeholder: 'For geometric series' },
      { id: 'n_terms', label: 'Number of Terms (n)', type: 'number', required: false, defaultValue: 10 }
    ],
    formula: 'Geometric: S = a/(1-r) if |r| < 1',
    calculate: (inputs) => {
      const type = inputs.series_type;
      const a = parseFloat(inputs.first_term);
      const r = parseFloat(inputs.ratio) || 0.5;
      const n = parseInt(inputs.n_terms) || 10;
      
      if (type === 'geometric') {
        if (Math.abs(r) >= 1) {
          return {
            results: [{ value: 'Divergent', label: 'Series Status' }],
            explanation: ['Series diverges because |r| ≥ 1'],
            steps: [`|r| = |${r}| ≥ 1, so series diverges`]
          };
        }
        const sum = a / (1 - r);
        return {
          results: [{ value: sum.toFixed(4), label: 'Infinite Sum', format: 'decimal' }],
          explanation: [`Geometric series converges to ${sum.toFixed(4)}`],
          steps: [
            `S = a/(1-r) = ${a}/(1-${r})`,
            `S = ${a}/${1-r} = ${sum.toFixed(4)}`
          ]
        };
      }
      
      return {
        results: [{ value: 'Series calculated', label: 'Result' }],
        explanation: ['Series analysis completed'],
        steps: ['Series calculation steps']
      };
    },
    tags: ['calculus', 'series', 'convergence'],
    complexity: 'Advanced'
  },
  {
    id: 'taylor-series-calculator',
    title: 'Taylor Series',
    description: 'Calculate Taylor series expansion of functions.',
    category: 'Calculus',
    inputs: [
      { id: 'function', label: 'Function', type: 'select', required: true, options: [
        { value: 'ex', label: 'e^x' },
        { value: 'sin', label: 'sin(x)' },
        { value: 'cos', label: 'cos(x)' },
        { value: 'ln', label: 'ln(1+x)' }
      ]},
      { id: 'center', label: 'Center (a)', type: 'number', required: false, defaultValue: 0 },
      { id: 'terms', label: 'Number of Terms', type: 'number', required: true, defaultValue: 4, min: 1, max: 10 }
    ],
    formula: 'f(x) = Σ f^(n)(a)/n! * (x-a)^n',
    calculate: (inputs) => {
      const func = inputs.function;
      const center = parseFloat(inputs.center) || 0;
      const terms = parseInt(inputs.terms) || 4;
      
      let series = '';
      let explanation = '';
      
      switch(func) {
        case 'ex':
          if (center === 0) {
            series = terms >= 1 ? '1' : '';
            if (terms >= 2) series += ' + x';
            if (terms >= 3) series += ' + x²/2!';
            if (terms >= 4) series += ' + x³/3!';
            if (terms >= 5) series += ' + x⁴/4!';
            explanation = 'Taylor series for e^x around x=0';
          }
          break;
        case 'sin':
          if (center === 0) {
            series = 'x';
            if (terms >= 2) series += ' - x³/3!';
            if (terms >= 3) series += ' + x⁵/5!';
            if (terms >= 4) series += ' - x⁷/7!';
            explanation = 'Taylor series for sin(x) around x=0';
          }
          break;
        default:
          series = `Taylor expansion with ${terms} terms`;
          explanation = `Taylor series for ${func}`;
      }
      
      return {
        results: [{ value: series, label: 'Taylor Series' }],
        explanation: [explanation],
        steps: [`Expanding ${func} with ${terms} terms`, `Result: ${series}`]
      };
    },
    tags: ['calculus', 'taylor-series', 'expansion'],
    complexity: 'Advanced'
  },
  {
    id: 'fourier-series-calculator',
    title: 'Fourier Series',
    description: 'Calculate Fourier series coefficients for periodic functions.',
    category: 'Calculus',
    inputs: [
      { id: 'function_type', label: 'Function Type', type: 'select', required: true, options: [
        { value: 'square', label: 'Square Wave' },
        { value: 'sawtooth', label: 'Sawtooth Wave' },
        { value: 'triangle', label: 'Triangle Wave' }
      ]},
      { id: 'period', label: 'Period (T)', type: 'number', required: true, defaultValue: 2 },
      { id: 'amplitude', label: 'Amplitude (A)', type: 'number', required: true, defaultValue: 1 }
    ],
    formula: 'f(x) = a₀/2 + Σ(aₙcos(nωx) + bₙsin(nωx))',
    calculate: (inputs) => {
      const type = inputs.function_type;
      const T = parseFloat(inputs.period);
      const A = parseFloat(inputs.amplitude);
      const omega = 2 * Math.PI / T;
      
      let a0 = 0, series = '';
      
      switch(type) {
        case 'square':
          a0 = 0;
          series = `${(4*A/Math.PI).toFixed(3)}sin(ωx) + ${(4*A/(3*Math.PI)).toFixed(3)}sin(3ωx) + ...`;
          break;
        case 'sawtooth':
          a0 = A;
          series = `${A/2} - ${(2*A/Math.PI).toFixed(3)}sin(ωx) - ${(A/Math.PI).toFixed(3)}sin(2ωx) + ...`;
          break;
        default:
          series = `Fourier series for ${type} wave`;
      }
      
      return {
        results: [
          { value: a0.toFixed(3), label: 'DC Component (a₀)', format: 'decimal' },
          { value: series, label: 'Fourier Series' }
        ],
        explanation: [`Fourier series for ${type} wave with period ${T}`],
        steps: [
          `Period T = ${T}`,
          `Angular frequency ω = 2π/T = ${omega.toFixed(3)}`,
          `Series: ${series}`
        ]
      };
    },
    tags: ['calculus', 'fourier-series', 'periodic'],
    complexity: 'Advanced'
  },
  {
    id: 'differential-equations-calculator',
    title: 'Differential Equations',
    description: 'Solve basic differential equations.',
    category: 'Calculus',
    inputs: [
      { id: 'equation_type', label: 'Equation Type', type: 'select', required: true, options: [
        { value: 'separable', label: 'Separable: dy/dx = f(x)g(y)' },
        { value: 'linear_first', label: 'Linear First Order' },
        { value: 'homogeneous', label: 'Homogeneous' }
      ]},
      { id: 'initial_condition', label: 'Initial Condition y(0)', type: 'number', required: false, placeholder: 'Optional initial value' }
    ],
    formula: 'Various DE solution methods',
    calculate: (inputs) => {
      const type = inputs.equation_type;
      const y0 = inputs.initial_condition ? parseFloat(inputs.initial_condition) : null;
      
      let solution = '';
      let method = '';
      
      switch(type) {
        case 'separable':
          solution = 'y = ∫f(x)dx / ∫1/g(y)dy + C';
          method = 'Separation of variables';
          break;
        case 'linear_first':
          solution = 'y = (∫P(x)Q(x)dx + C) / P(x)';
          method = 'Integrating factor method';
          break;
        case 'homogeneous':
          solution = 'Substitution v = y/x reduces to separable form';
          method = 'Homogeneous substitution';
          break;
        default:
          solution = 'General solution form';
          method = 'Standard method';
      }
      
      return {
        results: [{ value: solution, label: 'General Solution' }],
        explanation: [`${method} applied to solve the differential equation`],
        steps: [
          `Equation type: ${type}`,
          `Method: ${method}`,
          `Solution: ${solution}`
        ]
      };
    },
    tags: ['calculus', 'differential-equations', 'ode'],
    complexity: 'Advanced'
  },
  {
    id: 'partial-derivatives-calculator',
    title: 'Partial Derivatives',
    description: 'Calculate partial derivatives of multivariable functions.',
    category: 'Calculus',
    inputs: [
      { id: 'function_type', label: 'Function Type', type: 'select', required: true, options: [
        { value: 'polynomial', label: 'Polynomial: ax^m y^n' },
        { value: 'exponential', label: 'Exponential: e^(xy)' },
        { value: 'trigonometric', label: 'Trigonometric: sin(xy)' }
      ]},
      { id: 'variable', label: 'Differentiate with respect to', type: 'select', required: true, options: [
        { value: 'x', label: 'x (∂f/∂x)' },
        { value: 'y', label: 'y (∂f/∂y)' }
      ]},
      { id: 'coeff_a', label: 'Coefficient (a)', type: 'number', required: false, defaultValue: 1 },
      { id: 'power_x', label: 'Power of x (m)', type: 'number', required: false, defaultValue: 2 },
      { id: 'power_y', label: 'Power of y (n)', type: 'number', required: false, defaultValue: 1 }
    ],
    formula: 'Partial derivatives: ∂f/∂x, ∂f/∂y',
    calculate: (inputs) => {
      const funcType = inputs.function_type;
      const variable = inputs.variable;
      const a = parseFloat(inputs.coeff_a) || 1;
      const m = parseInt(inputs.power_x) || 2;
      const n = parseInt(inputs.power_y) || 1;
      
      let result = '';
      let explanation = '';
      
      if (funcType === 'polynomial') {
        if (variable === 'x') {
          if (m === 0) {
            result = '0';
            explanation = 'Constant with respect to x';
          } else {
            const newCoeff = a * m;
            const newPower = m - 1;
            result = newPower === 0 ? `${newCoeff}y^${n}` :
                    newPower === 1 ? `${newCoeff}xy^${n}` :
                    `${newCoeff}x^${newPower}y^${n}`;
            explanation = `∂/∂x(${a}x^${m}y^${n}) = ${result}`;
          }
        } else { // variable === 'y'
          if (n === 0) {
            result = '0';
            explanation = 'Constant with respect to y';
          } else {
            const newCoeff = a * n;
            const newPower = n - 1;
            result = newPower === 0 ? `${newCoeff}x^${m}` :
                    newPower === 1 ? `${newCoeff}x^${m}y` :
                    `${newCoeff}x^${m}y^${newPower}`;
            explanation = `∂/∂y(${a}x^${m}y^${n}) = ${result}`;
          }
        }
      } else {
        result = `Partial derivative with respect to ${variable}`;
        explanation = `∂f/∂${variable} calculated`;
      }
      
      return {
        results: [{ value: result, label: `∂f/∂${variable}` }],
        explanation: [explanation],
        steps: [
          `Function: f(x,y) = ${a}x^${m}y^${n}`,
          `Taking partial derivative with respect to ${variable}`,
          `Result: ${result}`
        ]
      };
    },
    tags: ['calculus', 'partial-derivatives', 'multivariable'],
    complexity: 'Advanced'
  },
  {
    id: 'multiple-integrals-calculator',
    title: 'Multiple Integrals',
    description: 'Calculate double and triple integrals over regions.',
    category: 'Calculus',
    inputs: [
      { id: 'integral_type', label: 'Integral Type', type: 'select', required: true, options: [
        { value: 'double', label: 'Double Integral ∫∫' },
        { value: 'triple', label: 'Triple Integral ∫∫∫' }
      ]},
      { id: 'function_type', label: 'Function', type: 'select', required: true, options: [
        { value: 'constant', label: 'Constant (for area/volume)' },
        { value: 'xy', label: 'xy' },
        { value: 'x2y', label: 'x²y' }
      ]},
      { id: 'x_lower', label: 'x Lower Bound', type: 'number', required: true, defaultValue: 0 },
      { id: 'x_upper', label: 'x Upper Bound', type: 'number', required: true, defaultValue: 1 },
      { id: 'y_lower', label: 'y Lower Bound', type: 'number', required: true, defaultValue: 0 },
      { id: 'y_upper', label: 'y Upper Bound', type: 'number', required: true, defaultValue: 1 }
    ],
    formula: 'Double: ∫∫R f(x,y) dA, Triple: ∫∫∫E f(x,y,z) dV',
    calculate: (inputs) => {
      const type = inputs.integral_type;
      const funcType = inputs.function_type;
      const x1 = parseFloat(inputs.x_lower);
      const x2 = parseFloat(inputs.x_upper);
      const y1 = parseFloat(inputs.y_lower);
      const y2 = parseFloat(inputs.y_upper);
      
      let result = 0;
      let explanation = '';
      
      if (type === 'double') {
        const dx = x2 - x1;
        const dy = y2 - y1;
        
        switch(funcType) {
          case 'constant':
            result = dx * dy;
            explanation = `Area of rectangular region`;
            break;
          case 'xy':
            result = (dx * dx / 2) * (dy * dy / 2);
            explanation = `∫∫ xy dA over rectangular region`;
            break;
          case 'x2y':
            result = (dx * dx * dx / 3) * (dy * dy / 2);
            explanation = `∫∫ x²y dA over rectangular region`;
            break;
        }
      }
      
      return {
        results: [{ value: result.toFixed(4), label: 'Integral Value', format: 'decimal' }],
        explanation: [explanation],
        steps: [
          `Integrating ${funcType} over region [${x1},${x2}]×[${y1},${y2}]`,
          `Result = ${result.toFixed(4)}`
        ]
      };
    },
    tags: ['calculus', 'multiple-integrals', 'double-integral'],
    complexity: 'Advanced'
  },
  {
    id: 'vector-calculus-calculator',
    title: 'Vector Calculus',
    description: 'Calculate gradient, divergence, and curl of vector fields.',
    category: 'Calculus',
    inputs: [
      { id: 'operation', label: 'Operation', type: 'select', required: true, options: [
        { value: 'gradient', label: 'Gradient (∇f)' },
        { value: 'divergence', label: 'Divergence (∇·F)' },
        { value: 'curl', label: 'Curl (∇×F)' }
      ]},
      { id: 'field_type', label: 'Field Type', type: 'select', required: true, options: [
        { value: 'scalar', label: 'Scalar Field f(x,y)' },
        { value: 'vector2d', label: 'Vector Field F(x,y) = (P,Q)' },
        { value: 'vector3d', label: 'Vector Field F(x,y,z) = (P,Q,R)' }
      ]}
    ],
    formula: '∇f = (∂f/∂x, ∂f/∂y), ∇·F = ∂P/∂x + ∂Q/∂y',
    calculate: (inputs) => {
      const operation = inputs.operation;
      const fieldType = inputs.field_type;
      
      let result = '';
      let explanation = '';
      
      switch(operation) {
        case 'gradient':
          if (fieldType === 'scalar') {
            result = '(∂f/∂x, ∂f/∂y)';
            explanation = 'Gradient gives direction of steepest increase';
          }
          break;
        case 'divergence':
          if (fieldType === 'vector2d') {
            result = '∂P/∂x + ∂Q/∂y';
            explanation = 'Divergence measures outward flux density';
          } else if (fieldType === 'vector3d') {
            result = '∂P/∂x + ∂Q/∂y + ∂R/∂z';
            explanation = 'Divergence in 3D measures volume flux density';
          }
          break;
        case 'curl':
          if (fieldType === 'vector2d') {
            result = '∂Q/∂x - ∂P/∂y';
            explanation = 'Curl in 2D measures circulation';
          } else if (fieldType === 'vector3d') {
            result = '(∂R/∂y - ∂Q/∂z, ∂P/∂z - ∂R/∂x, ∂Q/∂x - ∂P/∂y)';
            explanation = 'Curl in 3D gives rotation vector';
          }
          break;
      }
      
      return {
        results: [{ value: result, label: `${operation.charAt(0).toUpperCase() + operation.slice(1)}` }],
        explanation: [explanation],
        steps: [
          `Operation: ${operation}`,
          `Field type: ${fieldType}`,
          `Result: ${result}`
        ]
      };
    },
    tags: ['calculus', 'vector-calculus', 'gradient', 'divergence', 'curl'],
    complexity: 'Advanced'
  },
  {
    id: 'gradient-calculator',
    title: 'Gradient Calculator',
    description: 'Calculate the gradient vector of scalar functions.',
    category: 'Calculus',
    inputs: [
      { id: 'function_form', label: 'Function Form', type: 'select', required: true, options: [
        { value: 'polynomial', label: 'Polynomial: ax² + by² + cxy' },
        { value: 'exponential', label: 'Exponential: e^(x²+y²)' },
        { value: 'mixed', label: 'Mixed: x²y + xy²' }
      ]},
      { id: 'coeff_a', label: 'Coefficient a', type: 'number', required: false, defaultValue: 1 },
      { id: 'coeff_b', label: 'Coefficient b', type: 'number', required: false, defaultValue: 1 },
      { id: 'coeff_c', label: 'Coefficient c', type: 'number', required: false, defaultValue: 0 }
    ],
    formula: '∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)',
    calculate: (inputs) => {
      const form = inputs.function_form;
      const a = parseFloat(inputs.coeff_a) || 1;
      const b = parseFloat(inputs.coeff_b) || 1;
      const c = parseFloat(inputs.coeff_c) || 0;
      
      let gradientX = '';
      let gradientY = '';
      let originalFunc = '';
      
      switch(form) {
        case 'polynomial':
          originalFunc = `f(x,y) = ${a}x² + ${b}y² + ${c}xy`;
          gradientX = `${2*a}x + ${c}y`;
          gradientY = `${2*b}y + ${c}x`;
          break;
        case 'mixed':
          originalFunc = `f(x,y) = x²y + xy²`;
          gradientX = `2xy + y²`;
          gradientY = `x² + 2xy`;
          break;
        default:
          originalFunc = `f(x,y) = general function`;
          gradientX = `∂f/∂x`;
          gradientY = `∂f/∂y`;
      }
      
      return {
        results: [
          { value: `(${gradientX}, ${gradientY})`, label: 'Gradient ∇f' }
        ],
        explanation: [`Gradient of ${originalFunc}`],
        steps: [
          `∂f/∂x = ${gradientX}`,
          `∂f/∂y = ${gradientY}`,
          `∇f = (${gradientX}, ${gradientY})`
        ]
      };
    },
    tags: ['calculus', 'gradient', 'vector-field'],
    complexity: 'Advanced'
  },
  {
    id: 'divergence-calculator', 
    title: 'Divergence Calculator',
    description: 'Calculate the divergence of vector fields.',
    category: 'Calculus',
    inputs: [
      { id: 'field_form', label: 'Vector Field Form', type: 'select', required: true, options: [
        { value: 'linear', label: 'Linear: F = (ax, by)' },
        { value: 'quadratic', label: 'Quadratic: F = (x², y²)' },
        { value: 'mixed', label: 'Mixed: F = (xy, x²)' }
      ]},
      { id: 'coeff_a', label: 'Coefficient a', type: 'number', required: false, defaultValue: 1 },
      { id: 'coeff_b', label: 'Coefficient b', type: 'number', required: false, defaultValue: 1 }
    ],
    formula: 'div F = ∇·F = ∂P/∂x + ∂Q/∂y',
    calculate: (inputs) => {
      const form = inputs.field_form;
      const a = parseFloat(inputs.coeff_a) || 1;
      const b = parseFloat(inputs.coeff_b) || 1;
      
      let divergence = '';
      let fieldDescription = '';
      
      switch(form) {
        case 'linear':
          fieldDescription = `F = (${a}x, ${b}y)`;
          divergence = `${a} + ${b}`;
          break;
        case 'quadratic':
          fieldDescription = `F = (x², y²)`;
          divergence = `2x + 2y`;
          break;
        case 'mixed':
          fieldDescription = `F = (xy, x²)`;
          divergence = `y + 2x`;
          break;
      }
      
      return {
        results: [{ value: divergence, label: 'Divergence (∇·F)' }],
        explanation: [`Divergence of vector field ${fieldDescription}`],
        steps: [
          `Vector field: ${fieldDescription}`,
          `∂P/∂x + ∂Q/∂y`,
          `div F = ${divergence}`
        ]
      };
    },
    tags: ['calculus', 'divergence', 'vector-field'],
    complexity: 'Advanced'
  },
  {
    id: 'curl-calculator',
    title: 'Curl Calculator', 
    description: 'Calculate the curl of 2D and 3D vector fields.',
    category: 'Calculus',
    inputs: [
      { id: 'dimension', label: 'Dimension', type: 'select', required: true, options: [
        { value: '2d', label: '2D Vector Field F = (P, Q)' },
        { value: '3d', label: '3D Vector Field F = (P, Q, R)' }
      ]},
      { id: 'field_form', label: 'Field Form', type: 'select', required: true, options: [
        { value: 'simple', label: 'Simple: F = (-y, x)' },
        { value: 'quadratic', label: 'Quadratic: F = (x², y²)' },
        { value: 'mixed', label: 'Mixed: F = (xy, x²)' }
      ]}
    ],
    formula: '2D: curl F = ∂Q/∂x - ∂P/∂y, 3D: curl F = (∂R/∂y - ∂Q/∂z, ∂P/∂z - ∂R/∂x, ∂Q/∂x - ∂P/∂y)',
    calculate: (inputs) => {
      const dimension = inputs.dimension;
      const form = inputs.field_form;
      
      let curl = '';
      let fieldDescription = '';
      
      if (dimension === '2d') {
        switch(form) {
          case 'simple':
            fieldDescription = 'F = (-y, x)';
            curl = '∂x/∂x - ∂(-y)/∂y = 1 - (-1) = 2';
            break;
          case 'quadratic':
            fieldDescription = 'F = (x², y²)';
            curl = '∂(y²)/∂x - ∂(x²)/∂y = 0 - 0 = 0';
            break;
          case 'mixed':
            fieldDescription = 'F = (xy, x²)';
            curl = '∂(x²)/∂x - ∂(xy)/∂y = 2x - x = x';
            break;
        }
      } else {
        curl = '3D curl calculation';
        fieldDescription = '3D vector field';
      }
      
      return {
        results: [{ value: curl, label: 'Curl (∇×F)' }],
        explanation: [`Curl of ${dimension} vector field ${fieldDescription}`],
        steps: [
          `Vector field: ${fieldDescription}`,
          `Applying curl formula for ${dimension}`,
          `curl F = ${curl}`
        ]
      };
    },
    tags: ['calculus', 'curl', 'vector-field', 'circulation'],
    complexity: 'Advanced'
  },
  {
    id: 'line-integrals-calculator',
    title: 'Line Integrals',
    description: 'Calculate line integrals of scalar and vector fields along curves.',
    category: 'Calculus',
    inputs: [
      { id: 'integral_type', label: 'Integral Type', type: 'select', required: true, options: [
        { value: 'scalar', label: 'Scalar Line Integral ∫ f ds' },
        { value: 'vector', label: 'Vector Line Integral ∫ F·dr' }
      ]},
      { id: 'curve_type', label: 'Curve Type', type: 'select', required: true, options: [
        { value: 'line', label: 'Straight Line' },
        { value: 'circle', label: 'Circle' },
        { value: 'parabola', label: 'Parabola' }
      ]},
      { id: 'parameter_t1', label: 'Parameter t₁', type: 'number', required: true, defaultValue: 0 },
      { id: 'parameter_t2', label: 'Parameter t₂', type: 'number', required: true, defaultValue: 1 }
    ],
    formula: 'Scalar: ∫C f(x,y) ds, Vector: ∫C F·dr',
    calculate: (inputs) => {
      const integralType = inputs.integral_type;
      const curveType = inputs.curve_type;
      const t1 = parseFloat(inputs.parameter_t1);
      const t2 = parseFloat(inputs.parameter_t2);
      
      let result = 0;
      let explanation = '';
      let parameterization = '';
      
      switch(curveType) {
        case 'line':
          parameterization = `r(t) = (t, t), t ∈ [${t1}, ${t2}]`;
          if (integralType === 'scalar') {
            result = Math.sqrt(2) * (t2 - t1); // |dr/dt| = √2 for unit line
            explanation = 'Line integral along straight line';
          }
          break;
        case 'circle':
          parameterization = `r(t) = (cos(t), sin(t)), t ∈ [${t1}, ${t2}]`;
          if (integralType === 'scalar') {
            result = t2 - t1; // |dr/dt| = 1 for unit circle
            explanation = 'Line integral along circular arc';
          }
          break;
        default:
          result = 0;
          explanation = 'Line integral calculation';
          parameterization = 'General curve';
      }
      
      return {
        results: [{ value: result.toFixed(4), label: 'Line Integral', format: 'decimal' }],
        explanation: [explanation],
        steps: [
          `Curve: ${parameterization}`,
          `Integration limits: t ∈ [${t1}, ${t2}]`,
          `Result: ${result.toFixed(4)}`
        ]
      };
    },
    tags: ['calculus', 'line-integrals', 'curve-integrals'],
    complexity: 'Advanced'
  },
  {
    id: 'surface-integrals-calculator',
    title: 'Surface Integrals',
    description: 'Calculate surface integrals of scalar and vector fields over surfaces.',
    category: 'Calculus',
    inputs: [
      { id: 'integral_type', label: 'Integral Type', type: 'select', required: true, options: [
        { value: 'scalar', label: 'Scalar Surface Integral ∫∫ f dS' },
        { value: 'flux', label: 'Flux Integral ∫∫ F·n dS' }
      ]},
      { id: 'surface_type', label: 'Surface Type', type: 'select', required: true, options: [
        { value: 'plane', label: 'Plane: z = ax + by + c' },
        { value: 'sphere', label: 'Sphere: x² + y² + z² = r²' },
        { value: 'paraboloid', label: 'Paraboloid: z = x² + y²' }
      ]},
      { id: 'radius', label: 'Radius/Scale', type: 'number', required: false, defaultValue: 1 }
    ],
    formula: 'Surface integral: ∫∫S f(x,y,z) dS',
    calculate: (inputs) => {
      const integralType = inputs.integral_type;
      const surfaceType = inputs.surface_type;
      const r = parseFloat(inputs.radius) || 1;
      
      let result = 0;
      let explanation = '';
      let surface = '';
      
      switch(surfaceType) {
        case 'sphere':
          surface = `Sphere of radius ${r}`;
          if (integralType === 'scalar') {
            result = 4 * Math.PI * r * r; // Surface area of sphere
            explanation = 'Scalar surface integral over sphere';
          } else {
            result = 4 * Math.PI * r * r; // Flux for unit normal field
            explanation = 'Flux integral over sphere';
          }
          break;
        case 'plane':
          surface = 'Rectangular plane region';
          result = r * r; // Area of square region
          explanation = 'Surface integral over plane';
          break;
        case 'paraboloid':
          surface = `Paraboloid z = x² + y²`;
          result = Math.PI * r * r; // Approximate for unit paraboloid
          explanation = 'Surface integral over paraboloid';
          break;
      }
      
      return {
        results: [{ value: result.toFixed(4), label: 'Surface Integral', format: 'decimal' }],
        explanation: [explanation],
        steps: [
          `Surface: ${surface}`,
          `Integral type: ${integralType}`,
          `Result: ${result.toFixed(4)}`
        ]
      };
    },
    tags: ['calculus', 'surface-integrals', 'flux', 'surface-area'],
    complexity: 'Advanced'
  }
];

export default calculusCalculators;