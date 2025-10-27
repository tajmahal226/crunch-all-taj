import { Calculator } from '../types/calculator';

const dailyLifeCalculators: Calculator[] = [
  // Financial & Shopping Calculators
  {
    id: 'tip-calculator',
    title: 'Tip Calculator',
    description: 'Calculate tips and split bills at restaurants quickly and accurately.',
    category: 'Daily Life',
    inputs: [
      { id: 'bill_amount', label: 'Bill Amount ($)', type: 'number', required: true, min: 0, step: 0.01, placeholder: 'Enter total bill' },
      { id: 'tip_percentage', label: 'Tip Percentage (%)', type: 'number', required: true, min: 0, max: 100, defaultValue: 18, placeholder: 'Standard is 15-20%' },
      { id: 'number_of_people', label: 'Number of People', type: 'number', required: true, min: 1, defaultValue: 1, placeholder: 'How many people?' }
    ],
    formula: 'Tip = Bill Amount × (Tip % ÷ 100), Total per Person = (Bill + Tip) ÷ Number of People',
    calculate: (inputs) => {
      const billAmount = parseFloat(inputs.bill_amount);
      const tipPercentage = parseFloat(inputs.tip_percentage);
      const numberOfPeople = parseInt(inputs.number_of_people);
      
      if (billAmount <= 0 || tipPercentage < 0 || numberOfPeople <= 0) {
        throw new Error('Please enter valid positive values');
      }
      
      const tipAmount = billAmount * (tipPercentage / 100);
      const totalAmount = billAmount + tipAmount;
      const perPerson = totalAmount / numberOfPeople;
      const tipPerPerson = tipAmount / numberOfPeople;
      
      return {
        results: [
          { value: tipAmount, label: 'Tip Amount', unit: '$', format: 'currency' },
          { value: totalAmount, label: 'Total Amount', unit: '$', format: 'currency' },
          { value: perPerson, label: 'Per Person (Total)', unit: '$', format: 'currency' },
          { value: tipPerPerson, label: 'Per Person (Tip)', unit: '$', format: 'currency' }
        ],
        explanation: [
          `${tipPercentage}% tip on $${billAmount.toFixed(2)} bill`,
          `Split ${numberOfPeople} way${numberOfPeople > 1 ? 's' : ''}`
        ],
        steps: [
          `Bill: $${billAmount.toFixed(2)}`,
          `Tip (${tipPercentage}%): $${billAmount.toFixed(2)} × ${tipPercentage}% = $${tipAmount.toFixed(2)}`,
          `Total: $${billAmount.toFixed(2)} + $${tipAmount.toFixed(2)} = $${totalAmount.toFixed(2)}`,
          `Per person: $${totalAmount.toFixed(2)} ÷ ${numberOfPeople} = $${perPerson.toFixed(2)}`
        ]
      };
    },
    tags: ['tip', 'restaurant', 'bill', 'split', 'dining'],
    complexity: 'Basic'
  },

  {
    id: 'discount-calculator',
    title: 'Discount Calculator',
    description: 'Find sale prices and calculate percentage savings on purchases.',
    category: 'Daily Life',
    inputs: [
      { id: 'original_price', label: 'Original Price ($)', type: 'number', required: true, min: 0, step: 0.01, placeholder: 'Enter original price' },
      { id: 'discount_type', label: 'Discount Type', type: 'select', required: true, options: [
        { value: 'percentage', label: 'Percentage Off' },
        { value: 'amount', label: 'Dollar Amount Off' }
      ]},
      { id: 'discount_value', label: 'Discount Value', type: 'number', required: true, min: 0, step: 0.01, placeholder: 'Enter discount' }
    ],
    formula: 'Sale Price = Original Price - Discount Amount',
    calculate: (inputs) => {
      const originalPrice = parseFloat(inputs.original_price);
      const discountType = inputs.discount_type;
      const discountValue = parseFloat(inputs.discount_value);
      
      if (originalPrice <= 0 || discountValue < 0) {
        throw new Error('Please enter valid positive values');
      }
      
      let discountAmount;
      let discountPercentage;
      
      if (discountType === 'percentage') {
        if (discountValue > 100) throw new Error('Discount percentage cannot exceed 100%');
        discountAmount = originalPrice * (discountValue / 100);
        discountPercentage = discountValue;
      } else {
        if (discountValue > originalPrice) throw new Error('Discount amount cannot exceed original price');
        discountAmount = discountValue;
        discountPercentage = (discountAmount / originalPrice) * 100;
      }
      
      const salePrice = originalPrice - discountAmount;
      const savings = discountAmount;
      
      return {
        results: [
          { value: salePrice, label: 'Sale Price', unit: '$', format: 'currency' },
          { value: savings, label: 'You Save', unit: '$', format: 'currency' },
          { value: discountPercentage, label: 'Discount Percentage', unit: '%', format: 'decimal' }
        ],
        explanation: [
          `${discountPercentage.toFixed(1)}% off original price of $${originalPrice.toFixed(2)}`,
          `Total savings: $${savings.toFixed(2)}`
        ],
        steps: [
          `Original Price: $${originalPrice.toFixed(2)}`,
          `Discount: ${discountPercentage.toFixed(1)}% = $${discountAmount.toFixed(2)}`,
          `Sale Price: $${originalPrice.toFixed(2)} - $${discountAmount.toFixed(2)} = $${salePrice.toFixed(2)}`
        ]
      };
    },
    tags: ['discount', 'sale', 'savings', 'shopping', 'percentage'],
    complexity: 'Basic'
  },

  {
    id: 'tax-calculator',
    title: 'Sales Tax Calculator',
    description: 'Add sales tax to purchases and calculate total cost.',
    category: 'Daily Life',
    inputs: [
      { id: 'price_before_tax', label: 'Price Before Tax ($)', type: 'number', required: true, min: 0, step: 0.01, placeholder: 'Enter price' },
      { id: 'tax_rate', label: 'Sales Tax Rate (%)', type: 'number', required: true, min: 0, max: 50, step: 0.01, defaultValue: 8.25, placeholder: 'Enter tax rate' }
    ],
    formula: 'Tax Amount = Price × (Tax Rate ÷ 100), Total = Price + Tax',
    calculate: (inputs) => {
      const priceBeforeTax = parseFloat(inputs.price_before_tax);
      const taxRate = parseFloat(inputs.tax_rate);
      
      if (priceBeforeTax < 0 || taxRate < 0) {
        throw new Error('Please enter valid positive values');
      }
      
      const taxAmount = priceBeforeTax * (taxRate / 100);
      const totalPrice = priceBeforeTax + taxAmount;
      
      return {
        results: [
          { value: totalPrice, label: 'Total Price (with tax)', unit: '$', format: 'currency' },
          { value: taxAmount, label: 'Tax Amount', unit: '$', format: 'currency' },
          { value: priceBeforeTax, label: 'Price Before Tax', unit: '$', format: 'currency' }
        ],
        explanation: [
          `${taxRate}% sales tax applied to $${priceBeforeTax.toFixed(2)}`,
          `Total including tax: $${totalPrice.toFixed(2)}`
        ],
        steps: [
          `Price before tax: $${priceBeforeTax.toFixed(2)}`,
          `Tax (${taxRate}%): $${priceBeforeTax.toFixed(2)} × ${taxRate}% = $${taxAmount.toFixed(2)}`,
          `Total price: $${priceBeforeTax.toFixed(2)} + $${taxAmount.toFixed(2)} = $${totalPrice.toFixed(2)}`
        ]
      };
    },
    tags: ['tax', 'sales-tax', 'shopping', 'total-cost'],
    complexity: 'Basic'
  },

  {
    id: 'split-bill-calculator',
    title: 'Split Bill Calculator',
    description: 'Divide costs among friends or group members with custom amounts.',
    category: 'Daily Life',
    inputs: [
      { id: 'total_bill', label: 'Total Bill ($)', type: 'number', required: true, min: 0, step: 0.01, placeholder: 'Enter total amount' },
      { id: 'number_of_people', label: 'Number of People', type: 'number', required: true, min: 1, max: 20, defaultValue: 2, placeholder: 'How many people?' },
      { id: 'tip_percentage', label: 'Tip Percentage (%)', type: 'number', required: false, min: 0, max: 100, defaultValue: 18, placeholder: 'Optional tip' },
      { id: 'split_type', label: 'Split Type', type: 'select', required: true, options: [
        { value: 'equal', label: 'Split Equally' },
        { value: 'custom', label: 'Custom Amounts' }
      ]}
    ],
    formula: 'Total = Bill + Tip, Per Person = Total ÷ Number of People',
    calculate: (inputs) => {
      const totalBill = parseFloat(inputs.total_bill);
      const numberOfPeople = parseInt(inputs.number_of_people);
      const tipPercentage = parseFloat(inputs.tip_percentage) || 0;
      const splitType = inputs.split_type;
      
      if (totalBill < 0 || numberOfPeople <= 0 || tipPercentage < 0) {
        throw new Error('Please enter valid positive values');
      }
      
      const tipAmount = totalBill * (tipPercentage / 100);
      const totalWithTip = totalBill + tipAmount;
      const perPerson = totalWithTip / numberOfPeople;
      const billPerPerson = totalBill / numberOfPeople;
      const tipPerPerson = tipAmount / numberOfPeople;
      
      return {
        results: [
          { value: perPerson, label: 'Each Person Pays', unit: '$', format: 'currency' },
          { value: totalWithTip, label: 'Total Amount', unit: '$', format: 'currency' },
          { value: billPerPerson, label: 'Bill Per Person', unit: '$', format: 'currency' },
          { value: tipPerPerson, label: 'Tip Per Person', unit: '$', format: 'currency' }
        ],
        explanation: [
          `$${totalBill.toFixed(2)} bill + ${tipPercentage}% tip ($${tipAmount.toFixed(2)})`,
          `Split ${numberOfPeople} ways equally`
        ],
        steps: [
          `Original bill: $${totalBill.toFixed(2)}`,
          `Tip (${tipPercentage}%): $${tipAmount.toFixed(2)}`,
          `Total with tip: $${totalWithTip.toFixed(2)}`,
          `Per person: $${totalWithTip.toFixed(2)} ÷ ${numberOfPeople} = $${perPerson.toFixed(2)}`
        ]
      };
    },
    tags: ['split', 'bill', 'group', 'friends', 'dining'],
    complexity: 'Basic'
  },

  {
    id: 'subscription-cost-tracker',
    title: 'Subscription Cost Tracker',
    description: 'Calculate total monthly and yearly subscription costs.',
    category: 'Daily Life',
    inputs: [
      { id: 'subscription_1', label: 'Subscription 1 ($/month)', type: 'number', required: false, min: 0, step: 0.01, placeholder: 'Netflix, Spotify, etc.' },
      { id: 'subscription_2', label: 'Subscription 2 ($/month)', type: 'number', required: false, min: 0, step: 0.01, placeholder: 'Gym, software, etc.' },
      { id: 'subscription_3', label: 'Subscription 3 ($/month)', type: 'number', required: false, min: 0, step: 0.01, placeholder: 'Cloud storage, etc.' },
      { id: 'subscription_4', label: 'Subscription 4 ($/month)', type: 'number', required: false, min: 0, step: 0.01, placeholder: 'Optional' },
      { id: 'subscription_5', label: 'Subscription 5 ($/month)', type: 'number', required: false, min: 0, step: 0.01, placeholder: 'Optional' }
    ],
    formula: 'Total Monthly = Sum of all subscriptions, Total Yearly = Monthly × 12',
    calculate: (inputs) => {
      const subscriptions = [
        parseFloat(inputs.subscription_1) || 0,
        parseFloat(inputs.subscription_2) || 0,
        parseFloat(inputs.subscription_3) || 0,
        parseFloat(inputs.subscription_4) || 0,
        parseFloat(inputs.subscription_5) || 0
      ];
      
      const totalMonthly = subscriptions.reduce((sum, cost) => sum + cost, 0);
      const totalYearly = totalMonthly * 12;
      const averagePerSubscription = totalMonthly / subscriptions.filter(s => s > 0).length || 0;
      const activeSubscriptions = subscriptions.filter(s => s > 0).length;
      
      return {
        results: [
          { value: totalMonthly, label: 'Total Monthly Cost', unit: '$', format: 'currency' },
          { value: totalYearly, label: 'Total Yearly Cost', unit: '$', format: 'currency' },
          { value: activeSubscriptions, label: 'Active Subscriptions', unit: '' },
          { value: averagePerSubscription, label: 'Average Per Subscription', unit: '$', format: 'currency' }
        ],
        explanation: [
          `${activeSubscriptions} active subscriptions costing $${totalMonthly.toFixed(2)} per month`,
          `Annual cost: $${totalYearly.toFixed(2)}`
        ],
        steps: [
          `Subscription costs: ${subscriptions.filter(s => s > 0).map(s => `$${s.toFixed(2)}`).join(' + ')}`,
          `Total monthly: $${totalMonthly.toFixed(2)}`,
          `Total yearly: $${totalMonthly.toFixed(2)} × 12 = $${totalYearly.toFixed(2)}`
        ]
      };
    },
    tags: ['subscription', 'monthly', 'budget', 'recurring', 'cost'],
    complexity: 'Basic'
  },

  {
    id: 'commute-cost-calculator',
    title: 'Commute Cost Calculator',
    description: 'Compare daily and monthly costs of driving vs public transit.',
    category: 'Daily Life',
    inputs: [
      { id: 'distance_miles', label: 'One-way Distance (miles)', type: 'number', required: true, min: 0, step: 0.1, placeholder: 'Distance to work' },
      { id: 'gas_price', label: 'Gas Price ($/gallon)', type: 'number', required: true, min: 0, step: 0.01, defaultValue: 3.50, placeholder: 'Current gas price' },
      { id: 'mpg', label: 'Car MPG', type: 'number', required: true, min: 1, step: 0.1, defaultValue: 25, placeholder: 'Miles per gallon' },
      { id: 'parking_cost', label: 'Daily Parking ($)', type: 'number', required: false, min: 0, step: 0.01, placeholder: 'Optional parking fee' },
      { id: 'transit_cost', label: 'Transit Cost ($/day)', type: 'number', required: false, min: 0, step: 0.01, placeholder: 'Bus/train daily cost' },
      { id: 'work_days', label: 'Work Days per Month', type: 'number', required: true, min: 1, max: 31, defaultValue: 22, placeholder: 'Usually 20-22' }
    ],
    formula: 'Driving Cost = (Distance × 2 × Gas Price ÷ MPG) + Parking, Monthly = Daily × Work Days',
    calculate: (inputs) => {
      const distance = parseFloat(inputs.distance_miles);
      const gasPrice = parseFloat(inputs.gas_price);
      const mpg = parseFloat(inputs.mpg);
      const parkingCost = parseFloat(inputs.parking_cost) || 0;
      const transitCost = parseFloat(inputs.transit_cost) || 0;
      const workDays = parseInt(inputs.work_days);
      
      if (distance < 0 || gasPrice < 0 || mpg <= 0 || workDays <= 0) {
        throw new Error('Please enter valid positive values');
      }
      
      const roundTripDistance = distance * 2;
      const dailyGasCost = (roundTripDistance / mpg) * gasPrice;
      const dailyDrivingCost = dailyGasCost + parkingCost;
      const monthlyDrivingCost = dailyDrivingCost * workDays;
      const monthlyTransitCost = transitCost * workDays;
      const monthlySavings = monthlyDrivingCost - monthlyTransitCost;
      
      return {
        results: [
          { value: dailyDrivingCost, label: 'Daily Driving Cost', unit: '$', format: 'currency' },
          { value: monthlyDrivingCost, label: 'Monthly Driving Cost', unit: '$', format: 'currency' },
          { value: monthlyTransitCost, label: 'Monthly Transit Cost', unit: '$', format: 'currency' },
          { value: Math.abs(monthlySavings), label: monthlySavings > 0 ? 'Monthly Savings (Transit)' : 'Monthly Extra (Driving)', unit: '$', format: 'currency' }
        ],
        explanation: [
          `${roundTripDistance} mile round trip, ${workDays} days per month`,
          monthlySavings > 0 ? 'Public transit saves money' : 'Driving is more economical'
        ],
        steps: [
          `Round trip: ${distance} × 2 = ${roundTripDistance} miles`,
          `Daily gas: ${roundTripDistance} ÷ ${mpg} × $${gasPrice} = $${dailyGasCost.toFixed(2)}`,
          `Daily total (with parking): $${dailyDrivingCost.toFixed(2)}`,
          `Monthly driving: $${dailyDrivingCost.toFixed(2)} × ${workDays} = $${monthlyDrivingCost.toFixed(2)}`
        ]
      };
    },
    tags: ['commute', 'gas', 'transit', 'driving', 'cost-comparison'],
    complexity: 'Intermediate'
  },

  {
    id: 'phone-bill-splitter',
    title: 'Phone Bill Splitter',
    description: 'Split family phone plan costs fairly among family members.',
    category: 'Daily Life',
    inputs: [
      { id: 'total_bill', label: 'Total Monthly Bill ($)', type: 'number', required: true, min: 0, step: 0.01, placeholder: 'Family plan cost' },
      { id: 'base_cost', label: 'Base Plan Cost ($)', type: 'number', required: true, min: 0, step: 0.01, placeholder: 'Fixed monthly cost' },
      { id: 'number_of_lines', label: 'Number of Lines', type: 'number', required: true, min: 1, max: 10, defaultValue: 4, placeholder: 'Total lines' },
      { id: 'data_overage', label: 'Data Overage Charges ($)', type: 'number', required: false, min: 0, step: 0.01, placeholder: 'Extra data charges' },
      { id: 'split_method', label: 'Split Method', type: 'select', required: true, options: [
        { value: 'equal', label: 'Split Equally' },
        { value: 'usage', label: 'Based on Usage' }
      ]}
    ],
    formula: 'Per Line = (Total Bill - Base Cost) ÷ Number of Lines + (Base Cost ÷ Number of Lines)',
    calculate: (inputs) => {
      const totalBill = parseFloat(inputs.total_bill);
      const baseCost = parseFloat(inputs.base_cost);
      const numberOfLines = parseInt(inputs.number_of_lines);
      const dataOverage = parseFloat(inputs.data_overage) || 0;
      const splitMethod = inputs.split_method;
      
      if (totalBill < 0 || baseCost < 0 || numberOfLines <= 0) {
        throw new Error('Please enter valid positive values');
      }
      
      if (baseCost > totalBill) {
        throw new Error('Base cost cannot exceed total bill');
      }
      
      const variableCosts = totalBill - baseCost;
      const basePerLine = baseCost / numberOfLines;
      const variablePerLine = variableCosts / numberOfLines;
      const totalPerLine = basePerLine + variablePerLine;
      const overagePerLine = dataOverage / numberOfLines;
      const finalPerLine = totalPerLine + overagePerLine;
      
      return {
        results: [
          { value: finalPerLine, label: 'Cost Per Line', unit: '$', format: 'currency' },
          { value: basePerLine, label: 'Base Cost Per Line', unit: '$', format: 'currency' },
          { value: variablePerLine, label: 'Variable Cost Per Line', unit: '$', format: 'currency' },
          { value: overagePerLine, label: 'Overage Per Line', unit: '$', format: 'currency' }
        ],
        explanation: [
          `$${totalBill.toFixed(2)} total bill split among ${numberOfLines} lines`,
          `Each line pays $${finalPerLine.toFixed(2)} per month`
        ],
        steps: [
          `Base cost per line: $${baseCost.toFixed(2)} ÷ ${numberOfLines} = $${basePerLine.toFixed(2)}`,
          `Variable costs per line: $${variableCosts.toFixed(2)} ÷ ${numberOfLines} = $${variablePerLine.toFixed(2)}`,
          `Total per line: $${basePerLine.toFixed(2)} + $${variablePerLine.toFixed(2)} = $${totalPerLine.toFixed(2)}`,
          `With overage: $${totalPerLine.toFixed(2)} + $${overagePerLine.toFixed(2)} = $${finalPerLine.toFixed(2)}`
        ]
      };
    },
    tags: ['phone', 'family-plan', 'split', 'monthly', 'cell-phone'],
    complexity: 'Basic'
  },

  // Time & Date Calculators
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    description: 'Calculate exact age in years, months, days, or total days lived.',
    category: 'Daily Life',
    inputs: [
      { id: 'birth_date', label: 'Birth Date', type: 'date', required: true, placeholder: 'Select birth date' },
      { id: 'calculation_date', label: 'Calculate As Of', type: 'date', required: false, placeholder: 'Leave blank for today' }
    ],
    formula: 'Age = Current Date - Birth Date',
    calculate: (inputs) => {
      const birthDate = new Date(inputs.birth_date);
      const calcDate = inputs.calculation_date ? new Date(inputs.calculation_date) : new Date();
      
      if (birthDate > calcDate) {
        throw new Error('Birth date cannot be in the future');
      }
      
      const diffTime = calcDate.getTime() - birthDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffWeeks = Math.floor(diffDays / 7);
      const diffMonths = Math.floor(diffDays / 30.44); // Average days per month
      const diffYears = Math.floor(diffDays / 365.25); // Account for leap years
      
      // Calculate exact age
      let exactYears = calcDate.getFullYear() - birthDate.getFullYear();
      let exactMonths = calcDate.getMonth() - birthDate.getMonth();
      let exactDays = calcDate.getDate() - birthDate.getDate();
      
      if (exactDays < 0) {
        exactMonths--;
        const lastMonth = new Date(calcDate.getFullYear(), calcDate.getMonth(), 0);
        exactDays += lastMonth.getDate();
      }
      
      if (exactMonths < 0) {
        exactYears--;
        exactMonths += 12;
      }
      
      return {
        results: [
          { value: `${exactYears} years, ${exactMonths} months, ${exactDays} days`, label: 'Exact Age', unit: '' },
          { value: diffDays, label: 'Total Days Lived', unit: 'days' },
          { value: diffWeeks, label: 'Total Weeks Lived', unit: 'weeks' },
          { value: diffMonths, label: 'Approximate Months', unit: 'months' }
        ],
        explanation: [
          `Age calculated from ${birthDate.toLocaleDateString()} to ${calcDate.toLocaleDateString()}`,
          `You have lived ${diffDays.toLocaleString()} days!`
        ],
        steps: [
          `Birth date: ${birthDate.toLocaleDateString()}`,
          `Current date: ${calcDate.toLocaleDateString()}`,
          `Exact age: ${exactYears} years, ${exactMonths} months, ${exactDays} days`,
          `Total days: ${diffDays.toLocaleString()}`
        ]
      };
    },
    tags: ['age', 'birthday', 'date', 'time', 'days-lived'],
    complexity: 'Basic'
  },

  {
    id: 'time-zone-converter',
    title: 'Time Zone Converter',
    description: 'Convert time between different time zones worldwide.',
    category: 'Daily Life',
    inputs: [
      { id: 'source_time', label: 'Time', type: 'text', required: true, placeholder: 'e.g., 2:30 PM or 14:30' },
      { id: 'source_timezone', label: 'From Time Zone', type: 'select', required: true, options: [
        { value: 'EST', label: 'Eastern (EST/EDT)' },
        { value: 'CST', label: 'Central (CST/CDT)' },
        { value: 'MST', label: 'Mountain (MST/MDT)' },
        { value: 'PST', label: 'Pacific (PST/PDT)' },
        { value: 'UTC', label: 'UTC/GMT' },
        { value: 'BST', label: 'British (BST/GMT)' },
        { value: 'CET', label: 'Central European (CET/CEST)' },
        { value: 'JST', label: 'Japan (JST)' },
        { value: 'AEST', label: 'Australian Eastern (AEST/AEDT)' }
      ]},
      { id: 'target_timezone', label: 'To Time Zone', type: 'select', required: true, options: [
        { value: 'EST', label: 'Eastern (EST/EDT)' },
        { value: 'CST', label: 'Central (CST/CDT)' },
        { value: 'MST', label: 'Mountain (MST/MDT)' },
        { value: 'PST', label: 'Pacific (PST/PDT)' },
        { value: 'UTC', label: 'UTC/GMT' },
        { value: 'BST', label: 'British (BST/GMT)' },
        { value: 'CET', label: 'Central European (CET/CEST)' },
        { value: 'JST', label: 'Japan (JST)' },
        { value: 'AEST', label: 'Australian Eastern (AEST/AEDT)' }
      ]}
    ],
    formula: 'Target Time = Source Time + Time Zone Offset Difference',
    calculate: (inputs) => {
      const sourceTime = inputs.source_time;
      const sourceTimezone = inputs.source_timezone;
      const targetTimezone = inputs.target_timezone;
      
      // Time zone offsets from UTC (considering daylight saving time)
      const timezoneOffsets: { [key: string]: number } = {
        'EST': -5, 'CST': -6, 'MST': -7, 'PST': -8,
        'UTC': 0, 'BST': 1, 'CET': 1, 'JST': 9, 'AEST': 10
      };
      
      // Parse time input
      const timeRegex = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i;
      const match = sourceTime.match(timeRegex);
      
      if (!match) {
        throw new Error('Please enter time in format HH:MM or HH:MM AM/PM');
      }
      
      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const ampm = match[3]?.toUpperCase();
      
      // Convert to 24-hour format
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      
      if (hours >= 24 || minutes >= 60) {
        throw new Error('Please enter a valid time');
      }
      
      // Calculate time difference
      const sourceOffset = timezoneOffsets[sourceTimezone];
      const targetOffset = timezoneOffsets[targetTimezone];
      const offsetDifference = targetOffset - sourceOffset;
      
      // Calculate target time
      let targetHours = hours + offsetDifference;
      let targetDay = 0;
      
      if (targetHours >= 24) {
        targetDay = Math.floor(targetHours / 24);
        targetHours = targetHours % 24;
      } else if (targetHours < 0) {
        targetDay = Math.floor(targetHours / 24);
        targetHours = ((targetHours % 24) + 24) % 24;
      }
      
      // Format target time
      const targetTime12 = targetHours === 0 ? 12 : targetHours > 12 ? targetHours - 12 : targetHours;
      const targetAmPm = targetHours >= 12 ? 'PM' : 'AM';
      const targetTime24 = `${targetHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      const targetTime12Formatted = `${targetTime12}:${minutes.toString().padStart(2, '0')} ${targetAmPm}`;
      
      const dayText = targetDay === 1 ? '(+1 day)' : targetDay === -1 ? '(-1 day)' : targetDay > 1 ? `(+${targetDay} days)` : targetDay < -1 ? `(${targetDay} days)` : '';
      
      return {
        results: [
          { value: `${targetTime12Formatted} ${dayText}`, label: 'Target Time (12-hour)', unit: '' },
          { value: `${targetTime24} ${dayText}`, label: 'Target Time (24-hour)', unit: '' },
          { value: offsetDifference > 0 ? `+${offsetDifference}` : offsetDifference.toString(), label: 'Time Difference', unit: 'hours' }
        ],
        explanation: [
          `Converting ${sourceTime} ${sourceTimezone} to ${targetTimezone}`,
          `Time difference: ${Math.abs(offsetDifference)} hour${Math.abs(offsetDifference) !== 1 ? 's' : ''} ${offsetDifference > 0 ? 'ahead' : 'behind'}`
        ],
        steps: [
          `Source: ${sourceTime} ${sourceTimezone}`,
          `Time zone difference: ${offsetDifference} hours`,
          `Target time: ${targetTime12Formatted} ${targetTimezone} ${dayText}`
        ]
      };
    },
    tags: ['time-zone', 'time', 'conversion', 'world-time', 'travel'],
    complexity: 'Intermediate'
  },

  {
    id: 'date-calculator',
    title: 'Date Calculator',
    description: 'Calculate days between dates or add/subtract days from a date.',
    category: 'Daily Life',
    inputs: [
      { id: 'calculation_type', label: 'Calculation Type', type: 'select', required: true, options: [
        { value: 'between', label: 'Days Between Dates' },
        { value: 'add', label: 'Add Days to Date' },
        { value: 'subtract', label: 'Subtract Days from Date' }
      ]},
      { id: 'start_date', label: 'Start Date', type: 'date', required: true, placeholder: 'First date' },
      { id: 'end_date', label: 'End Date', type: 'date', required: false, placeholder: 'Second date (for between calculation)' },
      { id: 'days_to_add', label: 'Days to Add/Subtract', type: 'number', required: false, placeholder: 'Number of days' }
    ],
    formula: 'Days Between = |End Date - Start Date|, New Date = Start Date ± Days',
    calculate: (inputs) => {
      const calculationType = inputs.calculation_type;
      const startDate = new Date(inputs.start_date);
      const endDate = inputs.end_date ? new Date(inputs.end_date) : null;
      const daysToAdd = parseInt(inputs.days_to_add) || 0;
      
      if (calculationType === 'between') {
        if (!endDate) {
          throw new Error('End date is required for days between calculation');
        }
        
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30.44);
        const diffYears = Math.floor(diffDays / 365.25);
        
        return {
          results: [
            { value: diffDays, label: 'Days Between', unit: 'days' },
            { value: diffWeeks, label: 'Weeks Between', unit: 'weeks' },
            { value: diffMonths, label: 'Approximate Months', unit: 'months' },
            { value: diffYears, label: 'Approximate Years', unit: 'years' }
          ],
          explanation: [
            `Time period from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
            `Total of ${diffDays} days`
          ],
          steps: [
            `Start: ${startDate.toLocaleDateString()}`,
            `End: ${endDate.toLocaleDateString()}`,
            `Difference: ${diffDays} days`,
            `Equivalent to: ${diffWeeks} weeks and ${diffDays % 7} days`
          ]
        };
      } else {
        if (!daysToAdd && daysToAdd !== 0) {
          throw new Error('Number of days is required for add/subtract calculation');
        }
        
        const resultDate = new Date(startDate);
        if (calculationType === 'add') {
          resultDate.setDate(startDate.getDate() + daysToAdd);
        } else {
          resultDate.setDate(startDate.getDate() - daysToAdd);
        }
        
        const dayOfWeek = resultDate.toLocaleDateString('en-US', { weekday: 'long' });
        
        return {
          results: [
            { value: resultDate.toLocaleDateString(), label: 'Result Date', unit: '' },
            { value: dayOfWeek, label: 'Day of Week', unit: '' },
            { value: Math.abs(daysToAdd), label: `Days ${calculationType === 'add' ? 'Added' : 'Subtracted'}`, unit: 'days' }
          ],
          explanation: [
            `${calculationType === 'add' ? 'Adding' : 'Subtracting'} ${Math.abs(daysToAdd)} days ${calculationType === 'add' ? 'to' : 'from'} ${startDate.toLocaleDateString()}`,
            `Result falls on a ${dayOfWeek}`
          ],
          steps: [
            `Start date: ${startDate.toLocaleDateString()}`,
            `${calculationType === 'add' ? 'Add' : 'Subtract'} ${Math.abs(daysToAdd)} days`,
            `Result: ${resultDate.toLocaleDateString()} (${dayOfWeek})`
          ]
        };
      }
    },
    tags: ['date', 'days', 'calendar', 'time', 'duration'],
    complexity: 'Basic'
  },

  {
    id: 'sleep-calculator',
    title: 'Sleep Calculator',
    description: 'Find optimal bedtime based on wake time and sleep cycles.',
    category: 'Daily Life',
    inputs: [
      { id: 'wake_time', label: 'Wake Up Time', type: 'text', required: true, placeholder: 'e.g., 7:00 AM' },
      { id: 'sleep_cycles', label: 'Desired Sleep Cycles', type: 'select', required: true, options: [
        { value: '4', label: '4 cycles (6 hours)' },
        { value: '5', label: '5 cycles (7.5 hours)' },
        { value: '6', label: '6 cycles (9 hours)' }
      ]},
      { id: 'fall_asleep_time', label: 'Time to Fall Asleep (minutes)', type: 'number', required: true, min: 0, max: 60, defaultValue: 15, placeholder: 'Usually 10-20 minutes' }
    ],
    formula: 'Bedtime = Wake Time - (Sleep Cycles × 90 minutes) - Fall Asleep Time',
    calculate: (inputs) => {
      const wakeTimeStr = inputs.wake_time;
      const sleepCycles = parseInt(inputs.sleep_cycles);
      const fallAsleepMinutes = parseInt(inputs.fall_asleep_time);
      
      // Parse wake time
      const timeRegex = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i;
      const match = wakeTimeStr.match(timeRegex);
      
      if (!match) {
        throw new Error('Please enter wake time in format HH:MM AM/PM');
      }
      
      let wakeHours = parseInt(match[1]);
      const wakeMinutes = parseInt(match[2]);
      const ampm = match[3]?.toUpperCase();
      
      // Convert to 24-hour format
      if (ampm === 'PM' && wakeHours !== 12) wakeHours += 12;
      if (ampm === 'AM' && wakeHours === 12) wakeHours = 0;
      
      // Calculate total sleep time needed
      const sleepCycleMinutes = sleepCycles * 90; // Each cycle is 90 minutes
      const totalMinutesNeeded = sleepCycleMinutes + fallAsleepMinutes;
      const sleepHours = Math.floor(sleepCycleMinutes / 60);
      const sleepMinutesRemainder = sleepCycleMinutes % 60;
      
      // Calculate bedtime
      const wakeTimeInMinutes = wakeHours * 60 + wakeMinutes;
      let bedtimeInMinutes = wakeTimeInMinutes - totalMinutesNeeded;
      
      // Handle day rollover
      if (bedtimeInMinutes < 0) {
        bedtimeInMinutes += 24 * 60; // Add 24 hours
      }
      
      const bedtimeHours = Math.floor(bedtimeInMinutes / 60);
      const bedtimeMinutes = bedtimeInMinutes % 60;
      
      // Format bedtime
      const bedtime12Hour = bedtimeHours === 0 ? 12 : bedtimeHours > 12 ? bedtimeHours - 12 : bedtimeHours;
      const bedtimeAmPm = bedtimeHours >= 12 ? 'PM' : 'AM';
      const bedtimeFormatted = `${bedtime12Hour}:${bedtimeMinutes.toString().padStart(2, '0')} ${bedtimeAmPm}`;
      
      return {
        results: [
          { value: bedtimeFormatted, label: 'Optimal Bedtime', unit: '' },
          { value: `${sleepHours}h ${sleepMinutesRemainder}m`, label: 'Sleep Duration', unit: '' },
          { value: sleepCycles, label: 'Sleep Cycles', unit: 'cycles' },
          { value: fallAsleepMinutes, label: 'Time to Fall Asleep', unit: 'minutes' }
        ],
        explanation: [
          `${sleepCycles} complete sleep cycles (${sleepHours}h ${sleepMinutesRemainder}m) plus ${fallAsleepMinutes} minutes to fall asleep`,
          `Go to bed at ${bedtimeFormatted} to wake up refreshed at ${wakeTimeStr}`
        ],
        steps: [
          `Wake time: ${wakeTimeStr}`,
          `Sleep needed: ${sleepCycles} cycles × 90 min = ${sleepCycleMinutes} minutes`,
          `Plus fall asleep time: ${fallAsleepMinutes} minutes`,
          `Total time needed: ${Math.floor(totalMinutesNeeded/60)}h ${totalMinutesNeeded%60}m`,
          `Optimal bedtime: ${bedtimeFormatted}`
        ]
      };
    },
    tags: ['sleep', 'bedtime', 'sleep-cycles', 'wake-time', 'health'],
    complexity: 'Intermediate'
  },

  // Travel & Movement Calculators
  {
    id: 'fuel-cost-calculator',
    title: 'Fuel Cost Calculator',
    description: 'Calculate trip cost based on distance, gas prices, and vehicle efficiency.',
    category: 'Daily Life',
    inputs: [
      { id: 'distance', label: 'Distance (miles)', type: 'number', required: true, min: 0, step: 0.1, placeholder: 'Trip distance' },
      { id: 'mpg', label: 'Vehicle MPG', type: 'number', required: true, min: 1, step: 0.1, placeholder: 'Miles per gallon' },
      { id: 'gas_price', label: 'Gas Price ($/gallon)', type: 'number', required: true, min: 0, step: 0.01, placeholder: 'Current gas price' },
      { id: 'trip_type', label: 'Trip Type', type: 'select', required: true, options: [
        { value: 'one-way', label: 'One Way' },
        { value: 'round-trip', label: 'Round Trip' }
      ]}
    ],
    formula: 'Fuel Cost = (Distance ÷ MPG) × Gas Price',
    calculate: (inputs) => {
      const distance = parseFloat(inputs.distance);
      const mpg = parseFloat(inputs.mpg);
      const gasPrice = parseFloat(inputs.gas_price);
      const tripType = inputs.trip_type;
      
      if (distance < 0 || mpg <= 0 || gasPrice < 0) {
        throw new Error('Please enter valid positive values');
      }
      
      const totalDistance = tripType === 'round-trip' ? distance * 2 : distance;
      const gallonsNeeded = totalDistance / mpg;
      const totalCost = gallonsNeeded * gasPrice;
      const costPerMile = totalCost / totalDistance;
      
      return {
        results: [
          { value: totalCost, label: 'Total Fuel Cost', unit: '$', format: 'currency' },
          { value: gallonsNeeded, label: 'Gallons Needed', unit: 'gallons', format: 'decimal' },
          { value: totalDistance, label: 'Total Distance', unit: 'miles' },
          { value: costPerMile, label: 'Cost Per Mile', unit: '$/mile', format: 'currency' }
        ],
        explanation: [
          `${tripType === 'round-trip' ? 'Round trip' : 'One way'} of ${distance} miles at ${mpg} MPG`,
          `Gas at $${gasPrice.toFixed(2)}/gallon costs $${totalCost.toFixed(2)} total`
        ],
        steps: [
          `Total distance: ${distance} miles ${tripType === 'round-trip' ? '× 2 = ' + totalDistance + ' miles' : ''}`,
          `Gallons needed: ${totalDistance} ÷ ${mpg} = ${gallonsNeeded.toFixed(2)} gallons`,
          `Total cost: ${gallonsNeeded.toFixed(2)} × $${gasPrice.toFixed(2)} = $${totalCost.toFixed(2)}`
        ]
      };
    },
    tags: ['fuel', 'gas', 'trip', 'cost', 'travel', 'mpg'],
    complexity: 'Basic'
  },

  {
    id: 'walking-running-time',
    title: 'Walking/Running Time Calculator',
    description: 'Estimate time to walk or run a given distance at different paces.',
    category: 'Daily Life',
    inputs: [
      { id: 'distance', label: 'Distance', type: 'number', required: true, min: 0, step: 0.1, placeholder: 'Distance to travel' },
      { id: 'distance_unit', label: 'Distance Unit', type: 'select', required: true, options: [
        { value: 'miles', label: 'Miles' },
        { value: 'kilometers', label: 'Kilometers' },
        { value: 'meters', label: 'Meters' },
        { value: 'feet', label: 'Feet' }
      ]},
      { id: 'activity_type', label: 'Activity', type: 'select', required: true, options: [
        { value: 'slow-walk', label: 'Slow Walk (2 mph)' },
        { value: 'normal-walk', label: 'Normal Walk (3 mph)' },
        { value: 'brisk-walk', label: 'Brisk Walk (4 mph)' },
        { value: 'light-jog', label: 'Light Jog (5 mph)' },
        { value: 'moderate-run', label: 'Moderate Run (6 mph)' },
        { value: 'fast-run', label: 'Fast Run (8 mph)' },
        { value: 'custom', label: 'Custom Pace' }
      ]},
      { id: 'custom_pace', label: 'Custom Pace (mph)', type: 'number', required: false, min: 0.1, step: 0.1, placeholder: 'If custom selected' }
    ],
    formula: 'Time = Distance ÷ Speed',
    calculate: (inputs) => {
      const distance = parseFloat(inputs.distance);
      const distanceUnit = inputs.distance_unit;
      const activityType = inputs.activity_type;
      const customPace = parseFloat(inputs.custom_pace);
      
      if (distance <= 0) {
        throw new Error('Distance must be positive');
      }
      
      if (activityType === 'custom' && (!customPace || customPace <= 0)) {
        throw new Error('Please enter a valid custom pace');
      }
      
      // Convert distance to miles
      let distanceInMiles;
      switch (distanceUnit) {
        case 'miles': distanceInMiles = distance; break;
        case 'kilometers': distanceInMiles = distance * 0.621371; break;
        case 'meters': distanceInMiles = distance * 0.000621371; break;
        case 'feet': distanceInMiles = distance * 0.000189394; break;
        default: distanceInMiles = distance;
      }
      
      // Get speed in mph
      const speedMap: { [key: string]: number } = {
        'slow-walk': 2, 'normal-walk': 3, 'brisk-walk': 4,
        'light-jog': 5, 'moderate-run': 6, 'fast-run': 8
      };
      
      const speedMph = activityType === 'custom' ? customPace : speedMap[activityType];
      
      // Calculate time in hours
      const timeHours = distanceInMiles / speedMph;
      const timeMinutes = timeHours * 60;
      const hours = Math.floor(timeHours);
      const minutes = Math.round(timeMinutes % 60);
      
      // Calculate calories burned (rough estimate)
      const caloriesPerMile = speedMph >= 6 ? 100 : speedMph >= 4 ? 80 : 60; // Running vs walking
      const caloriesBurned = Math.round(distanceInMiles * caloriesPerMile);
      
      return {
        results: [
          { value: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`, label: 'Estimated Time', unit: '' },
          { value: timeMinutes.toFixed(1), label: 'Total Minutes', unit: 'minutes' },
          { value: speedMph, label: 'Pace', unit: 'mph' },
          { value: caloriesBurned, label: 'Calories Burned (est.)', unit: 'calories' }
        ],
        explanation: [
          `${distance} ${distanceUnit} at ${speedMph} mph (${activityType.replace('-', ' ')})`,
          `Estimated ${timeMinutes.toFixed(0)} minutes to complete`
        ],
        steps: [
          `Distance: ${distance} ${distanceUnit} = ${distanceInMiles.toFixed(2)} miles`,
          `Speed: ${speedMph} mph`,
          `Time: ${distanceInMiles.toFixed(2)} ÷ ${speedMph} = ${timeHours.toFixed(2)} hours`,
          `Time: ${hours}h ${minutes}m`
        ]
      };
    },
    tags: ['walking', 'running', 'time', 'pace', 'exercise', 'fitness'],
    complexity: 'Basic'
  },

  // Health & Daily Needs Calculators
  {
    id: 'water-intake-calculator',
    title: 'Water Intake Calculator',
    description: 'Calculate daily water needs based on weight, activity, and climate.',
    category: 'Daily Life',
    inputs: [
      { id: 'weight', label: 'Body Weight', type: 'number', required: true, min: 50, max: 500, placeholder: 'Your weight' },
      { id: 'weight_unit', label: 'Weight Unit', type: 'select', required: true, options: [
        { value: 'lbs', label: 'Pounds (lbs)' },
        { value: 'kg', label: 'Kilograms (kg)' }
      ]},
      { id: 'activity_level', label: 'Activity Level', type: 'select', required: true, options: [
        { value: 'sedentary', label: 'Sedentary (little to no exercise)' },
        { value: 'light', label: 'Light Activity (1-3 days/week)' },
        { value: 'moderate', label: 'Moderate Activity (3-5 days/week)' },
        { value: 'high', label: 'High Activity (6-7 days/week)' },
        { value: 'extreme', label: 'Extreme Activity (2x/day or intense)' }
      ]},
      { id: 'climate', label: 'Climate', type: 'select', required: true, options: [
        { value: 'cool', label: 'Cool/Cold Climate' },
        { value: 'moderate', label: 'Moderate Climate' },
        { value: 'hot', label: 'Hot/Humid Climate' }
      ]}
    ],
    formula: 'Base Water = Weight × 0.5-1 oz/lb, Adjusted for Activity and Climate',
    calculate: (inputs) => {
      const weight = parseFloat(inputs.weight);
      const weightUnit = inputs.weight_unit;
      const activityLevel = inputs.activity_level;
      const climate = inputs.climate;
      
      if (weight <= 0) {
        throw new Error('Please enter a valid weight');
      }
      
      // Convert weight to pounds if needed
      const weightInPounds = weightUnit === 'kg' ? weight * 2.20462 : weight;
      
      // Base water intake (0.5-1 oz per pound)
      let baseWaterOz = weightInPounds * 0.67; // Start with 2/3 oz per pound
      
      // Activity level multipliers
      const activityMultipliers: { [key: string]: number } = {
        'sedentary': 1.0,
        'light': 1.1,
        'moderate': 1.2,
        'high': 1.3,
        'extreme': 1.5
      };
      
      // Climate multipliers
      const climateMultipliers: { [key: string]: number } = {
        'cool': 0.9,
        'moderate': 1.0,
        'hot': 1.2
      };
      
      const activityMultiplier = activityMultipliers[activityLevel];
      const climateMultiplier = climateMultipliers[climate];
      
      // Calculate total water needs
      const totalWaterOz = baseWaterOz * activityMultiplier * climateMultiplier;
      const waterCups = totalWaterOz / 8; // 8 oz per cup
      const waterLiters = totalWaterOz * 0.0295735; // oz to liters
      const waterGlasses = Math.ceil(totalWaterOz / 8); // 8 oz glasses
      
      return {
        results: [
          { value: Math.round(totalWaterOz), label: 'Daily Water Intake', unit: 'fl oz' },
          { value: waterCups.toFixed(1), label: 'Cups of Water', unit: 'cups' },
          { value: waterLiters.toFixed(1), label: 'Liters of Water', unit: 'liters' },
          { value: waterGlasses, label: 'Glasses (8 oz each)', unit: 'glasses' }
        ],
        explanation: [
          `Based on ${weight} ${weightUnit} body weight with ${activityLevel} activity in ${climate} climate`,
          `Aim for ${waterGlasses} glasses of water throughout the day`
        ],
        steps: [
          `Base water need: ${weightInPounds.toFixed(0)} lbs × 0.67 oz = ${baseWaterOz.toFixed(0)} oz`,
          `Activity adjustment: ×${activityMultiplier} for ${activityLevel} activity`,
          `Climate adjustment: ×${climateMultiplier} for ${climate} climate`,
          `Total: ${baseWaterOz.toFixed(0)} × ${activityMultiplier} × ${climateMultiplier} = ${totalWaterOz.toFixed(0)} oz`
        ]
      };
    },
    tags: ['water', 'hydration', 'health', 'daily-intake', 'wellness'],
    complexity: 'Basic'
  },

  {
    id: 'event-food-calculator',
    title: 'Event Food Calculator',
    description: 'Calculate how much food and drinks needed for party or event size.',
    category: 'Daily Life',
    inputs: [
      { id: 'guest_count', label: 'Number of Guests', type: 'number', required: true, min: 1, max: 1000, placeholder: 'Total attendees' },
      { id: 'event_duration', label: 'Event Duration (hours)', type: 'number', required: true, min: 1, max: 24, placeholder: 'Length of event' },
      { id: 'meal_type', label: 'Event Type', type: 'select', required: true, options: [
        { value: 'appetizers', label: 'Appetizers/Cocktail Party' },
        { value: 'lunch', label: 'Lunch Event' },
        { value: 'dinner', label: 'Dinner Event' },
        { value: 'buffet', label: 'Buffet Style' },
        { value: 'barbecue', label: 'Barbecue/Outdoor' }
      ]},
      { id: 'alcohol_served', label: 'Alcohol Served', type: 'select', required: true, options: [
        { value: 'none', label: 'No Alcohol' },
        { value: 'beer-wine', label: 'Beer and Wine' },
        { value: 'full-bar', label: 'Full Bar' }
      ]}
    ],
    formula: 'Food/Drink Quantities = Guests × Per-Person Portions × Event Duration Factor',
    calculate: (inputs) => {
      const guestCount = parseInt(inputs.guest_count);
      const eventDuration = parseFloat(inputs.event_duration);
      const mealType = inputs.meal_type;
      const alcoholServed = inputs.alcohol_served;
      
      if (guestCount <= 0 || eventDuration <= 0) {
        throw new Error('Please enter valid positive values');
      }
      
      // Food portions per person based on meal type
      const foodPortions: { [key: string]: { main: number, sides: number, appetizers: number } } = {
        'appetizers': { main: 0, sides: 0, appetizers: 6 },
        'lunch': { main: 1, sides: 2, appetizers: 2 },
        'dinner': { main: 1.5, sides: 3, appetizers: 3 },
        'buffet': { main: 1.25, sides: 2.5, appetizers: 4 },
        'barbecue': { main: 1.5, sides: 3, appetizers: 2 }
      };
      
      const portions = foodPortions[mealType];
      const durationFactor = Math.min(eventDuration / 3, 1.5); // Max 1.5x for longer events
      
      // Calculate food needs
      const mainDishes = Math.ceil(guestCount * portions.main * durationFactor);
      const sideDishes = Math.ceil(guestCount * portions.sides * durationFactor);
      const appetizers = Math.ceil(guestCount * portions.appetizers * durationFactor);
      
      // Drink calculations
      const waterBottles = Math.ceil(guestCount * 2 * durationFactor); // 2 bottles per person
      const sodas = Math.ceil(guestCount * 1.5 * durationFactor); // 1.5 sodas per person
      const coffee = Math.ceil(guestCount * 0.5); // Half will want coffee
      
      // Alcohol calculations
      let beer = 0, wine = 0, spirits = 0;
      if (alcoholServed !== 'none') {
        beer = Math.ceil(guestCount * 2 * durationFactor); // 2 beers per person
        wine = Math.ceil(guestCount * 0.5); // 1 bottle per 2 people
        if (alcoholServed === 'full-bar') {
          spirits = Math.ceil(guestCount * 0.25); // 1 bottle per 4 people
        }
      }
      
      return {
        results: [
          { value: mainDishes, label: 'Main Dishes (servings)', unit: 'servings' },
          { value: sideDishes, label: 'Side Dishes (servings)', unit: 'servings' },
          { value: appetizers, label: 'Appetizers (pieces)', unit: 'pieces' },
          { value: waterBottles, label: 'Water Bottles', unit: 'bottles' },
          { value: sodas, label: 'Soft Drinks', unit: 'cans' },
          { value: beer, label: 'Beer', unit: 'bottles' },
          { value: wine, label: 'Wine', unit: 'bottles' }
        ],
        explanation: [
          `Food and drink planning for ${guestCount} guests for ${eventDuration} hours`,
          `${mealType.replace('-', ' ')} style event ${alcoholServed !== 'none' ? 'with alcohol' : 'without alcohol'}`
        ],
        steps: [
          `Base portions for ${mealType}: ${portions.main} main, ${portions.sides} sides, ${portions.appetizers} appetizers per person`,
          `Duration factor: ${durationFactor.toFixed(1)}x for ${eventDuration} hour event`,
          `Example: Main dishes = ${guestCount} guests × ${portions.main} × ${durationFactor.toFixed(1)} = ${mainDishes} servings`
        ]
      };
    },
    tags: ['party', 'event', 'food', 'catering', 'planning', 'guests'],
    complexity: 'Intermediate'
  },

  // Academic & Work Calculators
  {
    id: 'grade-gpa-calculator',
    title: 'Grade/GPA Calculator',
    description: 'Calculate course grades and cumulative GPA with credit hours.',
    category: 'Daily Life',
    inputs: [
      { id: 'calculation_type', label: 'Calculation Type', type: 'select', required: true, options: [
        { value: 'course-grade', label: 'Calculate Course Grade' },
        { value: 'gpa', label: 'Calculate GPA' }
      ]},
      { id: 'assignment_1_points', label: 'Assignment 1 Points', type: 'number', required: false, min: 0, placeholder: 'Points earned' },
      { id: 'assignment_1_total', label: 'Assignment 1 Total', type: 'number', required: false, min: 1, placeholder: 'Points possible' },
      { id: 'assignment_2_points', label: 'Assignment 2 Points', type: 'number', required: false, min: 0, placeholder: 'Points earned' },
      { id: 'assignment_2_total', label: 'Assignment 2 Total', type: 'number', required: false, min: 1, placeholder: 'Points possible' },
      { id: 'course_1_grade', label: 'Course 1 Grade', type: 'select', required: false, options: [
        { value: '4.0', label: 'A (4.0)' },
        { value: '3.7', label: 'A- (3.7)' },
        { value: '3.3', label: 'B+ (3.3)' },
        { value: '3.0', label: 'B (3.0)' },
        { value: '2.7', label: 'B- (2.7)' },
        { value: '2.3', label: 'C+ (2.3)' },
        { value: '2.0', label: 'C (2.0)' },
        { value: '1.7', label: 'C- (1.7)' },
        { value: '1.3', label: 'D+ (1.3)' },
        { value: '1.0', label: 'D (1.0)' },
        { value: '0.0', label: 'F (0.0)' }
      ]},
      { id: 'course_1_credits', label: 'Course 1 Credits', type: 'number', required: false, min: 1, max: 6, placeholder: 'Credit hours' }
    ],
    formula: 'Course Grade = Total Points Earned ÷ Total Points Possible × 100, GPA = Σ(Grade Points × Credits) ÷ Total Credits',
    calculate: (inputs) => {
      const calculationType = inputs.calculation_type;
      
      if (calculationType === 'course-grade') {
        const assignments = [
          { earned: parseFloat(inputs.assignment_1_points) || 0, total: parseFloat(inputs.assignment_1_total) || 0 },
          { earned: parseFloat(inputs.assignment_2_points) || 0, total: parseFloat(inputs.assignment_2_total) || 0 }
        ].filter(a => a.total > 0);
        
        if (assignments.length === 0) {
          throw new Error('Please enter at least one assignment with points');
        }
        
        const totalEarned = assignments.reduce((sum, a) => sum + a.earned, 0);
        const totalPossible = assignments.reduce((sum, a) => sum + a.total, 0);
        const percentage = (totalEarned / totalPossible) * 100;
        
        // Determine letter grade
        let letterGrade = 'F';
        if (percentage >= 97) letterGrade = 'A+';
        else if (percentage >= 93) letterGrade = 'A';
        else if (percentage >= 90) letterGrade = 'A-';
        else if (percentage >= 87) letterGrade = 'B+';
        else if (percentage >= 83) letterGrade = 'B';
        else if (percentage >= 80) letterGrade = 'B-';
        else if (percentage >= 77) letterGrade = 'C+';
        else if (percentage >= 73) letterGrade = 'C';
        else if (percentage >= 70) letterGrade = 'C-';
        else if (percentage >= 67) letterGrade = 'D+';
        else if (percentage >= 65) letterGrade = 'D';
        
        return {
          results: [
            { value: percentage.toFixed(1), label: 'Course Grade', unit: '%' },
            { value: letterGrade, label: 'Letter Grade', unit: '' },
            { value: totalEarned, label: 'Total Points Earned', unit: 'points' },
            { value: totalPossible, label: 'Total Points Possible', unit: 'points' }
          ],
          explanation: [
            `Based on ${assignments.length} assignment${assignments.length > 1 ? 's' : ''}`,
            `${totalEarned} out of ${totalPossible} points = ${percentage.toFixed(1)}% (${letterGrade})`
          ],
          steps: [
            `Points earned: ${assignments.map(a => a.earned).join(' + ')} = ${totalEarned}`,
            `Points possible: ${assignments.map(a => a.total).join(' + ')} = ${totalPossible}`,
            `Percentage: ${totalEarned} ÷ ${totalPossible} × 100 = ${percentage.toFixed(1)}%`,
            `Letter grade: ${letterGrade}`
          ]
        };
      } else {
        // GPA calculation
        const courses = [
          { grade: parseFloat(inputs.course_1_grade) || 0, credits: parseFloat(inputs.course_1_credits) || 0 }
        ].filter(c => c.credits > 0);
        
        if (courses.length === 0) {
          throw new Error('Please enter at least one course with grade and credits');
        }
        
        const totalGradePoints = courses.reduce((sum, c) => sum + (c.grade * c.credits), 0);
        const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
        const gpa = totalGradePoints / totalCredits;
        
        return {
          results: [
            { value: gpa.toFixed(3), label: 'Cumulative GPA', unit: '' },
            { value: totalCredits, label: 'Total Credits', unit: 'credits' },
            { value: totalGradePoints.toFixed(1), label: 'Total Grade Points', unit: 'points' }
          ],
          explanation: [
            `GPA based on ${courses.length} course${courses.length > 1 ? 's' : ''} and ${totalCredits} credit hours`,
            `${gpa.toFixed(3)} GPA on 4.0 scale`
          ],
          steps: [
            `Grade points: ${courses.map(c => `${c.grade} × ${c.credits}`).join(' + ')} = ${totalGradePoints.toFixed(1)}`,
            `Total credits: ${totalCredits}`,
            `GPA: ${totalGradePoints.toFixed(1)} ÷ ${totalCredits} = ${gpa.toFixed(3)}`
          ]
        };
      }
    },
    tags: ['grade', 'gpa', 'school', 'academic', 'percentage', 'education'],
    complexity: 'Basic'
  },

  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase/decrease, and find what percent one number is of another.',
    category: 'Daily Life',
    inputs: [
      { id: 'calculation_type', label: 'Calculation Type', type: 'select', required: true, options: [
        { value: 'what-percent', label: 'What % is X of Y?' },
        { value: 'percent-of', label: 'What is X% of Y?' },
        { value: 'percent-change', label: 'Percentage Change' }
      ]},
      { id: 'number_1', label: 'First Number', type: 'number', required: true, step: 0.01, placeholder: 'Enter first number' },
      { id: 'number_2', label: 'Second Number', type: 'number', required: true, step: 0.01, placeholder: 'Enter second number' }
    ],
    formula: 'Varies by calculation type: % = (X/Y) × 100, X% of Y = (X/100) × Y, % Change = ((New-Old)/Old) × 100',
    calculate: (inputs) => {
      const calculationType = inputs.calculation_type;
      const number1 = parseFloat(inputs.number_1);
      const number2 = parseFloat(inputs.number_2);
      
      if (isNaN(number1) || isNaN(number2)) {
        throw new Error('Please enter valid numbers');
      }
      
      if (calculationType === 'what-percent') {
        if (number2 === 0) {
          throw new Error('Cannot divide by zero');
        }
        
        const percentage = (number1 / number2) * 100;
        
        return {
          results: [
            { value: percentage.toFixed(2), label: 'Percentage', unit: '%' },
            { value: number1, label: 'Part', unit: '' },
            { value: number2, label: 'Whole', unit: '' }
          ],
          explanation: [
            `${number1} is ${percentage.toFixed(2)}% of ${number2}`,
            `Fraction: ${number1}/${number2} = ${(number1/number2).toFixed(4)}`
          ],
          steps: [
            `Formula: (Part ÷ Whole) × 100`,
            `Calculation: (${number1} ÷ ${number2}) × 100`,
            `Result: ${(number1/number2).toFixed(4)} × 100 = ${percentage.toFixed(2)}%`
          ]
        };
      } else if (calculationType === 'percent-of') {
        const result = (number1 / 100) * number2;
        
        return {
          results: [
            { value: result.toFixed(2), label: 'Result', unit: '' },
            { value: number1, label: 'Percentage', unit: '%' },
            { value: number2, label: 'Original Number', unit: '' }
          ],
          explanation: [
            `${number1}% of ${number2} is ${result.toFixed(2)}`,
            `Converting percentage to decimal: ${number1}% = ${(number1/100).toFixed(3)}`
          ],
          steps: [
            `Formula: (Percentage ÷ 100) × Number`,
            `Calculation: (${number1} ÷ 100) × ${number2}`,
            `Result: ${(number1/100).toFixed(3)} × ${number2} = ${result.toFixed(2)}`
          ]
        };
      } else { // percent-change
        if (number1 === 0) {
          throw new Error('Original value cannot be zero for percentage change');
        }
        
        const change = number2 - number1;
        const percentChange = (change / number1) * 100;
        const isIncrease = change > 0;
        
        return {
          results: [
            { value: Math.abs(percentChange).toFixed(2), label: isIncrease ? 'Percentage Increase' : 'Percentage Decrease', unit: '%' },
            { value: change.toFixed(2), label: isIncrease ? 'Increase Amount' : 'Decrease Amount', unit: '' },
            { value: number1, label: 'Original Value', unit: '' },
            { value: number2, label: 'New Value', unit: '' }
          ],
          explanation: [
            `${isIncrease ? 'Increase' : 'Decrease'} from ${number1} to ${number2}`,
            `${Math.abs(percentChange).toFixed(2)}% ${isIncrease ? 'increase' : 'decrease'}`
          ],
          steps: [
            `Change: ${number2} - ${number1} = ${change.toFixed(2)}`,
            `Formula: (Change ÷ Original) × 100`,
            `Calculation: (${change.toFixed(2)} ÷ ${number1}) × 100`,
            `Result: ${(change/number1).toFixed(4)} × 100 = ${percentChange.toFixed(2)}%`
          ]
        };
      }
    },
    tags: ['percentage', 'percent', 'math', 'calculation', 'ratio'],
    complexity: 'Basic'
  },

  // Technology & Digital Calculators
  {
    id: 'password-strength-checker',
    title: 'Password Strength Checker',
    description: 'Analyze password security and get suggestions for improvement.',
    category: 'Daily Life',
    inputs: [
      { id: 'password', label: 'Password to Check', type: 'text', required: true, placeholder: 'Enter password to analyze' }
    ],
    formula: 'Strength = Length + Character Variety + Pattern Analysis',
    calculate: (inputs) => {
      const password = inputs.password;
      
      if (!password) {
        throw new Error('Please enter a password to analyze');
      }
      
      let score = 0;
      const feedback = [];
      
      // Length scoring
      if (password.length >= 12) score += 25;
      else if (password.length >= 8) score += 15;
      else if (password.length >= 6) score += 10;
      else score += 5;
      
      if (password.length < 8) feedback.push('Use at least 8 characters');
      if (password.length < 12) feedback.push('Consider using 12+ characters for better security');
      
      // Character variety
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
      
      if (hasLowercase) score += 10;
      else feedback.push('Add lowercase letters');
      
      if (hasUppercase) score += 10;
      else feedback.push('Add uppercase letters');
      
      if (hasNumbers) score += 10;
      else feedback.push('Add numbers');
      
      if (hasSymbols) score += 15;
      else feedback.push('Add special characters (!@#$%^&*)');
      
      // Pattern analysis
      const hasSequence = /(.)\1{2,}/.test(password); // Repeated characters
      const hasCommonWords = /password|123456|qwerty|admin|letmein/i.test(password);
      
      if (!hasSequence) score += 10;
      else feedback.push('Avoid repeating characters');
      
      if (!hasCommonWords) score += 10;
      else feedback.push('Avoid common words and patterns');
      
      // Determine strength level
      let strengthLevel = 'Very Weak';
      let strengthColor = 'red';
      
      if (score >= 80) {
        strengthLevel = 'Very Strong';
        strengthColor = 'green';
      } else if (score >= 60) {
        strengthLevel = 'Strong';
        strengthColor = 'lightgreen';
      } else if (score >= 40) {
        strengthLevel = 'Moderate';
        strengthColor = 'orange';
      } else if (score >= 20) {
        strengthLevel = 'Weak';
        strengthColor = 'red';
      }
      
      const characterTypes = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length;
      
      return {
        results: [
          { value: `${strengthLevel} (${score}/100)`, label: 'Password Strength', unit: '' },
          { value: password.length, label: 'Password Length', unit: 'characters' },
          { value: characterTypes, label: 'Character Types Used', unit: '/4' },
          { value: feedback.length === 0 ? 'None' : feedback.join(', '), label: 'Suggestions', unit: '' }
        ],
        explanation: [
          `Password strength: ${strengthLevel} (${score}/100 points)`,
          feedback.length === 0 ? 'Excellent password!' : `${feedback.length} improvement${feedback.length > 1 ? 's' : ''} suggested`
        ],
        steps: [
          `Length (${password.length} chars): ${password.length >= 12 ? 25 : password.length >= 8 ? 15 : password.length >= 6 ? 10 : 5} points`,
          `Character types (${characterTypes}/4): ${characterTypes * 10} points`,
          `Pattern bonus: ${hasSequence ? 0 : 10} + ${hasCommonWords ? 0 : 10} points`,
          `Total score: ${score}/100 points`
        ]
      };
    },
    tags: ['password', 'security', 'strength', 'cyber-security', 'digital'],
    complexity: 'Intermediate'
  },

  {
    id: 'data-usage-calculator',
    title: 'Data Usage Calculator',
    description: 'Track mobile data consumption and calculate overage costs.',
    category: 'Daily Life',
    inputs: [
      { id: 'data_plan', label: 'Monthly Data Plan (GB)', type: 'number', required: true, min: 0.1, step: 0.1, placeholder: 'e.g., 10' },
      { id: 'data_used', label: 'Data Used So Far (GB)', type: 'number', required: true, min: 0, step: 0.01, placeholder: 'Current usage' },
      { id: 'days_into_cycle', label: 'Days into Billing Cycle', type: 'number', required: true, min: 1, max: 31, placeholder: 'e.g., 15' },
      { id: 'cycle_length', label: 'Billing Cycle Length (days)', type: 'number', required: true, min: 28, max: 31, defaultValue: 30, placeholder: 'Usually 30' },
      { id: 'overage_cost', label: 'Overage Cost ($/GB)', type: 'number', required: false, min: 0, step: 0.01, defaultValue: 10, placeholder: 'Cost per GB over limit' }
    ],
    formula: 'Projected Usage = (Data Used ÷ Days) × Cycle Length, Overage = (Usage - Plan) × Cost',
    calculate: (inputs) => {
      const dataPlan = parseFloat(inputs.data_plan);
      const dataUsed = parseFloat(inputs.data_used);
      const daysIntoCycle = parseInt(inputs.days_into_cycle);
      const cycleLength = parseInt(inputs.cycle_length);
      const overageCost = parseFloat(inputs.overage_cost) || 10;
      
      if (dataPlan <= 0 || dataUsed < 0 || daysIntoCycle <= 0 || cycleLength <= 0) {
        throw new Error('Please enter valid positive values');
      }
      
      if (daysIntoCycle > cycleLength) {
        throw new Error('Days into cycle cannot exceed cycle length');
      }
      
      // Calculate daily usage rate
      const dailyUsage = dataUsed / daysIntoCycle;
      
      // Project total usage for the cycle
      const projectedUsage = dailyUsage * cycleLength;
      
      // Calculate remaining data
      const remainingData = Math.max(0, dataPlan - dataUsed);
      const remainingDays = cycleLength - daysIntoCycle;
      
      // Calculate if over/under limit
      const projectedOverage = Math.max(0, projectedUsage - dataPlan);
      const overageCostTotal = projectedOverage * overageCost;
      
      // Recommended daily usage for rest of cycle
      const recommendedDailyUsage = remainingDays > 0 ? remainingData / remainingDays : 0;
      
      // Usage percentage
      const usagePercentage = (dataUsed / dataPlan) * 100;
      const cyclePercentage = (daysIntoCycle / cycleLength) * 100;
      
      return {
        results: [
          { value: projectedUsage.toFixed(2), label: 'Projected Monthly Usage', unit: 'GB' },
          { value: remainingData.toFixed(2), label: 'Data Remaining', unit: 'GB' },
          { value: projectedOverage.toFixed(2), label: 'Projected Overage', unit: 'GB' },
          { value: overageCostTotal.toFixed(2), label: 'Estimated Overage Cost', unit: '$' },
          { value: recommendedDailyUsage.toFixed(3), label: 'Recommended Daily Usage', unit: 'GB/day' }
        ],
        explanation: [
          `${usagePercentage.toFixed(1)}% of data used in ${cyclePercentage.toFixed(1)}% of billing cycle`,
          projectedOverage > 0 ? `On track to exceed limit by ${projectedOverage.toFixed(2)} GB` : 'Staying within data limit'
        ],
        steps: [
          `Daily usage: ${dataUsed} GB ÷ ${daysIntoCycle} days = ${dailyUsage.toFixed(3)} GB/day`,
          `Projected total: ${dailyUsage.toFixed(3)} GB/day × ${cycleLength} days = ${projectedUsage.toFixed(2)} GB`,
          `Overage: ${projectedUsage.toFixed(2)} - ${dataPlan} = ${projectedOverage.toFixed(2)} GB`,
          `Overage cost: ${projectedOverage.toFixed(2)} GB × $${overageCost}/GB = $${overageCostTotal.toFixed(2)}`
        ]
      };
    },
    tags: ['data', 'mobile', 'usage', 'overage', 'cell-phone', 'billing'],
    complexity: 'Intermediate'
  },

  {
    id: 'wifi-speed-converter',
    title: 'WiFi Speed Converter',
    description: 'Convert internet speeds and calculate real download times.',
    category: 'Daily Life',
    inputs: [
      { id: 'internet_speed', label: 'Internet Speed', type: 'number', required: true, min: 0.1, step: 0.1, placeholder: 'Your internet speed' },
      { id: 'speed_unit', label: 'Speed Unit', type: 'select', required: true, options: [
        { value: 'mbps', label: 'Mbps (Megabits per second)' },
        { value: 'gbps', label: 'Gbps (Gigabits per second)' },
        { value: 'kbps', label: 'Kbps (Kilobits per second)' }
      ]},
      { id: 'file_size', label: 'File Size to Download', type: 'number', required: false, min: 0.1, step: 0.1, placeholder: 'Optional file size' },
      { id: 'file_unit', label: 'File Size Unit', type: 'select', required: false, options: [
        { value: 'mb', label: 'MB (Megabytes)' },
        { value: 'gb', label: 'GB (Gigabytes)' },
        { value: 'kb', label: 'KB (Kilobytes)' }
      ]}
    ],
    formula: 'Download Time = File Size (MB) ÷ (Speed in Mbps ÷ 8), 1 Byte = 8 bits',
    calculate: (inputs) => {
      const internetSpeed = parseFloat(inputs.internet_speed);
      const speedUnit = inputs.speed_unit;
      const fileSize = parseFloat(inputs.file_size);
      const fileUnit = inputs.file_unit;
      
      if (internetSpeed <= 0) {
        throw new Error('Please enter a valid internet speed');
      }
      
      // Convert speed to Mbps
      let speedMbps;
      switch (speedUnit) {
        case 'mbps': speedMbps = internetSpeed; break;
        case 'gbps': speedMbps = internetSpeed * 1000; break;
        case 'kbps': speedMbps = internetSpeed / 1000; break;
        default: speedMbps = internetSpeed;
      }
      
      // Convert to other units
      const speedKbps = speedMbps * 1000;
      const speedGbps = speedMbps / 1000;
      const speedMBps = speedMbps / 8; // Megabytes per second (note the capital B)
      
      const results = [
        { value: speedMbps.toFixed(2), label: 'Speed in Mbps', unit: 'Mbps' },
        { value: speedMBps.toFixed(2), label: 'Speed in MB/s', unit: 'MB/s' },
        { value: speedKbps.toFixed(0), label: 'Speed in Kbps', unit: 'Kbps' },
        { value: speedGbps.toFixed(3), label: 'Speed in Gbps', unit: 'Gbps' }
      ];
      
      let explanationText = [
        `Internet speed: ${internetSpeed} ${speedUnit.toUpperCase()}`,
        `Theoretical maximum download rate: ${speedMBps.toFixed(2)} MB/s`
      ];
      
      let steps = [
        `Original speed: ${internetSpeed} ${speedUnit.toUpperCase()}`,
        `Converted to Mbps: ${speedMbps.toFixed(2)} Mbps`,
        `Download rate: ${speedMbps.toFixed(2)} Mbps ÷ 8 = ${speedMBps.toFixed(2)} MB/s`
      ];
      
      // Calculate download times if file size provided
      if (fileSize && fileSize > 0 && fileUnit) {
        // Convert file size to MB
        let fileSizeMB;
        switch (fileUnit) {
          case 'mb': fileSizeMB = fileSize; break;
          case 'gb': fileSizeMB = fileSize * 1024; break;
          case 'kb': fileSizeMB = fileSize / 1024; break;
          default: fileSizeMB = fileSize;
        }
        
        // Calculate download time in seconds (accounting for overhead)
        const downloadTimeSeconds = (fileSizeMB / speedMBps) * 1.2; // 20% overhead
        const downloadTimeMinutes = downloadTimeSeconds / 60;
        const downloadTimeHours = downloadTimeMinutes / 60;
        
        // Format time appropriately
        let timeDisplay;
        if (downloadTimeSeconds < 60) {
          timeDisplay = `${Math.round(downloadTimeSeconds)} seconds`;
        } else if (downloadTimeMinutes < 60) {
          timeDisplay = `${Math.floor(downloadTimeMinutes)}m ${Math.round(downloadTimeSeconds % 60)}s`;
        } else {
          timeDisplay = `${Math.floor(downloadTimeHours)}h ${Math.floor(downloadTimeMinutes % 60)}m`;
        }
        
        results.push({ value: timeDisplay, label: 'Estimated Download Time', unit: '' });
        explanationText.push(`${fileSize} ${fileUnit.toUpperCase()} file download: approximately ${timeDisplay}`);
        steps.push(`Download time: ${fileSizeMB.toFixed(1)} MB ÷ ${speedMBps.toFixed(2)} MB/s × 1.2 = ${downloadTimeSeconds.toFixed(1)} seconds`);
      }
      
      return {
        results,
        explanation: explanationText,
        steps
      };
    },
    tags: ['wifi', 'internet', 'speed', 'download', 'mbps', 'bandwidth'],
    complexity: 'Basic'
  },

  {
    id: 'battery-life-estimator',
    title: 'Battery Life Estimator',
    description: 'Estimate how long device battery will last based on usage.',
    category: 'Daily Life',
    inputs: [
      { id: 'current_battery', label: 'Current Battery Level (%)', type: 'number', required: true, min: 1, max: 100, placeholder: 'Current charge %' },
      { id: 'device_type', label: 'Device Type', type: 'select', required: true, options: [
        { value: 'smartphone', label: 'Smartphone' },
        { value: 'tablet', label: 'Tablet' },
        { value: 'laptop', label: 'Laptop' },
        { value: 'smartwatch', label: 'Smartwatch' },
        { value: 'earbuds', label: 'Wireless Earbuds' }
      ]},
      { id: 'usage_intensity', label: 'Usage Intensity', type: 'select', required: true, options: [
        { value: 'light', label: 'Light (basic tasks, standby)' },
        { value: 'moderate', label: 'Moderate (normal usage)' },
        { value: 'heavy', label: 'Heavy (gaming, video, GPS)' },
        { value: 'extreme', label: 'Extreme (intensive apps, max brightness)' }
      ]},
      { id: 'screen_brightness', label: 'Screen Brightness', type: 'select', required: false, options: [
        { value: 'low', label: 'Low (25%)' },
        { value: 'medium', label: 'Medium (50%)' },
        { value: 'high', label: 'High (75%)' },
        { value: 'max', label: 'Maximum (100%)' }
      ]}
    ],
    formula: 'Battery Life = (Current % ÷ 100) × Base Life × Usage Factor × Brightness Factor',
    calculate: (inputs) => {
      const currentBattery = parseFloat(inputs.current_battery);
      const deviceType = inputs.device_type;
      const usageIntensity = inputs.usage_intensity;
      const screenBrightness = inputs.screen_brightness || 'medium';
      
      if (currentBattery <= 0 || currentBattery > 100) {
        throw new Error('Battery level must be between 1-100%');
      }
      
      // Base battery life in hours for each device type (at 100% with moderate usage)
      const baseBatteryLife: { [key: string]: number } = {
        'smartphone': 24,
        'tablet': 10,
        'laptop': 8,
        'smartwatch': 18,
        'earbuds': 6
      };
      
      // Usage intensity factors
      const usageFactors: { [key: string]: number } = {
        'light': 1.5,
        'moderate': 1.0,
        'heavy': 0.6,
        'extreme': 0.4
      };
      
      // Screen brightness factors (doesn't apply to earbuds)
      const brightnessFactors: { [key: string]: number } = {
        'low': 1.2,
        'medium': 1.0,
        'high': 0.8,
        'max': 0.6
      };
      
      const baseLife = baseBatteryLife[deviceType];
      const usageFactor = usageFactors[usageIntensity];
      const brightnessFactor = deviceType === 'earbuds' ? 1.0 : brightnessFactors[screenBrightness];
      
      // Calculate remaining battery life
      const batteryMultiplier = currentBattery / 100;
      const estimatedHours = baseLife * usageFactor * brightnessFactor * batteryMultiplier;
      
      // Convert to hours and minutes
      const hours = Math.floor(estimatedHours);
      const minutes = Math.round((estimatedHours - hours) * 60);
      
      // Calculate time until different battery levels
      const time50 = estimatedHours * (Math.max(0, 50 - currentBattery) / currentBattery);
      const time20 = estimatedHours * (Math.max(0, 20 - currentBattery) / currentBattery);
      const time10 = estimatedHours * (Math.max(0, 10 - currentBattery) / currentBattery);
      
      return {
        results: [
          { value: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`, label: 'Estimated Battery Life', unit: '' },
          { value: estimatedHours.toFixed(1), label: 'Total Hours', unit: 'hours' },
          { value: currentBattery > 50 ? `${Math.floor(time50)}h ${Math.round((time50 % 1) * 60)}m` : 'Already below 50%', label: 'Time to 50%', unit: '' },
          { value: currentBattery > 20 ? `${Math.floor(time20)}h ${Math.round((time20 % 1) * 60)}m` : 'Already below 20%', label: 'Time to 20%', unit: '' }
        ],
        explanation: [
          `${deviceType} at ${currentBattery}% with ${usageIntensity} usage`,
          `Estimated ${hours}h ${minutes}m remaining${deviceType !== 'earbuds' ? ` at ${screenBrightness} brightness` : ''}`
        ],
        steps: [
          `Base ${deviceType} life: ${baseLife} hours`,
          `Usage factor (${usageIntensity}): ×${usageFactor}`,
          deviceType !== 'earbuds' ? `Brightness factor (${screenBrightness}): ×${brightnessFactor}` : 'No brightness factor (earbuds)',
          `Battery level: ${currentBattery}% = ×${batteryMultiplier}`,
          `Total: ${baseLife} × ${usageFactor} × ${brightnessFactor} × ${batteryMultiplier} = ${estimatedHours.toFixed(1)} hours`
        ]
      };
    },
    tags: ['battery', 'device', 'smartphone', 'laptop', 'power', 'charge'],
    complexity: 'Intermediate'
  },

  // Home & Practical Calculators
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    description: 'Quick conversions between common units (temperature, length, weight).',
    category: 'Daily Life',
    inputs: [
      { id: 'conversion_type', label: 'Conversion Type', type: 'select', required: true, options: [
        { value: 'temperature', label: 'Temperature' },
        { value: 'length', label: 'Length/Distance' },
        { value: 'weight', label: 'Weight/Mass' },
        { value: 'volume', label: 'Volume' }
      ]},
      { id: 'from_value', label: 'Value to Convert', type: 'number', required: true, step: 0.01, placeholder: 'Enter value' },
      { id: 'from_unit', label: 'From Unit', type: 'select', required: true, options: [] }, // Will be populated based on conversion_type
      { id: 'to_unit', label: 'To Unit', type: 'select', required: true, options: [] } // Will be populated based on conversion_type
    ],
    formula: 'Varies by conversion type and units selected',
    calculate: (inputs) => {
      const conversionType = inputs.conversion_type;
      const fromValue = parseFloat(inputs.from_value);
      const fromUnit = inputs.from_unit || 'celsius';
      const toUnit = inputs.to_unit || 'fahrenheit';
      
      if (isNaN(fromValue)) {
        throw new Error('Please enter a valid number to convert');
      }
      
      let result = 0;
      let formula = '';
      let steps = [];
      
      if (conversionType === 'temperature') {
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
          result = (fromValue * 9/5) + 32;
          formula = '°F = (°C × 9/5) + 32';
          steps = [`${fromValue}°C × 9/5 = ${(fromValue * 9/5).toFixed(2)}`, `${(fromValue * 9/5).toFixed(2)} + 32 = ${result.toFixed(2)}°F`];
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
          result = (fromValue - 32) * 5/9;
          formula = '°C = (°F - 32) × 5/9';
          steps = [`${fromValue}°F - 32 = ${(fromValue - 32).toFixed(2)}`, `${(fromValue - 32).toFixed(2)} × 5/9 = ${result.toFixed(2)}°C`];
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
          result = fromValue + 273.15;
          formula = 'K = °C + 273.15';
          steps = [`${fromValue}°C + 273.15 = ${result.toFixed(2)}K`];
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
          result = fromValue - 273.15;
          formula = '°C = K - 273.15';
          steps = [`${fromValue}K - 273.15 = ${result.toFixed(2)}°C`];
        } else {
          result = fromValue; // Same unit
        }
      } else if (conversionType === 'length') {
        // Convert to meters first, then to target unit
        const toMeters: { [key: string]: number } = {
          'mm': 0.001, 'cm': 0.01, 'm': 1, 'km': 1000,
          'in': 0.0254, 'ft': 0.3048, 'yd': 0.9144, 'mi': 1609.34
        };
        
        const valueInMeters = fromValue * toMeters[fromUnit];
        result = valueInMeters / toMeters[toUnit];
        formula = `Convert ${fromUnit} to ${toUnit} via meters`;
        steps = [`${fromValue} ${fromUnit} = ${valueInMeters.toFixed(6)} meters`, `${valueInMeters.toFixed(6)} meters = ${result.toFixed(6)} ${toUnit}`];
      } else if (conversionType === 'weight') {
        // Convert to grams first, then to target unit
        const toGrams: { [key: string]: number } = {
          'mg': 0.001, 'g': 1, 'kg': 1000,
          'oz': 28.3495, 'lb': 453.592, 'ton': 1000000
        };
        
        const valueInGrams = fromValue * toGrams[fromUnit];
        result = valueInGrams / toGrams[toUnit];
        formula = `Convert ${fromUnit} to ${toUnit} via grams`;
        steps = [`${fromValue} ${fromUnit} = ${valueInGrams.toFixed(3)} grams`, `${valueInGrams.toFixed(3)} grams = ${result.toFixed(6)} ${toUnit}`];
      } else if (conversionType === 'volume') {
        // Convert to liters first, then to target unit
        const toLiters: { [key: string]: number } = {
          'ml': 0.001, 'l': 1,
          'tsp': 0.00492892, 'tbsp': 0.0147868, 'cup': 0.236588,
          'pt': 0.473176, 'qt': 0.946353, 'gal': 3.78541
        };
        
        const valueInLiters = fromValue * toLiters[fromUnit];
        result = valueInLiters / toLiters[toUnit];
        formula = `Convert ${fromUnit} to ${toUnit} via liters`;
        steps = [`${fromValue} ${fromUnit} = ${valueInLiters.toFixed(6)} liters`, `${valueInLiters.toFixed(6)} liters = ${result.toFixed(6)} ${toUnit}`];
      }
      
      return {
        results: [
          { value: result.toFixed(4), label: `Result in ${toUnit}`, unit: toUnit },
          { value: fromValue, label: `Original Value`, unit: fromUnit }
        ],
        explanation: [
          `Converting ${fromValue} ${fromUnit} to ${toUnit}`,
          `Result: ${result.toFixed(4)} ${toUnit}`
        ],
        steps: [
          `Formula: ${formula}`,
          ...steps
        ]
      };
    },
    tags: ['conversion', 'units', 'temperature', 'length', 'weight', 'volume'],
    complexity: 'Basic'
  },

  {
    id: 'paint-coverage-calculator',
    title: 'Paint Coverage Calculator',
    description: 'Calculate how much paint needed for room square footage.',
    category: 'Daily Life',
    inputs: [
      { id: 'room_length', label: 'Room Length (feet)', type: 'number', required: true, min: 1, step: 0.1, placeholder: 'Length of room' },
      { id: 'room_width', label: 'Room Width (feet)', type: 'number', required: true, min: 1, step: 0.1, placeholder: 'Width of room' },
      { id: 'ceiling_height', label: 'Ceiling Height (feet)', type: 'number', required: true, min: 6, max: 20, defaultValue: 8, placeholder: 'Height of walls' },
      { id: 'doors', label: 'Number of Doors', type: 'number', required: true, min: 0, max: 10, defaultValue: 2, placeholder: 'Standard doors' },
      { id: 'windows', label: 'Number of Windows', type: 'number', required: true, min: 0, max: 20, defaultValue: 4, placeholder: 'Standard windows' },
      { id: 'paint_coats', label: 'Number of Coats', type: 'select', required: true, options: [
        { value: '1', label: '1 Coat' },
        { value: '2', label: '2 Coats (recommended)' },
        { value: '3', label: '3 Coats (dark colors)' }
      ]}
    ],
    formula: 'Wall Area = (2 × Length + 2 × Width) × Height - Door/Window Area, Paint = Area ÷ Coverage per Gallon',
    calculate: (inputs) => {
      const roomLength = parseFloat(inputs.room_length);
      const roomWidth = parseFloat(inputs.room_width);
      const ceilingHeight = parseFloat(inputs.ceiling_height);
      const doors = parseInt(inputs.doors);
      const windows = parseInt(inputs.windows);
      const paintCoats = parseInt(inputs.paint_coats);
      
      if (roomLength <= 0 || roomWidth <= 0 || ceilingHeight <= 0) {
        throw new Error('Please enter valid positive dimensions');
      }
      
      // Calculate wall area
      const wallArea = 2 * (roomLength + roomWidth) * ceilingHeight;
      
      // Subtract door and window areas
      const doorArea = doors * 20; // Standard door is 3' x 6.67' = 20 sq ft
      const windowArea = windows * 15; // Standard window is 3' x 5' = 15 sq ft
      const netWallArea = wallArea - doorArea - windowArea;
      
      // Calculate paint needed
      const coveragePerGallon = 350; // Square feet per gallon (typical)
      const totalAreaToPaint = netWallArea * paintCoats;
      const gallonsNeeded = totalAreaToPaint / coveragePerGallon;
      const quartsNeeded = gallonsNeeded * 4;
      
      // Round up to whole gallons and quarts
      const gallonsRounded = Math.ceil(gallonsNeeded);
      const quartsRounded = Math.ceil(quartsNeeded);
      
      // Calculate ceiling area if needed
      const ceilingArea = roomLength * roomWidth;
      const ceilingPaint = ceilingArea / coveragePerGallon;
      
      // Estimate cost (rough estimate)
      const costPerGallon = 45; // Average paint cost
      const estimatedCost = gallonsRounded * costPerGallon;
      
      return {
        results: [
          { value: gallonsRounded, label: 'Gallons Needed (walls)', unit: 'gallons' },
          { value: quartsRounded, label: 'Quarts Needed (walls)', unit: 'quarts' },
          { value: netWallArea.toFixed(0), label: 'Wall Area to Paint', unit: 'sq ft' },
          { value: ceilingArea.toFixed(0), label: 'Ceiling Area', unit: 'sq ft' },
          { value: Math.ceil(ceilingPaint), label: 'Extra for Ceiling', unit: 'gallons' },
          { value: estimatedCost.toFixed(0), label: 'Estimated Cost (walls)', unit: '$' }
        ],
        explanation: [
          `Room: ${roomLength}' × ${roomWidth}' with ${ceilingHeight}' ceilings`,
          `${paintCoats} coat${paintCoats > 1 ? 's' : ''} needed for ${netWallArea.toFixed(0)} sq ft of wall area`
        ],
        steps: [
          `Wall perimeter: 2 × (${roomLength} + ${roomWidth}) = ${2 * (roomLength + roomWidth)} feet`,
          `Wall area: ${2 * (roomLength + roomWidth)} × ${ceilingHeight} = ${wallArea} sq ft`,
          `Minus doors/windows: ${wallArea} - ${doorArea + windowArea} = ${netWallArea} sq ft`,
          `Total area (${paintCoats} coats): ${netWallArea} × ${paintCoats} = ${totalAreaToPaint} sq ft`,
          `Paint needed: ${totalAreaToPaint} ÷ ${coveragePerGallon} = ${gallonsNeeded.toFixed(2)} gallons`
        ]
      };
    },
    tags: ['paint', 'home', 'renovation', 'coverage', 'room', 'diy'],
    complexity: 'Basic'
  },

  {
    id: 'random-number-generator',
    title: 'Random Number/Dice Generator',
    description: 'Generate random numbers, dice rolls, or pick random items from lists.',
    category: 'Daily Life',
    inputs: [
      { id: 'generator_type', label: 'Generator Type', type: 'select', required: true, options: [
        { value: 'number', label: 'Random Number' },
        { value: 'dice', label: 'Dice Roll' },
        { value: 'coin', label: 'Coin Flip' },
        { value: 'list', label: 'Pick from List' }
      ]},
      { id: 'min_number', label: 'Minimum Number', type: 'number', required: false, defaultValue: 1, placeholder: 'Minimum value' },
      { id: 'max_number', label: 'Maximum Number', type: 'number', required: false, defaultValue: 100, placeholder: 'Maximum value' },
      { id: 'dice_type', label: 'Dice Type', type: 'select', required: false, options: [
        { value: '6', label: 'Standard (6-sided)' },
        { value: '4', label: '4-sided (D4)' },
        { value: '8', label: '8-sided (D8)' },
        { value: '10', label: '10-sided (D10)' },
        { value: '12', label: '12-sided (D12)' },
        { value: '20', label: '20-sided (D20)' }
      ]},
      { id: 'dice_count', label: 'Number of Dice', type: 'number', required: false, min: 1, max: 10, defaultValue: 1, placeholder: 'How many dice?' },
      { id: 'custom_list', label: 'Custom List (comma separated)', type: 'text', required: false, placeholder: 'item1, item2, item3...' }
    ],
    formula: 'Random generation using Math.random() with specified parameters',
    calculate: (inputs) => {
      const generatorType = inputs.generator_type;
      
      if (generatorType === 'number') {
        const minNumber = parseInt(inputs.min_number) || 1;
        const maxNumber = parseInt(inputs.max_number) || 100;
        
        if (minNumber >= maxNumber) {
          throw new Error('Maximum number must be greater than minimum number');
        }
        
        const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        
        return {
          results: [
            { value: randomNumber, label: 'Random Number', unit: '' },
            { value: `${minNumber} - ${maxNumber}`, label: 'Range', unit: '' }
          ],
          explanation: [
            `Random number generated between ${minNumber} and ${maxNumber}`,
            `Result: ${randomNumber}`
          ],
          steps: [
            `Range: ${minNumber} to ${maxNumber}`,
            `Random generation: Math.random() × (${maxNumber - minNumber + 1}) + ${minNumber}`,
            `Result: ${randomNumber}`
          ]
        };
      } else if (generatorType === 'dice') {
        const diceType = parseInt(inputs.dice_type) || 6;
        const diceCount = parseInt(inputs.dice_count) || 1;
        
        if (diceCount > 10) {
          throw new Error('Maximum 10 dice allowed');
        }
        
        const rolls = [];
        let total = 0;
        
        for (let i = 0; i < diceCount; i++) {
          const roll = Math.floor(Math.random() * diceType) + 1;
          rolls.push(roll);
          total += roll;
        }
        
        const average = total / diceCount;
        
        return {
          results: [
            { value: total, label: 'Total', unit: '' },
            { value: rolls.join(', '), label: 'Individual Rolls', unit: '' },
            { value: average.toFixed(1), label: 'Average Roll', unit: '' },
            { value: `${diceCount}d${diceType}`, label: 'Dice Notation', unit: '' }
          ],
          explanation: [
            `Rolled ${diceCount} ${diceType}-sided dice`,
            `Total: ${total}, Individual: [${rolls.join(', ')}]`
          ],
          steps: [
            `Rolling ${diceCount}d${diceType}`,
            `Individual rolls: ${rolls.join(', ')}`,
            `Total: ${rolls.join(' + ')} = ${total}`
          ]
        };
      } else if (generatorType === 'coin') {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        const emoji = result === 'Heads' ? '👑' : '⚪';
        
        return {
          results: [
            { value: `${result} ${emoji}`, label: 'Coin Flip Result', unit: '' },
            { value: '50%', label: 'Probability', unit: '' }
          ],
          explanation: [
            `Coin flip result: ${result}`,
            'Each flip has a 50% chance of heads or tails'
          ],
          steps: [
            'Generating random number 0-1',
            `Random < 0.5 = ${result}`,
            `Result: ${result} ${emoji}`
          ]
        };
      } else if (generatorType === 'list') {
        const customList = inputs.custom_list;
        
        if (!customList || customList.trim() === '') {
          throw new Error('Please enter a comma-separated list of items');
        }
        
        const items = customList.split(',').map(item => item.trim()).filter(item => item !== '');
        
        if (items.length < 2) {
          throw new Error('Please enter at least 2 items in the list');
        }
        
        const randomIndex = Math.floor(Math.random() * items.length);
        const selectedItem = items[randomIndex];
        
        return {
          results: [
            { value: selectedItem, label: 'Selected Item', unit: '' },
            { value: items.length, label: 'Total Items', unit: 'items' },
            { value: `${((1/items.length) * 100).toFixed(1)}%`, label: 'Selection Probability', unit: '' }
          ],
          explanation: [
            `Randomly selected from ${items.length} items`,
            `Selected: "${selectedItem}"`
          ],
          steps: [
            `Items: [${items.join(', ')}]`,
            `Random index: ${randomIndex} (0-${items.length-1})`,
            `Selected item: "${selectedItem}"`
          ]
        };
      }
      
      throw new Error('Invalid generator type selected');
    },
    tags: ['random', 'dice', 'number', 'generator', 'coin-flip', 'games'],
    complexity: 'Basic'
  }
];

export default dailyLifeCalculators;