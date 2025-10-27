import { Calculator } from '../types/calculator';

// Statistics Calculators (15 total)
export const statisticsCalculators: Calculator[] = [
  {
    id: 'mean-median-mode',
    title: 'Mean/Median/Mode',
    description: 'Calculate measures of central tendency for a dataset.',
    category: 'Statistics',
    inputs: [
      { id: 'dataset', label: 'Data Values', type: 'text', required: true, placeholder: 'Enter numbers separated by commas (e.g., 1,2,3,4,5)' }
    ],
    formula: 'Central tendency measures',
    calculate: (inputs) => {
      const dataStr = inputs.dataset.replace(/\s/g, '');
      const data = dataStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      
      if (data.length === 0) throw new Error('Please enter valid numbers');
      
      const sum = data.reduce((acc, val) => acc + val, 0);
      const mean = sum / data.length;
      
      const sortedData = [...data].sort((a, b) => a - b);
      let median;
      const mid = Math.floor(sortedData.length / 2);
      if (sortedData.length % 2 === 0) {
        median = (sortedData[mid - 1] + sortedData[mid]) / 2;
      } else {
        median = sortedData[mid];
      }
      
      const frequency = {};
      data.forEach(val => {
        frequency[val] = (frequency[val] || 0) + 1;
      });
      
      const maxFreq = Math.max(...(Object.values(frequency) as number[]));
      const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq);
      const mode = modes.length === data.length ? 'No mode' : modes.join(', ');
      
      return {
        results: [
          { value: mean.toFixed(4), label: 'Mean', format: 'decimal' },
          { value: median, label: 'Median', format: 'decimal' },
          { value: mode, label: 'Mode' }
        ],
        explanation: [`Calculated central tendency for ${data.length} data points`],
        steps: [
          `Data: [${data.join(', ')}]`,
          `Mean = ${mean.toFixed(4)}`,
          `Median = ${median}`,
          `Mode = ${mode}`
        ]
      };
    },
    tags: ['statistics', 'central-tendency'],
    complexity: 'Basic'
  },
  {
    id: 'standard-deviation-calculator',
    title: 'Standard Deviation',
    description: 'Calculate standard deviation and variance for sample or population data.',
    category: 'Statistics',
    inputs: [
      { id: 'dataset', label: 'Data Values', type: 'text', required: true, placeholder: 'Enter numbers separated by commas' },
      { id: 'type', label: 'Data Type', type: 'select', required: true, options: [
        { value: 'sample', label: 'Sample (n-1)' },
        { value: 'population', label: 'Population (n)' }
      ]}
    ],
    formula: 'σ = √(Σ(x-μ)²/N)',
    calculate: (inputs) => {
      const dataStr = inputs.dataset.replace(/\s/g, '');
      const data = dataStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      const type = inputs.type;
      
      if (data.length === 0) throw new Error('Please enter valid numbers');
      if (type === 'sample' && data.length < 2) throw new Error('Sample requires at least 2 data points');
      
      const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
      const squaredDifferences = data.map(x => Math.pow(x - mean, 2));
      const sumSquaredDiff = squaredDifferences.reduce((acc, val) => acc + val, 0);
      
      const divisor = type === 'sample' ? data.length - 1 : data.length;
      const variance = sumSquaredDiff / divisor;
      const stdDev = Math.sqrt(variance);
      
      return {
        results: [
          { value: stdDev.toFixed(4), label: 'Standard Deviation', format: 'decimal' },
          { value: variance.toFixed(4), label: 'Variance', format: 'decimal' },
          { value: mean.toFixed(4), label: 'Mean', format: 'decimal' }
        ],
        explanation: [`Calculated ${type} standard deviation and variance`],
        steps: [
          `Mean = ${mean.toFixed(4)}`,
          `Variance = ${variance.toFixed(4)}`,
          `Standard Deviation = ${stdDev.toFixed(4)}`
        ]
      };
    },
    tags: ['statistics', 'standard-deviation', 'variance'],
    complexity: 'Intermediate'
  },
  {
    id: 'variance-calculator',
    title: 'Variance Calculator',
    description: 'Calculate variance for sample and population data.',
    category: 'Statistics',
    inputs: [
      { id: 'dataset', label: 'Data Values', type: 'text', required: true, placeholder: 'Enter numbers separated by commas' },
      { id: 'type', label: 'Data Type', type: 'select', required: true, options: [
        { value: 'sample', label: 'Sample (s²)' },
        { value: 'population', label: 'Population (σ²)' }
      ]}
    ],
    formula: 'Variance = Σ(x-μ)²/N',
    calculate: (inputs) => {
      const dataStr = inputs.dataset.replace(/\s/g, '');
      const data = dataStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      
      if (data.length === 0) throw new Error('Please enter valid numbers');
      
      const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
      const squaredDiffs = data.map(x => (x - mean) ** 2);
      const sumSquaredDiffs = squaredDiffs.reduce((acc, val) => acc + val, 0);
      
      const divisor = inputs.type === 'sample' ? data.length - 1 : data.length;
      const variance = sumSquaredDiffs / divisor;
      
      return {
        results: [{ value: variance.toFixed(4), label: 'Variance', format: 'decimal' }],
        explanation: [`${inputs.type} variance calculated`],
        steps: [`Variance = ${variance.toFixed(4)}`]
      };
    },
    tags: ['statistics', 'variance'],
    complexity: 'Basic'
  },
  {
    id: 'z-score-calculator',
    title: 'Z-Score Calculator',
    description: 'Calculate z-scores and percentiles for normal distribution.',
    category: 'Statistics',
    inputs: [
      { id: 'value', label: 'Data Value (x)', type: 'number', required: true, placeholder: 'Enter data value' },
      { id: 'mean', label: 'Population Mean (μ)', type: 'number', required: true, placeholder: 'Enter population mean' },
      { id: 'stddev', label: 'Standard Deviation (σ)', type: 'number', required: true, placeholder: 'Enter standard deviation' }
    ],
    formula: 'z = (x - μ) / σ',
    calculate: (inputs) => {
      const x = parseFloat(inputs.value);
      const mean = parseFloat(inputs.mean);
      const stddev = parseFloat(inputs.stddev);
      
      if (stddev <= 0) throw new Error('Standard deviation must be positive');
      
      const zScore = (x - mean) / stddev;
      
      return {
        results: [{ value: zScore.toFixed(4), label: 'Z-Score', format: 'decimal' }],
        explanation: [`Z-score indicates how many standard deviations from the mean`],
        steps: [`z = (${x} - ${mean}) / ${stddev} = ${zScore.toFixed(4)}`]
      };
    },
    tags: ['statistics', 'z-score', 'normal-distribution'],
    complexity: 'Intermediate'
  },
  {
    id: 't-test-calculator',
    title: 'T-Test Calculator',
    description: 'Perform one-sample t-test for hypothesis testing.',
    category: 'Statistics',
    inputs: [
      { id: 'dataset', label: 'Sample Data', type: 'text', required: true, placeholder: 'Enter sample values separated by commas' },
      { id: 'mu0', label: 'Hypothesized Mean (μ₀)', type: 'number', required: true, placeholder: 'Enter hypothesized population mean' },
      { id: 'alpha', label: 'Significance Level (α)', type: 'number', required: true, defaultValue: 0.05, placeholder: 'Enter alpha level (e.g., 0.05)' }
    ],
    formula: 't = (x̄ - μ₀) / (s / √n)',
    calculate: (inputs) => {
      const dataStr = inputs.dataset.replace(/\s/g, '');
      const data = dataStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      const mu0 = parseFloat(inputs.mu0);
      const alpha = parseFloat(inputs.alpha);
      
      if (data.length < 2) throw new Error('Need at least 2 data points');
      
      const n = data.length;
      const mean = data.reduce((acc, val) => acc + val, 0) / n;
      const variance = data.reduce((acc, val) => acc + (val - mean) ** 2, 0) / (n - 1);
      const stdError = Math.sqrt(variance / n);
      const tStat = (mean - mu0) / stdError;
      const df = n - 1;
      
      return {
        results: [
          { value: tStat.toFixed(4), label: 't-statistic', format: 'decimal' },
          { value: df, label: 'Degrees of Freedom', format: 'integer' },
          { value: mean.toFixed(4), label: 'Sample Mean', format: 'decimal' }
        ],
        explanation: [`One-sample t-test with ${n} observations`],
        steps: [
          `Sample mean = ${mean.toFixed(4)}`,
          `Standard error = ${stdError.toFixed(4)}`,
          `t-statistic = ${tStat.toFixed(4)}`
        ]
      };
    },
    tags: ['statistics', 't-test', 'hypothesis'],
    complexity: 'Advanced'
  },
  {
    id: 'chi-square-test-calculator',
    title: 'Chi-Square Test',
    description: 'Perform chi-square goodness of fit test.',
    category: 'Statistics',
    inputs: [
      { id: 'observed', label: 'Observed Frequencies', type: 'text', required: true, placeholder: 'Enter observed frequencies separated by commas' },
      { id: 'expected', label: 'Expected Frequencies', type: 'text', required: true, placeholder: 'Enter expected frequencies separated by commas' }
    ],
    formula: 'χ² = Σ((O-E)²/E)',
    calculate: (inputs) => {
      const observedStr = inputs.observed.replace(/\s/g, '');
      const expectedStr = inputs.expected.replace(/\s/g, '');
      const observed = observedStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      const expected = expectedStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      
      if (observed.length !== expected.length) throw new Error('Observed and expected must have same length');
      if (observed.length < 2) throw new Error('Need at least 2 categories');
      
      let chiSquare = 0;
      for (let i = 0; i < observed.length; i++) {
        if (expected[i] <= 0) throw new Error('Expected frequencies must be positive');
        chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
      }
      
      const df = observed.length - 1;
      
      return {
        results: [
          { value: chiSquare.toFixed(4), label: 'Chi-Square Statistic', format: 'decimal' },
          { value: df, label: 'Degrees of Freedom', format: 'integer' }
        ],
        explanation: [`Chi-square test with ${observed.length} categories`],
        steps: [`χ² = ${chiSquare.toFixed(4)}`, `df = ${df}`]
      };
    },
    tags: ['statistics', 'chi-square', 'goodness-of-fit'],
    complexity: 'Advanced'
  },
  {
    id: 'anova-calculator',
    title: 'ANOVA Calculator',
    description: 'Perform one-way Analysis of Variance (ANOVA).',
    category: 'Statistics',
    inputs: [
      { id: 'group1', label: 'Group 1 Data', type: 'text', required: true, placeholder: 'Enter values for group 1' },
      { id: 'group2', label: 'Group 2 Data', type: 'text', required: true, placeholder: 'Enter values for group 2' },
      { id: 'group3', label: 'Group 3 Data', type: 'text', required: false, placeholder: 'Enter values for group 3 (optional)' }
    ],
    formula: 'F = MSB / MSW',
    calculate: (inputs) => {
      const groups = [];
      
      const group1Data = inputs.group1.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
      const group2Data = inputs.group2.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
      
      groups.push(group1Data, group2Data);
      
      if (inputs.group3) {
        const group3Data = inputs.group3.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
        if (group3Data.length > 0) groups.push(group3Data);
      }
      
      const allData = groups.flat();
      const grandMean = allData.reduce((a, b) => a + b, 0) / allData.length;
      const k = groups.length;
      const N = allData.length;
      
      let SSB = 0; // Sum of squares between groups
      let SSW = 0; // Sum of squares within groups
      
      groups.forEach(group => {
        const groupMean = group.reduce((a, b) => a + b, 0) / group.length;
        SSB += group.length * Math.pow(groupMean - grandMean, 2);
        group.forEach(value => {
          SSW += Math.pow(value - groupMean, 2);
        });
      });
      
      const dfB = k - 1;
      const dfW = N - k;
      const MSB = SSB / dfB;
      const MSW = SSW / dfW;
      const F = MSB / MSW;
      
      return {
        results: [
          { value: F.toFixed(4), label: 'F-statistic', format: 'decimal' },
          { value: dfB, label: 'df Between', format: 'integer' },
          { value: dfW, label: 'df Within', format: 'integer' }
        ],
        explanation: [`One-way ANOVA with ${k} groups`],
        steps: [`F = ${F.toFixed(4)}`, `df between = ${dfB}`, `df within = ${dfW}`]
      };
    },
    tags: ['statistics', 'anova', 'variance-analysis'],
    complexity: 'Advanced'
  },
  {
    id: 'correlation-calculator',
    title: 'Correlation Calculator',
    description: 'Calculate Pearson correlation coefficient between two variables.',
    category: 'Statistics',
    inputs: [
      { id: 'xvalues', label: 'X Values', type: 'text', required: true, placeholder: 'Enter X values separated by commas' },
      { id: 'yvalues', label: 'Y Values', type: 'text', required: true, placeholder: 'Enter Y values separated by commas' }
    ],
    formula: 'r = Σ((x-x̄)(y-ȳ)) / √(Σ(x-x̄)²Σ(y-ȳ)²)',
    calculate: (inputs) => {
      const xStr = inputs.xvalues.replace(/\s/g, '');
      const yStr = inputs.yvalues.replace(/\s/g, '');
      const xData = xStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      const yData = yStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      
      if (xData.length !== yData.length) throw new Error('X and Y must have same number of values');
      if (xData.length < 2) throw new Error('Need at least 2 data pairs');
      
      const n = xData.length;
      const xMean = xData.reduce((a, b) => a + b, 0) / n;
      const yMean = yData.reduce((a, b) => a + b, 0) / n;
      
      let numerator = 0;
      let xSumSq = 0;
      let ySumSq = 0;
      
      for (let i = 0; i < n; i++) {
        const xDiff = xData[i] - xMean;
        const yDiff = yData[i] - yMean;
        numerator += xDiff * yDiff;
        xSumSq += xDiff * xDiff;
        ySumSq += yDiff * yDiff;
      }
      
      const correlation = numerator / Math.sqrt(xSumSq * ySumSq);
      
      return {
        results: [{ value: correlation.toFixed(4), label: 'Correlation (r)', format: 'decimal' }],
        explanation: [`Pearson correlation coefficient for ${n} data pairs`],
        steps: [`r = ${correlation.toFixed(4)}`]
      };
    },
    tags: ['statistics', 'correlation', 'pearson'],
    complexity: 'Intermediate'
  },
  {
    id: 'regression-analysis-calculator',
    title: 'Regression Analysis',
    description: 'Calculate linear regression line and statistics.',
    category: 'Statistics',
    inputs: [
      { id: 'xvalues', label: 'X Values', type: 'text', required: true, placeholder: 'Enter X values separated by commas' },
      { id: 'yvalues', label: 'Y Values', type: 'text', required: true, placeholder: 'Enter Y values separated by commas' }
    ],
    formula: 'y = mx + b',
    calculate: (inputs) => {
      const xStr = inputs.xvalues.replace(/\s/g, '');
      const yStr = inputs.yvalues.replace(/\s/g, '');
      const xData = xStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      const yData = yStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      
      if (xData.length !== yData.length) throw new Error('X and Y must have same length');
      if (xData.length < 2) throw new Error('Need at least 2 data points');
      
      const n = xData.length;
      const xMean = xData.reduce((a, b) => a + b, 0) / n;
      const yMean = yData.reduce((a, b) => a + b, 0) / n;
      
      let numerator = 0;
      let denominator = 0;
      
      for (let i = 0; i < n; i++) {
        numerator += (xData[i] - xMean) * (yData[i] - yMean);
        denominator += (xData[i] - xMean) ** 2;
      }
      
      const slope = numerator / denominator;
      const intercept = yMean - slope * xMean;
      
      return {
        results: [
          { value: slope.toFixed(4), label: 'Slope (m)', format: 'decimal' },
          { value: intercept.toFixed(4), label: 'Intercept (b)', format: 'decimal' },
          { value: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`, label: 'Regression Line' }
        ],
        explanation: [`Linear regression for ${n} data points`],
        steps: [`Slope = ${slope.toFixed(4)}`, `Intercept = ${intercept.toFixed(4)}`]
      };
    },
    tags: ['statistics', 'regression', 'linear'],
    complexity: 'Advanced'
  },
  {
    id: 'confidence-intervals-calculator',
    title: 'Confidence Intervals',
    description: 'Calculate confidence intervals for population mean.',
    category: 'Statistics',
    inputs: [
      { id: 'dataset', label: 'Sample Data', type: 'text', required: true, placeholder: 'Enter sample values separated by commas' },
      { id: 'confidence', label: 'Confidence Level', type: 'select', required: true, options: [
        { value: '0.90', label: '90%' },
        { value: '0.95', label: '95%' },
        { value: '0.99', label: '99%' }
      ]}
    ],
    formula: 'CI = x̄ ± t(α/2) * (s/√n)',
    calculate: (inputs) => {
      const dataStr = inputs.dataset.replace(/\s/g, '');
      const data = dataStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      const confidence = parseFloat(inputs.confidence);
      
      if (data.length < 2) throw new Error('Need at least 2 data points');
      
      const n = data.length;
      const mean = data.reduce((a, b) => a + b, 0) / n;
      const variance = data.reduce((acc, val) => acc + (val - mean) ** 2, 0) / (n - 1);
      const stdError = Math.sqrt(variance / n);
      
      // Approximate t-critical values
      const tCritical = confidence === 0.90 ? 1.645 : confidence === 0.95 ? 1.96 : 2.576;
      
      const marginError = tCritical * stdError;
      const lowerBound = mean - marginError;
      const upperBound = mean + marginError;
      
      return {
        results: [
          { value: `[${lowerBound.toFixed(4)}, ${upperBound.toFixed(4)}]`, label: `${confidence * 100}% CI` },
          { value: mean.toFixed(4), label: 'Sample Mean', format: 'decimal' },
          { value: marginError.toFixed(4), label: 'Margin of Error', format: 'decimal' }
        ],
        explanation: [`${confidence * 100}% confidence interval for population mean`],
        steps: [`Mean = ${mean.toFixed(4)}`, `Margin of Error = ${marginError.toFixed(4)}`]
      };
    },
    tags: ['statistics', 'confidence-interval'],
    complexity: 'Advanced'
  },
  {
    id: 'hypothesis-testing-calculator',
    title: 'Hypothesis Testing',
    description: 'Perform hypothesis tests for population parameters.',
    category: 'Statistics',
    inputs: [
      { id: 'testType', label: 'Test Type', type: 'select', required: true, options: [
        { value: 'one-sample-z', label: 'One Sample Z-Test' },
        { value: 'one-sample-t', label: 'One Sample t-Test' }
      ]},
      { id: 'dataset', label: 'Sample Data', type: 'text', required: true, placeholder: 'Enter sample values' },
      { id: 'mu0', label: 'Null Hypothesis Mean', type: 'number', required: true, placeholder: 'H₀: μ = ?' },
      { id: 'alpha', label: 'Significance Level', type: 'number', required: true, defaultValue: 0.05 }
    ],
    formula: 'Test statistic calculation',
    calculate: (inputs) => {
      const dataStr = inputs.dataset.replace(/\s/g, '');
      const data = dataStr.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
      const mu0 = parseFloat(inputs.mu0);
      const alpha = parseFloat(inputs.alpha);
      
      if (data.length < 1) throw new Error('Need at least 1 data point');
      
      const n = data.length;
      const mean = data.reduce((a, b) => a + b, 0) / n;
      
      let testStat, criticalValue;
      
      if (inputs.testType === 'one-sample-z') {
        // Assuming known population std dev = 1 for demo
        const sigma = 1;
        testStat = (mean - mu0) / (sigma / Math.sqrt(n));
        criticalValue = alpha === 0.05 ? 1.96 : alpha === 0.01 ? 2.576 : 1.645;
      } else {
        const variance = data.reduce((acc, val) => acc + (val - mean) ** 2, 0) / (n - 1);
        const stdError = Math.sqrt(variance / n);
        testStat = (mean - mu0) / stdError;
        criticalValue = alpha === 0.05 ? 2.045 : alpha === 0.01 ? 2.75 : 1.725; // approximate
      }
      
      const reject = Math.abs(testStat) > criticalValue;
      
      return {
        results: [
          { value: testStat.toFixed(4), label: 'Test Statistic', format: 'decimal' },
          { value: criticalValue.toFixed(3), label: 'Critical Value', format: 'decimal' },
          { value: reject ? 'Reject H₀' : 'Fail to reject H₀', label: 'Decision' }
        ],
        explanation: [`Hypothesis test at α = ${alpha}`],
        steps: [`Test statistic = ${testStat.toFixed(4)}`, `Decision: ${reject ? 'Reject' : 'Fail to reject'} H₀`]
      };
    },
    tags: ['statistics', 'hypothesis-testing'],
    complexity: 'Advanced'
  },
  {
    id: 'normal-distribution-calculator',
    title: 'Normal Distribution',
    description: 'Calculate probabilities and percentiles for normal distribution.',
    category: 'Statistics',
    inputs: [
      { id: 'mean', label: 'Mean (μ)', type: 'number', required: true, defaultValue: 0, placeholder: 'Population mean' },
      { id: 'stddev', label: 'Standard Deviation (σ)', type: 'number', required: true, defaultValue: 1, placeholder: 'Population standard deviation' },
      { id: 'value', label: 'X Value', type: 'number', required: true, placeholder: 'Value to find probability for' }
    ],
    formula: 'Normal Distribution N(μ,σ²)',
    calculate: (inputs) => {
      const mu = parseFloat(inputs.mean);
      const sigma = parseFloat(inputs.stddev);
      const x = parseFloat(inputs.value);
      
      if (sigma <= 0) throw new Error('Standard deviation must be positive');
      
      const zScore = (x - mu) / sigma;
      
      // Approximate standard normal CDF (simplified)
      const phi = (z: number) => {
        return 0.5 * (1 + Math.sign(z) * Math.sqrt(1 - Math.exp(-2 * z * z / Math.PI)));
      };
      
      const probability = phi(zScore);
      
      return {
        results: [
          { value: zScore.toFixed(4), label: 'Z-Score', format: 'decimal' },
          { value: (probability * 100).toFixed(2) + '%', label: 'P(X ≤ ' + x + ')' },
          { value: ((1 - probability) * 100).toFixed(2) + '%', label: 'P(X > ' + x + ')' }
        ],
        explanation: [`Normal distribution with μ=${mu}, σ=${sigma}`],
        steps: [`Z-score = ${zScore.toFixed(4)}`, `P(X ≤ ${x}) = ${(probability * 100).toFixed(2)}%`]
      };
    },
    tags: ['statistics', 'normal-distribution'],
    complexity: 'Intermediate'
  },
  {
    id: 'binomial-distribution-calculator',
    title: 'Binomial Distribution',
    description: 'Calculate binomial probabilities and statistics.',
    category: 'Statistics',
    inputs: [
      { id: 'n', label: 'Number of Trials (n)', type: 'number', required: true, placeholder: 'Number of trials' },
      { id: 'p', label: 'Probability of Success (p)', type: 'number', required: true, placeholder: 'Probability (0-1)' },
      { id: 'k', label: 'Number of Successes (k)', type: 'number', required: true, placeholder: 'Number of successes' }
    ],
    formula: 'P(X=k) = C(n,k) * p^k * (1-p)^(n-k)',
    calculate: (inputs) => {
      const n = parseInt(inputs.n);
      const p = parseFloat(inputs.p);
      const k = parseInt(inputs.k);
      
      if (n < 0 || k < 0 || k > n) throw new Error('Invalid values: ensure 0 ≤ k ≤ n');
      if (p < 0 || p > 1) throw new Error('Probability must be between 0 and 1');
      
      // Calculate combination C(n,k)
      const combination = (n: number, k: number) => {
        if (k > n) return 0;
        if (k === 0 || k === n) return 1;
        let result = 1;
        for (let i = 1; i <= k; i++) {
          result = result * (n - i + 1) / i;
        }
        return result;
      };
      
      const binomialCoeff = combination(n, k);
      const probability = binomialCoeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
      
      const mean = n * p;
      const variance = n * p * (1 - p);
      const stdDev = Math.sqrt(variance);
      
      return {
        results: [
          { value: probability.toFixed(6), label: 'P(X = ' + k + ')', format: 'decimal' },
          { value: mean.toFixed(2), label: 'Mean', format: 'decimal' },
          { value: stdDev.toFixed(4), label: 'Standard Deviation', format: 'decimal' }
        ],
        explanation: [`Binomial distribution with n=${n}, p=${p}`],
        steps: [`P(X = ${k}) = ${probability.toFixed(6)}`, `Mean = ${mean}`, `SD = ${stdDev.toFixed(4)}`]
      };
    },
    tags: ['statistics', 'binomial-distribution'],
    complexity: 'Intermediate'
  },
  {
    id: 'poisson-distribution-calculator',
    title: 'Poisson Distribution',
    description: 'Calculate Poisson probabilities and statistics.',
    category: 'Statistics',
    inputs: [
      { id: 'lambda', label: 'Rate Parameter (λ)', type: 'number', required: true, placeholder: 'Average rate of occurrence' },
      { id: 'k', label: 'Number of Events (k)', type: 'number', required: true, placeholder: 'Number of events' }
    ],
    formula: 'P(X=k) = (λ^k * e^(-λ)) / k!',
    calculate: (inputs) => {
      const lambda = parseFloat(inputs.lambda);
      const k = parseInt(inputs.k);
      
      if (lambda <= 0) throw new Error('Rate parameter λ must be positive');
      if (k < 0) throw new Error('Number of events k must be non-negative');
      
      // Calculate factorial
      const factorial = (n: number): number => {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
      };
      
      const kFactorial = factorial(k);
      const probability = (Math.pow(lambda, k) * Math.exp(-lambda)) / kFactorial;
      
      const mean = lambda;
      const variance = lambda;
      const stdDev = Math.sqrt(variance);
      
      return {
        results: [
          { value: probability.toFixed(6), label: 'P(X = ' + k + ')', format: 'decimal' },
          { value: mean.toFixed(2), label: 'Mean', format: 'decimal' },
          { value: stdDev.toFixed(4), label: 'Standard Deviation', format: 'decimal' }
        ],
        explanation: [`Poisson distribution with λ=${lambda}`],
        steps: [`P(X = ${k}) = ${probability.toFixed(6)}`, `Mean = Variance = ${lambda}`]
      };
    },
    tags: ['statistics', 'poisson-distribution'],
    complexity: 'Intermediate'
  },
  {
    id: 'sampling-distribution-calculator',
    title: 'Sampling Distribution',
    description: 'Calculate properties of sampling distributions.',
    category: 'Statistics',
    inputs: [
      { id: 'populationMean', label: 'Population Mean (μ)', type: 'number', required: true, placeholder: 'Population mean' },
      { id: 'populationStd', label: 'Population Std Dev (σ)', type: 'number', required: true, placeholder: 'Population standard deviation' },
      { id: 'sampleSize', label: 'Sample Size (n)', type: 'number', required: true, placeholder: 'Sample size' }
    ],
    formula: 'μx̄ = μ, σx̄ = σ/√n',
    calculate: (inputs) => {
      const mu = parseFloat(inputs.populationMean);
      const sigma = parseFloat(inputs.populationStd);
      const n = parseInt(inputs.sampleSize);
      
      if (sigma <= 0) throw new Error('Population standard deviation must be positive');
      if (n <= 0) throw new Error('Sample size must be positive');
      
      const samplingMean = mu; // Mean of sampling distribution
      const samplingStd = sigma / Math.sqrt(n); // Standard error
      const standardError = samplingStd;
      
      return {
        results: [
          { value: samplingMean.toFixed(4), label: 'Mean of x̄ (μx̄)', format: 'decimal' },
          { value: standardError.toFixed(4), label: 'Standard Error (σx̄)', format: 'decimal' },
          { value: n >= 30 ? 'Yes' : 'No', label: 'Central Limit Theorem Applies' }
        ],
        explanation: [`Sampling distribution properties for n=${n}`],
        steps: [`μx̄ = ${samplingMean}`, `σx̄ = σ/√n = ${sigma}/√${n} = ${standardError.toFixed(4)}`]
      };
    },
    tags: ['statistics', 'sampling-distribution'],
    complexity: 'Advanced'
  }
];

export default statisticsCalculators;