import { Calculator } from '../types/calculator';

// Geometry Calculators (14 total)
export const geometryCalculators: Calculator[] = [
  {
    id: 'area-calculator',
    title: 'Area Calculator',
    description: 'Calculate area of various geometric shapes.',
    category: 'Geometry',
    inputs: [
      { id: 'shape', label: 'Shape', type: 'select', required: true, options: [
        { value: 'rectangle', label: 'Rectangle' },
        { value: 'circle', label: 'Circle' },
        { value: 'triangle', label: 'Triangle' },
        { value: 'square', label: 'Square' }
      ]},
      { id: 'length', label: 'Length/Side (units)', type: 'number', required: false, placeholder: 'Length' },
      { id: 'width', label: 'Width (units)', type: 'number', required: false, placeholder: 'Width' },
      { id: 'radius', label: 'Radius (units)', type: 'number', required: false, placeholder: 'Radius' },
      { id: 'base', label: 'Base (units)', type: 'number', required: false, placeholder: 'Base' },
      { id: 'height', label: 'Height (units)', type: 'number', required: false, placeholder: 'Height' }
    ],
    formula: 'Area formulas for geometric shapes',
    calculate: (inputs) => {
      const shape = inputs.shape;
      
      switch(shape) {
        case 'rectangle':
          const length = parseFloat(inputs.length);
          const width = parseFloat(inputs.width);
          if (!length || !width) throw new Error('Length and width are required');
          const rectArea = length * width;
          return {
            results: [{ value: rectArea, label: 'Area', unit: 'units²', format: 'decimal' }],
            explanation: [`Area of rectangle = length × width`],
            steps: [`Area = ${length} × ${width} = ${rectArea} units²`]
          };
        
        case 'circle':
          const radius = parseFloat(inputs.radius);
          if (!radius) throw new Error('Radius is required');
          const circleArea = Math.PI * radius * radius;
          return {
            results: [{ value: circleArea, label: 'Area', unit: 'units²', format: 'decimal' }],
            explanation: [`Area of circle = πr²`],
            steps: [`Area = π × ${radius}² = ${circleArea.toFixed(4)} units²`]
          };
        
        case 'triangle':
          const base = parseFloat(inputs.base);
          const height = parseFloat(inputs.height);
          if (!base || !height) throw new Error('Base and height are required');
          const triangleArea = 0.5 * base * height;
          return {
            results: [{ value: triangleArea, label: 'Area', unit: 'units²', format: 'decimal' }],
            explanation: [`Area of triangle = ½ × base × height`],
            steps: [`Area = ½ × ${base} × ${height} = ${triangleArea} units²`]
          };
        
        case 'square':
          const side = parseFloat(inputs.length);
          if (!side) throw new Error('Side length is required');
          const squareArea = side * side;
          return {
            results: [{ value: squareArea, label: 'Area', unit: 'units²', format: 'decimal' }],
            explanation: [`Area of square = side²`],
            steps: [`Area = ${side}² = ${squareArea} units²`]
          };
        
        default:
          throw new Error('Invalid shape selected');
      }
    },
    tags: ['geometry', 'area', 'shapes'],
    complexity: 'Basic'
  },
  
  {
    id: 'volume-calculator',
    title: 'Volume Calculator',
    description: 'Calculate volume of 3D shapes.',
    category: 'Geometry',
    inputs: [
      { id: 'shape', label: '3D Shape', type: 'select', required: true, options: [
        { value: 'cube', label: 'Cube' },
        { value: 'sphere', label: 'Sphere' },
        { value: 'cylinder', label: 'Cylinder' },
        { value: 'rectangular_prism', label: 'Rectangular Prism' }
      ]},
      { id: 'side', label: 'Side Length', type: 'number', required: false, placeholder: 'Side length' },
      { id: 'radius', label: 'Radius', type: 'number', required: false, placeholder: 'Radius' },
      { id: 'height', label: 'Height', type: 'number', required: false, placeholder: 'Height' },
      { id: 'length', label: 'Length', type: 'number', required: false, placeholder: 'Length' },
      { id: 'width', label: 'Width', type: 'number', required: false, placeholder: 'Width' }
    ],
    formula: 'Volume formulas for 3D shapes',
    calculate: (inputs) => {
      const shape = inputs.shape;
      
      switch(shape) {
        case 'cube':
          const side = parseFloat(inputs.side);
          if (!side) throw new Error('Side length is required');
          const cubeVolume = side * side * side;
          return {
            results: [{ value: cubeVolume, label: 'Volume', unit: 'units³', format: 'decimal' }],
            explanation: [`Volume of cube = side³`],
            steps: [`Volume = ${side}³ = ${cubeVolume} units³`]
          };
        
        case 'sphere':
          const radius = parseFloat(inputs.radius);
          if (!radius) throw new Error('Radius is required');
          const sphereVolume = (4/3) * Math.PI * radius * radius * radius;
          return {
            results: [{ value: sphereVolume, label: 'Volume', unit: 'units³', format: 'decimal' }],
            explanation: [`Volume of sphere = (4/3)πr³`],
            steps: [`Volume = (4/3)π × ${radius}³ = ${sphereVolume.toFixed(4)} units³`]
          };
        
        case 'cylinder':
          const cylRadius = parseFloat(inputs.radius);
          const cylHeight = parseFloat(inputs.height);
          if (!cylRadius || !cylHeight) throw new Error('Radius and height are required');
          const cylinderVolume = Math.PI * cylRadius * cylRadius * cylHeight;
          return {
            results: [{ value: cylinderVolume, label: 'Volume', unit: 'units³', format: 'decimal' }],
            explanation: [`Volume of cylinder = πr²h`],
            steps: [`Volume = π × ${cylRadius}² × ${cylHeight} = ${cylinderVolume.toFixed(4)} units³`]
          };
        
        case 'rectangular_prism':
          const length = parseFloat(inputs.length);
          const width = parseFloat(inputs.width);
          const height = parseFloat(inputs.height);
          if (!length || !width || !height) throw new Error('Length, width, and height are required');
          const prismVolume = length * width * height;
          return {
            results: [{ value: prismVolume, label: 'Volume', unit: 'units³', format: 'decimal' }],
            explanation: [`Volume of rectangular prism = length × width × height`],
            steps: [`Volume = ${length} × ${width} × ${height} = ${prismVolume} units³`]
          };
        
        default:
          throw new Error('Shape calculation not implemented');
      }
    },
    tags: ['geometry', 'volume', '3d-shapes'],
    complexity: 'Basic'
  },
  
  {
    id: 'perimeter-calculator',
    title: 'Perimeter Calculator',
    description: 'Calculate perimeter/circumference of geometric shapes.',
    category: 'Geometry',
    inputs: [
      { id: 'shape', label: 'Shape', type: 'select', required: true, options: [
        { value: 'rectangle', label: 'Rectangle' },
        { value: 'circle', label: 'Circle' },
        { value: 'square', label: 'Square' },
        { value: 'triangle', label: 'Triangle (Equilateral)' }
      ]},
      { id: 'length', label: 'Length (units)', type: 'number', required: false, placeholder: 'Length' },
      { id: 'width', label: 'Width (units)', type: 'number', required: false, placeholder: 'Width' },
      { id: 'radius', label: 'Radius (units)', type: 'number', required: false, placeholder: 'Radius' },
      { id: 'side', label: 'Side Length (units)', type: 'number', required: false, placeholder: 'Side length' }
    ],
    formula: 'Perimeter formulas for geometric shapes',
    calculate: (inputs) => {
      const shape = inputs.shape;
      
      switch(shape) {
        case 'rectangle':
          const length = parseFloat(inputs.length);
          const width = parseFloat(inputs.width);
          if (!length || !width) throw new Error('Length and width are required');
          const rectPerimeter = 2 * (length + width);
          return {
            results: [{ value: rectPerimeter, label: 'Perimeter', unit: 'units', format: 'decimal' }],
            explanation: ['Perimeter of rectangle = 2(length + width)'],
            steps: [`Perimeter = 2(${length} + ${width}) = ${rectPerimeter} units`]
          };
        
        case 'circle':
          const radius = parseFloat(inputs.radius);
          if (!radius) throw new Error('Radius is required');
          const circumference = 2 * Math.PI * radius;
          return {
            results: [{ value: circumference, label: 'Circumference', unit: 'units', format: 'decimal' }],
            explanation: ['Circumference of circle = 2πr'],
            steps: [`Circumference = 2π × ${radius} = ${circumference.toFixed(4)} units`]
          };
        
        case 'square':
          const side = parseFloat(inputs.side);
          if (!side) throw new Error('Side length is required');
          const squarePerimeter = 4 * side;
          return {
            results: [{ value: squarePerimeter, label: 'Perimeter', unit: 'units', format: 'decimal' }],
            explanation: ['Perimeter of square = 4 × side'],
            steps: [`Perimeter = 4 × ${side} = ${squarePerimeter} units`]
          };
        
        case 'triangle':
          const triSide = parseFloat(inputs.side);
          if (!triSide) throw new Error('Side length is required');
          const trianglePerimeter = 3 * triSide;
          return {
            results: [{ value: trianglePerimeter, label: 'Perimeter', unit: 'units', format: 'decimal' }],
            explanation: ['Perimeter of equilateral triangle = 3 × side'],
            steps: [`Perimeter = 3 × ${triSide} = ${trianglePerimeter} units`]
          };
        
        default:
          throw new Error('Invalid shape selected');
      }
    },
    tags: ['geometry', 'perimeter', 'circumference'],
    complexity: 'Basic'
  },
  
  {
    id: 'surface-area-calculator',
    title: 'Surface Area Calculator',
    description: 'Calculate surface area of 3D shapes.',
    category: 'Geometry',
    inputs: [
      { id: 'shape', label: '3D Shape', type: 'select', required: true, options: [
        { value: 'cube', label: 'Cube' },
        { value: 'sphere', label: 'Sphere' },
        { value: 'cylinder', label: 'Cylinder' },
        { value: 'rectangular_prism', label: 'Rectangular Prism' }
      ]},
      { id: 'side', label: 'Side Length', type: 'number', required: false, placeholder: 'Side length' },
      { id: 'radius', label: 'Radius', type: 'number', required: false, placeholder: 'Radius' },
      { id: 'height', label: 'Height', type: 'number', required: false, placeholder: 'Height' },
      { id: 'length', label: 'Length', type: 'number', required: false, placeholder: 'Length' },
      { id: 'width', label: 'Width', type: 'number', required: false, placeholder: 'Width' }
    ],
    formula: 'Surface area formulas for 3D shapes',
    calculate: (inputs) => {
      const shape = inputs.shape;
      
      switch(shape) {
        case 'cube':
          const side = parseFloat(inputs.side);
          if (!side) throw new Error('Side length is required');
          const cubeSA = 6 * side * side;
          return {
            results: [{ value: cubeSA, label: 'Surface Area', unit: 'units²', format: 'decimal' }],
            explanation: ['Surface area of cube = 6 × side²'],
            steps: [`Surface Area = 6 × ${side}² = ${cubeSA} units²`]
          };
        
        case 'sphere':
          const radius = parseFloat(inputs.radius);
          if (!radius) throw new Error('Radius is required');
          const sphereSA = 4 * Math.PI * radius * radius;
          return {
            results: [{ value: sphereSA, label: 'Surface Area', unit: 'units²', format: 'decimal' }],
            explanation: ['Surface area of sphere = 4πr²'],
            steps: [`Surface Area = 4π × ${radius}² = ${sphereSA.toFixed(4)} units²`]
          };
        
        case 'cylinder':
          const cylRadius = parseFloat(inputs.radius);
          const cylHeight = parseFloat(inputs.height);
          if (!cylRadius || !cylHeight) throw new Error('Radius and height are required');
          const cylinderSA = 2 * Math.PI * cylRadius * (cylRadius + cylHeight);
          return {
            results: [{ value: cylinderSA, label: 'Surface Area', unit: 'units²', format: 'decimal' }],
            explanation: ['Surface area of cylinder = 2πr(r + h)'],
            steps: [`Surface Area = 2π × ${cylRadius} × (${cylRadius} + ${cylHeight}) = ${cylinderSA.toFixed(4)} units²`]
          };
        
        case 'rectangular_prism':
          const length = parseFloat(inputs.length);
          const width = parseFloat(inputs.width);
          const height = parseFloat(inputs.height);
          if (!length || !width || !height) throw new Error('Length, width, and height are required');
          const prismSA = 2 * (length * width + width * height + height * length);
          return {
            results: [{ value: prismSA, label: 'Surface Area', unit: 'units²', format: 'decimal' }],
            explanation: ['Surface area of rectangular prism = 2(lw + wh + hl)'],
            steps: [`Surface Area = 2(${length}×${width} + ${width}×${height} + ${height}×${length}) = ${prismSA} units²`]
          };
        
        default:
          throw new Error('Invalid shape selected');
      }
    },
    tags: ['geometry', 'surface-area', '3d-shapes'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'distance-calculator',
    title: 'Distance Calculator (2D & 3D)',
    description: 'Calculate distance between two points in 2D or 3D space.',
    category: 'Geometry',
    inputs: [
      { id: 'dimension', label: 'Dimension', type: 'select', required: true, options: [
        { value: '2d', label: '2D (x, y)' },
        { value: '3d', label: '3D (x, y, z)' }
      ]},
      { id: 'x1', label: 'Point 1 - X coordinate', type: 'number', required: true, placeholder: 'x1' },
      { id: 'y1', label: 'Point 1 - Y coordinate', type: 'number', required: true, placeholder: 'y1' },
      { id: 'z1', label: 'Point 1 - Z coordinate', type: 'number', required: false, placeholder: 'z1' },
      { id: 'x2', label: 'Point 2 - X coordinate', type: 'number', required: true, placeholder: 'x2' },
      { id: 'y2', label: 'Point 2 - Y coordinate', type: 'number', required: true, placeholder: 'y2' },
      { id: 'z2', label: 'Point 2 - Z coordinate', type: 'number', required: false, placeholder: 'z2' }
    ],
    formula: '2D: d = √((x2-x1)² + (y2-y1)²), 3D: d = √((x2-x1)² + (y2-y1)² + (z2-z1)²)',
    calculate: (inputs) => {
      const dimension = inputs.dimension;
      const x1 = parseFloat(inputs.x1);
      const y1 = parseFloat(inputs.y1);
      const x2 = parseFloat(inputs.x2);
      const y2 = parseFloat(inputs.y2);
      
      if (dimension === '2d') {
        const distance2D = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return {
          results: [{ value: distance2D, label: 'Distance', unit: 'units', format: 'decimal' }],
          explanation: ['Distance in 2D = √((x2-x1)² + (y2-y1)²)'],
          steps: [
            `Points: (${x1}, ${y1}) and (${x2}, ${y2})`,
            `Distance = √((${x2}-${x1})² + (${y2}-${y1})²)`,
            `Distance = √(${(x2-x1)**2} + ${(y2-y1)**2}) = ${distance2D.toFixed(4)} units`
          ]
        };
      } else {
        const z1 = parseFloat(inputs.z1);
        const z2 = parseFloat(inputs.z2);
        if (isNaN(z1) || isNaN(z2)) throw new Error('Z coordinates are required for 3D distance');
        
        const distance3D = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
        return {
          results: [{ value: distance3D, label: 'Distance', unit: 'units', format: 'decimal' }],
          explanation: ['Distance in 3D = √((x2-x1)² + (y2-y1)² + (z2-z1)²)'],
          steps: [
            `Points: (${x1}, ${y1}, ${z1}) and (${x2}, ${y2}, ${z2})`,
            `Distance = √((${x2}-${x1})² + (${y2}-${y1})² + (${z2}-${z1})²)`,
            `Distance = √(${(x2-x1)**2} + ${(y2-y1)**2} + ${(z2-z1)**2}) = ${distance3D.toFixed(4)} units`
          ]
        };
      }
    },
    tags: ['geometry', 'distance', 'coordinates', '2d', '3d'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'midpoint-calculator',
    title: 'Midpoint Calculator',
    description: 'Find the midpoint between two points in 2D or 3D space.',
    category: 'Geometry',
    inputs: [
      { id: 'dimension', label: 'Dimension', type: 'select', required: true, options: [
        { value: '2d', label: '2D (x, y)' },
        { value: '3d', label: '3D (x, y, z)' }
      ]},
      { id: 'x1', label: 'Point 1 - X coordinate', type: 'number', required: true, placeholder: 'x1' },
      { id: 'y1', label: 'Point 1 - Y coordinate', type: 'number', required: true, placeholder: 'y1' },
      { id: 'z1', label: 'Point 1 - Z coordinate', type: 'number', required: false, placeholder: 'z1' },
      { id: 'x2', label: 'Point 2 - X coordinate', type: 'number', required: true, placeholder: 'x2' },
      { id: 'y2', label: 'Point 2 - Y coordinate', type: 'number', required: true, placeholder: 'y2' },
      { id: 'z2', label: 'Point 2 - Z coordinate', type: 'number', required: false, placeholder: 'z2' }
    ],
    formula: '2D: M = ((x1+x2)/2, (y1+y2)/2), 3D: M = ((x1+x2)/2, (y1+y2)/2, (z1+z2)/2)',
    calculate: (inputs) => {
      const dimension = inputs.dimension;
      const x1 = parseFloat(inputs.x1);
      const y1 = parseFloat(inputs.y1);
      const x2 = parseFloat(inputs.x2);
      const y2 = parseFloat(inputs.y2);
      
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      
      if (dimension === '2d') {
        return {
          results: [
            { value: midX, label: 'Midpoint X', format: 'decimal' },
            { value: midY, label: 'Midpoint Y', format: 'decimal' }
          ],
          explanation: ['Midpoint in 2D = ((x1+x2)/2, (y1+y2)/2)'],
          steps: [
            `Points: (${x1}, ${y1}) and (${x2}, ${y2})`,
            `Midpoint X = (${x1} + ${x2})/2 = ${midX}`,
            `Midpoint Y = (${y1} + ${y2})/2 = ${midY}`,
            `Midpoint = (${midX}, ${midY})`
          ]
        };
      } else {
        const z1 = parseFloat(inputs.z1);
        const z2 = parseFloat(inputs.z2);
        if (isNaN(z1) || isNaN(z2)) throw new Error('Z coordinates are required for 3D midpoint');
        
        const midZ = (z1 + z2) / 2;
        return {
          results: [
            { value: midX, label: 'Midpoint X', format: 'decimal' },
            { value: midY, label: 'Midpoint Y', format: 'decimal' },
            { value: midZ, label: 'Midpoint Z', format: 'decimal' }
          ],
          explanation: ['Midpoint in 3D = ((x1+x2)/2, (y1+y2)/2, (z1+z2)/2)'],
          steps: [
            `Points: (${x1}, ${y1}, ${z1}) and (${x2}, ${y2}, ${z2})`,
            `Midpoint X = (${x1} + ${x2})/2 = ${midX}`,
            `Midpoint Y = (${y1} + ${y2})/2 = ${midY}`,
            `Midpoint Z = (${z1} + ${z2})/2 = ${midZ}`,
            `Midpoint = (${midX}, ${midY}, ${midZ})`
          ]
        };
      }
    },
    tags: ['geometry', 'midpoint', 'coordinates'],
    complexity: 'Basic'
  },
  
  {
    id: 'slope-calculator',
    title: 'Slope Calculator',
    description: 'Calculate the slope of a line between two points.',
    category: 'Geometry',
    inputs: [
      { id: 'x1', label: 'Point 1 - X coordinate', type: 'number', required: true, placeholder: 'x1' },
      { id: 'y1', label: 'Point 1 - Y coordinate', type: 'number', required: true, placeholder: 'y1' },
      { id: 'x2', label: 'Point 2 - X coordinate', type: 'number', required: true, placeholder: 'x2' },
      { id: 'y2', label: 'Point 2 - Y coordinate', type: 'number', required: true, placeholder: 'y2' }
    ],
    formula: 'Slope = (y2 - y1) / (x2 - x1)',
    calculate: (inputs) => {
      const x1 = parseFloat(inputs.x1);
      const y1 = parseFloat(inputs.y1);
      const x2 = parseFloat(inputs.x2);
      const y2 = parseFloat(inputs.y2);
      
      if (x2 === x1) {
        return {
          results: [{ value: 'Undefined', label: 'Slope' }],
          explanation: ['Slope is undefined (vertical line)'],
          steps: [
            `Points: (${x1}, ${y1}) and (${x2}, ${y2})`,
            `x2 - x1 = ${x2} - ${x1} = 0`,
            'Slope = (y2 - y1) / 0 = undefined (vertical line)'
          ]
        };
      }
      
      const slope = (y2 - y1) / (x2 - x1);
      const angle = Math.atan(slope) * (180 / Math.PI);
      
      return {
        results: [
          { value: slope, label: 'Slope', format: 'decimal' },
          { value: angle, label: 'Angle', unit: 'degrees', format: 'decimal' }
        ],
        explanation: ['Slope = (y2 - y1) / (x2 - x1)'],
        steps: [
          `Points: (${x1}, ${y1}) and (${x2}, ${y2})`,
          `Slope = (${y2} - ${y1}) / (${x2} - ${x1}) = ${y2 - y1} / ${x2 - x1} = ${slope.toFixed(4)}`,
          `Angle = arctan(${slope.toFixed(4)}) = ${angle.toFixed(2)}°`
        ]
      };
    },
    tags: ['geometry', 'slope', 'line', 'coordinates'],
    complexity: 'Basic'
  },
  
  {
    id: 'pythagorean-theorem',
    title: 'Pythagorean Theorem Calculator',
    description: 'Calculate missing side of a right triangle using a² + b² = c².',
    category: 'Geometry',
    inputs: [
      { id: 'side_a', label: 'Side a (units)', type: 'number', required: false, placeholder: 'First leg' },
      { id: 'side_b', label: 'Side b (units)', type: 'number', required: false, placeholder: 'Second leg' },
      { id: 'side_c', label: 'Side c (hypotenuse)', type: 'number', required: false, placeholder: 'Hypotenuse' }
    ],
    formula: 'Pythagorean Theorem: a² + b² = c²',
    calculate: (inputs) => {
      const a = parseFloat(inputs.side_a);
      const b = parseFloat(inputs.side_b);
      const c = parseFloat(inputs.side_c);
      
      const providedCount = [a, b, c].filter(x => !isNaN(x) && x > 0).length;
      if (providedCount !== 2) {
        throw new Error('Please provide exactly 2 of the 3 sides');
      }
      
      if (isNaN(a)) {
        if (c <= b) throw new Error('Hypotenuse must be longer than the other leg');
        const sideA = Math.sqrt(c * c - b * b);
        return {
          results: [{ value: sideA, label: 'Side a', unit: 'units', format: 'decimal' }],
          explanation: ['Using Pythagorean theorem: a² = c² - b²'],
          steps: [
            `Given: b = ${b}, c = ${c}`,
            `a² = c² - b² = ${c}² - ${b}² = ${c*c} - ${b*b} = ${c*c - b*b}`,
            `a = √${c*c - b*b} = ${sideA.toFixed(4)} units`
          ]
        };
      } else if (isNaN(b)) {
        if (c <= a) throw new Error('Hypotenuse must be longer than the other leg');
        const sideB = Math.sqrt(c * c - a * a);
        return {
          results: [{ value: sideB, label: 'Side b', unit: 'units', format: 'decimal' }],
          explanation: ['Using Pythagorean theorem: b² = c² - a²'],
          steps: [
            `Given: a = ${a}, c = ${c}`,
            `b² = c² - a² = ${c}² - ${a}² = ${c*c} - ${a*a} = ${c*c - a*a}`,
            `b = √${c*c - a*a} = ${sideB.toFixed(4)} units`
          ]
        };
      } else {
        const sideC = Math.sqrt(a * a + b * b);
        return {
          results: [{ value: sideC, label: 'Hypotenuse c', unit: 'units', format: 'decimal' }],
          explanation: ['Using Pythagorean theorem: c² = a² + b²'],
          steps: [
            `Given: a = ${a}, b = ${b}`,
            `c² = a² + b² = ${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a + b*b}`,
            `c = √${a*a + b*b} = ${sideC.toFixed(4)} units`
          ]
        };
      }
    },
    tags: ['geometry', 'pythagorean-theorem', 'right-triangle'],
    complexity: 'Basic'
  },
  
  {
    id: 'triangle-area-heron',
    title: 'Triangle Area (Heron\'s Formula)',
    description: 'Calculate triangle area using Heron\'s formula when you know all three sides.',
    category: 'Geometry',
    inputs: [
      { id: 'side_a', label: 'Side a (units)', type: 'number', required: true, placeholder: 'First side' },
      { id: 'side_b', label: 'Side b (units)', type: 'number', required: true, placeholder: 'Second side' },
      { id: 'side_c', label: 'Side c (units)', type: 'number', required: true, placeholder: 'Third side' }
    ],
    formula: 'Area = √[s(s-a)(s-b)(s-c)], where s = (a+b+c)/2',
    calculate: (inputs) => {
      const a = parseFloat(inputs.side_a);
      const b = parseFloat(inputs.side_b);
      const c = parseFloat(inputs.side_c);
      
      if (a <= 0 || b <= 0 || c <= 0) {
        throw new Error('All sides must be positive');
      }
      
      // Check triangle inequality
      if (a + b <= c || a + c <= b || b + c <= a) {
        throw new Error('These sides cannot form a triangle (triangle inequality violation)');
      }
      
      const s = (a + b + c) / 2; // semi-perimeter
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      
      return {
        results: [{ value: area, label: 'Triangle Area', unit: 'units²', format: 'decimal' }],
        explanation: ["Calculating area using Heron's formula"],
        steps: [
          `Given sides: a = ${a}, b = ${b}, c = ${c}`,
          `Semi-perimeter: s = (a + b + c)/2 = (${a} + ${b} + ${c})/2 = ${s}`,
          `Area = √[s(s-a)(s-b)(s-c)]`,
          `Area = √[${s} × ${s-a} × ${s-b} × ${s-c}] = ${area.toFixed(4)} units²`
        ]
      };
    },
    tags: ['geometry', 'triangle', 'area', 'herons-formula'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'circle-properties',
    title: 'Circle Properties Calculator',
    description: 'Calculate radius, diameter, circumference, and area of a circle.',
    category: 'Geometry',
    inputs: [
      { id: 'known_value', label: 'Known Property', type: 'select', required: true, options: [
        { value: 'radius', label: 'Radius' },
        { value: 'diameter', label: 'Diameter' },
        { value: 'circumference', label: 'Circumference' },
        { value: 'area', label: 'Area' }
      ]},
      { id: 'value', label: 'Value', type: 'number', required: true, placeholder: 'Enter the known value' }
    ],
    formula: 'r = radius, d = 2r, C = 2πr, A = πr²',
    calculate: (inputs) => {
      const knownProperty = inputs.known_value;
      const value = parseFloat(inputs.value);
      
      if (value <= 0) {
        throw new Error('Value must be positive');
      }
      
      let radius, diameter, circumference, area;
      
      switch(knownProperty) {
        case 'radius':
          radius = value;
          break;
        case 'diameter':
          radius = value / 2;
          break;
        case 'circumference':
          radius = value / (2 * Math.PI);
          break;
        case 'area':
          radius = Math.sqrt(value / Math.PI);
          break;
        default:
          throw new Error('Invalid property selected');
      }
      
      diameter = 2 * radius;
      circumference = 2 * Math.PI * radius;
      area = Math.PI * radius * radius;
      
      return {
        results: [
          { value: radius, label: 'Radius', unit: 'units', format: 'decimal' },
          { value: diameter, label: 'Diameter', unit: 'units', format: 'decimal' },
          { value: circumference, label: 'Circumference', unit: 'units', format: 'decimal' },
          { value: area, label: 'Area', unit: 'units²', format: 'decimal' }
        ],
        explanation: ['Calculating all circle properties from the given value'],
        steps: [
          `Given: ${knownProperty} = ${value}`,
          `Radius = ${radius.toFixed(4)} units`,
          `Diameter = 2r = ${diameter.toFixed(4)} units`,
          `Circumference = 2πr = ${circumference.toFixed(4)} units`,
          `Area = πr² = ${area.toFixed(4)} units²`
        ]
      };
    },
    tags: ['geometry', 'circle', 'radius', 'diameter', 'circumference', 'area'],
    complexity: 'Basic'
  },
  
  {
    id: 'angle-converter',
    title: 'Angle Unit Converter',
    description: 'Convert between degrees, radians, and gradians.',
    category: 'Geometry',
    inputs: [
      { id: 'from_unit', label: 'From Unit', type: 'select', required: true, options: [
        { value: 'degrees', label: 'Degrees (°)' },
        { value: 'radians', label: 'Radians (rad)' },
        { value: 'gradians', label: 'Gradians (grad)' }
      ]},
      { id: 'to_unit', label: 'To Unit', type: 'select', required: true, options: [
        { value: 'degrees', label: 'Degrees (°)' },
        { value: 'radians', label: 'Radians (rad)' },
        { value: 'gradians', label: 'Gradians (grad)' }
      ]},
      { id: 'angle_value', label: 'Angle Value', type: 'number', required: true, placeholder: 'Enter angle value' }
    ],
    formula: 'Degrees = radians × 180/π, Radians = degrees × π/180, Gradians = degrees × 10/9',
    calculate: (inputs) => {
      const fromUnit = inputs.from_unit;
      const toUnit = inputs.to_unit;
      const value = parseFloat(inputs.angle_value);
      
      if (fromUnit === toUnit) {
        return {
          results: [{ value: value, label: `Angle in ${toUnit}`, unit: toUnit, format: 'decimal' }],
          explanation: ['Same unit conversion - no change needed'],
          steps: [`${value} ${fromUnit} = ${value} ${toUnit}`]
        };
      }
      
      // Convert to degrees first as intermediate step
      let degrees;
      switch(fromUnit) {
        case 'degrees':
          degrees = value;
          break;
        case 'radians':
          degrees = value * (180 / Math.PI);
          break;
        case 'gradians':
          degrees = value * (9 / 10);
          break;
        default:
          throw new Error('Invalid from unit');
      }
      
      // Convert from degrees to target unit
      let result;
      let resultUnit;
      switch(toUnit) {
        case 'degrees':
          result = degrees;
          resultUnit = '°';
          break;
        case 'radians':
          result = degrees * (Math.PI / 180);
          resultUnit = 'rad';
          break;
        case 'gradians':
          result = degrees * (10 / 9);
          resultUnit = 'grad';
          break;
        default:
          throw new Error('Invalid to unit');
      }
      
      return {
        results: [{ value: result, label: `Angle in ${toUnit}`, unit: resultUnit, format: 'decimal' }],
        explanation: [`Converting ${value} ${fromUnit} to ${toUnit}`],
        steps: [
          `Given: ${value} ${fromUnit}`,
          `Result: ${result.toFixed(6)} ${resultUnit}`
        ]
      };
    },
    tags: ['geometry', 'angle', 'conversion', 'degrees', 'radians', 'gradians'],
    complexity: 'Basic'
  },
  
  {
    id: 'polygon-interior-angles',
    title: 'Polygon Interior Angles Calculator',
    description: 'Calculate interior angles of regular polygons.',
    category: 'Geometry',
    inputs: [
      { id: 'sides', label: 'Number of Sides', type: 'number', required: true, placeholder: 'Number of sides (n ≥ 3)' }
    ],
    formula: 'Sum of interior angles = (n-2) × 180°, Each interior angle = (n-2) × 180° / n',
    calculate: (inputs) => {
      const n = parseInt(inputs.sides);
      
      if (n < 3) {
        throw new Error('A polygon must have at least 3 sides');
      }
      
      const sumInteriorAngles = (n - 2) * 180;
      const eachInteriorAngle = sumInteriorAngles / n;
      const sumExteriorAngles = 360;
      const eachExteriorAngle = sumExteriorAngles / n;
      
      // Determine polygon name
      const polygonNames = {
        3: 'Triangle', 4: 'Quadrilateral', 5: 'Pentagon', 6: 'Hexagon',
        7: 'Heptagon', 8: 'Octagon', 9: 'Nonagon', 10: 'Decagon',
        11: 'Hendecagon', 12: 'Dodecagon'
      };
      const polygonName = polygonNames[n] || `${n}-sided polygon`;
      
      return {
        results: [
          { value: sumInteriorAngles, label: 'Sum of Interior Angles', unit: '°', format: 'decimal' },
          { value: eachInteriorAngle, label: 'Each Interior Angle', unit: '°', format: 'decimal' },
          { value: eachExteriorAngle, label: 'Each Exterior Angle', unit: '°', format: 'decimal' }
        ],
        explanation: [`Calculating angles for a regular ${polygonName.toLowerCase()} (${n} sides)`],
        steps: [
          `Polygon: ${polygonName} (${n} sides)`,
          `Sum of interior angles = (n-2) × 180° = (${n}-2) × 180° = ${sumInteriorAngles}°`,
          `Each interior angle = ${sumInteriorAngles}° / ${n} = ${eachInteriorAngle.toFixed(2)}°`,
          `Each exterior angle = 360° / ${n} = ${eachExteriorAngle.toFixed(2)}°`
        ]
      };
    },
    tags: ['geometry', 'polygon', 'angles', 'interior-angles'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'coordinate-reflection',
    title: 'Coordinate Reflection Calculator',
    description: 'Reflect points across the x-axis, y-axis, or origin.',
    category: 'Geometry',
    inputs: [
      { id: 'x', label: 'X coordinate', type: 'number', required: true, placeholder: 'x-coordinate' },
      { id: 'y', label: 'Y coordinate', type: 'number', required: true, placeholder: 'y-coordinate' },
      { id: 'reflection_type', label: 'Reflection Type', type: 'select', required: true, options: [
        { value: 'x_axis', label: 'Across X-axis' },
        { value: 'y_axis', label: 'Across Y-axis' },
        { value: 'origin', label: 'Across Origin' },
        { value: 'line_y_x', label: 'Across line y = x' },
        { value: 'line_y_neg_x', label: 'Across line y = -x' }
      ]}
    ],
    formula: 'Reflection formulas for different axes and lines',
    calculate: (inputs) => {
      const x = parseFloat(inputs.x);
      const y = parseFloat(inputs.y);
      const reflectionType = inputs.reflection_type;
      
      let newX, newY, description;
      
      switch(reflectionType) {
        case 'x_axis':
          newX = x;
          newY = -y;
          description = 'across the x-axis';
          break;
        case 'y_axis':
          newX = -x;
          newY = y;
          description = 'across the y-axis';
          break;
        case 'origin':
          newX = -x;
          newY = -y;
          description = 'across the origin';
          break;
        case 'line_y_x':
          newX = y;
          newY = x;
          description = 'across the line y = x';
          break;
        case 'line_y_neg_x':
          newX = -y;
          newY = -x;
          description = 'across the line y = -x';
          break;
        default:
          throw new Error('Invalid reflection type');
      }
      
      return {
        results: [
          { value: newX, label: 'Reflected X', format: 'decimal' },
          { value: newY, label: 'Reflected Y', format: 'decimal' }
        ],
        explanation: [`Reflecting point (${x}, ${y}) ${description}`],
        steps: [
          `Original point: (${x}, ${y})`,
          `Reflection ${description}`,
          `Reflected point: (${newX}, ${newY})`
        ]
      };
    },
    tags: ['geometry', 'coordinates', 'reflection', 'transformations'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'sector-arc-calculator',
    title: 'Circle Sector & Arc Calculator',
    description: 'Calculate arc length, sector area, and central angle of a circle sector.',
    category: 'Geometry',
    inputs: [
      { id: 'radius', label: 'Radius (units)', type: 'number', required: true, placeholder: 'Circle radius' },
      { id: 'central_angle', label: 'Central Angle (degrees)', type: 'number', required: false, placeholder: 'Central angle in degrees' },
      { id: 'arc_length', label: 'Arc Length (units)', type: 'number', required: false, placeholder: 'Length of arc' },
      { id: 'sector_area', label: 'Sector Area (units²)', type: 'number', required: false, placeholder: 'Area of sector' }
    ],
    formula: 'Arc length = rθ (in radians), Sector area = ½r²θ (in radians)',
    calculate: (inputs) => {
      const radius = parseFloat(inputs.radius);
      const centralAngle = parseFloat(inputs.central_angle);
      const arcLength = parseFloat(inputs.arc_length);
      const sectorArea = parseFloat(inputs.sector_area);
      
      if (radius <= 0) {
        throw new Error('Radius must be positive');
      }
      
      const providedCount = [centralAngle, arcLength, sectorArea].filter(x => !isNaN(x) && x > 0).length;
      if (providedCount !== 1) {
        throw new Error('Please provide exactly one of: central angle, arc length, or sector area');
      }
      
      let angleRadians, angleDegrees, calculatedArcLength, calculatedSectorArea;
      
      if (!isNaN(centralAngle)) {
        // Given central angle
        angleDegrees = centralAngle;
        angleRadians = centralAngle * (Math.PI / 180);
        calculatedArcLength = radius * angleRadians;
        calculatedSectorArea = 0.5 * radius * radius * angleRadians;
      } else if (!isNaN(arcLength)) {
        // Given arc length
        calculatedArcLength = arcLength;
        angleRadians = arcLength / radius;
        angleDegrees = angleRadians * (180 / Math.PI);
        calculatedSectorArea = 0.5 * radius * calculatedArcLength;
      } else {
        // Given sector area
        calculatedSectorArea = sectorArea;
        angleRadians = (2 * sectorArea) / (radius * radius);
        angleDegrees = angleRadians * (180 / Math.PI);
        calculatedArcLength = radius * angleRadians;
      }
      
      return {
        results: [
          { value: angleDegrees, label: 'Central Angle', unit: '°', format: 'decimal' },
          { value: calculatedArcLength, label: 'Arc Length', unit: 'units', format: 'decimal' },
          { value: calculatedSectorArea, label: 'Sector Area', unit: 'units²', format: 'decimal' }
        ],
        explanation: ['Calculating circle sector properties'],
        steps: [
          `Given: radius = ${radius} units`,
          `Central angle = ${angleDegrees.toFixed(2)}° = ${angleRadians.toFixed(4)} radians`,
          `Arc length = rθ = ${radius} × ${angleRadians.toFixed(4)} = ${calculatedArcLength.toFixed(4)} units`,
          `Sector area = ½r²θ = 0.5 × ${radius}² × ${angleRadians.toFixed(4)} = ${calculatedSectorArea.toFixed(4)} units²`
        ]
      };
    },
    tags: ['geometry', 'circle', 'sector', 'arc', 'central-angle'],
    complexity: 'Intermediate'
  }
];

export default geometryCalculators;