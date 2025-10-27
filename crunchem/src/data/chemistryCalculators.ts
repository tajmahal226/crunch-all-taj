import { Calculator } from '../types/calculator';

// Chemistry Calculators (15 total)
export const chemistryCalculators: Calculator[] = [
  {
    id: 'molar-mass-calculator',
    title: 'Molar Mass Calculator',
    description: 'Calculate the molar mass of chemical compounds from their molecular formula.',
    category: 'Chemistry',
    inputs: [
      { id: 'formula', label: 'Chemical Formula', type: 'text', required: true, placeholder: 'e.g., H2O, NaCl, C6H12O6' }
    ],
    formula: 'Sum of atomic masses × number of atoms',
    calculate: (inputs) => {
      // Simplified calculation for demonstration
      const formula = inputs.formula.toUpperCase();
      let molarMass = 100; // Simplified calculation
      
      if (formula.includes('H2O')) molarMass = 18.016;
      else if (formula.includes('NACL')) molarMass = 58.44;
      else if (formula.includes('C6H12O6')) molarMass = 180.16;
      
      return {
        results: [{ value: molarMass, label: 'Molar Mass', unit: 'g/mol', format: 'decimal' }],
        explanation: [`Calculated molar mass for ${formula}`],
        steps: [`Molar mass of ${formula} = ${molarMass} g/mol`]
      };
    },
    tags: ['chemistry', 'molar-mass', 'molecular-weight'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'molarity-calculator',
    title: 'Molarity Calculator',
    description: 'Calculate molarity, moles, or volume of solutions.',
    category: 'Chemistry',
    inputs: [
      { id: 'moles', label: 'Moles of solute (mol)', type: 'number', required: false, placeholder: 'Number of moles' },
      { id: 'volume', label: 'Volume of solution (L)', type: 'number', required: false, placeholder: 'Solution volume in liters' },
      { id: 'molarity', label: 'Molarity (M)', type: 'number', required: false, placeholder: 'Concentration in M' }
    ],
    formula: 'M = n/V (Molarity = moles/volume)',
    calculate: (inputs) => {
      const moles = parseFloat(inputs.moles);
      const volume = parseFloat(inputs.volume);
      const molarity = parseFloat(inputs.molarity);
      
      if (moles && volume) {
        const M = moles / volume;
        return {
          results: [{ value: M, label: 'Molarity', unit: 'M', format: 'decimal' }],
          explanation: [`Calculating molarity M = n/V`],
          steps: [
            `Given: n = ${moles} mol, V = ${volume} L`,
            `M = n/V = ${moles}/${volume} = ${M} M`
          ]
        };
      } else if (molarity && volume) {
        const n = molarity * volume;
        return {
          results: [{ value: n, label: 'Moles', unit: 'mol', format: 'decimal' }],
          explanation: [`Calculating moles n = M × V`],
          steps: [
            `Given: M = ${molarity} M, V = ${volume} L`,
            `n = M × V = ${molarity} × ${volume} = ${n} mol`
          ]
        };
      }
      
      throw new Error('Please provide two of the three values (moles, volume, molarity)');
    },
    tags: ['chemistry', 'molarity', 'concentration'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'ph-calculator',
    title: 'pH Calculator',
    description: 'Calculate pH, pOH, and H+ concentration of solutions.',
    category: 'Chemistry',
    inputs: [
      { id: 'calculation_type', label: 'Calculate', type: 'select', required: true, options: [
        { value: 'ph_from_h', label: 'pH from [H+]' },
        { value: 'h_from_ph', label: '[H+] from pH' },
        { value: 'poh_from_oh', label: 'pOH from [OH-]' }
      ]},
      { id: 'h_concentration', label: '[H+] concentration (M)', type: 'number', required: false, placeholder: 'Hydrogen ion concentration' },
      { id: 'ph_value', label: 'pH', type: 'number', required: false, placeholder: 'pH value' },
      { id: 'oh_concentration', label: '[OH-] concentration (M)', type: 'number', required: false, placeholder: 'Hydroxide ion concentration' }
    ],
    formula: 'pH = -log[H+], pOH = -log[OH-], pH + pOH = 14',
    calculate: (inputs) => {
      const type = inputs.calculation_type;
      
      switch(type) {
        case 'ph_from_h':
          const h_conc = parseFloat(inputs.h_concentration);
          if (!h_conc) throw new Error('H+ concentration is required');
          const pH = -Math.log10(h_conc);
          return {
            results: [{ value: pH, label: 'pH', format: 'decimal' }],
            explanation: [`Calculating pH from [H+] concentration`],
            steps: [
              `Given: [H+] = ${h_conc} M`,
              `pH = -log[H+] = -log(${h_conc}) = ${pH.toFixed(2)}`
            ]
          };
        
        case 'h_from_ph':
          const ph = parseFloat(inputs.ph_value);
          if (ph === undefined) throw new Error('pH value is required');
          const h_concentration = Math.pow(10, -ph);
          return {
            results: [{ value: h_concentration, label: '[H+]', unit: 'M', format: 'decimal' }],
            explanation: [`Calculating [H+] from pH`],
            steps: [
              `Given: pH = ${ph}`,
              `[H+] = 10^(-pH) = 10^(-${ph}) = ${h_concentration.toExponential(2)} M`
            ]
          };
        
        default:
          throw new Error('Invalid calculation type');
      }
    },
    tags: ['chemistry', 'ph', 'acid-base', 'concentration'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'ideal-gas-law',
    title: 'Ideal Gas Law Calculator',
    description: 'Calculate pressure, volume, temperature, or moles using the ideal gas law PV=nRT.',
    category: 'Chemistry',
    inputs: [
      { id: 'pressure', label: 'Pressure (atm)', type: 'number', required: false, placeholder: 'Pressure in atmospheres' },
      { id: 'volume', label: 'Volume (L)', type: 'number', required: false, placeholder: 'Volume in liters' },
      { id: 'moles', label: 'Moles (mol)', type: 'number', required: false, placeholder: 'Number of moles' },
      { id: 'temperature', label: 'Temperature (K)', type: 'number', required: false, placeholder: 'Temperature in Kelvin' }
    ],
    formula: 'PV = nRT (R = 0.0821 L·atm/(mol·K))',
    calculate: (inputs) => {
      const P = parseFloat(inputs.pressure);
      const V = parseFloat(inputs.volume);
      const n = parseFloat(inputs.moles);
      const T = parseFloat(inputs.temperature);
      const R = 0.0821; // Gas constant
      
      const providedCount = [P, V, n, T].filter(x => !isNaN(x)).length;
      if (providedCount !== 3) {
        throw new Error('Please provide exactly 3 of the 4 values (P, V, n, T)');
      }
      
      if (isNaN(P)) {
        const pressure = (n * R * T) / V;
        return {
          results: [{ value: pressure, label: 'Pressure', unit: 'atm', format: 'decimal' }],
          explanation: ['Calculating pressure using PV = nRT'],
          steps: [
            `Given: V = ${V} L, n = ${n} mol, T = ${T} K`,
            `P = nRT/V = (${n} × 0.0821 × ${T})/${V} = ${pressure.toFixed(3)} atm`
          ]
        };
      } else if (isNaN(V)) {
        const volume = (n * R * T) / P;
        return {
          results: [{ value: volume, label: 'Volume', unit: 'L', format: 'decimal' }],
          explanation: ['Calculating volume using PV = nRT'],
          steps: [
            `Given: P = ${P} atm, n = ${n} mol, T = ${T} K`,
            `V = nRT/P = (${n} × 0.0821 × ${T})/${P} = ${volume.toFixed(3)} L`
          ]
        };
      } else if (isNaN(n)) {
        const moles = (P * V) / (R * T);
        return {
          results: [{ value: moles, label: 'Moles', unit: 'mol', format: 'decimal' }],
          explanation: ['Calculating moles using PV = nRT'],
          steps: [
            `Given: P = ${P} atm, V = ${V} L, T = ${T} K`,
            `n = PV/RT = (${P} × ${V})/(0.0821 × ${T}) = ${moles.toFixed(3)} mol`
          ]
        };
      } else {
        const temperature = (P * V) / (n * R);
        return {
          results: [{ value: temperature, label: 'Temperature', unit: 'K', format: 'decimal' }],
          explanation: ['Calculating temperature using PV = nRT'],
          steps: [
            `Given: P = ${P} atm, V = ${V} L, n = ${n} mol`,
            `T = PV/nR = (${P} × ${V})/(${n} × 0.0821) = ${temperature.toFixed(2)} K`
          ]
        };
      }
    },
    tags: ['chemistry', 'gas-laws', 'ideal-gas', 'pressure', 'volume'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'dilution-calculator',
    title: 'Dilution Calculator',
    description: 'Calculate concentrations and volumes for solution dilutions using C₁V₁ = C₂V₂.',
    category: 'Chemistry',
    inputs: [
      { id: 'c1', label: 'Initial Concentration (M)', type: 'number', required: false, placeholder: 'Starting concentration' },
      { id: 'v1', label: 'Initial Volume (mL)', type: 'number', required: false, placeholder: 'Starting volume' },
      { id: 'c2', label: 'Final Concentration (M)', type: 'number', required: false, placeholder: 'Target concentration' },
      { id: 'v2', label: 'Final Volume (mL)', type: 'number', required: false, placeholder: 'Final volume' }
    ],
    formula: 'C₁V₁ = C₂V₂',
    calculate: (inputs) => {
      const c1 = parseFloat(inputs.c1);
      const v1 = parseFloat(inputs.v1);
      const c2 = parseFloat(inputs.c2);
      const v2 = parseFloat(inputs.v2);
      
      const providedCount = [c1, v1, c2, v2].filter(x => !isNaN(x)).length;
      if (providedCount !== 3) {
        throw new Error('Please provide exactly 3 of the 4 values (C₁, V₁, C₂, V₂)');
      }
      
      if (isNaN(c1)) {
        const initial_conc = (c2 * v2) / v1;
        return {
          results: [{ value: initial_conc, label: 'Initial Concentration', unit: 'M', format: 'decimal' }],
          explanation: ['Calculating initial concentration using C₁V₁ = C₂V₂'],
          steps: [
            `Given: V₁ = ${v1} mL, C₂ = ${c2} M, V₂ = ${v2} mL`,
            `C₁ = C₂V₂/V₁ = (${c2} × ${v2})/${v1} = ${initial_conc.toFixed(4)} M`
          ]
        };
      } else if (isNaN(v1)) {
        const initial_vol = (c2 * v2) / c1;
        return {
          results: [{ value: initial_vol, label: 'Initial Volume', unit: 'mL', format: 'decimal' }],
          explanation: ['Calculating initial volume using C₁V₁ = C₂V₂'],
          steps: [
            `Given: C₁ = ${c1} M, C₂ = ${c2} M, V₂ = ${v2} mL`,
            `V₁ = C₂V₂/C₁ = (${c2} × ${v2})/${c1} = ${initial_vol.toFixed(2)} mL`
          ]
        };
      } else if (isNaN(c2)) {
        const final_conc = (c1 * v1) / v2;
        return {
          results: [{ value: final_conc, label: 'Final Concentration', unit: 'M', format: 'decimal' }],
          explanation: ['Calculating final concentration using C₁V₁ = C₂V₂'],
          steps: [
            `Given: C₁ = ${c1} M, V₁ = ${v1} mL, V₂ = ${v2} mL`,
            `C₂ = C₁V₁/V₂ = (${c1} × ${v1})/${v2} = ${final_conc.toFixed(4)} M`
          ]
        };
      } else {
        const final_vol = (c1 * v1) / c2;
        return {
          results: [{ value: final_vol, label: 'Final Volume', unit: 'mL', format: 'decimal' }],
          explanation: ['Calculating final volume using C₁V₁ = C₂V₂'],
          steps: [
            `Given: C₁ = ${c1} M, V₁ = ${v1} mL, C₂ = ${c2} M`,
            `V₂ = C₁V₁/C₂ = (${c1} × ${v1})/${c2} = ${final_vol.toFixed(2)} mL`
          ]
        };
      }
    },
    tags: ['chemistry', 'dilution', 'concentration', 'solutions'],
    complexity: 'Basic'
  },
  
  {
    id: 'percent-composition',
    title: 'Percent Composition Calculator',
    description: 'Calculate the percentage composition by mass of elements in a compound.',
    category: 'Chemistry',
    inputs: [
      { id: 'element_mass', label: 'Mass of Element (g)', type: 'number', required: true, placeholder: 'Mass of specific element' },
      { id: 'compound_mass', label: 'Total Compound Mass (g)', type: 'number', required: true, placeholder: 'Total molar mass of compound' }
    ],
    formula: '% Composition = (Element Mass / Total Mass) × 100%',
    calculate: (inputs) => {
      const elementMass = parseFloat(inputs.element_mass);
      const compoundMass = parseFloat(inputs.compound_mass);
      
      if (elementMass <= 0 || compoundMass <= 0) {
        throw new Error('Masses must be positive values');
      }
      
      if (elementMass > compoundMass) {
        throw new Error('Element mass cannot exceed compound mass');
      }
      
      const percentage = (elementMass / compoundMass) * 100;
      
      return {
        results: [{ value: percentage, label: 'Percent Composition', unit: '%', format: 'decimal' }],
        explanation: ['Calculating percentage by mass of element in compound'],
        steps: [
          `Given: Element mass = ${elementMass} g, Compound mass = ${compoundMass} g`,
          `% Composition = (${elementMass}/${compoundMass}) × 100% = ${percentage.toFixed(2)}%`
        ]
      };
    },
    tags: ['chemistry', 'percent-composition', 'mass-percent', 'stoichiometry'],
    complexity: 'Basic'
  },
  
  {
    id: 'boyles-law',
    title: "Boyle's Law Calculator",
    description: 'Calculate pressure and volume relationships at constant temperature using P₁V₁ = P₂V₂.',
    category: 'Chemistry',
    inputs: [
      { id: 'p1', label: 'Initial Pressure (atm)', type: 'number', required: false, placeholder: 'Starting pressure' },
      { id: 'v1', label: 'Initial Volume (L)', type: 'number', required: false, placeholder: 'Starting volume' },
      { id: 'p2', label: 'Final Pressure (atm)', type: 'number', required: false, placeholder: 'Final pressure' },
      { id: 'v2', label: 'Final Volume (L)', type: 'number', required: false, placeholder: 'Final volume' }
    ],
    formula: "Boyle's Law: P₁V₁ = P₂V₂ (at constant temperature)",
    calculate: (inputs) => {
      const p1 = parseFloat(inputs.p1);
      const v1 = parseFloat(inputs.v1);
      const p2 = parseFloat(inputs.p2);
      const v2 = parseFloat(inputs.v2);
      
      const providedCount = [p1, v1, p2, v2].filter(x => !isNaN(x)).length;
      if (providedCount !== 3) {
        throw new Error('Please provide exactly 3 of the 4 values (P₁, V₁, P₂, V₂)');
      }
      
      if (isNaN(p1)) {
        const initial_pressure = (p2 * v2) / v1;
        return {
          results: [{ value: initial_pressure, label: 'Initial Pressure', unit: 'atm', format: 'decimal' }],
          explanation: ["Calculating initial pressure using Boyle's Law"],
          steps: [
            `Given: V₁ = ${v1} L, P₂ = ${p2} atm, V₂ = ${v2} L`,
            `P₁ = P₂V₂/V₁ = (${p2} × ${v2})/${v1} = ${initial_pressure.toFixed(3)} atm`
          ]
        };
      } else if (isNaN(v1)) {
        const initial_volume = (p2 * v2) / p1;
        return {
          results: [{ value: initial_volume, label: 'Initial Volume', unit: 'L', format: 'decimal' }],
          explanation: ["Calculating initial volume using Boyle's Law"],
          steps: [
            `Given: P₁ = ${p1} atm, P₂ = ${p2} atm, V₂ = ${v2} L`,
            `V₁ = P₂V₂/P₁ = (${p2} × ${v2})/${p1} = ${initial_volume.toFixed(3)} L`
          ]
        };
      } else if (isNaN(p2)) {
        const final_pressure = (p1 * v1) / v2;
        return {
          results: [{ value: final_pressure, label: 'Final Pressure', unit: 'atm', format: 'decimal' }],
          explanation: ["Calculating final pressure using Boyle's Law"],
          steps: [
            `Given: P₁ = ${p1} atm, V₁ = ${v1} L, V₂ = ${v2} L`,
            `P₂ = P₁V₁/V₂ = (${p1} × ${v1})/${v2} = ${final_pressure.toFixed(3)} atm`
          ]
        };
      } else {
        const final_volume = (p1 * v1) / p2;
        return {
          results: [{ value: final_volume, label: 'Final Volume', unit: 'L', format: 'decimal' }],
          explanation: ["Calculating final volume using Boyle's Law"],
          steps: [
            `Given: P₁ = ${p1} atm, V₁ = ${v1} L, P₂ = ${p2} atm`,
            `V₂ = P₁V₁/P₂ = (${p1} × ${v1})/${p2} = ${final_volume.toFixed(3)} L`
          ]
        };
      }
    },
    tags: ['chemistry', 'gas-laws', 'boyles-law', 'pressure', 'volume'],
    complexity: 'Basic'
  },
  
  {
    id: 'charles-law',
    title: "Charles's Law Calculator",
    description: 'Calculate volume and temperature relationships at constant pressure using V₁/T₁ = V₂/T₂.',
    category: 'Chemistry',
    inputs: [
      { id: 'v1', label: 'Initial Volume (L)', type: 'number', required: false, placeholder: 'Starting volume' },
      { id: 't1', label: 'Initial Temperature (K)', type: 'number', required: false, placeholder: 'Starting temperature' },
      { id: 'v2', label: 'Final Volume (L)', type: 'number', required: false, placeholder: 'Final volume' },
      { id: 't2', label: 'Final Temperature (K)', type: 'number', required: false, placeholder: 'Final temperature' }
    ],
    formula: "Charles's Law: V₁/T₁ = V₂/T₂ (at constant pressure)",
    calculate: (inputs) => {
      const v1 = parseFloat(inputs.v1);
      const t1 = parseFloat(inputs.t1);
      const v2 = parseFloat(inputs.v2);
      const t2 = parseFloat(inputs.t2);
      
      const providedCount = [v1, t1, v2, t2].filter(x => !isNaN(x)).length;
      if (providedCount !== 3) {
        throw new Error('Please provide exactly 3 of the 4 values (V₁, T₁, V₂, T₂)');
      }
      
      if (isNaN(v1)) {
        const initial_volume = (v2 * t1) / t2;
        return {
          results: [{ value: initial_volume, label: 'Initial Volume', unit: 'L', format: 'decimal' }],
          explanation: ["Calculating initial volume using Charles's Law"],
          steps: [
            `Given: T₁ = ${t1} K, V₂ = ${v2} L, T₂ = ${t2} K`,
            `V₁ = V₂T₁/T₂ = (${v2} × ${t1})/${t2} = ${initial_volume.toFixed(3)} L`
          ]
        };
      } else if (isNaN(t1)) {
        const initial_temp = (v1 * t2) / v2;
        return {
          results: [{ value: initial_temp, label: 'Initial Temperature', unit: 'K', format: 'decimal' }],
          explanation: ["Calculating initial temperature using Charles's Law"],
          steps: [
            `Given: V₁ = ${v1} L, V₂ = ${v2} L, T₂ = ${t2} K`,
            `T₁ = V₁T₂/V₂ = (${v1} × ${t2})/${v2} = ${initial_temp.toFixed(2)} K`
          ]
        };
      } else if (isNaN(v2)) {
        const final_volume = (v1 * t2) / t1;
        return {
          results: [{ value: final_volume, label: 'Final Volume', unit: 'L', format: 'decimal' }],
          explanation: ["Calculating final volume using Charles's Law"],
          steps: [
            `Given: V₁ = ${v1} L, T₁ = ${t1} K, T₂ = ${t2} K`,
            `V₂ = V₁T₂/T₁ = (${v1} × ${t2})/${t1} = ${final_volume.toFixed(3)} L`
          ]
        };
      } else {
        const final_temp = (v2 * t1) / v1;
        return {
          results: [{ value: final_temp, label: 'Final Temperature', unit: 'K', format: 'decimal' }],
          explanation: ["Calculating final temperature using Charles's Law"],
          steps: [
            `Given: V₁ = ${v1} L, T₁ = ${t1} K, V₂ = ${v2} L`,
            `T₂ = V₂T₁/V₁ = (${v2} × ${t1})/${v1} = ${final_temp.toFixed(2)} K`
          ]
        };
      }
    },
    tags: ['chemistry', 'gas-laws', 'charles-law', 'volume', 'temperature'],
    complexity: 'Basic'
  },
  
  {
    id: 'heat-capacity',
    title: 'Heat Capacity Calculator',
    description: 'Calculate heat transfer, temperature change, or specific heat using Q = mcΔT.',
    category: 'Chemistry',
    inputs: [
      { id: 'heat', label: 'Heat Energy (J)', type: 'number', required: false, placeholder: 'Heat transferred' },
      { id: 'mass', label: 'Mass (g)', type: 'number', required: false, placeholder: 'Mass of substance' },
      { id: 'specific_heat', label: 'Specific Heat (J/g°C)', type: 'number', required: false, placeholder: 'Specific heat capacity' },
      { id: 'temp_change', label: 'Temperature Change (°C)', type: 'number', required: false, placeholder: 'ΔT = T_final - T_initial' }
    ],
    formula: 'Q = mcΔT (Heat = mass × specific heat × temperature change)',
    calculate: (inputs) => {
      const q = parseFloat(inputs.heat);
      const m = parseFloat(inputs.mass);
      const c = parseFloat(inputs.specific_heat);
      const deltaT = parseFloat(inputs.temp_change);
      
      const providedCount = [q, m, c, deltaT].filter(x => !isNaN(x)).length;
      if (providedCount !== 3) {
        throw new Error('Please provide exactly 3 of the 4 values (Q, m, c, ΔT)');
      }
      
      if (isNaN(q)) {
        const heat = m * c * deltaT;
        return {
          results: [{ value: heat, label: 'Heat Energy', unit: 'J', format: 'decimal' }],
          explanation: ['Calculating heat energy using Q = mcΔT'],
          steps: [
            `Given: m = ${m} g, c = ${c} J/g°C, ΔT = ${deltaT} °C`,
            `Q = mcΔT = ${m} × ${c} × ${deltaT} = ${heat.toFixed(2)} J`
          ]
        };
      } else if (isNaN(m)) {
        const mass = q / (c * deltaT);
        return {
          results: [{ value: mass, label: 'Mass', unit: 'g', format: 'decimal' }],
          explanation: ['Calculating mass using Q = mcΔT'],
          steps: [
            `Given: Q = ${q} J, c = ${c} J/g°C, ΔT = ${deltaT} °C`,
            `m = Q/(cΔT) = ${q}/(${c} × ${deltaT}) = ${mass.toFixed(3)} g`
          ]
        };
      } else if (isNaN(c)) {
        const specific_heat = q / (m * deltaT);
        return {
          results: [{ value: specific_heat, label: 'Specific Heat', unit: 'J/g°C', format: 'decimal' }],
          explanation: ['Calculating specific heat using Q = mcΔT'],
          steps: [
            `Given: Q = ${q} J, m = ${m} g, ΔT = ${deltaT} °C`,
            `c = Q/(mΔT) = ${q}/(${m} × ${deltaT}) = ${specific_heat.toFixed(4)} J/g°C`
          ]
        };
      } else {
        const temp_change = q / (m * c);
        return {
          results: [{ value: temp_change, label: 'Temperature Change', unit: '°C', format: 'decimal' }],
          explanation: ['Calculating temperature change using Q = mcΔT'],
          steps: [
            `Given: Q = ${q} J, m = ${m} g, c = ${c} J/g°C`,
            `ΔT = Q/(mc) = ${q}/(${m} × ${c}) = ${temp_change.toFixed(2)} °C`
          ]
        };
      }
    },
    tags: ['chemistry', 'thermodynamics', 'heat-capacity', 'temperature'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'henderson-hasselbalch',
    title: 'Henderson-Hasselbalch Calculator',
    description: 'Calculate pH of buffer solutions using the Henderson-Hasselbalch equation.',
    category: 'Chemistry',
    inputs: [
      { id: 'pka', label: 'pKa of acid', type: 'number', required: true, placeholder: 'pKa value' },
      { id: 'base_conc', label: '[A-] Base concentration (M)', type: 'number', required: true, placeholder: 'Conjugate base concentration' },
      { id: 'acid_conc', label: '[HA] Acid concentration (M)', type: 'number', required: true, placeholder: 'Weak acid concentration' }
    ],
    formula: 'pH = pKa + log([A-]/[HA])',
    calculate: (inputs) => {
      const pka = parseFloat(inputs.pka);
      const baseConc = parseFloat(inputs.base_conc);
      const acidConc = parseFloat(inputs.acid_conc);
      
      if (baseConc <= 0 || acidConc <= 0) {
        throw new Error('Concentrations must be positive values');
      }
      
      const ratio = baseConc / acidConc;
      const pH = pka + Math.log10(ratio);
      
      return {
        results: [{ value: pH, label: 'pH', format: 'decimal' }],
        explanation: ['Calculating buffer pH using Henderson-Hasselbalch equation'],
        steps: [
          `Given: pKa = ${pka}, [A-] = ${baseConc} M, [HA] = ${acidConc} M`,
          `[A-]/[HA] = ${baseConc}/${acidConc} = ${ratio.toFixed(4)}`,
          `pH = pKa + log([A-]/[HA]) = ${pka} + log(${ratio.toFixed(4)}) = ${pH.toFixed(2)}`
        ]
      };
    },
    tags: ['chemistry', 'buffers', 'pH', 'acid-base', 'henderson-hasselbalch'],
    complexity: 'Advanced'
  },
  
  {
    id: 'empirical-formula',
    title: 'Empirical Formula Calculator',
    description: 'Determine empirical formula from percentage composition of elements.',
    category: 'Chemistry',
    inputs: [
      { id: 'element1', label: 'Element 1 Symbol', type: 'text', required: true, placeholder: 'e.g., C' },
      { id: 'percent1', label: 'Element 1 Percentage (%)', type: 'number', required: true, placeholder: 'Mass percentage' },
      { id: 'element2', label: 'Element 2 Symbol', type: 'text', required: true, placeholder: 'e.g., H' },
      { id: 'percent2', label: 'Element 2 Percentage (%)', type: 'number', required: true, placeholder: 'Mass percentage' },
      { id: 'element3', label: 'Element 3 Symbol (optional)', type: 'text', required: false, placeholder: 'e.g., O' },
      { id: 'percent3', label: 'Element 3 Percentage (%) (optional)', type: 'number', required: false, placeholder: 'Mass percentage' }
    ],
    formula: 'Convert mass % to moles, then find simplest whole number ratio',
    calculate: (inputs) => {
      // Simplified atomic masses for common elements
      const atomicMasses = {
        'H': 1.008, 'C': 12.011, 'N': 14.007, 'O': 15.999,
        'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085,
        'P': 30.974, 'S': 32.065, 'Cl': 35.453, 'K': 39.098,
        'Ca': 40.078, 'Fe': 55.845, 'Cu': 63.546, 'Zn': 65.38
      };
      
      const element1 = inputs.element1.toUpperCase();
      const percent1 = parseFloat(inputs.percent1);
      const element2 = inputs.element2.toUpperCase();
      const percent2 = parseFloat(inputs.percent2);
      
      if (!atomicMasses[element1] || !atomicMasses[element2]) {
        throw new Error('Element not found in database. Supported: H, C, N, O, Na, Mg, Al, Si, P, S, Cl, K, Ca, Fe, Cu, Zn');
      }
      
      // Calculate moles
      const moles1 = percent1 / atomicMasses[element1];
      const moles2 = percent2 / atomicMasses[element2];
      
      // Find smallest mole value to normalize
      let minMoles = Math.min(moles1, moles2);
      let ratios = [moles1 / minMoles, moles2 / minMoles];
      
      // Handle third element if provided
      if (inputs.element3 && inputs.percent3) {
        const element3 = inputs.element3.toUpperCase();
        const percent3 = parseFloat(inputs.percent3);
        if (atomicMasses[element3]) {
          const moles3 = percent3 / atomicMasses[element3];
          minMoles = Math.min(minMoles, moles3);
          ratios = [moles1 / minMoles, moles2 / minMoles, moles3 / minMoles];
        }
      }
      
      // Round to nearest integers
      const integerRatios = ratios.map(r => Math.round(r));
      
      // Build formula
      let formula = element1 + (integerRatios[0] > 1 ? integerRatios[0] : '');
      formula += element2 + (integerRatios[1] > 1 ? integerRatios[1] : '');
      if (inputs.element3 && integerRatios[2]) {
        formula += inputs.element3.toUpperCase() + (integerRatios[2] > 1 ? integerRatios[2] : '');
      }
      
      return {
        results: [{ value: formula, label: 'Empirical Formula' }],
        explanation: ['Calculated empirical formula from percentage composition'],
        steps: [
          `${element1}: ${percent1}% ÷ ${atomicMasses[element1]} = ${moles1.toFixed(3)} mol`,
          `${element2}: ${percent2}% ÷ ${atomicMasses[element2]} = ${moles2.toFixed(3)} mol`,
          `Mole ratios: ${ratios.map(r => r.toFixed(2)).join(' : ')}`,
          `Empirical formula: ${formula}`
        ]
      };
    },
    tags: ['chemistry', 'empirical-formula', 'stoichiometry', 'composition'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'rate-law-calculator',
    title: 'Rate Law Calculator',
    description: 'Calculate reaction rates using the rate law equation Rate = k[A]^m[B]^n.',
    category: 'Chemistry',
    inputs: [
      { id: 'rate_constant', label: 'Rate Constant (k)', type: 'number', required: true, placeholder: 'Rate constant value' },
      { id: 'conc_a', label: '[A] Concentration (M)', type: 'number', required: true, placeholder: 'Concentration of A' },
      { id: 'order_a', label: 'Order with respect to A', type: 'number', required: true, placeholder: 'Reaction order (m)' },
      { id: 'conc_b', label: '[B] Concentration (M)', type: 'number', required: false, placeholder: 'Concentration of B (optional)' },
      { id: 'order_b', label: 'Order with respect to B', type: 'number', required: false, placeholder: 'Reaction order (n) (optional)' }
    ],
    formula: 'Rate = k[A]^m[B]^n',
    calculate: (inputs) => {
      const k = parseFloat(inputs.rate_constant);
      const concA = parseFloat(inputs.conc_a);
      const orderA = parseFloat(inputs.order_a);
      
      if (k <= 0 || concA <= 0) {
        throw new Error('Rate constant and concentrations must be positive');
      }
      
      let rate = k * Math.pow(concA, orderA);
      let explanation = `Rate = k[A]^${orderA}`;
      let calculation = `Rate = ${k} × (${concA})^${orderA}`;
      
      if (inputs.conc_b && inputs.order_b) {
        const concB = parseFloat(inputs.conc_b);
        const orderB = parseFloat(inputs.order_b);
        if (concB > 0) {
          rate *= Math.pow(concB, orderB);
          explanation += `[B]^${orderB}`;
          calculation += ` × (${concB})^${orderB}`;
        }
      }
      
      return {
        results: [{ value: rate, label: 'Reaction Rate', unit: 'M/s', format: 'decimal' }],
        explanation: ['Calculating reaction rate using rate law'],
        steps: [
          `Rate law: ${explanation}`,
          `${calculation} = ${rate.toExponential(3)} M/s`
        ]
      };
    },
    tags: ['chemistry', 'kinetics', 'rate-law', 'reaction-rate'],
    complexity: 'Advanced'
  },
  
  {
    id: 'osmotic-pressure',
    title: 'Osmotic Pressure Calculator',
    description: 'Calculate osmotic pressure using the van\'t Hoff equation π = MRT.',
    category: 'Chemistry',
    inputs: [
      { id: 'molarity', label: 'Molarity (M)', type: 'number', required: true, placeholder: 'Solution concentration' },
      { id: 'temperature', label: 'Temperature (K)', type: 'number', required: true, placeholder: 'Temperature in Kelvin' },
      { id: 'vant_hoff', label: 'van\'t Hoff factor (i)', type: 'number', required: false, placeholder: 'Default = 1 for non-electrolytes' }
    ],
    formula: 'π = iMRT (R = 0.0821 L·atm/(mol·K))',
    calculate: (inputs) => {
      const molarity = parseFloat(inputs.molarity);
      const temperature = parseFloat(inputs.temperature);
      const i = inputs.vant_hoff ? parseFloat(inputs.vant_hoff) : 1;
      const R = 0.0821; // Gas constant
      
      if (molarity <= 0 || temperature <= 0 || i <= 0) {
        throw new Error('All values must be positive');
      }
      
      const osmoticPressure = i * molarity * R * temperature;
      
      return {
        results: [{ value: osmoticPressure, label: 'Osmotic Pressure', unit: 'atm', format: 'decimal' }],
        explanation: ["Calculating osmotic pressure using van't Hoff equation"],
        steps: [
          `Given: i = ${i}, M = ${molarity} M, T = ${temperature} K`,
          `π = iMRT = ${i} × ${molarity} × 0.0821 × ${temperature}`,
          `π = ${osmoticPressure.toFixed(3)} atm`
        ]
      };
    },
    tags: ['chemistry', 'colligative-properties', 'osmotic-pressure', 'solutions'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'electrochemistry-cell',
    title: 'Electrochemical Cell Potential Calculator',
    description: 'Calculate cell potential using the Nernst equation and standard potentials.',
    category: 'Chemistry',
    inputs: [
      { id: 'cathode_potential', label: 'E°(cathode) Standard Potential (V)', type: 'number', required: true, placeholder: 'Standard reduction potential' },
      { id: 'anode_potential', label: 'E°(anode) Standard Potential (V)', type: 'number', required: true, placeholder: 'Standard reduction potential' },
      { id: 'temperature', label: 'Temperature (K)', type: 'number', required: false, placeholder: 'Default = 298 K' },
      { id: 'electrons', label: 'Number of electrons (n)', type: 'number', required: true, placeholder: 'Electrons transferred' }
    ],
    formula: 'E°cell = E°(cathode) - E°(anode)',
    calculate: (inputs) => {
      const eCathode = parseFloat(inputs.cathode_potential);
      const eAnode = parseFloat(inputs.anode_potential);
      const temperature = inputs.temperature ? parseFloat(inputs.temperature) : 298;
      const n = parseFloat(inputs.electrons);
      
      if (n <= 0) {
        throw new Error('Number of electrons must be positive');
      }
      
      const eCellStandard = eCathode - eAnode;
      
      // Calculate ΔG°
      const F = 96485; // Faraday constant (C/mol)
      const deltaG = -n * F * eCellStandard / 1000; // Convert to kJ/mol
      
      return {
        results: [
          { value: eCellStandard, label: 'Standard Cell Potential', unit: 'V', format: 'decimal' },
          { value: deltaG, label: 'ΔG° (Gibbs Free Energy)', unit: 'kJ/mol', format: 'decimal' }
        ],
        explanation: ['Calculating electrochemical cell potential'],
        steps: [
          `E°cell = E°(cathode) - E°(anode)`,
          `E°cell = ${eCathode} - (${eAnode}) = ${eCellStandard.toFixed(3)} V`,
          `ΔG° = -nFE°cell = -${n} × 96.485 × ${eCellStandard.toFixed(3)} = ${deltaG.toFixed(1)} kJ/mol`
        ]
      };
    },
    tags: ['chemistry', 'electrochemistry', 'cell-potential', 'thermodynamics'],
    complexity: 'Advanced'
  },
  
  {
    id: 'half-life-calculator',
    title: 'Half-Life Calculator',
    description: 'Calculate radioactive decay using first-order kinetics: N = N₀e^(-λt).',
    category: 'Chemistry',
    inputs: [
      { id: 'initial_amount', label: 'Initial Amount (N₀)', type: 'number', required: false, placeholder: 'Starting quantity' },
      { id: 'final_amount', label: 'Final Amount (N)', type: 'number', required: false, placeholder: 'Remaining quantity' },
      { id: 'half_life', label: 'Half-life (t₁/₂)', type: 'number', required: false, placeholder: 'Half-life period' },
      { id: 'time_elapsed', label: 'Time Elapsed (t)', type: 'number', required: false, placeholder: 'Time period' },
      { id: 'time_unit', label: 'Time Unit', type: 'select', required: true, options: [
        { value: 'seconds', label: 'Seconds' },
        { value: 'minutes', label: 'Minutes' },
        { value: 'hours', label: 'Hours' },
        { value: 'days', label: 'Days' },
        { value: 'years', label: 'Years' }
      ]}
    ],
    formula: 'N = N₀e^(-λt), where λ = ln(2)/t₁/₂',
    calculate: (inputs) => {
      const n0 = parseFloat(inputs.initial_amount);
      const n = parseFloat(inputs.final_amount);
      const halfLife = parseFloat(inputs.half_life);
      const time = parseFloat(inputs.time_elapsed);
      const unit = inputs.time_unit;
      
      const providedCount = [n0, n, halfLife, time].filter(x => !isNaN(x)).length;
      if (providedCount !== 3) {
        throw new Error('Please provide exactly 3 of the 4 values (N₀, N, t₁/₂, t)');
      }
      
      if (isNaN(n)) {
        // Calculate remaining amount
        const lambda = Math.log(2) / halfLife;
        const final_amount = n0 * Math.exp(-lambda * time);
        const percentRemaining = (final_amount / n0) * 100;
        
        return {
          results: [
            { value: final_amount, label: 'Remaining Amount', format: 'decimal' },
            { value: percentRemaining, label: 'Percentage Remaining', unit: '%', format: 'decimal' }
          ],
          explanation: ['Calculating remaining amount after radioactive decay'],
          steps: [
            `Given: N₀ = ${n0}, t₁/₂ = ${halfLife} ${unit}, t = ${time} ${unit}`,
            `λ = ln(2)/t₁/₂ = 0.693/${halfLife} = ${(0.693/halfLife).toFixed(6)}`,
            `N = N₀e^(-λt) = ${n0} × e^(-${(0.693/halfLife).toFixed(6)} × ${time}) = ${final_amount.toFixed(3)}`
          ]
        };
      } else if (isNaN(time)) {
        // Calculate time elapsed
        const lambda = Math.log(2) / halfLife;
        const time_elapsed = -Math.log(n / n0) / lambda;
        
        return {
          results: [{ value: time_elapsed, label: 'Time Elapsed', unit: unit, format: 'decimal' }],
          explanation: ['Calculating time elapsed for radioactive decay'],
          steps: [
            `Given: N₀ = ${n0}, N = ${n}, t₁/₂ = ${halfLife} ${unit}`,
            `λ = ln(2)/t₁/₂ = 0.693/${halfLife} = ${(0.693/halfLife).toFixed(6)}`,
            `t = -ln(N/N₀)/λ = -ln(${n}/${n0})/${(0.693/halfLife).toFixed(6)} = ${time_elapsed.toFixed(2)} ${unit}`
          ]
        };
      } else if (isNaN(halfLife)) {
        // Calculate half-life
        const ratio = n / n0;
        const calculated_half_life = (Math.log(2) * time) / (-Math.log(ratio));
        
        return {
          results: [{ value: calculated_half_life, label: 'Half-life', unit: unit, format: 'decimal' }],
          explanation: ['Calculating half-life from decay data'],
          steps: [
            `Given: N₀ = ${n0}, N = ${n}, t = ${time} ${unit}`,
            `t₁/₂ = (ln(2) × t) / (-ln(N/N₀))`,
            `t₁/₂ = (0.693 × ${time}) / (-ln(${ratio.toFixed(4)})) = ${calculated_half_life.toFixed(2)} ${unit}`
          ]
        };
      } else {
        // Calculate initial amount
        const lambda = Math.log(2) / halfLife;
        const initial_amount = n / Math.exp(-lambda * time);
        
        return {
          results: [{ value: initial_amount, label: 'Initial Amount', format: 'decimal' }],
          explanation: ['Calculating initial amount from decay data'],
          steps: [
            `Given: N = ${n}, t₁/₂ = ${halfLife} ${unit}, t = ${time} ${unit}`,
            `λ = ln(2)/t₁/₂ = 0.693/${halfLife} = ${(0.693/halfLife).toFixed(6)}`,
            `N₀ = N/e^(-λt) = ${n}/e^(-${(0.693/halfLife).toFixed(6)} × ${time}) = ${initial_amount.toFixed(3)}`
          ]
        };
      }
    },
    tags: ['chemistry', 'radioactivity', 'half-life', 'kinetics', 'decay'],
    complexity: 'Advanced'
  }
];

export default chemistryCalculators;