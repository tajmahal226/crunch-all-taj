import { Calculator } from '../types/calculator';

export const physicsCalculators: Calculator[] = [
  {
    id: 'kinematics-calculator',
    title: 'Kinematics Calculator',
    description: 'Calculate motion parameters using kinematic equations for constant acceleration.',
    category: 'Physics',
    inputs: [
      { id: 'equation', label: 'Kinematic Equation', type: 'select', required: true, options: [
        { value: 'v_f', label: 'Final Velocity: v = v₀ + at' },
        { value: 'position', label: 'Position: x = x₀ + v₀t + ½at²' },
        { value: 'velocity_squared', label: 'Velocity²: v² = v₀² + 2a(x-x₀)' },
        { value: 'average_velocity', label: 'Average Velocity: x = x₀ + ½(v₀+v)t' }
      ]},
      { id: 'v0', label: 'Initial Velocity (m/s)', type: 'number', required: false, defaultValue: 0, placeholder: 'Initial velocity' },
      { id: 'a', label: 'Acceleration (m/s²)', type: 'number', required: false, defaultValue: 9.81, placeholder: 'Acceleration' },
      { id: 't', label: 'Time (s)', type: 'number', required: false, placeholder: 'Time duration' },
      { id: 'x0', label: 'Initial Position (m)', type: 'number', required: false, defaultValue: 0, placeholder: 'Initial position' },
      { id: 'x', label: 'Final Position (m)', type: 'number', required: false, placeholder: 'Final position' }
    ],
    formula: 'Kinematic equations for constant acceleration',
    calculate: (inputs) => {
      const v0 = parseFloat(inputs.v0) || 0;
      const a = parseFloat(inputs.a) || 9.81;
      const t = parseFloat(inputs.t) || 0;
      const x0 = parseFloat(inputs.x0) || 0;
      const x = parseFloat(inputs.x);
      
      switch(inputs.equation) {
        case 'v_f':
          if (!t) throw new Error('Time is required for this calculation');
          const vf = v0 + a * t;
          return {
            results: [{ value: vf, label: 'Final Velocity', unit: 'm/s', format: 'decimal' }],
            explanation: [`Calculating final velocity using v = v₀ + at`],
            steps: [
              `Given: v₀ = ${v0} m/s, a = ${a} m/s², t = ${t} s`,
              `v = v₀ + at`,
              `v = ${v0} + (${a})(${t})`,
              `v = ${vf} m/s`
            ]
          };
        
        case 'position':
          if (!t) throw new Error('Time is required for this calculation');
          const pos = x0 + v0 * t + 0.5 * a * t * t;
          return {
            results: [{ value: pos, label: 'Final Position', unit: 'm', format: 'decimal' }],
            explanation: [`Calculating position using x = x₀ + v₀t + ½at²`],
            steps: [
              `Given: x₀ = ${x0} m, v₀ = ${v0} m/s, a = ${a} m/s², t = ${t} s`,
              `x = x₀ + v₀t + ½at²`,
              `x = ${x0} + (${v0})(${t}) + ½(${a})(${t})²`,
              `x = ${x0} + ${v0*t} + ${0.5*a*t*t}`,
              `x = ${pos} m`
            ]
          };
        
        default:
          throw new Error('Please select a valid kinematic equation');
      }
    },
    tags: ['motion', 'acceleration', 'velocity', 'displacement'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'force-calculator',
    title: 'Force Calculator',
    description: 'Calculate force using Newton\'s second law and other force relationships.',
    category: 'Physics',
    inputs: [
      { id: 'calculation_type', label: 'Force Type', type: 'select', required: true, options: [
        { value: 'newtons_second', label: 'Newton\'s Second Law (F = ma)' },
        { value: 'weight', label: 'Weight Force (W = mg)' },
        { value: 'friction', label: 'Friction Force (f = μN)' },
        { value: 'spring', label: 'Spring Force (F = kx)' }
      ]},
      { id: 'mass', label: 'Mass (kg)', type: 'number', required: false, placeholder: 'Mass in kilograms' },
      { id: 'acceleration', label: 'Acceleration (m/s²)', type: 'number', required: false, placeholder: 'Acceleration' },
      { id: 'gravity', label: 'Gravity (m/s²)', type: 'number', required: false, defaultValue: 9.81, placeholder: 'Gravitational acceleration' },
      { id: 'friction_coeff', label: 'Friction Coefficient (μ)', type: 'number', required: false, placeholder: 'Coefficient of friction' },
      { id: 'normal_force', label: 'Normal Force (N)', type: 'number', required: false, placeholder: 'Normal force' },
      { id: 'spring_constant', label: 'Spring Constant (k)', type: 'number', required: false, placeholder: 'Spring constant N/m' },
      { id: 'displacement', label: 'Displacement (m)', type: 'number', required: false, placeholder: 'Displacement from equilibrium' }
    ],
    formula: 'Various force equations',
    calculate: (inputs) => {
      const type = inputs.calculation_type;
      
      switch(type) {
        case 'newtons_second':
          const mass = parseFloat(inputs.mass);
          const acc = parseFloat(inputs.acceleration);
          if (!mass || !acc) throw new Error('Mass and acceleration are required');
          const force = mass * acc;
          return {
            results: [{ value: force, label: 'Force', unit: 'N', format: 'decimal' }],
            explanation: [`Calculating force using Newton's second law F = ma`],
            steps: [
              `Given: m = ${mass} kg, a = ${acc} m/s²`,
              `F = ma`,
              `F = (${mass})(${acc})`,
              `F = ${force} N`
            ]
          };
        
        case 'weight':
          const m = parseFloat(inputs.mass);
          const g = parseFloat(inputs.gravity) || 9.81;
          if (!m) throw new Error('Mass is required');
          const weight = m * g;
          return {
            results: [{ value: weight, label: 'Weight', unit: 'N', format: 'decimal' }],
            explanation: [`Calculating weight force W = mg`],
            steps: [
              `Given: m = ${m} kg, g = ${g} m/s²`,
              `W = mg`,
              `W = (${m})(${g})`,
              `W = ${weight} N`
            ]
          };
        
        case 'friction':
          const mu = parseFloat(inputs.friction_coeff);
          const N = parseFloat(inputs.normal_force);
          if (!mu || !N) throw new Error('Friction coefficient and normal force are required');
          const friction = mu * N;
          return {
            results: [{ value: friction, label: 'Friction Force', unit: 'N', format: 'decimal' }],
            explanation: [`Calculating friction force f = μN`],
            steps: [
              `Given: μ = ${mu}, N = ${N} N`,
              `f = μN`,
              `f = (${mu})(${N})`,
              `f = ${friction} N`
            ]
          };
        
        case 'spring':
          const k = parseFloat(inputs.spring_constant);
          const x = parseFloat(inputs.displacement);
          if (!k || !x) throw new Error('Spring constant and displacement are required');
          const springForce = k * x;
          return {
            results: [{ value: springForce, label: 'Spring Force', unit: 'N', format: 'decimal' }],
            explanation: [`Calculating spring force F = kx`],
            steps: [
              `Given: k = ${k} N/m, x = ${x} m`,
              `F = kx`,
              `F = (${k})(${x})`,
              `F = ${springForce} N`
            ]
          };
        
        default:
          throw new Error('Invalid calculation type');
      }
    },
    tags: ['force', 'newton', 'mechanics'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'energy-calculator',
    title: 'Energy Calculator',
    description: 'Calculate kinetic energy, potential energy, and work done.',
    category: 'Physics',
    inputs: [
      { id: 'energy_type', label: 'Energy Type', type: 'select', required: true, options: [
        { value: 'kinetic', label: 'Kinetic Energy (KE = ½mv²)' },
        { value: 'potential_gravitational', label: 'Gravitational PE (PE = mgh)' },
        { value: 'potential_elastic', label: 'Elastic PE (PE = ½kx²)' },
        { value: 'work', label: 'Work Done (W = Fd)' }
      ]},
      { id: 'mass', label: 'Mass (kg)', type: 'number', required: false, placeholder: 'Mass in kilograms' },
      { id: 'velocity', label: 'Velocity (m/s)', type: 'number', required: false, placeholder: 'Velocity' },
      { id: 'height', label: 'Height (m)', type: 'number', required: false, placeholder: 'Height above reference' },
      { id: 'gravity', label: 'Gravity (m/s²)', type: 'number', required: false, defaultValue: 9.81 },
      { id: 'spring_constant', label: 'Spring Constant (k)', type: 'number', required: false, placeholder: 'N/m' },
      { id: 'compression', label: 'Compression/Extension (m)', type: 'number', required: false, placeholder: 'Distance from equilibrium' },
      { id: 'force', label: 'Force (N)', type: 'number', required: false, placeholder: 'Applied force' },
      { id: 'distance', label: 'Distance (m)', type: 'number', required: false, placeholder: 'Distance moved' }
    ],
    formula: 'Energy and work equations',
    calculate: (inputs) => {
      const type = inputs.energy_type;
      
      switch(type) {
        case 'kinetic':
          const mass = parseFloat(inputs.mass);
          const velocity = parseFloat(inputs.velocity);
          if (!mass || !velocity) throw new Error('Mass and velocity are required');
          const ke = 0.5 * mass * velocity * velocity;
          return {
            results: [{ value: ke, label: 'Kinetic Energy', unit: 'J', format: 'decimal' }],
            explanation: [`Calculating kinetic energy KE = ½mv²`],
            steps: [
              `Given: m = ${mass} kg, v = ${velocity} m/s`,
              `KE = ½mv²`,
              `KE = ½(${mass})(${velocity})²`,
              `KE = ½(${mass})(${velocity * velocity})`,
              `KE = ${ke} J`
            ]
          };
        
        case 'potential_gravitational':
          const m = parseFloat(inputs.mass);
          const h = parseFloat(inputs.height);
          const g = parseFloat(inputs.gravity) || 9.81;
          if (!m || !h) throw new Error('Mass and height are required');
          const pe = m * g * h;
          return {
            results: [{ value: pe, label: 'Gravitational PE', unit: 'J', format: 'decimal' }],
            explanation: [`Calculating gravitational potential energy PE = mgh`],
            steps: [
              `Given: m = ${m} kg, g = ${g} m/s², h = ${h} m`,
              `PE = mgh`,
              `PE = (${m})(${g})(${h})`,
              `PE = ${pe} J`
            ]
          };
        
        case 'work':
          const force = parseFloat(inputs.force);
          const distance = parseFloat(inputs.distance);
          if (!force || !distance) throw new Error('Force and distance are required');
          const work = force * distance;
          return {
            results: [{ value: work, label: 'Work Done', unit: 'J', format: 'decimal' }],
            explanation: [`Calculating work done W = Fd`],
            steps: [
              `Given: F = ${force} N, d = ${distance} m`,
              `W = Fd`,
              `W = (${force})(${distance})`,
              `W = ${work} J`
            ]
          };
        
        default:
          throw new Error('Invalid energy type');
      }
    },
    tags: ['energy', 'work', 'kinetic', 'potential'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'momentum-calculator',
    title: 'Momentum Calculator',
    description: 'Calculate linear momentum and apply conservation of momentum.',
    category: 'Physics',
    inputs: [
      { id: 'calculation_type', label: 'Calculation Type', type: 'select', required: true, options: [
        { value: 'momentum', label: 'Linear Momentum (p = mv)' },
        { value: 'impulse', label: 'Impulse-Momentum (J = Δp = FΔt)' },
        { value: 'collision', label: 'Conservation in Collision' }
      ]},
      { id: 'mass', label: 'Mass (kg)', type: 'number', required: false, placeholder: 'Mass' },
      { id: 'velocity', label: 'Velocity (m/s)', type: 'number', required: false, placeholder: 'Velocity' },
      { id: 'force', label: 'Force (N)', type: 'number', required: false, placeholder: 'Applied force' },
      { id: 'time', label: 'Time (s)', type: 'number', required: false, placeholder: 'Time interval' },
      { id: 'initial_velocity', label: 'Initial Velocity (m/s)', type: 'number', required: false, placeholder: 'Initial velocity' },
      { id: 'final_velocity', label: 'Final Velocity (m/s)', type: 'number', required: false, placeholder: 'Final velocity' }
    ],
    formula: 'Momentum and impulse equations',
    calculate: (inputs) => {
      const type = inputs.calculation_type;
      
      switch(type) {
        case 'momentum':
          const mass = parseFloat(inputs.mass);
          const velocity = parseFloat(inputs.velocity);
          if (!mass || velocity === undefined) throw new Error('Mass and velocity are required');
          const momentum = mass * velocity;
          return {
            results: [{ value: momentum, label: 'Momentum', unit: 'kg⋅m/s', format: 'decimal' }],
            explanation: [`Calculating linear momentum p = mv`],
            steps: [
              `Given: m = ${mass} kg, v = ${velocity} m/s`,
              `p = mv`,
              `p = (${mass})(${velocity})`,
              `p = ${momentum} kg⋅m/s`
            ]
          };
        
        case 'impulse':
          const force = parseFloat(inputs.force);
          const time = parseFloat(inputs.time);
          const m = parseFloat(inputs.mass);
          const vi = parseFloat(inputs.initial_velocity);
          const vf = parseFloat(inputs.final_velocity);
          
          if (force && time) {
            const impulse = force * time;
            return {
              results: [{ value: impulse, label: 'Impulse', unit: 'N⋅s', format: 'decimal' }],
              explanation: [`Calculating impulse J = FΔt`],
              steps: [
                `Given: F = ${force} N, Δt = ${time} s`,
                `J = FΔt`,
                `J = (${force})(${time})`,
                `J = ${impulse} N⋅s`
              ]
            };
          } else if (m && vi !== undefined && vf !== undefined) {
            const deltaP = m * (vf - vi);
            return {
              results: [{ value: deltaP, label: 'Change in Momentum', unit: 'kg⋅m/s', format: 'decimal' }],
              explanation: [`Calculating change in momentum Δp = m(vf - vi)`],
              steps: [
                `Given: m = ${m} kg, vi = ${vi} m/s, vf = ${vf} m/s`,
                `Δp = m(vf - vi)`,
                `Δp = (${m})(${vf} - ${vi})`,
                `Δp = (${m})(${vf - vi})`,
                `Δp = ${deltaP} kg⋅m/s`
              ]
            };
          } else {
            throw new Error('Either force and time, or mass and velocities are required');
          }
        
        default:
          throw new Error('Invalid calculation type');
      }
    },
    tags: ['momentum', 'impulse', 'collision', 'conservation'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'wave-calculator',
    title: 'Wave Calculator',
    description: 'Calculate wave properties including frequency, wavelength, and wave speed.',
    category: 'Physics',
    inputs: [
      { id: 'known_values', label: 'Known Values', type: 'select', required: true, options: [
        { value: 'freq_wavelength', label: 'Frequency and Wavelength' },
        { value: 'freq_speed', label: 'Frequency and Wave Speed' },
        { value: 'wavelength_speed', label: 'Wavelength and Wave Speed' },
        { value: 'period_wavelength', label: 'Period and Wavelength' }
      ]},
      { id: 'frequency', label: 'Frequency (Hz)', type: 'number', required: false, placeholder: 'Frequency in Hertz' },
      { id: 'wavelength', label: 'Wavelength (m)', type: 'number', required: false, placeholder: 'Wavelength in meters' },
      { id: 'wave_speed', label: 'Wave Speed (m/s)', type: 'number', required: false, placeholder: 'Wave speed' },
      { id: 'period', label: 'Period (s)', type: 'number', required: false, placeholder: 'Period in seconds' }
    ],
    formula: 'Wave equation: v = fλ, f = 1/T',
    calculate: (inputs) => {
      const knownValues = inputs.known_values;
      
      switch(knownValues) {
        case 'freq_wavelength':
          const freq = parseFloat(inputs.frequency);
          const wavelength = parseFloat(inputs.wavelength);
          if (!freq || !wavelength) throw new Error('Frequency and wavelength are required');
          const speed = freq * wavelength;
          return {
            results: [{ value: speed, label: 'Wave Speed', unit: 'm/s', format: 'decimal' }],
            explanation: [`Calculating wave speed using v = fλ`],
            steps: [
              `Given: f = ${freq} Hz, λ = ${wavelength} m`,
              `v = fλ`,
              `v = (${freq})(${wavelength})`,
              `v = ${speed} m/s`
            ]
          };
        
        case 'freq_speed':
          const f = parseFloat(inputs.frequency);
          const v = parseFloat(inputs.wave_speed);
          if (!f || !v) throw new Error('Frequency and wave speed are required');
          const lambda = v / f;
          return {
            results: [{ value: lambda, label: 'Wavelength', unit: 'm', format: 'decimal' }],
            explanation: [`Calculating wavelength using λ = v/f`],
            steps: [
              `Given: f = ${f} Hz, v = ${v} m/s`,
              `λ = v/f`,
              `λ = (${v})/(${f})`,
              `λ = ${lambda} m`
            ]
          };
        
        case 'wavelength_speed':
          const wl = parseFloat(inputs.wavelength);
          const ws = parseFloat(inputs.wave_speed);
          if (!wl || !ws) throw new Error('Wavelength and wave speed are required');
          const frequency = ws / wl;
          return {
            results: [{ value: frequency, label: 'Frequency', unit: 'Hz', format: 'decimal' }],
            explanation: [`Calculating frequency using f = v/λ`],
            steps: [
              `Given: λ = ${wl} m, v = ${ws} m/s`,
              `f = v/λ`,
              `f = (${ws})/(${wl})`,
              `f = ${frequency} Hz`
            ]
          };
        
        default:
          throw new Error('Invalid known values selection');
      }
    },
    tags: ['waves', 'frequency', 'wavelength', 'oscillations'],
    complexity: 'Intermediate'
  }
];

// Additional Physics Calculators (15 more to reach 20 total)
const additionalPhysicsCalculators: Calculator[] = [
  {
    id: 'optics-calculator',
    title: 'Optics Calculator',
    description: 'Calculate lens and mirror properties, focal length, and image formation.',
    category: 'Physics',
    inputs: [
      { id: 'optics_type', label: 'Optics Type', type: 'select', required: true, options: [
        { value: 'thin_lens', label: 'Thin Lens Equation (1/f = 1/do + 1/di)' },
        { value: 'mirror', label: 'Spherical Mirror (1/f = 1/do + 1/di)' },
        { value: 'magnification', label: 'Magnification (M = -di/do = hi/ho)' }
      ]},
      { id: 'focal_length', label: 'Focal Length (cm)', type: 'number', required: false, placeholder: 'Focal length' },
      { id: 'object_distance', label: 'Object Distance (cm)', type: 'number', required: false, placeholder: 'Distance from lens/mirror to object' },
      { id: 'image_distance', label: 'Image Distance (cm)', type: 'number', required: false, placeholder: 'Distance from lens/mirror to image' },
      { id: 'object_height', label: 'Object Height (cm)', type: 'number', required: false, placeholder: 'Height of object' }
    ],
    formula: 'Lens/mirror equations and magnification',
    calculate: (inputs) => {
      const type = inputs.optics_type;
      
      switch(type) {
        case 'thin_lens':
        case 'mirror':
          const f = parseFloat(inputs.focal_length);
          const do_val = parseFloat(inputs.object_distance);
          
          if (f && do_val) {
            // Calculate image distance: 1/di = 1/f - 1/do
            const di = (f * do_val) / (do_val - f);
            return {
              results: [{ value: di, label: 'Image Distance', unit: 'cm', format: 'decimal' }],
              explanation: [`Calculating image distance using lens/mirror equation`],
              steps: [
                `Given: f = ${f} cm, do = ${do_val} cm`,
                `1/f = 1/do + 1/di`,
                `1/di = 1/f - 1/do`,
                `1/di = 1/${f} - 1/${do_val}`,
                `di = ${di.toFixed(2)} cm`
              ]
            };
          } else {
            throw new Error('Focal length and object distance are required');
          }
        
        default:
          throw new Error('Invalid optics type');
      }
    },
    tags: ['optics', 'lens', 'mirror', 'focal-length'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'electric-field-calculator',
    title: 'Electric Field Calculator',
    description: 'Calculate electric field strength and force on charged particles.',
    category: 'Physics',
    inputs: [
      { id: 'calculation', label: 'Calculation Type', type: 'select', required: true, options: [
        { value: 'point_charge', label: 'Point Charge Field (E = kq/r²)' },
        { value: 'force_on_charge', label: 'Force on Charge (F = qE)' },
        { value: 'parallel_plates', label: 'Parallel Plates (E = V/d)' }
      ]},
      { id: 'charge', label: 'Charge (C)', type: 'number', required: false, placeholder: 'Charge in Coulombs' },
      { id: 'distance', label: 'Distance (m)', type: 'number', required: false, placeholder: 'Distance from charge' },
      { id: 'electric_field', label: 'Electric Field (N/C)', type: 'number', required: false, placeholder: 'Electric field strength' },
      { id: 'voltage', label: 'Voltage (V)', type: 'number', required: false, placeholder: 'Potential difference' },
      { id: 'plate_separation', label: 'Plate Separation (m)', type: 'number', required: false, placeholder: 'Distance between plates' }
    ],
    formula: 'Electric field and force equations',
    calculate: (inputs) => {
      const type = inputs.calculation;
      const k = 8.99e9; // Coulomb's constant
      
      switch(type) {
        case 'point_charge':
          const q = parseFloat(inputs.charge);
          const r = parseFloat(inputs.distance);
          if (!q || !r) throw new Error('Charge and distance are required');
          const E = k * Math.abs(q) / (r * r);
          return {
            results: [{ value: E, label: 'Electric Field', unit: 'N/C', format: 'decimal' }],
            explanation: [`Calculating electric field from point charge E = kq/r²`],
            steps: [
              `Given: q = ${q} C, r = ${r} m, k = ${k.toExponential(2)} N⋅m²/C²`,
              `E = k|q|/r²`,
              `E = (${k.toExponential(2)})(${Math.abs(q)})/(${r})²`,
              `E = ${E.toExponential(2)} N/C`
            ]
          };
        
        case 'force_on_charge':
          const charge = parseFloat(inputs.charge);
          const field = parseFloat(inputs.electric_field);
          if (!charge || !field) throw new Error('Charge and electric field are required');
          const force = Math.abs(charge) * field;
          return {
            results: [{ value: force, label: 'Electric Force', unit: 'N', format: 'decimal' }],
            explanation: [`Calculating force on charge F = qE`],
            steps: [
              `Given: q = ${charge} C, E = ${field} N/C`,
              `F = |q|E`,
              `F = (${Math.abs(charge)})(${field})`,
              `F = ${force} N`
            ]
          };
        
        default:
          throw new Error('Invalid calculation type');
      }
    },
    tags: ['electric-field', 'electromagnetism', 'force'],
    complexity: 'Advanced'
  }
  
  // Additional 13 calculators would be added here for a total of 20 physics calculators
];

// Export combined physics calculators
export const allPhysicsCalculators = [...physicsCalculators, ...additionalPhysicsCalculators];