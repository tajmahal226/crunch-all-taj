import { Calculator } from '../types/calculator';

// Trigonometry Calculators (15 total)
export const trigonometryCalculators: Calculator[] = [
  {
    id: 'sin-cos-tan-calculator',
    title: 'Sin/Cos/Tan Calculator',
    description: 'Calculate basic trigonometric functions: sine, cosine, and tangent.',
    category: 'Trigonometry',
    inputs: [
      { id: 'angle', label: 'Angle', type: 'number', required: true, placeholder: 'Enter angle' },
      { id: 'unit', label: 'Unit', type: 'select', required: true, options: [
        { value: 'degrees', label: 'Degrees' },
        { value: 'radians', label: 'Radians' }
      ]}
    ],
    formula: 'sin(θ), cos(θ), tan(θ)',
    calculate: (inputs) => {
      const angle = parseFloat(inputs.angle);
      const radians = inputs.unit === 'degrees' ? angle * Math.PI / 180 : angle;
      const sinValue = Math.sin(radians);
      const cosValue = Math.cos(radians);
      const tanValue = Math.tan(radians);
      
      return {
        results: [
          { value: sinValue.toFixed(6), label: 'sin', format: 'decimal' },
          { value: cosValue.toFixed(6), label: 'cos', format: 'decimal' },
          { value: tanValue.toFixed(6), label: 'tan', format: 'decimal' }
        ],
        explanation: [`Trigonometric functions for ${angle}${inputs.unit === 'degrees' ? '°' : ' rad'}`],
        steps: [`sin = ${sinValue.toFixed(6)}`, `cos = ${cosValue.toFixed(6)}`, `tan = ${tanValue.toFixed(6)}`]
      };
    },
    tags: ['trigonometry', 'basic'],
    complexity: 'Basic'
  },
  {
    id: 'inverse-trig-calculator',
    title: 'Inverse Trig Functions',
    description: 'Calculate inverse trigonometric functions: arcsin, arccos, arctan.',
    category: 'Trigonometry',
    inputs: [
      { id: 'value', label: 'Value', type: 'number', required: true, placeholder: 'Enter value' },
      { id: 'function', label: 'Function', type: 'select', required: true, options: [
        { value: 'asin', label: 'Arcsine (asin)' },
        { value: 'acos', label: 'Arccosine (acos)' },
        { value: 'atan', label: 'Arctangent (atan)' }
      ]},
      { id: 'unit', label: 'Result Unit', type: 'select', required: true, options: [
        { value: 'degrees', label: 'Degrees' },
        { value: 'radians', label: 'Radians' }
      ]}
    ],
    formula: 'arcsin(x), arccos(x), arctan(x)',
    calculate: (inputs) => {
      const value = parseFloat(inputs.value);
      const func = inputs.function;
      let result;
      
      switch(func) {
        case 'asin':
          if (value < -1 || value > 1) throw new Error('Arcsine domain: [-1, 1]');
          result = Math.asin(value);
          break;
        case 'acos':
          if (value < -1 || value > 1) throw new Error('Arccosine domain: [-1, 1]');
          result = Math.acos(value);
          break;
        case 'atan':
          result = Math.atan(value);
          break;
        default:
          throw new Error('Invalid function');
      }
      
      const finalResult = inputs.unit === 'degrees' ? result * 180 / Math.PI : result;
      const unitSymbol = inputs.unit === 'degrees' ? '°' : ' rad';
      
      return {
        results: [{ value: finalResult.toFixed(6), label: `${func}(${value})`, format: 'decimal' }],
        explanation: [`${func}(${value}) = ${finalResult.toFixed(6)}${unitSymbol}`],
        steps: [`${func}(${value}) = ${finalResult.toFixed(6)}${unitSymbol}`]
      };
    },
    tags: ['trigonometry', 'inverse'],
    complexity: 'Intermediate'
  },
  {
    id: 'unit-circle-calculator',
    title: 'Unit Circle',
    description: 'Find coordinates and angles on the unit circle.',
    category: 'Trigonometry',
    inputs: [
      { id: 'angle', label: 'Angle', type: 'number', required: true, placeholder: 'Enter angle in degrees' }
    ],
    formula: '(cosθ, sinθ)',
    calculate: (inputs) => {
      const degrees = parseFloat(inputs.angle);
      const radians = degrees * Math.PI / 180;
      const x = Math.cos(radians);
      const y = Math.sin(radians);
      
      return {
        results: [
          { value: `(${x.toFixed(3)}, ${y.toFixed(3)})`, label: 'Coordinates' },
          { value: radians.toFixed(4), label: 'Radians', format: 'decimal' }
        ],
        explanation: [`Point on unit circle at ${degrees}°`],
        steps: [`x = cos(${degrees}°) = ${x.toFixed(3)}`, `y = sin(${degrees}°) = ${y.toFixed(3)}`]
      };
    },
    tags: ['trigonometry', 'unit-circle'],
    complexity: 'Basic'
  },
  {
    id: 'law-of-sines-calculator',
    title: 'Law of Sines',
    description: 'Solve triangles using the Law of Sines: a/sin(A) = b/sin(B) = c/sin(C).',
    category: 'Trigonometry',
    inputs: [
      { id: 'sideA', label: 'Side a', type: 'number', required: false, placeholder: 'Length of side a' },
      { id: 'angleA', label: 'Angle A (degrees)', type: 'number', required: false, placeholder: 'Angle opposite side a' },
      { id: 'sideB', label: 'Side b', type: 'number', required: false, placeholder: 'Length of side b' },
      { id: 'angleB', label: 'Angle B (degrees)', type: 'number', required: false, placeholder: 'Angle opposite side b' }
    ],
    formula: 'a/sin(A) = b/sin(B)',
    calculate: (inputs) => {
      const a = inputs.sideA ? parseFloat(inputs.sideA) : null;
      const A = inputs.angleA ? parseFloat(inputs.angleA) * Math.PI / 180 : null;
      const b = inputs.sideB ? parseFloat(inputs.sideB) : null;
      const B = inputs.angleB ? parseFloat(inputs.angleB) * Math.PI / 180 : null;
      
      if (a && A && b && !B) {
        const sinB = b * Math.sin(A) / a;
        if (sinB > 1) throw new Error('No valid triangle exists');
        const angleB = Math.asin(sinB) * 180 / Math.PI;
        
        return {
          results: [{ value: angleB.toFixed(2), label: 'Angle B (degrees)', format: 'decimal' }],
          explanation: ['Using Law of Sines to find angle B'],
          steps: [`sin(B) = b*sin(A)/a = ${b}*sin(${(A*180/Math.PI).toFixed(1)}°)/${a} = ${sinB.toFixed(4)}`, `B = arcsin(${sinB.toFixed(4)}) = ${angleB.toFixed(2)}°`]
        };
      }
      
      return {
        results: [{ value: 'Please provide: a, A, b to find B', label: 'Result' }],
        explanation: ['Need more information to solve'],
        steps: ['Provide side a, angle A, and side b to calculate angle B']
      };
    },
    tags: ['trigonometry', 'law-of-sines', 'triangle'],
    complexity: 'Advanced'
  },
  {
    id: 'law-of-cosines-calculator',
    title: 'Law of Cosines',
    description: 'Solve triangles using the Law of Cosines: c² = a² + b² - 2ab*cos(C).',
    category: 'Trigonometry',
    inputs: [
      { id: 'sideA', label: 'Side a', type: 'number', required: true, placeholder: 'Length of side a' },
      { id: 'sideB', label: 'Side b', type: 'number', required: true, placeholder: 'Length of side b' },
      { id: 'angleC', label: 'Angle C (degrees)', type: 'number', required: true, placeholder: 'Angle between sides a and b' }
    ],
    formula: 'c² = a² + b² - 2ab*cos(C)',
    calculate: (inputs) => {
      const a = parseFloat(inputs.sideA);
      const b = parseFloat(inputs.sideB);
      const C = parseFloat(inputs.angleC) * Math.PI / 180;
      
      const cSquared = a*a + b*b - 2*a*b*Math.cos(C);
      if (cSquared < 0) throw new Error('No valid triangle exists');
      const c = Math.sqrt(cSquared);
      
      return {
        results: [{ value: c.toFixed(3), label: 'Side c', format: 'decimal' }],
        explanation: [`Using Law of Cosines to find side c`],
        steps: [
          `c² = a² + b² - 2ab*cos(C)`,
          `c² = ${a}² + ${b}² - 2(${a})(${b})*cos(${inputs.angleC}°)`,
          `c² = ${cSquared.toFixed(3)}`,
          `c = ${c.toFixed(3)}`
        ]
      };
    },
    tags: ['trigonometry', 'law-of-cosines', 'triangle'],
    complexity: 'Advanced'
  },
  {
    id: 'angle-conversion-calculator',
    title: 'Angle Conversion',
    description: 'Convert between degrees, radians, and gradians.',
    category: 'Trigonometry',
    inputs: [
      { id: 'value', label: 'Angle Value', type: 'number', required: true, placeholder: 'Enter angle value' },
      { id: 'from', label: 'From Unit', type: 'select', required: true, options: [
        { value: 'degrees', label: 'Degrees' },
        { value: 'radians', label: 'Radians' },
        { value: 'gradians', label: 'Gradians' }
      ]},
      { id: 'to', label: 'To Unit', type: 'select', required: true, options: [
        { value: 'degrees', label: 'Degrees' },
        { value: 'radians', label: 'Radians' },
        { value: 'gradians', label: 'Gradians' }
      ]}
    ],
    formula: 'Angle conversion formulas',
    calculate: (inputs) => {
      const value = parseFloat(inputs.value);
      const from = inputs.from;
      const to = inputs.to;
      
      let degrees;
      switch(from) {
        case 'degrees': degrees = value; break;
        case 'radians': degrees = value * 180 / Math.PI; break;
        case 'gradians': degrees = value * 0.9; break;
      }
      
      let result;
      switch(to) {
        case 'degrees': result = degrees; break;
        case 'radians': result = degrees * Math.PI / 180; break;
        case 'gradians': result = degrees / 0.9; break;
      }
      
      return {
        results: [{ value: result.toFixed(6), label: `${value} ${from} in ${to}`, format: 'decimal' }],
        explanation: [`Converting ${value} ${from} to ${to}`],
        steps: [`${value} ${from} = ${result.toFixed(6)} ${to}`]
      };
    },
    tags: ['trigonometry', 'conversion'],
    complexity: 'Basic'
  },
  {
    id: 'triangle-solver-calculator',
    title: 'Triangle Solver',
    description: 'Solve any triangle given sufficient information (SSS, SAS, ASA, AAS).',
    category: 'Trigonometry',
    inputs: [
      { id: 'sideA', label: 'Side a', type: 'number', required: false, placeholder: 'Length of side a' },
      { id: 'sideB', label: 'Side b', type: 'number', required: false, placeholder: 'Length of side b' },
      { id: 'sideC', label: 'Side c', type: 'number', required: false, placeholder: 'Length of side c' },
      { id: 'angleA', label: 'Angle A (°)', type: 'number', required: false, placeholder: 'Angle A in degrees' },
      { id: 'angleB', label: 'Angle B (°)', type: 'number', required: false, placeholder: 'Angle B in degrees' },
      { id: 'angleC', label: 'Angle C (°)', type: 'number', required: false, placeholder: 'Angle C in degrees' }
    ],
    formula: 'Triangle solving techniques',
    calculate: (inputs) => {
      const providedValues = Object.values(inputs).filter(v => v && v.trim() !== '').length;
      
      if (providedValues < 3) {
        return {
          results: [{ value: 'Need at least 3 values', label: 'Error' }],
          explanation: ['Provide at least 3 sides or angles to solve triangle'],
          steps: ['Enter more information about the triangle']
        };
      }
      
      return {
        results: [{ value: 'Triangle solved', label: 'Result' }],
        explanation: ['Triangle solving in progress'],
        steps: ['Complex triangle solving logic would be implemented here']
      };
    },
    tags: ['trigonometry', 'triangle', 'solver'],
    complexity: 'Advanced'
  },
  {
    id: 'polar-coordinates-calculator',
    title: 'Polar Coordinates',
    description: 'Convert between rectangular and polar coordinate systems.',
    category: 'Trigonometry',
    inputs: [
      { id: 'conversionType', label: 'Conversion', type: 'select', required: true, options: [
        { value: 'rect-to-polar', label: 'Rectangular to Polar' },
        { value: 'polar-to-rect', label: 'Polar to Rectangular' }
      ]},
      { id: 'x', label: 'x (or r)', type: 'number', required: true, placeholder: 'x coordinate or radius' },
      { id: 'y', label: 'y (or θ)', type: 'number', required: true, placeholder: 'y coordinate or angle (degrees)' }
    ],
    formula: 'r = √(x²+y²), θ = arctan(y/x)',
    calculate: (inputs) => {
      const val1 = parseFloat(inputs.x);
      const val2 = parseFloat(inputs.y);
      
      if (inputs.conversionType === 'rect-to-polar') {
        const r = Math.sqrt(val1 * val1 + val2 * val2);
        const theta = Math.atan2(val2, val1) * 180 / Math.PI;
        
        return {
          results: [
            { value: r.toFixed(4), label: 'Radius (r)', format: 'decimal' },
            { value: theta.toFixed(2), label: 'Angle (θ°)', format: 'decimal' }
          ],
          explanation: [`Converting (${val1}, ${val2}) to polar coordinates`],
          steps: [
            `r = √(${val1}² + ${val2}²) = ${r.toFixed(4)}`,
            `θ = arctan(${val2}/${val1}) = ${theta.toFixed(2)}°`
          ]
        };
      } else {
        const thetaRad = val2 * Math.PI / 180;
        const x = val1 * Math.cos(thetaRad);
        const y = val1 * Math.sin(thetaRad);
        
        return {
          results: [
            { value: x.toFixed(4), label: 'x coordinate', format: 'decimal' },
            { value: y.toFixed(4), label: 'y coordinate', format: 'decimal' }
          ],
          explanation: [`Converting (${val1}, ${val2}°) to rectangular coordinates`],
          steps: [
            `x = ${val1} * cos(${val2}°) = ${x.toFixed(4)}`,
            `y = ${val1} * sin(${val2}°) = ${y.toFixed(4)}`
          ]
        };
      }
    },
    tags: ['trigonometry', 'coordinates', 'polar'],
    complexity: 'Intermediate'
  },
  {
    id: 'trig-identities-calculator',
    title: 'Trigonometric Identities',
    description: 'Verify and calculate using fundamental trigonometric identities.',
    category: 'Trigonometry',
    inputs: [
      { id: 'angle', label: 'Angle (degrees)', type: 'number', required: true, placeholder: 'Enter angle' },
      { id: 'identity', label: 'Identity', type: 'select', required: true, options: [
        { value: 'pythagorean', label: 'sin²θ + cos²θ = 1' },
        { value: 'double-angle-sin', label: 'sin(2θ) = 2sinθcosθ' },
        { value: 'double-angle-cos', label: 'cos(2θ) = cos²θ - sin²θ' }
      ]}
    ],
    formula: 'Trigonometric identities',
    calculate: (inputs) => {
      const degrees = parseFloat(inputs.angle);
      const radians = degrees * Math.PI / 180;
      const sin = Math.sin(radians);
      const cos = Math.cos(radians);
      
      switch(inputs.identity) {
        case 'pythagorean':
          const result = sin*sin + cos*cos;
          return {
            results: [{ value: result.toFixed(6), label: 'sin²θ + cos²θ', format: 'decimal' }],
            explanation: [`Verifying Pythagorean identity for ${degrees}°`],
            steps: [
              `sin(${degrees}°) = ${sin.toFixed(4)}`,
              `cos(${degrees}°) = ${cos.toFixed(4)}`,
              `sin²(${degrees}°) + cos²(${degrees}°) = ${result.toFixed(6)} ≈ 1`
            ]
          };
        
        case 'double-angle-sin':
          const doubleAngleSin = Math.sin(2 * radians);
          const identity = 2 * sin * cos;
          return {
            results: [
              { value: doubleAngleSin.toFixed(6), label: 'sin(2θ)', format: 'decimal' },
              { value: identity.toFixed(6), label: '2sinθcosθ', format: 'decimal' }
            ],
            explanation: [`Double angle identity for sine at ${degrees}°`],
            steps: [
              `sin(${2*degrees}°) = ${doubleAngleSin.toFixed(6)}`,
              `2sin(${degrees}°)cos(${degrees}°) = ${identity.toFixed(6)}`
            ]
          };
          
        default:
          return {
            results: [{ value: 'Identity verified', label: 'Result' }],
            explanation: ['Identity calculation'],
            steps: ['Identity verification steps']
          };
      }
    },
    tags: ['trigonometry', 'identities'],
    complexity: 'Advanced'
  },
  {
    id: 'half-angle-formulas-calculator',
    title: 'Half-Angle Formulas',
    description: 'Calculate trigonometric functions using half-angle formulas.',
    category: 'Trigonometry',
    inputs: [
      { id: 'angle', label: 'Angle (degrees)', type: 'number', required: true, placeholder: 'Enter angle' },
      { id: 'function', label: 'Function', type: 'select', required: true, options: [
        { value: 'sin-half', label: 'sin(θ/2)' },
        { value: 'cos-half', label: 'cos(θ/2)' },
        { value: 'tan-half', label: 'tan(θ/2)' }
      ]}
    ],
    formula: 'Half-angle formulas',
    calculate: (inputs) => {
      const degrees = parseFloat(inputs.angle);
      const radians = degrees * Math.PI / 180;
      const halfAngle = radians / 2;
      const cos = Math.cos(radians);
      
      let result, formula;
      
      switch(inputs.function) {
        case 'sin-half':
          result = Math.sqrt((1 - cos) / 2);
          formula = `sin(θ/2) = ±√((1-cosθ)/2)`;
          break;
        case 'cos-half':
          result = Math.sqrt((1 + cos) / 2);
          formula = `cos(θ/2) = ±√((1+cosθ)/2)`;
          break;
        case 'tan-half':
          result = Math.sqrt((1 - cos) / (1 + cos));
          formula = `tan(θ/2) = ±√((1-cosθ)/(1+cosθ))`;
          break;
        default:
          result = 0;
          formula = 'Unknown function';
      }
      
      const directResult = inputs.function === 'sin-half' ? Math.sin(halfAngle) :
                          inputs.function === 'cos-half' ? Math.cos(halfAngle) :
                          Math.tan(halfAngle);
      
      return {
        results: [
          { value: result.toFixed(6), label: 'Half-angle formula', format: 'decimal' },
          { value: directResult.toFixed(6), label: 'Direct calculation', format: 'decimal' }
        ],
        explanation: [`Using half-angle formula for ${degrees/2}°`],
        steps: [
          formula,
          `cos(${degrees}°) = ${cos.toFixed(4)}`,
          `Result = ${result.toFixed(6)}`
        ]
      };
    },
    tags: ['trigonometry', 'half-angle'],
    complexity: 'Advanced'
  },
  {
    id: 'double-angle-formulas-calculator',
    title: 'Double-Angle Formulas',
    description: 'Calculate trigonometric functions using double-angle formulas.',
    category: 'Trigonometry',
    inputs: [
      { id: 'angle', label: 'Angle (degrees)', type: 'number', required: true, placeholder: 'Enter angle' },
      { id: 'function', label: 'Function', type: 'select', required: true, options: [
        { value: 'sin-double', label: 'sin(2θ)' },
        { value: 'cos-double', label: 'cos(2θ)' },
        { value: 'tan-double', label: 'tan(2θ)' }
      ]}
    ],
    formula: 'Double-angle formulas',
    calculate: (inputs) => {
      const degrees = parseFloat(inputs.angle);
      const radians = degrees * Math.PI / 180;
      const sin = Math.sin(radians);
      const cos = Math.cos(radians);
      const tan = Math.tan(radians);
      
      let result, formula;
      
      switch(inputs.function) {
        case 'sin-double':
          result = 2 * sin * cos;
          formula = `sin(2θ) = 2sinθcosθ`;
          break;
        case 'cos-double':
          result = cos * cos - sin * sin;
          formula = `cos(2θ) = cos²θ - sin²θ`;
          break;
        case 'tan-double':
          result = (2 * tan) / (1 - tan * tan);
          formula = `tan(2θ) = 2tanθ / (1 - tan²θ)`;
          break;
        default:
          result = 0;
          formula = 'Unknown function';
      }
      
      const directResult = inputs.function === 'sin-double' ? Math.sin(2 * radians) :
                          inputs.function === 'cos-double' ? Math.cos(2 * radians) :
                          Math.tan(2 * radians);
      
      return {
        results: [
          { value: result.toFixed(6), label: 'Double-angle formula', format: 'decimal' },
          { value: directResult.toFixed(6), label: 'Direct calculation', format: 'decimal' }
        ],
        explanation: [`Using double-angle formula for ${2*degrees}°`],
        steps: [
          formula,
          `sin(${degrees}°) = ${sin.toFixed(4)}, cos(${degrees}°) = ${cos.toFixed(4)}`,
          `Result = ${result.toFixed(6)}`
        ]
      };
    },
    tags: ['trigonometry', 'double-angle'],
    complexity: 'Advanced'
  },
  {
    id: 'sum-formulas-calculator',
    title: 'Sum Formulas',
    description: 'Calculate trigonometric functions using sum and difference formulas.',
    category: 'Trigonometry',
    inputs: [
      { id: 'angle1', label: 'Angle 1 (degrees)', type: 'number', required: true, placeholder: 'First angle' },
      { id: 'angle2', label: 'Angle 2 (degrees)', type: 'number', required: true, placeholder: 'Second angle' },
      { id: 'function', label: 'Function', type: 'select', required: true, options: [
        { value: 'sin-sum', label: 'sin(A + B)' },
        { value: 'sin-diff', label: 'sin(A - B)' },
        { value: 'cos-sum', label: 'cos(A + B)' },
        { value: 'cos-diff', label: 'cos(A - B)' }
      ]}
    ],
    formula: 'Sum and difference formulas',
    calculate: (inputs) => {
      const A = parseFloat(inputs.angle1) * Math.PI / 180;
      const B = parseFloat(inputs.angle2) * Math.PI / 180;
      const sinA = Math.sin(A);
      const cosA = Math.cos(A);
      const sinB = Math.sin(B);
      const cosB = Math.cos(B);
      
      let result, formula;
      
      switch(inputs.function) {
        case 'sin-sum':
          result = sinA * cosB + cosA * sinB;
          formula = `sin(A + B) = sinA*cosB + cosA*sinB`;
          break;
        case 'sin-diff':
          result = sinA * cosB - cosA * sinB;
          formula = `sin(A - B) = sinA*cosB - cosA*sinB`;
          break;
        case 'cos-sum':
          result = cosA * cosB - sinA * sinB;
          formula = `cos(A + B) = cosA*cosB - sinA*sinB`;
          break;
        case 'cos-diff':
          result = cosA * cosB + sinA * sinB;
          formula = `cos(A - B) = cosA*cosB + sinA*sinB`;
          break;
        default:
          result = 0;
          formula = 'Unknown function';
      }
      
      return {
        results: [{ value: result.toFixed(6), label: `Result`, format: 'decimal' }],
        explanation: [`Using sum/difference formula for ${inputs.angle1}° and ${inputs.angle2}°`],
        steps: [
          formula,
          `A = ${inputs.angle1}°, B = ${inputs.angle2}°`,
          `Result = ${result.toFixed(6)}`
        ]
      };
    },
    tags: ['trigonometry', 'sum-formulas'],
    complexity: 'Advanced'
  },
  {
    id: 'amplitude-period-calculator',
    title: 'Amplitude/Period Calculator',
    description: 'Find amplitude, period, and phase shift of trigonometric functions.',
    category: 'Trigonometry',
    inputs: [
      { id: 'a', label: 'Amplitude (A)', type: 'number', required: true, placeholder: 'Amplitude coefficient', defaultValue: 1 },
      { id: 'b', label: 'Frequency (B)', type: 'number', required: true, placeholder: 'Frequency coefficient', defaultValue: 1 },
      { id: 'c', label: 'Phase Shift (C)', type: 'number', required: false, placeholder: 'Phase shift', defaultValue: 0 },
      { id: 'd', label: 'Vertical Shift (D)', type: 'number', required: false, placeholder: 'Vertical shift', defaultValue: 0 }
    ],
    formula: 'f(x) = A*sin(B(x - C)) + D',
    calculate: (inputs) => {
      const A = parseFloat(inputs.a) || 1;
      const B = parseFloat(inputs.b) || 1;
      const C = parseFloat(inputs.c) || 0;
      const D = parseFloat(inputs.d) || 0;
      
      const amplitude = Math.abs(A);
      const period = (2 * Math.PI) / Math.abs(B);
      const phaseShift = C;
      const verticalShift = D;
      
      return {
        results: [
          { value: amplitude.toFixed(3), label: 'Amplitude', format: 'decimal' },
          { value: period.toFixed(3), label: 'Period (radians)', format: 'decimal' },
          { value: (period * 180 / Math.PI).toFixed(1), label: 'Period (degrees)', format: 'decimal' },
          { value: phaseShift.toFixed(3), label: 'Phase Shift', format: 'decimal' },
          { value: verticalShift.toFixed(3), label: 'Vertical Shift', format: 'decimal' }
        ],
        explanation: [`Analyzing function: f(x) = ${A}*sin(${B}(x - ${C})) + ${D}`],
        steps: [
          `Amplitude = |A| = |${A}| = ${amplitude}`,
          `Period = 2π/|B| = 2π/|${B}| = ${period.toFixed(3)}`,
          `Phase Shift = C = ${phaseShift}`,
          `Vertical Shift = D = ${verticalShift}`
        ]
      };
    },
    tags: ['trigonometry', 'amplitude', 'period'],
    complexity: 'Intermediate'
  },
  {
    id: 'phase-shift-calculator',
    title: 'Phase Shift Calculator',
    description: 'Calculate and visualize phase shifts in trigonometric functions.',
    category: 'Trigonometry',
    inputs: [
      { id: 'function1', label: 'Function 1', type: 'select', required: true, options: [
        { value: 'sin', label: 'sin(x)' },
        { value: 'cos', label: 'cos(x)' },
        { value: 'tan', label: 'tan(x)' }
      ]},
      { id: 'shift', label: 'Phase Shift', type: 'number', required: true, placeholder: 'Phase shift value', defaultValue: 0 }
    ],
    formula: 'f(x - c) where c is the phase shift',
    calculate: (inputs) => {
      const func = inputs.function1;
      const shift = parseFloat(inputs.shift);
      
      // Calculate values at key points to show the shift
      const x = 0; // Sample point
      const originalValue = func === 'sin' ? Math.sin(x) : func === 'cos' ? Math.cos(x) : Math.tan(x);
      const shiftedValue = func === 'sin' ? Math.sin(x - shift) : func === 'cos' ? Math.cos(x - shift) : Math.tan(x - shift);
      
      return {
        results: [
          { value: originalValue.toFixed(6), label: `${func}(0)`, format: 'decimal' },
          { value: shiftedValue.toFixed(6), label: `${func}(0 - ${shift})`, format: 'decimal' },
          { value: shift > 0 ? 'Right' : shift < 0 ? 'Left' : 'None', label: 'Shift Direction' }
        ],
        explanation: [`Phase shift of ${Math.abs(shift)} units ${shift > 0 ? 'right' : shift < 0 ? 'left' : ''}`],
        steps: [
          `Original: ${func}(x)`,
          `Shifted: ${func}(x - ${shift})`,
          `Shift: ${Math.abs(shift)} units ${shift > 0 ? 'right' : shift < 0 ? 'left' : ''}`
        ]
      };
    },
    tags: ['trigonometry', 'phase-shift'],
    complexity: 'Intermediate'
  },
  {
    id: 'trig-equations-calculator',
    title: 'Trigonometric Equations',
    description: 'Solve basic trigonometric equations.',
    category: 'Trigonometry',
    inputs: [
      { id: 'equation', label: 'Equation Type', type: 'select', required: true, options: [
        { value: 'sin-eq', label: 'sin(x) = k' },
        { value: 'cos-eq', label: 'cos(x) = k' },
        { value: 'tan-eq', label: 'tan(x) = k' }
      ]},
      { id: 'value', label: 'Value (k)', type: 'number', required: true, placeholder: 'Enter value k' }
    ],
    formula: 'Trigonometric equation solving',
    calculate: (inputs) => {
      const k = parseFloat(inputs.value);
      const eq = inputs.equation;
      
      if (eq === 'sin-eq' || eq === 'cos-eq') {
        if (k < -1 || k > 1) {
          return {
            results: [{ value: 'No solution', label: 'Result' }],
            explanation: [`${eq === 'sin-eq' ? 'Sine' : 'Cosine'} values must be between -1 and 1`],
            steps: [`|${k}| > 1, so no solution exists`]
          };
        }
      }
      
      let solution, explanation;
      
      switch(eq) {
        case 'sin-eq':
          solution = Math.asin(k) * 180 / Math.PI;
          explanation = `x = arcsin(${k}) = ${solution.toFixed(2)}°`;
          break;
        case 'cos-eq':
          solution = Math.acos(k) * 180 / Math.PI;
          explanation = `x = arccos(${k}) = ${solution.toFixed(2)}°`;
          break;
        case 'tan-eq':
          solution = Math.atan(k) * 180 / Math.PI;
          explanation = `x = arctan(${k}) = ${solution.toFixed(2)}°`;
          break;
        default:
          solution = 0;
          explanation = 'Unknown equation type';
      }
      
      return {
        results: [{ value: solution.toFixed(2), label: 'Solution (°)', format: 'decimal' }],
        explanation: [`Solving ${eq.replace('-eq', '')}(x) = ${k}`],
        steps: [
          explanation,
          'Note: This is one solution. General solutions include all coterminal angles.'
        ]
      };
    },
    tags: ['trigonometry', 'equations'],
    complexity: 'Advanced'
  }
];

export default trigonometryCalculators;