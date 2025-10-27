import { Calculator } from '../types/calculator';

// Finance Calculators (15 total)
export const financeCalculators: Calculator[] = [
  {
    id: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest for investments and savings.',
    category: 'Finance',
    inputs: [
      { id: 'principal', label: 'Principal Amount ($)', type: 'number', required: true, placeholder: 'Initial investment' },
      { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', required: true, placeholder: 'Interest rate' },
      { id: 'time', label: 'Time (years)', type: 'number', required: true, placeholder: 'Investment period' },
      { id: 'compound_frequency', label: 'Compounding Frequency', type: 'select', required: true, options: [
        { value: '1', label: 'Annually' },
        { value: '2', label: 'Semi-annually' },
        { value: '4', label: 'Quarterly' },
        { value: '12', label: 'Monthly' },
        { value: '365', label: 'Daily' }
      ]}
    ],
    formula: 'A = P(1 + r/n)^(nt)',
    calculate: (inputs) => {
      const P = parseFloat(inputs.principal);
      const r = parseFloat(inputs.rate) / 100; // Convert percentage to decimal
      const t = parseFloat(inputs.time);
      const n = parseInt(inputs.compound_frequency);
      
      if (!P || !r || !t || !n) throw new Error('All fields are required');
      
      const A = P * Math.pow(1 + r/n, n * t);
      const interest = A - P;
      
      return {
        results: [
          { value: A, label: 'Final Amount', unit: '$', format: 'currency' },
          { value: interest, label: 'Interest Earned', unit: '$', format: 'currency' },
          { value: P, label: 'Principal', unit: '$', format: 'currency' }
        ],
        explanation: [`Compound interest calculation over ${t} years`],
        steps: [
          `P = $${P}, r = ${(r*100)}%, t = ${t} years, n = ${n}`,
          `A = P(1 + r/n)^(nt)`,
          `A = ${P}(1 + ${r}/${n})^(${n} × ${t})`,
          `A = $${A.toFixed(2)}`,
          `Interest Earned = $${A.toFixed(2)} - $${P} = $${interest.toFixed(2)}`
        ]
      };
    },
    tags: ['finance', 'compound-interest', 'investment'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'loan-calculator',
    title: 'Loan Payment Calculator',
    description: 'Calculate monthly loan payments and total interest.',
    category: 'Finance',
    inputs: [
      { id: 'loan_amount', label: 'Loan Amount ($)', type: 'number', required: true, placeholder: 'Loan principal' },
      { id: 'interest_rate', label: 'Annual Interest Rate (%)', type: 'number', required: true, placeholder: 'Interest rate' },
      { id: 'loan_term', label: 'Loan Term (years)', type: 'number', required: true, placeholder: 'Loan duration' }
    ],
    formula: 'Monthly Payment = P[r(1+r)^n]/[(1+r)^n-1]',
    calculate: (inputs) => {
      const P = parseFloat(inputs.loan_amount);
      const annualRate = parseFloat(inputs.interest_rate) / 100;
      const years = parseFloat(inputs.loan_term);
      
      if (!P || !annualRate || !years) throw new Error('All fields are required');
      
      const monthlyRate = annualRate / 12;
      const numPayments = years * 12;
      
      const monthlyPayment = P * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                            (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      const totalPayment = monthlyPayment * numPayments;
      const totalInterest = totalPayment - P;
      
      return {
        results: [
          { value: monthlyPayment, label: 'Monthly Payment', unit: '$', format: 'currency' },
          { value: totalPayment, label: 'Total Payment', unit: '$', format: 'currency' },
          { value: totalInterest, label: 'Total Interest', unit: '$', format: 'currency' }
        ],
        explanation: [`Loan payment calculation for ${years} years`],
        steps: [
          `Loan Amount: $${P}`,
          `Annual Rate: ${(annualRate*100)}%, Monthly Rate: ${(monthlyRate*100).toFixed(4)}%`,
          `Number of Payments: ${numPayments}`,
          `Monthly Payment: $${monthlyPayment.toFixed(2)}`,
          `Total Interest: $${totalInterest.toFixed(2)}`
        ]
      };
    },
    tags: ['finance', 'loan', 'payment', 'mortgage'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    description: 'Calculate simple interest for loans and investments.',
    category: 'Finance',
    inputs: [
      { id: 'principal', label: 'Principal Amount ($)', type: 'number', required: true, placeholder: 'Initial amount' },
      { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', required: true, placeholder: 'Interest rate' },
      { id: 'time', label: 'Time (years)', type: 'number', required: true, placeholder: 'Time period' }
    ],
    formula: 'Simple Interest = P × r × t',
    calculate: (inputs) => {
      const P = parseFloat(inputs.principal);
      const r = parseFloat(inputs.rate) / 100;
      const t = parseFloat(inputs.time);
      
      if (P <= 0 || r <= 0 || t <= 0) {
        throw new Error('All values must be positive');
      }
      
      const interest = P * r * t;
      const totalAmount = P + interest;
      
      return {
        results: [
          { value: interest, label: 'Simple Interest', unit: '$', format: 'currency' },
          { value: totalAmount, label: 'Total Amount', unit: '$', format: 'currency' },
          { value: P, label: 'Principal', unit: '$', format: 'currency' }
        ],
        explanation: ['Simple interest calculation'],
        steps: [
          `Principal: $${P}`,
          `Rate: ${(r*100)}% per year`,
          `Time: ${t} years`,
          `Simple Interest = P × r × t = $${P} × ${r} × ${t} = $${interest.toFixed(2)}`,
          `Total Amount = $${P} + $${interest.toFixed(2)} = $${totalAmount.toFixed(2)}`
        ]
      };
    },
    tags: ['finance', 'simple-interest', 'investment'],
    complexity: 'Basic'
  },
  
  {
    id: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    description: 'Calculate mortgage payments including taxes and insurance.',
    category: 'Finance',
    inputs: [
      { id: 'home_price', label: 'Home Price ($)', type: 'number', required: true, placeholder: 'Purchase price' },
      { id: 'down_payment', label: 'Down Payment ($)', type: 'number', required: true, placeholder: 'Down payment amount' },
      { id: 'interest_rate', label: 'Interest Rate (%)', type: 'number', required: true, placeholder: 'Annual interest rate' },
      { id: 'loan_term', label: 'Loan Term (years)', type: 'number', required: true, placeholder: 'Loan duration' },
      { id: 'property_tax', label: 'Annual Property Tax ($)', type: 'number', required: false, placeholder: 'Optional' },
      { id: 'home_insurance', label: 'Annual Home Insurance ($)', type: 'number', required: false, placeholder: 'Optional' },
      { id: 'pmi', label: 'PMI ($/month)', type: 'number', required: false, placeholder: 'Private mortgage insurance' }
    ],
    formula: 'Monthly Payment = P[r(1+r)^n]/[(1+r)^n-1] + taxes + insurance',
    calculate: (inputs) => {
      const homePrice = parseFloat(inputs.home_price);
      const downPayment = parseFloat(inputs.down_payment);
      const annualRate = parseFloat(inputs.interest_rate) / 100;
      const years = parseFloat(inputs.loan_term);
      const propertyTax = parseFloat(inputs.property_tax) || 0;
      const homeInsurance = parseFloat(inputs.home_insurance) || 0;
      const pmi = parseFloat(inputs.pmi) || 0;
      
      if (homePrice <= 0 || downPayment < 0 || annualRate <= 0 || years <= 0) {
        throw new Error('Invalid input values');
      }
      
      if (downPayment >= homePrice) {
        throw new Error('Down payment cannot exceed home price');
      }
      
      const loanAmount = homePrice - downPayment;
      const monthlyRate = annualRate / 12;
      const numPayments = years * 12;
      
      const monthlyPrincipalInterest = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      const monthlyTax = propertyTax / 12;
      const monthlyInsurance = homeInsurance / 12;
      const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + pmi;
      
      const totalInterest = (monthlyPrincipalInterest * numPayments) - loanAmount;
      const downPaymentPercent = (downPayment / homePrice) * 100;
      
      return {
        results: [
          { value: totalMonthlyPayment, label: 'Total Monthly Payment', unit: '$', format: 'currency' },
          { value: monthlyPrincipalInterest, label: 'Principal & Interest', unit: '$', format: 'currency' },
          { value: monthlyTax, label: 'Monthly Property Tax', unit: '$', format: 'currency' },
          { value: monthlyInsurance, label: 'Monthly Insurance', unit: '$', format: 'currency' },
          { value: loanAmount, label: 'Loan Amount', unit: '$', format: 'currency' },
          { value: totalInterest, label: 'Total Interest', unit: '$', format: 'currency' }
        ],
        explanation: ['Complete mortgage payment breakdown'],
        steps: [
          `Home Price: $${homePrice.toLocaleString()}`,
          `Down Payment: $${downPayment.toLocaleString()} (${downPaymentPercent.toFixed(1)}%)`,
          `Loan Amount: $${loanAmount.toLocaleString()}`,
          `Monthly P&I: $${monthlyPrincipalInterest.toFixed(2)}`,
          `Total Monthly Payment: $${totalMonthlyPayment.toFixed(2)}`
        ]
      };
    },
    tags: ['finance', 'mortgage', 'home-loan', 'real-estate'],
    complexity: 'Advanced'
  },
  
  {
    id: 'savings-calculator',
    title: 'Savings Goal Calculator',
    description: 'Calculate how much to save monthly to reach your financial goal.',
    category: 'Finance',
    inputs: [
      { id: 'goal_amount', label: 'Savings Goal ($)', type: 'number', required: true, placeholder: 'Target amount' },
      { id: 'current_savings', label: 'Current Savings ($)', type: 'number', required: true, placeholder: 'Starting amount' },
      { id: 'time_to_goal', label: 'Time to Goal (months)', type: 'number', required: true, placeholder: 'Months to save' },
      { id: 'interest_rate', label: 'Annual Interest Rate (%)', type: 'number', required: false, placeholder: 'Optional - savings account rate' }
    ],
    formula: 'Monthly Savings = (Goal - Current) / Months (with compound interest adjustments)',
    calculate: (inputs) => {
      const goalAmount = parseFloat(inputs.goal_amount);
      const currentSavings = parseFloat(inputs.current_savings);
      const months = parseFloat(inputs.time_to_goal);
      const annualRate = parseFloat(inputs.interest_rate) || 0;
      
      if (goalAmount <= 0 || currentSavings < 0 || months <= 0) {
        throw new Error('Invalid input values');
      }
      
      if (currentSavings >= goalAmount) {
        throw new Error('Current savings already exceeds goal');
      }
      
      const neededAmount = goalAmount - currentSavings;
      const monthlyRate = (annualRate / 100) / 12;
      
      let monthlyPayment;
      if (monthlyRate > 0) {
        // With compound interest
        const futureValueCurrent = currentSavings * Math.pow(1 + monthlyRate, months);
        const remainingGoal = goalAmount - futureValueCurrent;
        
        if (remainingGoal <= 0) {
          monthlyPayment = 0;
        } else {
          monthlyPayment = remainingGoal / 
            (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        }
      } else {
        // Without interest
        monthlyPayment = neededAmount / months;
      }
      
      const totalContributions = monthlyPayment * months;
      const totalInterestEarned = goalAmount - currentSavings - totalContributions;
      
      return {
        results: [
          { value: monthlyPayment, label: 'Required Monthly Savings', unit: '$', format: 'currency' },
          { value: totalContributions, label: 'Total Contributions', unit: '$', format: 'currency' },
          { value: totalInterestEarned, label: 'Interest Earned', unit: '$', format: 'currency' },
          { value: months, label: 'Months to Goal', unit: 'months', format: 'decimal' }
        ],
        explanation: ['Savings plan to reach your goal'],
        steps: [
          `Goal: $${goalAmount.toLocaleString()}`,
          `Current Savings: $${currentSavings.toLocaleString()}`,
          `Time Frame: ${months} months`,
          `Required Monthly Savings: $${monthlyPayment.toFixed(2)}`,
          annualRate > 0 ? `With ${annualRate}% annual interest` : 'No interest assumed'
        ]
      };
    },
    tags: ['finance', 'savings', 'goal-planning', 'budgeting'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'retirement-calculator',
    title: 'Retirement Calculator',
    description: 'Calculate retirement savings and income projections.',
    category: 'Finance',
    inputs: [
      { id: 'current_age', label: 'Current Age', type: 'number', required: true, placeholder: 'Your current age' },
      { id: 'retirement_age', label: 'Retirement Age', type: 'number', required: true, placeholder: 'Planned retirement age' },
      { id: 'current_savings', label: 'Current Retirement Savings ($)', type: 'number', required: true, placeholder: 'Current balance' },
      { id: 'monthly_contribution', label: 'Monthly Contribution ($)', type: 'number', required: true, placeholder: 'Monthly savings' },
      { id: 'annual_return', label: 'Expected Annual Return (%)', type: 'number', required: true, placeholder: 'Investment return rate' },
      { id: 'desired_income', label: 'Desired Monthly Income ($)', type: 'number', required: false, placeholder: 'Optional - retirement income goal' }
    ],
    formula: 'Future Value = PV(1+r)^n + PMT[((1+r)^n-1)/r]',
    calculate: (inputs) => {
      const currentAge = parseInt(inputs.current_age);
      const retirementAge = parseInt(inputs.retirement_age);
      const currentSavings = parseFloat(inputs.current_savings);
      const monthlyContribution = parseFloat(inputs.monthly_contribution);
      const annualReturn = parseFloat(inputs.annual_return) / 100;
      const desiredIncome = parseFloat(inputs.desired_income) || 0;
      
      if (currentAge >= retirementAge) {
        throw new Error('Retirement age must be greater than current age');
      }
      
      const yearsToRetirement = retirementAge - currentAge;
      const monthsToRetirement = yearsToRetirement * 12;
      const monthlyReturn = annualReturn / 12;
      
      // Future value of current savings
      const futureValueCurrent = currentSavings * Math.pow(1 + monthlyReturn, monthsToRetirement);
      
      // Future value of monthly contributions
      const futureValueContributions = monthlyReturn > 0 ?
        monthlyContribution * (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn :
        monthlyContribution * monthsToRetirement;
      
      const totalAtRetirement = futureValueCurrent + futureValueContributions;
      const totalContributions = (monthlyContribution * monthsToRetirement) + currentSavings;
      const totalGrowth = totalAtRetirement - totalContributions;
      
      // Calculate sustainable withdrawal (4% rule)
      const sustainableWithdrawal = totalAtRetirement * 0.04 / 12;
      
      let shortfallSurplus = 0;
      if (desiredIncome > 0) {
        shortfallSurplus = sustainableWithdrawal - desiredIncome;
      }
      
      const baseResults = [
        { value: totalAtRetirement, label: 'Total at Retirement', unit: '$', format: 'currency' as const },
        { value: sustainableWithdrawal, label: 'Sustainable Monthly Income', unit: '$', format: 'currency' as const },
        { value: totalGrowth, label: 'Investment Growth', unit: '$', format: 'currency' as const },
        { value: totalContributions, label: 'Total Contributions', unit: '$', format: 'currency' as const }
      ];
      
      if (desiredIncome > 0) {
        baseResults.push({
          value: Math.abs(shortfallSurplus), 
          label: shortfallSurplus >= 0 ? 'Monthly Surplus' : 'Monthly Shortfall', 
          unit: '$', 
          format: 'currency' as const
        });
      }
      
      return {
        results: baseResults,
        explanation: ['Retirement planning projection'],
        steps: [
          `Years to retirement: ${yearsToRetirement}`,
          `Monthly contributions: $${monthlyContribution.toFixed(2)}`,
          `Expected annual return: ${(annualReturn*100)}%`,
          `Total at retirement: $${totalAtRetirement.toLocaleString()}`,
          `Sustainable income (4% rule): $${sustainableWithdrawal.toFixed(2)}/month`
        ]
      };
    },
    tags: ['finance', 'retirement', '401k', 'pension', 'investment'],
    complexity: 'Advanced'
  },
  
  {
    id: 'investment-return-calculator',
    title: 'Investment Return Calculator',
    description: 'Calculate investment returns and analyze performance.',
    category: 'Finance',
    inputs: [
      { id: 'initial_investment', label: 'Initial Investment ($)', type: 'number', required: true, placeholder: 'Starting amount' },
      { id: 'final_value', label: 'Final Value ($)', type: 'number', required: false, placeholder: 'Ending value' },
      { id: 'annual_return', label: 'Annual Return Rate (%)', type: 'number', required: false, placeholder: 'Expected return' },
      { id: 'time_period', label: 'Time Period (years)', type: 'number', required: true, placeholder: 'Investment duration' },
      { id: 'additional_contributions', label: 'Additional Annual Contributions ($)', type: 'number', required: false, placeholder: 'Optional yearly additions' }
    ],
    formula: 'Various return calculations based on provided inputs',
    calculate: (inputs) => {
      const initialInvestment = parseFloat(inputs.initial_investment);
      const finalValue = parseFloat(inputs.final_value);
      const annualReturn = parseFloat(inputs.annual_return) / 100;
      const timePeriod = parseFloat(inputs.time_period);
      const additionalContributions = parseFloat(inputs.additional_contributions) || 0;
      
      if (initialInvestment <= 0 || timePeriod <= 0) {
        throw new Error('Initial investment and time period must be positive');
      }
      
      let results = [];
      let explanation = [];
      let steps = [];
      
      if (!isNaN(finalValue) && !isNaN(annualReturn)) {
        // Both final value and return rate provided - calculate consistency
        const expectedFinalValue = initialInvestment * Math.pow(1 + annualReturn, timePeriod) + 
          (additionalContributions * (Math.pow(1 + annualReturn, timePeriod) - 1) / annualReturn);
        
        results = [
          { value: finalValue, label: 'Actual Final Value', unit: '$', format: 'currency' },
          { value: expectedFinalValue, label: 'Expected Final Value', unit: '$', format: 'currency' },
          { value: finalValue - initialInvestment, label: 'Total Gain/Loss', unit: '$', format: 'currency' },
          { value: ((finalValue - initialInvestment) / initialInvestment) * 100, label: 'Total Return', unit: '%', format: 'decimal' }
        ];
        
        explanation = ['Comparing actual vs expected returns'];
        steps = [
          `Initial: $${initialInvestment.toLocaleString()}`,
          `Expected return: ${(annualReturn*100)}% annually`,
          `Time period: ${timePeriod} years`,
          `Expected final value: $${expectedFinalValue.toLocaleString()}`,
          `Actual final value: $${finalValue.toLocaleString()}`
        ];
        
      } else if (!isNaN(finalValue)) {
        // Calculate return rate from initial and final values
        const totalReturn = (finalValue - initialInvestment) / initialInvestment;
        const annualizedReturn = Math.pow(finalValue / initialInvestment, 1 / timePeriod) - 1;
        
        results = [
          { value: finalValue, label: 'Final Value', unit: '$', format: 'currency' },
          { value: finalValue - initialInvestment, label: 'Total Gain/Loss', unit: '$', format: 'currency' },
          { value: totalReturn * 100, label: 'Total Return', unit: '%', format: 'decimal' },
          { value: annualizedReturn * 100, label: 'Annualized Return', unit: '%', format: 'decimal' }
        ];
        
        explanation = ['Calculating returns from initial and final values'];
        steps = [
          `Initial investment: $${initialInvestment.toLocaleString()}`,
          `Final value: $${finalValue.toLocaleString()}`,
          `Total return: ${(totalReturn * 100).toFixed(2)}%`,
          `Annualized return: ${(annualizedReturn * 100).toFixed(2)}%`
        ];
        
      } else if (!isNaN(annualReturn)) {
        // Calculate final value from return rate
        const finalValueCalc = initialInvestment * Math.pow(1 + annualReturn, timePeriod) + 
          (additionalContributions * (Math.pow(1 + annualReturn, timePeriod) - 1) / annualReturn);
        const totalGain = finalValueCalc - initialInvestment - (additionalContributions * timePeriod);
        const totalContributions = initialInvestment + (additionalContributions * timePeriod);
        
        results = [
          { value: finalValueCalc, label: 'Expected Final Value', unit: '$', format: 'currency' },
          { value: totalGain, label: 'Investment Growth', unit: '$', format: 'currency' },
          { value: totalContributions, label: 'Total Contributions', unit: '$', format: 'currency' },
          { value: ((finalValueCalc - totalContributions) / totalContributions) * 100, label: 'Return on Investment', unit: '%', format: 'decimal' }
        ];
        
        explanation = ['Projecting future value from expected return'];
        steps = [
          `Initial investment: $${initialInvestment.toLocaleString()}`,
          `Annual return: ${(annualReturn*100)}%`,
          `Time period: ${timePeriod} years`,
          `Additional contributions: $${additionalContributions.toLocaleString()}/year`,
          `Expected final value: $${finalValueCalc.toLocaleString()}`
        ];
        
      } else {
        throw new Error('Please provide either the final value OR the expected annual return rate');
      }
      
      return { results, explanation, steps };
    },
    tags: ['finance', 'investment', 'returns', 'portfolio'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'break-even-calculator',
    title: 'Break-Even Analysis Calculator',
    description: 'Calculate break-even point for business operations.',
    category: 'Finance',
    inputs: [
      { id: 'fixed_costs', label: 'Fixed Costs ($)', type: 'number', required: true, placeholder: 'Monthly fixed expenses' },
      { id: 'variable_cost_per_unit', label: 'Variable Cost per Unit ($)', type: 'number', required: true, placeholder: 'Cost per item' },
      { id: 'selling_price', label: 'Selling Price per Unit ($)', type: 'number', required: true, placeholder: 'Revenue per item' }
    ],
    formula: 'Break-Even Point = Fixed Costs / (Selling Price - Variable Cost)',
    calculate: (inputs) => {
      const fixedCosts = parseFloat(inputs.fixed_costs);
      const variableCost = parseFloat(inputs.variable_cost_per_unit);
      const sellingPrice = parseFloat(inputs.selling_price);
      
      if (fixedCosts <= 0 || variableCost < 0 || sellingPrice <= 0) {
        throw new Error('Invalid input values');
      }
      
      if (sellingPrice <= variableCost) {
        throw new Error('Selling price must be greater than variable cost per unit');
      }
      
      const contributionMargin = sellingPrice - variableCost;
      const contributionMarginRatio = (contributionMargin / sellingPrice) * 100;
      const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
      const breakEvenRevenue = breakEvenUnits * sellingPrice;
      const breakEvenVariableCosts = breakEvenUnits * variableCost;
      
      return {
        results: [
          { value: breakEvenUnits, label: 'Break-Even Units', unit: 'units', format: 'decimal' },
          { value: breakEvenRevenue, label: 'Break-Even Revenue', unit: '$', format: 'currency' },
          { value: contributionMargin, label: 'Contribution Margin per Unit', unit: '$', format: 'currency' },
          { value: contributionMarginRatio, label: 'Contribution Margin Ratio', unit: '%', format: 'decimal' }
        ],
        explanation: ['Break-even analysis for business planning'],
        steps: [
          `Fixed Costs: $${fixedCosts.toLocaleString()}`,
          `Variable Cost per Unit: $${variableCost.toFixed(2)}`,
          `Selling Price per Unit: $${sellingPrice.toFixed(2)}`,
          `Contribution Margin: $${sellingPrice.toFixed(2)} - $${variableCost.toFixed(2)} = $${contributionMargin.toFixed(2)}`,
          `Break-Even Units: $${fixedCosts.toLocaleString()} ÷ $${contributionMargin.toFixed(2)} = ${breakEvenUnits} units`,
          `Break-Even Revenue: ${breakEvenUnits} × $${sellingPrice.toFixed(2)} = $${breakEvenRevenue.toLocaleString()}`
        ]
      };
    },
    tags: ['finance', 'business', 'break-even', 'analysis'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'present-value-calculator',
    title: 'Present Value Calculator',
    description: 'Calculate present value of future cash flows.',
    category: 'Finance',
    inputs: [
      { id: 'future_value', label: 'Future Value ($)', type: 'number', required: true, placeholder: 'Future amount' },
      { id: 'discount_rate', label: 'Discount Rate (%)', type: 'number', required: true, placeholder: 'Annual discount rate' },
      { id: 'time_periods', label: 'Time Periods (years)', type: 'number', required: true, placeholder: 'Number of years' },
      { id: 'compounding', label: 'Compounding Frequency', type: 'select', required: true, options: [
        { value: '1', label: 'Annually' },
        { value: '2', label: 'Semi-annually' },
        { value: '4', label: 'Quarterly' },
        { value: '12', label: 'Monthly' },
        { value: '365', label: 'Daily' }
      ]}
    ],
    formula: 'Present Value = FV / (1 + r/n)^(n×t)',
    calculate: (inputs) => {
      const futureValue = parseFloat(inputs.future_value);
      const annualRate = parseFloat(inputs.discount_rate) / 100;
      const timePeriods = parseFloat(inputs.time_periods);
      const compounding = parseInt(inputs.compounding);
      
      if (futureValue <= 0 || annualRate < 0 || timePeriods <= 0) {
        throw new Error('Invalid input values');
      }
      
      const periodicRate = annualRate / compounding;
      const totalPeriods = compounding * timePeriods;
      const presentValue = futureValue / Math.pow(1 + periodicRate, totalPeriods);
      const discount = futureValue - presentValue;
      const discountRate = (discount / futureValue) * 100;
      
      return {
        results: [
          { value: presentValue, label: 'Present Value', unit: '$', format: 'currency' },
          { value: discount, label: 'Total Discount', unit: '$', format: 'currency' },
          { value: discountRate, label: 'Discount Percentage', unit: '%', format: 'decimal' },
          { value: futureValue, label: 'Future Value', unit: '$', format: 'currency' }
        ],
        explanation: ['Present value calculation for future cash flows'],
        steps: [
          `Future Value: $${futureValue.toLocaleString()}`,
          `Discount Rate: ${(annualRate*100)}% annually`,
          `Time Period: ${timePeriods} years`,
          `Compounding: ${compounding} times per year`,
          `Present Value = $${futureValue.toLocaleString()} / (1 + ${periodicRate.toFixed(4)})^${totalPeriods}`,
          `Present Value = $${presentValue.toFixed(2)}`
        ]
      };
    },
    tags: ['finance', 'present-value', 'discounting', 'valuation'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'future-value-calculator',
    title: 'Future Value Calculator',
    description: 'Calculate future value of present investments.',
    category: 'Finance',
    inputs: [
      { id: 'present_value', label: 'Present Value ($)', type: 'number', required: true, placeholder: 'Current amount' },
      { id: 'interest_rate', label: 'Interest Rate (%)', type: 'number', required: true, placeholder: 'Annual interest rate' },
      { id: 'time_periods', label: 'Time Periods (years)', type: 'number', required: true, placeholder: 'Number of years' },
      { id: 'compounding', label: 'Compounding Frequency', type: 'select', required: true, options: [
        { value: '1', label: 'Annually' },
        { value: '2', label: 'Semi-annually' },
        { value: '4', label: 'Quarterly' },
        { value: '12', label: 'Monthly' },
        { value: '365', label: 'Daily' }
      ]}
    ],
    formula: 'Future Value = PV × (1 + r/n)^(n×t)',
    calculate: (inputs) => {
      const presentValue = parseFloat(inputs.present_value);
      const annualRate = parseFloat(inputs.interest_rate) / 100;
      const timePeriods = parseFloat(inputs.time_periods);
      const compounding = parseInt(inputs.compounding);
      
      if (presentValue <= 0 || annualRate < 0 || timePeriods <= 0) {
        throw new Error('Invalid input values');
      }
      
      const periodicRate = annualRate / compounding;
      const totalPeriods = compounding * timePeriods;
      const futureValue = presentValue * Math.pow(1 + periodicRate, totalPeriods);
      const totalGrowth = futureValue - presentValue;
      const growthRate = (totalGrowth / presentValue) * 100;
      
      return {
        results: [
          { value: futureValue, label: 'Future Value', unit: '$', format: 'currency' },
          { value: totalGrowth, label: 'Total Growth', unit: '$', format: 'currency' },
          { value: growthRate, label: 'Total Growth Rate', unit: '%', format: 'decimal' },
          { value: presentValue, label: 'Present Value', unit: '$', format: 'currency' }
        ],
        explanation: ['Future value calculation with compound interest'],
        steps: [
          `Present Value: $${presentValue.toLocaleString()}`,
          `Interest Rate: ${(annualRate*100)}% annually`,
          `Time Period: ${timePeriods} years`,
          `Compounding: ${compounding} times per year`,
          `Future Value = $${presentValue.toLocaleString()} × (1 + ${periodicRate.toFixed(4)})^${totalPeriods}`,
          `Future Value = $${futureValue.toFixed(2)}`
        ]
      };
    },
    tags: ['finance', 'future-value', 'compound-interest', 'investment'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'auto-loan-calculator',
    title: 'Auto Loan Calculator',
    description: 'Calculate car loan payments and total costs.',
    category: 'Finance',
    inputs: [
      { id: 'vehicle_price', label: 'Vehicle Price ($)', type: 'number', required: true, placeholder: 'Car purchase price' },
      { id: 'down_payment', label: 'Down Payment ($)', type: 'number', required: true, placeholder: 'Upfront payment' },
      { id: 'trade_in_value', label: 'Trade-in Value ($)', type: 'number', required: false, placeholder: 'Value of trade-in' },
      { id: 'interest_rate', label: 'Interest Rate (%)', type: 'number', required: true, placeholder: 'Annual interest rate' },
      { id: 'loan_term', label: 'Loan Term (years)', type: 'number', required: true, placeholder: 'Loan duration' },
      { id: 'tax_rate', label: 'Sales Tax Rate (%)', type: 'number', required: false, placeholder: 'Local sales tax' },
      { id: 'fees', label: 'Additional Fees ($)', type: 'number', required: false, placeholder: 'Documentation fees, etc.' }
    ],
    formula: 'Loan Amount = Vehicle Price + Tax + Fees - Down Payment - Trade-in',
    calculate: (inputs) => {
      const vehiclePrice = parseFloat(inputs.vehicle_price);
      const downPayment = parseFloat(inputs.down_payment);
      const tradeInValue = parseFloat(inputs.trade_in_value) || 0;
      const annualRate = parseFloat(inputs.interest_rate) / 100;
      const loanTermYears = parseFloat(inputs.loan_term);
      const taxRate = parseFloat(inputs.tax_rate) / 100 || 0;
      const fees = parseFloat(inputs.fees) || 0;
      
      if (vehiclePrice <= 0 || downPayment < 0 || annualRate < 0 || loanTermYears <= 0) {
        throw new Error('Invalid input values');
      }
      
      const salesTax = vehiclePrice * taxRate;
      const totalVehicleCost = vehiclePrice + salesTax + fees;
      const loanAmount = totalVehicleCost - downPayment - tradeInValue;
      
      if (loanAmount <= 0) {
        return {
          results: [
            { value: 0, label: 'Monthly Payment', unit: '$', format: 'currency' },
            { value: totalVehicleCost, label: 'Total Vehicle Cost', unit: '$', format: 'currency' },
            { value: downPayment + tradeInValue, label: 'Total Down Payment', unit: '$', format: 'currency' },
            { value: loanAmount, label: 'Loan Amount', unit: '$', format: 'currency' }
          ],
          explanation: ['No financing needed - cash purchase'],
          steps: [
            `Vehicle Price: $${vehiclePrice.toLocaleString()}`,
            `Sales Tax: $${salesTax.toFixed(2)}`,
            `Total Cost: $${totalVehicleCost.toFixed(2)}`,
            `Down Payment + Trade-in: $${(downPayment + tradeInValue).toFixed(2)}`,
            'No loan required - sufficient down payment and trade-in'
          ]
        };
      }
      
      const monthlyRate = annualRate / 12;
      const numPayments = loanTermYears * 12;
      
      const monthlyPayment = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      const totalPayments = monthlyPayment * numPayments;
      const totalInterest = totalPayments - loanAmount;
      const totalCostOfOwnership = totalVehicleCost + totalInterest;
      
      return {
        results: [
          { value: monthlyPayment, label: 'Monthly Payment', unit: '$', format: 'currency' },
          { value: loanAmount, label: 'Loan Amount', unit: '$', format: 'currency' },
          { value: totalInterest, label: 'Total Interest', unit: '$', format: 'currency' },
          { value: totalCostOfOwnership, label: 'Total Cost of Ownership', unit: '$', format: 'currency' }
        ],
        explanation: ['Auto loan payment calculation'],
        steps: [
          `Vehicle Price: $${vehiclePrice.toLocaleString()}`,
          `Sales Tax: $${salesTax.toFixed(2)}`,
          `Fees: $${fees.toFixed(2)}`,
          `Down Payment: $${downPayment.toLocaleString()}`,
          `Trade-in Value: $${tradeInValue.toLocaleString()}`,
          `Loan Amount: $${loanAmount.toLocaleString()}`,
          `Monthly Payment: $${monthlyPayment.toFixed(2)}`
        ]
      };
    },
    tags: ['finance', 'auto-loan', 'car-payment', 'vehicle'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'debt-payoff-calculator',
    title: 'Debt Payoff Calculator',
    description: 'Calculate debt payoff strategies and timeline.',
    category: 'Finance',
    inputs: [
      { id: 'debt_balance', label: 'Current Debt Balance ($)', type: 'number', required: true, placeholder: 'Outstanding balance' },
      { id: 'interest_rate', label: 'Annual Interest Rate (%)', type: 'number', required: true, placeholder: 'APR' },
      { id: 'monthly_payment', label: 'Monthly Payment ($)', type: 'number', required: false, placeholder: 'Planned payment amount' },
      { id: 'payoff_time', label: 'Desired Payoff Time (months)', type: 'number', required: false, placeholder: 'Target timeline' }
    ],
    formula: 'Payment = Balance × [r(1+r)^n] / [(1+r)^n-1]',
    calculate: (inputs) => {
      const balance = parseFloat(inputs.debt_balance);
      const annualRate = parseFloat(inputs.interest_rate) / 100;
      const monthlyPayment = parseFloat(inputs.monthly_payment);
      const desiredMonths = parseFloat(inputs.payoff_time);
      
      if (balance <= 0 || annualRate < 0) {
        throw new Error('Invalid debt balance or interest rate');
      }
      
      const monthlyRate = annualRate / 12;
      const minimumPayment = balance * monthlyRate;
      
      if (!isNaN(monthlyPayment) && !isNaN(desiredMonths)) {
        throw new Error('Please provide either monthly payment OR desired payoff time, not both');
      }
      
      if (!isNaN(monthlyPayment)) {
        // Calculate payoff time from monthly payment
        if (monthlyPayment <= minimumPayment) {
          throw new Error(`Monthly payment must be greater than minimum payment of $${minimumPayment.toFixed(2)}`);
        }
        
        const monthsToPayoff = Math.log(1 + (balance * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate);
        const totalPayments = monthlyPayment * monthsToPayoff;
        const totalInterest = totalPayments - balance;
        
        // Calculate minimum payment scenario for comparison
        const minimumMonthlyPayment = balance * 0.02; // Assume 2% minimum payment
        const minPayoffMonths = Math.log(1 + (balance * monthlyRate) / minimumMonthlyPayment) / Math.log(1 + monthlyRate);
        const interestSaved = (minimumMonthlyPayment * minPayoffMonths) - totalPayments;
        
        return {
          results: [
            { value: Math.ceil(monthsToPayoff), label: 'Months to Pay Off', unit: 'months', format: 'decimal' },
            { value: totalPayments, label: 'Total Payments', unit: '$', format: 'currency' },
            { value: totalInterest, label: 'Total Interest', unit: '$', format: 'currency' },
            { value: Math.max(0, interestSaved), label: 'Interest Saved vs Minimum', unit: '$', format: 'currency' }
          ],
          explanation: ['Debt payoff analysis with specified monthly payment'],
          steps: [
            `Debt Balance: $${balance.toLocaleString()}`,
            `Annual Interest Rate: ${(annualRate*100)}%`,
            `Monthly Payment: $${monthlyPayment.toFixed(2)}`,
            `Time to Pay Off: ${Math.ceil(monthsToPayoff)} months`,
            `Total Interest: $${totalInterest.toFixed(2)}`
          ]
        };
        
      } else if (!isNaN(desiredMonths)) {
        // Calculate required payment for desired timeline
        if (desiredMonths <= 0) {
          throw new Error('Payoff time must be positive');
        }
        
        const requiredPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, desiredMonths)) / 
                               (Math.pow(1 + monthlyRate, desiredMonths) - 1);
        
        const totalPayments = requiredPayment * desiredMonths;
        const totalInterest = totalPayments - balance;
        
        return {
          results: [
            { value: requiredPayment, label: 'Required Monthly Payment', unit: '$', format: 'currency' },
            { value: totalPayments, label: 'Total Payments', unit: '$', format: 'currency' },
            { value: totalInterest, label: 'Total Interest', unit: '$', format: 'currency' },
            { value: desiredMonths, label: 'Payoff Timeline', unit: 'months', format: 'decimal' }
          ],
          explanation: ['Required payment for desired payoff timeline'],
          steps: [
            `Debt Balance: $${balance.toLocaleString()}`,
            `Annual Interest Rate: ${(annualRate*100)}%`,
            `Desired Payoff Time: ${desiredMonths} months`,
            `Required Monthly Payment: $${requiredPayment.toFixed(2)}`,
            `Total Interest: $${totalInterest.toFixed(2)}`
          ]
        };
        
      } else {
        throw new Error('Please provide either a monthly payment amount OR desired payoff time');
      }
    },
    tags: ['finance', 'debt', 'payoff', 'credit-card', 'loan'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'roi-calculator',
    title: 'Return on Investment (ROI) Calculator',
    description: 'Calculate ROI for investments and business decisions.',
    category: 'Finance',
    inputs: [
      { id: 'initial_investment', label: 'Initial Investment ($)', type: 'number', required: true, placeholder: 'Cost of investment' },
      { id: 'final_value', label: 'Final Value ($)', type: 'number', required: false, placeholder: 'Current/ending value' },
      { id: 'gains', label: 'Gains from Investment ($)', type: 'number', required: false, placeholder: 'Profit/income generated' },
      { id: 'time_period', label: 'Time Period (years)', type: 'number', required: false, placeholder: 'Investment duration' }
    ],
    formula: 'ROI = (Gain - Cost) / Cost × 100%',
    calculate: (inputs) => {
      const initialInvestment = parseFloat(inputs.initial_investment);
      const finalValue = parseFloat(inputs.final_value);
      const gains = parseFloat(inputs.gains);
      const timePeriod = parseFloat(inputs.time_period);
      
      if (initialInvestment <= 0) {
        throw new Error('Initial investment must be positive');
      }
      
      let totalGain, finalVal;
      
      if (!isNaN(finalValue)) {
        // Calculate from final value
        totalGain = finalValue - initialInvestment;
        finalVal = finalValue;
      } else if (!isNaN(gains)) {
        // Calculate from gains
        totalGain = gains;
        finalVal = initialInvestment + gains;
      } else {
        throw new Error('Please provide either the final value OR the gains from investment');
      }
      
      const roi = (totalGain / initialInvestment) * 100;
      const absoluteReturn = Math.abs(totalGain);
      const profitOrLoss = totalGain >= 0 ? 'Profit' : 'Loss';
      
      let annualizedROI = null;
      if (!isNaN(timePeriod) && timePeriod > 0) {
        // Calculate annualized ROI
        annualizedROI = (Math.pow(finalVal / initialInvestment, 1 / timePeriod) - 1) * 100;
      }
      
      const baseResults = [
        { value: roi, label: 'ROI', unit: '%', format: 'decimal' as const },
        { value: absoluteReturn, label: `Total ${profitOrLoss}`, unit: '$', format: 'currency' as const },
        { value: finalVal, label: 'Final Value', unit: '$', format: 'currency' as const },
        { value: initialInvestment, label: 'Initial Investment', unit: '$', format: 'currency' as const }
      ];
      
      if (annualizedROI !== null) {
        baseResults.push({ value: annualizedROI, label: 'Annualized ROI', unit: '%', format: 'decimal' as const });
      }
      
      const steps = [
        `Initial Investment: $${initialInvestment.toLocaleString()}`,
        `Final Value: $${finalVal.toLocaleString()}`,
        `Total ${profitOrLoss}: $${Math.abs(totalGain).toLocaleString()}`,
        `ROI = ($${finalVal.toLocaleString()} - $${initialInvestment.toLocaleString()}) / $${initialInvestment.toLocaleString()} × 100%`,
        `ROI = ${roi.toFixed(2)}%`
      ];
      
      if (annualizedROI !== null) {
        steps.push(`Annualized ROI over ${timePeriod} years: ${annualizedROI.toFixed(2)}%`);
      }
      
      return {
        results: baseResults,
        explanation: ['Return on Investment calculation'],
        steps
      };
    },
    tags: ['finance', 'roi', 'investment', 'return', 'profitability'],
    complexity: 'Basic'
  },
  
  {
    id: 'budget-calculator',
    title: 'Personal Budget Calculator',
    description: 'Calculate and analyze personal budget allocations.',
    category: 'Finance',
    inputs: [
      { id: 'monthly_income', label: 'Monthly Income ($)', type: 'number', required: true, placeholder: 'Take-home pay' },
      { id: 'housing', label: 'Housing ($)', type: 'number', required: false, placeholder: 'Rent/mortgage payment' },
      { id: 'transportation', label: 'Transportation ($)', type: 'number', required: false, placeholder: 'Car payment, gas, etc.' },
      { id: 'food', label: 'Food ($)', type: 'number', required: false, placeholder: 'Groceries, dining out' },
      { id: 'utilities', label: 'Utilities ($)', type: 'number', required: false, placeholder: 'Electric, water, internet' },
      { id: 'insurance', label: 'Insurance ($)', type: 'number', required: false, placeholder: 'Health, auto insurance' },
      { id: 'savings', label: 'Savings ($)', type: 'number', required: false, placeholder: 'Emergency fund, investments' },
      { id: 'other_expenses', label: 'Other Expenses ($)', type: 'number', required: false, placeholder: 'Entertainment, misc.' }
    ],
    formula: '50/30/20 rule: 50% needs, 30% wants, 20% savings',
    calculate: (inputs) => {
      const monthlyIncome = parseFloat(inputs.monthly_income);
      const housing = parseFloat(inputs.housing) || 0;
      const transportation = parseFloat(inputs.transportation) || 0;
      const food = parseFloat(inputs.food) || 0;
      const utilities = parseFloat(inputs.utilities) || 0;
      const insurance = parseFloat(inputs.insurance) || 0;
      const savings = parseFloat(inputs.savings) || 0;
      const otherExpenses = parseFloat(inputs.other_expenses) || 0;
      
      if (monthlyIncome <= 0) {
        throw new Error('Monthly income must be positive');
      }
      
      const totalExpenses = housing + transportation + food + utilities + insurance + savings + otherExpenses;
      const remainingIncome = monthlyIncome - totalExpenses;
      const expenseRatio = (totalExpenses / monthlyIncome) * 100;
      const savingsRate = (savings / monthlyIncome) * 100;
      
      // 50/30/20 rule recommendations
      const recommendedNeeds = monthlyIncome * 0.50; // Housing, utilities, food, transportation, insurance
      const recommendedWants = monthlyIncome * 0.30; // Entertainment, dining out, hobbies
      const recommendedSavings = monthlyIncome * 0.20; // Emergency fund, retirement, investments
      
      const actualNeeds = housing + utilities + food + transportation + insurance;
      const actualWants = otherExpenses;
      const actualSavings = savings;
      
      const needsRatio = (actualNeeds / monthlyIncome) * 100;
      const wantsRatio = (actualWants / monthlyIncome) * 100;
      
      const status = remainingIncome >= 0 ? 'Surplus' : 'Deficit';
      
      return {
        results: [
          { value: Math.abs(remainingIncome), label: `Budget ${status}`, unit: '$', format: 'currency' },
          { value: totalExpenses, label: 'Total Expenses', unit: '$', format: 'currency' },
          { value: expenseRatio, label: 'Expense Ratio', unit: '%', format: 'decimal' },
          { value: savingsRate, label: 'Savings Rate', unit: '%', format: 'decimal' },
          { value: needsRatio, label: 'Needs (Recommended: 50%)', unit: '%', format: 'decimal' },
          { value: wantsRatio, label: 'Wants (Recommended: 30%)', unit: '%', format: 'decimal' }
        ],
        explanation: ['Personal budget analysis with 50/30/20 rule comparison'],
        steps: [
          `Monthly Income: $${monthlyIncome.toLocaleString()}`,
          `Total Expenses: $${totalExpenses.toLocaleString()}`,
          `${status}: $${Math.abs(remainingIncome).toLocaleString()}`,
          `Savings Rate: ${savingsRate.toFixed(1)}% (recommended: 20%)`,
          `Needs: ${needsRatio.toFixed(1)}% (recommended: 50%)`,
          `Wants: ${wantsRatio.toFixed(1)}% (recommended: 30%)`
        ]
      };
    },
    tags: ['finance', 'budget', 'personal-finance', '50-30-20-rule'],
    complexity: 'Basic'
  }
];

export default financeCalculators;