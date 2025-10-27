import { Calculator } from '../types/calculator';

// Import calculator categories
import { mathematicsCalculators } from './mathematicsCalculators';
import { physicsCalculators } from './physicsCalculators';
import chemistryCalculators from './chemistryCalculators';
import algebraCalculators from './algebraCalculators';
import geometryCalculators from './geometryCalculators';
import trigonometryCalculators from './trigonometryCalculators';
import calculusCalculators from './calculusCalculators';
import statisticsCalculators from './statisticsCalculators';
import financeCalculators from './financeCalculators';
import conversionCalculators from './conversionCalculators';
import engineeringCalculators from './engineeringCalculators';
import computerScienceCalculators from './computerScienceCalculators';
import healthFitnessCalculators from './healthFitnessCalculators';
import cookingCalculators from './cookingCalculators';
import sportsCalculators from './sportsCalculators';
import dailyLifeCalculators from './dailyLifeCalculators';

// Consolidate all calculators (using actual defined calculators)
export const allCalculators: Calculator[] = [
  ...mathematicsCalculators,
  ...physicsCalculators,
  ...chemistryCalculators,
  ...algebraCalculators,
  ...geometryCalculators,
  ...trigonometryCalculators,
  ...calculusCalculators,
  ...statisticsCalculators,
  ...financeCalculators,
  ...conversionCalculators,
  ...engineeringCalculators,
  ...computerScienceCalculators,
  ...healthFitnessCalculators,
  ...cookingCalculators,
  ...sportsCalculators,
  ...dailyLifeCalculators
];

// Export calculator categories for navigation
// Ordered by priority: Everyday practical tools first, specialized academic tools last
export const calculatorCategories = [
  {
    id: 'Daily Life',
    name: 'Daily Life',
    description: 'Practical everyday helper calculators',
    count: dailyLifeCalculators.length,
    color: 'bg-indigo-600'
  },
  {
    id: 'Finance',
    name: 'Finance',
    description: 'Financial calculations and planning',
    count: financeCalculators.length,
    color: 'bg-emerald-600'
  },
  {
    id: 'Health/Fitness',
    name: 'Health/Fitness',
    description: 'Health and fitness metrics',
    count: healthFitnessCalculators.length,
    color: 'bg-rose-600'
  },
  {
    id: 'Cooking',
    name: 'Cooking',
    description: 'Culinary calculations and conversions',
    count: cookingCalculators.length,
    color: 'bg-amber-600'
  },
  {
    id: 'Sports',
    name: 'Sports',
    description: 'Sports analytics and performance calculations',
    count: sportsCalculators.length,
    color: 'bg-green-600'
  },
  {
    id: 'Conversion',
    name: 'Conversion',
    description: 'Unit conversions and measurements',
    count: conversionCalculators.length,
    color: 'bg-orange-600'
  },
  {
    id: 'Mathematics',
    name: 'Mathematics',
    description: 'Basic to advanced mathematical calculations',
    count: mathematicsCalculators.length,
    color: 'bg-blue-600'
  },
  {
    id: 'Physics',
    name: 'Physics', 
    description: 'Physics formulas and calculations',
    count: physicsCalculators.length,
    color: 'bg-purple-600'
  },
  {
    id: 'Chemistry',
    name: 'Chemistry',
    description: 'Chemical calculations and analysis',
    count: chemistryCalculators.length,
    color: 'bg-green-600'
  },
  {
    id: 'Engineering',
    name: 'Engineering',
    description: 'Engineering calculations and design',
    count: engineeringCalculators.length,
    color: 'bg-gray-600'
  },
  {
    id: 'Algebra',
    name: 'Algebra',
    description: 'Algebraic operations and equations',
    count: algebraCalculators.length,
    color: 'bg-red-600'
  },
  {
    id: 'Geometry',
    name: 'Geometry',
    description: 'Geometric calculations and measurements',
    count: geometryCalculators.length,
    color: 'bg-yellow-600'
  },
  {
    id: 'Trigonometry',
    name: 'Trigonometry',
    description: 'Trigonometric functions and identities',
    count: trigonometryCalculators.length,
    color: 'bg-pink-600'
  },
  {
    id: 'Calculus',
    name: 'Calculus',
    description: 'Differential and integral calculus',
    count: calculusCalculators.length,
    color: 'bg-indigo-600'
  },
  {
    id: 'Statistics',
    name: 'Statistics',
    description: 'Statistical analysis and probability',
    count: statisticsCalculators.length,
    color: 'bg-teal-600'
  },
  {
    id: 'Computer Science',
    name: 'Computer Science',
    description: 'CS algorithms and analysis',
    count: computerScienceCalculators.length,
    color: 'bg-cyan-600'
  }
];

// Utility functions
export const getCalculatorsByCategory = (category: string): Calculator[] => {
  return allCalculators.filter(calc => calc.category === category);
};

export const searchCalculators = (query: string): Calculator[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return allCalculators;
  
  return allCalculators.filter(calc => 
    calc.title.toLowerCase().includes(searchTerm) ||
    calc.description.toLowerCase().includes(searchTerm) ||
    calc.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    calc.category.toLowerCase().includes(searchTerm)
  );
};

export const getCalculatorById = (id: string): Calculator | undefined => {
  return allCalculators.find(calc => calc.id === id);
};

export default allCalculators;