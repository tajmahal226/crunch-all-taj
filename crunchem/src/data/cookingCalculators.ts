import { Calculator } from '../types/calculator';

const cookingCalculators: Calculator[] = [
  {
    id: 'recipe-scaling',
    title: 'Recipe Scaling Calculator',
    description: 'Scale recipes up or down for different serving sizes with precise measurements.',
    category: 'Cooking',
    inputs: [
      { id: 'original_servings', label: 'Original Servings', type: 'number', required: true, min: 1, placeholder: 'e.g., 4' },
      { id: 'desired_servings', label: 'Desired Servings', type: 'number', required: true, min: 1, placeholder: 'e.g., 8' },
      { id: 'ingredient_amount', label: 'Original Ingredient Amount', type: 'number', required: true, step: 0.01, placeholder: 'e.g., 2.5' },
      { id: 'ingredient_unit', label: 'Unit', type: 'select', required: true, options: [
        { value: 'cups', label: 'Cups' },
        { value: 'tablespoons', label: 'Tablespoons' },
        { value: 'teaspoons', label: 'Teaspoons' },
        { value: 'ounces', label: 'Ounces' },
        { value: 'pounds', label: 'Pounds' },
        { value: 'grams', label: 'Grams' },
        { value: 'kilograms', label: 'Kilograms' },
        { value: 'milliliters', label: 'Milliliters' },
        { value: 'liters', label: 'Liters' }
      ]}
    ],
    formula: 'Scaled Amount = Original Amount × (Desired Servings ÷ Original Servings)',
    calculate: (inputs) => {
      const originalServings = parseFloat(inputs.original_servings);
      const desiredServings = parseFloat(inputs.desired_servings);
      const ingredientAmount = parseFloat(inputs.ingredient_amount);
      const unit = inputs.ingredient_unit;
      
      const scalingFactor = desiredServings / originalServings;
      const scaledAmount = ingredientAmount * scalingFactor;
      
      return {
        results: [
          { value: scaledAmount.toFixed(2), label: 'Scaled Amount', unit },
          { value: scalingFactor.toFixed(3), label: 'Scaling Factor', unit: '×' }
        ],
        explanation: [
          `Scaling recipe from ${originalServings} to ${desiredServings} servings`,
          `Each ingredient should be multiplied by ${scalingFactor.toFixed(3)}`
        ],
        steps: [
          `Scaling Factor = ${desiredServings} ÷ ${originalServings} = ${scalingFactor.toFixed(3)}`,
          `Scaled Amount = ${ingredientAmount} × ${scalingFactor.toFixed(3)} = ${scaledAmount.toFixed(2)} ${unit}`
        ]
      };
    },
    tags: ['recipe', 'scaling', 'servings', 'measurements'],
    complexity: 'Basic'
  },

  {
    id: 'cooking-time-converter',
    title: 'Cooking Time Converter',
    description: 'Convert cooking times for different oven types, temperatures, and altitudes.',
    category: 'Cooking',
    inputs: [
      { id: 'original_time', label: 'Original Cooking Time (minutes)', type: 'number', required: true, min: 1, placeholder: 'e.g., 45' },
      { id: 'original_temp', label: 'Original Temperature (°F)', type: 'number', required: true, min: 200, max: 500, placeholder: 'e.g., 350' },
      { id: 'new_temp', label: 'New Temperature (°F)', type: 'number', required: true, min: 200, max: 500, placeholder: 'e.g., 375' },
      { id: 'oven_type', label: 'Oven Type', type: 'select', required: true, options: [
        { value: 'conventional', label: 'Conventional Oven' },
        { value: 'convection', label: 'Convection Oven' },
        { value: 'toaster_oven', label: 'Toaster Oven' }
      ]},
      { id: 'altitude', label: 'Altitude', type: 'select', required: true, options: [
        { value: 'sea_level', label: 'Sea Level (0-1000 ft)' },
        { value: 'moderate', label: 'Moderate (1000-3000 ft)' },
        { value: 'high', label: 'High (3000-5000 ft)' },
        { value: 'very_high', label: 'Very High (5000+ ft)' }
      ]}
    ],
    formula: 'Adjusted Time = Original Time × (Original Temp ÷ New Temp)^1.2 × Oven Factor × Altitude Factor',
    calculate: (inputs) => {
      const originalTime = parseFloat(inputs.original_time);
      const originalTemp = parseFloat(inputs.original_temp);
      const newTemp = parseFloat(inputs.new_temp);
      const ovenType = inputs.oven_type;
      const altitude = inputs.altitude;
      
      // Temperature adjustment factor
      const tempFactor = Math.pow(originalTemp / newTemp, 1.2);
      
      // Oven type adjustment
      let ovenFactor = 1;
      if (ovenType === 'convection') ovenFactor = 0.8; // Convection cooks faster
      if (ovenType === 'toaster_oven') ovenFactor = 0.9;
      
      // Altitude adjustment
      let altitudeFactor = 1;
      if (altitude === 'moderate') altitudeFactor = 0.95;
      if (altitude === 'high') altitudeFactor = 0.9;
      if (altitude === 'very_high') altitudeFactor = 0.85;
      
      const adjustedTime = originalTime * tempFactor * ovenFactor * altitudeFactor;
      
      return {
        results: [
          { value: Math.round(adjustedTime), label: 'Adjusted Cooking Time', unit: 'minutes' },
          { value: newTemp, label: 'New Temperature', unit: '°F' }
        ],
        explanation: [
          `Adjusted for ${ovenType} oven at ${newTemp}°F and ${altitude.replace('_', ' ')} altitude`,
          `Time reduced by ${Math.round((1 - adjustedTime/originalTime) * 100)}% due to adjustments`
        ],
        steps: [
          `Temperature factor: (${originalTemp}°F ÷ ${newTemp}°F)^1.2 = ${tempFactor.toFixed(3)}`,
          `Oven factor: ${ovenFactor}`,
          `Altitude factor: ${altitudeFactor}`,
          `Adjusted time: ${originalTime} × ${tempFactor.toFixed(3)} × ${ovenFactor} × ${altitudeFactor} = ${adjustedTime.toFixed(1)} minutes`
        ]
      };
    },
    tags: ['cooking', 'time', 'temperature', 'oven', 'altitude'],
    complexity: 'Intermediate'
  },

  {
    id: 'ingredient-substitution',
    title: 'Ingredient Substitution Calculator',
    description: 'Find equivalent amounts for ingredient substitutions in your recipes.',
    category: 'Cooking',
    inputs: [
      { id: 'original_ingredient', label: 'Original Ingredient', type: 'select', required: true, options: [
        { value: 'butter', label: 'Butter' },
        { value: 'sugar', label: 'White Sugar' },
        { value: 'brown_sugar', label: 'Brown Sugar' },
        { value: 'eggs', label: 'Eggs' },
        { value: 'milk', label: 'Milk' },
        { value: 'flour', label: 'All-Purpose Flour' },
        { value: 'baking_powder', label: 'Baking Powder' },
        { value: 'vanilla', label: 'Vanilla Extract' },
        { value: 'honey', label: 'Honey' },
        { value: 'oil', label: 'Vegetable Oil' }
      ]},
      { id: 'amount', label: 'Amount', type: 'number', required: true, step: 0.01, placeholder: 'e.g., 1' },
      { id: 'unit', label: 'Unit', type: 'select', required: true, options: [
        { value: 'cups', label: 'Cups' },
        { value: 'tablespoons', label: 'Tablespoons' },
        { value: 'teaspoons', label: 'Teaspoons' },
        { value: 'pieces', label: 'Pieces/Items' }
      ]},
      { id: 'substitute', label: 'Substitute With', type: 'select', required: true, options: [
        { value: 'applesauce', label: 'Applesauce (for butter/oil)' },
        { value: 'coconut_oil', label: 'Coconut Oil (for butter)' },
        { value: 'maple_syrup', label: 'Maple Syrup (for sugar)' },
        { value: 'banana', label: 'Mashed Banana (for eggs/butter)' },
        { value: 'almond_milk', label: 'Almond Milk (for milk)' },
        { value: 'coconut_flour', label: 'Coconut Flour (for flour)' },
        { value: 'baking_soda', label: 'Baking Soda + Acid (for baking powder)' },
        { value: 'almond_extract', label: 'Almond Extract (for vanilla)' },
        { value: 'agave', label: 'Agave (for honey)' }
      ]}
    ],
    formula: 'Substitution ratios based on ingredient properties and cooking science',
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount);
      const unit = inputs.unit;
      const original = inputs.original_ingredient;
      const substitute = inputs.substitute;
      
      // Substitution ratios (substitute amount per original amount)
      const ratios: { [key: string]: { [key: string]: number } } = {
        'butter': {
          'applesauce': 0.5,
          'coconut_oil': 1,
          'banana': 0.5
        },
        'sugar': {
          'maple_syrup': 0.75,
          'agave': 0.75
        },
        'eggs': {
          'banana': 0.25, // 1/4 cup mashed banana per egg
          'applesauce': 0.25
        },
        'milk': {
          'almond_milk': 1
        },
        'flour': {
          'coconut_flour': 0.25 // Coconut flour is much more absorbent
        },
        'baking_powder': {
          'baking_soda': 0.25 // 1/4 tsp baking soda + 1/2 tsp acid per 1 tsp baking powder
        },
        'vanilla': {
          'almond_extract': 0.5
        },
        'honey': {
          'agave': 1,
          'maple_syrup': 1
        },
        'oil': {
          'applesauce': 0.5,
          'banana': 0.5
        }
      };
      
      const ratio = ratios[original]?.[substitute] || 1;
      const substituteAmount = amount * ratio;
      
      // Special instructions for certain substitutions
      let specialNote = '';
      if (substitute === 'baking_soda') {
        specialNote = 'Also add 1/2 tsp acid (lemon juice or vinegar) per 1 tsp baking powder replaced';
      }
      if (substitute === 'coconut_flour') {
        specialNote = 'Increase liquid ingredients by 15-25% when using coconut flour';
      }
      
      return {
        results: [
          { value: substituteAmount.toFixed(2), label: 'Substitute Amount', unit },
          { value: ratio, label: 'Conversion Ratio', unit: ':1' }
        ],
        explanation: [
          `Substituting ${amount} ${unit} of ${original.replace('_', ' ')} with ${substitute.replace('_', ' ')}`,
          specialNote || 'Direct substitution - no additional adjustments needed'
        ],
        steps: [
          `Substitution ratio: 1 ${unit} ${original.replace('_', ' ')} = ${ratio} ${unit} ${substitute.replace('_', ' ')}`,
          `Required amount: ${amount} × ${ratio} = ${substituteAmount.toFixed(2)} ${unit}`
        ]
      };
    },
    tags: ['substitution', 'ingredients', 'dietary', 'alternatives'],
    complexity: 'Basic'
  },

  {
    id: 'nutritional-calculator',
    title: 'Nutritional Calculator',
    description: 'Calculate calories, macronutrients, and nutritional values for recipes and ingredients.',
    category: 'Cooking',
    inputs: [
      { id: 'food_item', label: 'Food Item', type: 'select', required: true, options: [
        { value: 'chicken_breast', label: 'Chicken Breast (100g)' },
        { value: 'salmon', label: 'Salmon (100g)' },
        { value: 'rice', label: 'White Rice (100g cooked)' },
        { value: 'broccoli', label: 'Broccoli (100g)' },
        { value: 'avocado', label: 'Avocado (100g)' },
        { value: 'eggs', label: 'Eggs (1 large)' },
        { value: 'olive_oil', label: 'Olive Oil (1 tbsp)' },
        { value: 'banana', label: 'Banana (1 medium)' },
        { value: 'almonds', label: 'Almonds (30g)' },
        { value: 'bread', label: 'Whole Wheat Bread (1 slice)' }
      ]},
      { id: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0.1, step: 0.1, defaultValue: 1, placeholder: 'e.g., 1.5' }
    ],
    formula: 'Nutritional values calculated per 100g or per serving based on USDA data',
    calculate: (inputs) => {
      const foodItem = inputs.food_item;
      const quantity = parseFloat(inputs.quantity);
      
      // Nutritional data per serving (calories, protein, carbs, fat, fiber)
      const nutritionData: { [key: string]: { name: string; calories: number; protein: number; carbs: number; fat: number; fiber: number } } = {
        'chicken_breast': { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
        'salmon': { name: 'Salmon (100g)', calories: 208, protein: 22, carbs: 0, fat: 12, fiber: 0 },
        'rice': { name: 'White Rice (100g cooked)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
        'broccoli': { name: 'Broccoli (100g)', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6 },
        'avocado': { name: 'Avocado (100g)', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 },
        'eggs': { name: 'Eggs (1 large)', calories: 68, protein: 6, carbs: 0.6, fat: 4.8, fiber: 0 },
        'olive_oil': { name: 'Olive Oil (1 tbsp)', calories: 119, protein: 0, carbs: 0, fat: 13.5, fiber: 0 },
        'banana': { name: 'Banana (1 medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 },
        'almonds': { name: 'Almonds (30g)', calories: 173, protein: 6.4, carbs: 6.1, fat: 15, fiber: 3.4 },
        'bread': { name: 'Whole Wheat Bread (1 slice)', calories: 81, protein: 4, carbs: 14, fat: 1.1, fiber: 2 }
      };
      
      const data = nutritionData[foodItem];
      const totalCalories = data.calories * quantity;
      const totalProtein = data.protein * quantity;
      const totalCarbs = data.carbs * quantity;
      const totalFat = data.fat * quantity;
      const totalFiber = data.fiber * quantity;
      
      // Calculate percentages of macronutrients
      const proteinPercent = (totalProtein * 4 / totalCalories * 100) || 0;
      const carbsPercent = (totalCarbs * 4 / totalCalories * 100) || 0;
      const fatPercent = (totalFat * 9 / totalCalories * 100) || 0;
      
      return {
        results: [
          { value: Math.round(totalCalories), label: 'Total Calories', unit: 'cal' },
          { value: totalProtein.toFixed(1), label: 'Protein', unit: 'g' },
          { value: totalCarbs.toFixed(1), label: 'Carbohydrates', unit: 'g' },
          { value: totalFat.toFixed(1), label: 'Fat', unit: 'g' },
          { value: totalFiber.toFixed(1), label: 'Fiber', unit: 'g' }
        ],
        explanation: [
          `Nutritional breakdown for ${quantity}× ${data.name}`,
          `Macronutrient distribution: ${proteinPercent.toFixed(0)}% protein, ${carbsPercent.toFixed(0)}% carbs, ${fatPercent.toFixed(0)}% fat`
        ],
        steps: [
          `Base values per serving: ${data.calories} cal, ${data.protein}g protein, ${data.carbs}g carbs, ${data.fat}g fat`,
          `Multiplied by quantity: ${quantity}`,
          `Total calories: ${data.calories} × ${quantity} = ${totalCalories.toFixed(0)} calories`
        ]
      };
    },
    tags: ['nutrition', 'calories', 'macros', 'diet', 'health'],
    complexity: 'Basic'
  },

  {
    id: 'serving-size-calculator',
    title: 'Serving Size Calculator',
    description: 'Calculate perfect portion sizes for different group sizes and meal types.',
    category: 'Cooking',
    inputs: [
      { id: 'people_count', label: 'Number of People', type: 'number', required: true, min: 1, placeholder: 'e.g., 12' },
      { id: 'meal_type', label: 'Meal Type', type: 'select', required: true, options: [
        { value: 'appetizer', label: 'Appetizer/Snack' },
        { value: 'main_course', label: 'Main Course' },
        { value: 'side_dish', label: 'Side Dish' },
        { value: 'dessert', label: 'Dessert' },
        { value: 'buffet', label: 'Buffet Style' },
        { value: 'party', label: 'Party/Event' }
      ]},
      { id: 'food_category', label: 'Food Category', type: 'select', required: true, options: [
        { value: 'meat', label: 'Meat/Poultry' },
        { value: 'fish', label: 'Fish/Seafood' },
        { value: 'pasta', label: 'Pasta' },
        { value: 'rice', label: 'Rice/Grains' },
        { value: 'vegetables', label: 'Vegetables' },
        { value: 'salad', label: 'Salad' },
        { value: 'bread', label: 'Bread/Rolls' },
        { value: 'cheese', label: 'Cheese' }
      ]},
      { id: 'appetite', label: 'Appetite Level', type: 'select', required: true, options: [
        { value: 'light', label: 'Light Eaters' },
        { value: 'moderate', label: 'Moderate Eaters' },
        { value: 'hearty', label: 'Hearty Eaters' }
      ]}
    ],
    formula: 'Serving Size = Base Portion × People Count × Meal Type Factor × Appetite Factor',
    calculate: (inputs) => {
      const peopleCount = parseInt(inputs.people_count);
      const mealType = inputs.meal_type;
      const foodCategory = inputs.food_category;
      const appetite = inputs.appetite;
      
      // Base serving sizes in ounces per person
      const baseServings: { [key: string]: number } = {
        'meat': 6,
        'fish': 6,
        'pasta': 4, // dry weight
        'rice': 2, // dry weight
        'vegetables': 4,
        'salad': 2,
        'bread': 1,
        'cheese': 2
      };
      
      // Meal type multipliers
      const mealTypeMultipliers: { [key: string]: number } = {
        'appetizer': 0.5,
        'main_course': 1,
        'side_dish': 0.75,
        'dessert': 0.6,
        'buffet': 1.2,
        'party': 0.8
      };
      
      // Appetite multipliers
      const appetiteMultipliers: { [key: string]: number } = {
        'light': 0.8,
        'moderate': 1,
        'hearty': 1.3
      };
      
      const baseServing = baseServings[foodCategory];
      const mealMultiplier = mealTypeMultipliers[mealType];
      const appetiteMultiplier = appetiteMultipliers[appetite];
      
      const servingPerPerson = baseServing * mealMultiplier * appetiteMultiplier;
      const totalAmount = servingPerPerson * peopleCount;
      
      // Convert to different units
      const totalPounds = totalAmount / 16;
      const totalGrams = totalAmount * 28.35;
      
      return {
        results: [
          { value: servingPerPerson.toFixed(1), label: 'Per Person', unit: 'oz' },
          { value: totalAmount.toFixed(1), label: 'Total Amount', unit: 'oz' },
          { value: totalPounds.toFixed(2), label: 'Total Amount', unit: 'lbs' },
          { value: Math.round(totalGrams), label: 'Total Amount', unit: 'g' }
        ],
        explanation: [
          `Serving ${peopleCount} ${appetite} eaters for ${mealType.replace('_', ' ')}`,
          `Each person needs ${servingPerPerson.toFixed(1)} oz of ${foodCategory.replace('_', '/')}`
        ],
        steps: [
          `Base serving: ${baseServing} oz per person for ${foodCategory}`,
          `Meal type factor: ×${mealMultiplier} (${mealType.replace('_', ' ')})`,
          `Appetite factor: ×${appetiteMultiplier} (${appetite} eaters)`,
          `Per person: ${baseServing} × ${mealMultiplier} × ${appetiteMultiplier} = ${servingPerPerson.toFixed(1)} oz`,
          `Total: ${servingPerPerson.toFixed(1)} × ${peopleCount} = ${totalAmount.toFixed(1)} oz`
        ]
      };
    },
    tags: ['serving', 'portions', 'party planning', 'catering'],
    complexity: 'Basic'
  },

  {
    id: 'temperature-conversion',
    title: 'Temperature Conversion',
    description: 'Convert between Fahrenheit, Celsius, and gas mark temperatures for cooking.',
    category: 'Cooking',
    inputs: [
      { id: 'temperature', label: 'Temperature', type: 'number', required: true, placeholder: 'e.g., 350' },
      { id: 'from_unit', label: 'Convert From', type: 'select', required: true, options: [
        { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
        { value: 'celsius', label: 'Celsius (°C)' },
        { value: 'gas_mark', label: 'Gas Mark' }
      ]},
      { id: 'cooking_method', label: 'Cooking Method', type: 'select', required: true, options: [
        { value: 'baking', label: 'Baking/Roasting' },
        { value: 'broiling', label: 'Broiling' },
        { value: 'slow_cooking', label: 'Slow Cooking' },
        { value: 'frying', label: 'Deep Frying' },
        { value: 'candy_making', label: 'Candy Making' }
      ]}
    ],
    formula: '°F = (°C × 9/5) + 32, °C = (°F - 32) × 5/9, Gas Mark approximations',
    calculate: (inputs) => {
      const temp = parseFloat(inputs.temperature);
      const fromUnit = inputs.from_unit;
      const cookingMethod = inputs.cooking_method;
      
      let fahrenheit: number, celsius: number, gasmark: number;
      
      // Convert to Fahrenheit first
      if (fromUnit === 'fahrenheit') {
        fahrenheit = temp;
      } else if (fromUnit === 'celsius') {
        fahrenheit = (temp * 9/5) + 32;
      } else { // gas_mark
        // Gas mark to Fahrenheit approximations
        const gasMarkToF: { [key: number]: number } = {
          1: 275, 2: 300, 3: 325, 4: 350, 5: 375,
          6: 400, 7: 425, 8: 450, 9: 475, 10: 500
        };
        fahrenheit = gasMarkToF[Math.round(temp)] || (temp * 25 + 250);
      }
      
      // Convert to other units
      celsius = (fahrenheit - 32) * 5/9;
      
      // Approximate gas mark
      if (fahrenheit <= 275) gasmark = 1;
      else if (fahrenheit <= 300) gasmark = 2;
      else if (fahrenheit <= 325) gasmark = 3;
      else if (fahrenheit <= 350) gasmark = 4;
      else if (fahrenheit <= 375) gasmark = 5;
      else if (fahrenheit <= 400) gasmark = 6;
      else if (fahrenheit <= 425) gasmark = 7;
      else if (fahrenheit <= 450) gasmark = 8;
      else if (fahrenheit <= 475) gasmark = 9;
      else gasmark = 10;
      
      // Cooking method recommendations
      let recommendation = '';
      if (cookingMethod === 'baking') {
        if (fahrenheit < 300) recommendation = 'Low temperature - good for meringues, slow baking';
        else if (fahrenheit <= 375) recommendation = 'Medium temperature - ideal for most baking';
        else recommendation = 'High temperature - good for quick breads, pizza';
      } else if (cookingMethod === 'frying') {
        if (fahrenheit >= 350 && fahrenheit <= 375) recommendation = 'Perfect frying temperature';
        else if (fahrenheit < 350) recommendation = 'Too low - food will absorb oil';
        else recommendation = 'Too high - food may burn outside before cooking inside';
      }
      
      return {
        results: [
          { value: Math.round(fahrenheit), label: 'Fahrenheit', unit: '°F' },
          { value: Math.round(celsius), label: 'Celsius', unit: '°C' },
          { value: gasmark, label: 'Gas Mark', format: 'integer' }
        ],
        explanation: [
          `Temperature conversion for ${cookingMethod.replace('_', ' ')}`,
          recommendation || `Converted temperature: ${Math.round(fahrenheit)}°F / ${Math.round(celsius)}°C`
        ],
        steps: [
          fromUnit === 'celsius' 
            ? `°F = (${temp}°C × 9/5) + 32 = ${Math.round(fahrenheit)}°F`
            : fromUnit === 'fahrenheit'
            ? `°C = (${temp}°F - 32) × 5/9 = ${Math.round(celsius)}°C`
            : `Gas Mark ${temp} ≈ ${Math.round(fahrenheit)}°F`,
          `Gas Mark approximation: ${gasmark}`,
          `All conversions: ${Math.round(fahrenheit)}°F = ${Math.round(celsius)}°C = Gas Mark ${gasmark}`
        ]
      };
    },
    tags: ['temperature', 'conversion', 'baking', 'cooking'],
    complexity: 'Basic'
  },

  {
    id: 'measurement-converter',
    title: 'Measurement Converter',
    description: 'Convert between different cooking measurements including cups, ounces, grams, and more.',
    category: 'Cooking',
    inputs: [
      { id: 'amount', label: 'Amount', type: 'number', required: true, step: 0.01, placeholder: 'e.g., 2.5' },
      { id: 'from_unit', label: 'Convert From', type: 'select', required: true, options: [
        { value: 'cups', label: 'Cups' },
        { value: 'tablespoons', label: 'Tablespoons' },
        { value: 'teaspoons', label: 'Teaspoons' },
        { value: 'fluid_ounces', label: 'Fluid Ounces' },
        { value: 'milliliters', label: 'Milliliters' },
        { value: 'liters', label: 'Liters' },
        { value: 'ounces', label: 'Ounces (weight)' },
        { value: 'pounds', label: 'Pounds' },
        { value: 'grams', label: 'Grams' },
        { value: 'kilograms', label: 'Kilograms' }
      ]},
      { id: 'to_unit', label: 'Convert To', type: 'select', required: true, options: [
        { value: 'cups', label: 'Cups' },
        { value: 'tablespoons', label: 'Tablespoons' },
        { value: 'teaspoons', label: 'Teaspoons' },
        { value: 'fluid_ounces', label: 'Fluid Ounces' },
        { value: 'milliliters', label: 'Milliliters' },
        { value: 'liters', label: 'Liters' },
        { value: 'ounces', label: 'Ounces (weight)' },
        { value: 'pounds', label: 'Pounds' },
        { value: 'grams', label: 'Grams' },
        { value: 'kilograms', label: 'Kilograms' }
      ]},
      { id: 'ingredient_type', label: 'Ingredient Type (for weight conversions)', type: 'select', required: false, options: [
        { value: 'water', label: 'Water/Liquid' },
        { value: 'flour', label: 'All-Purpose Flour' },
        { value: 'sugar', label: 'Granulated Sugar' },
        { value: 'butter', label: 'Butter' },
        { value: 'oil', label: 'Oil' },
        { value: 'honey', label: 'Honey' },
        { value: 'milk', label: 'Milk' }
      ]}
    ],
    formula: 'Conversion factors based on standard cooking measurements and ingredient densities',
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount);
      const fromUnit = inputs.from_unit;
      const toUnit = inputs.to_unit;
      const ingredientType = inputs.ingredient_type || 'water';
      
      // Conversion factors to milliliters (for volume) or grams (for weight)
      const volumeConversions: { [key: string]: number } = {
        'cups': 236.588,
        'tablespoons': 14.787,
        'teaspoons': 4.929,
        'fluid_ounces': 29.574,
        'milliliters': 1,
        'liters': 1000
      };
      
      const weightConversions: { [key: string]: number } = {
        'ounces': 28.35,
        'pounds': 453.592,
        'grams': 1,
        'kilograms': 1000
      };
      
      // Ingredient density factors (grams per ml)
      const densities: { [key: string]: number } = {
        'water': 1,
        'flour': 0.57,
        'sugar': 0.85,
        'butter': 0.91,
        'oil': 0.92,
        'honey': 1.42,
        'milk': 1.03
      };
      
      let result: number;
      let conversionType: string;
      
      // Check if we're converting within the same measurement type
      const isVolumeToVolume = volumeConversions[fromUnit] && volumeConversions[toUnit];
      const isWeightToWeight = weightConversions[fromUnit] && weightConversions[toUnit];
      const isVolumeToWeight = volumeConversions[fromUnit] && weightConversions[toUnit];
      const isWeightToVolume = weightConversions[fromUnit] && volumeConversions[toUnit];
      
      if (isVolumeToVolume) {
        // Volume to volume conversion
        const mlAmount = amount * volumeConversions[fromUnit];
        result = mlAmount / volumeConversions[toUnit];
        conversionType = 'volume';
      } else if (isWeightToWeight) {
        // Weight to weight conversion
        const gramAmount = amount * weightConversions[fromUnit];
        result = gramAmount / weightConversions[toUnit];
        conversionType = 'weight';
      } else if (isVolumeToWeight) {
        // Volume to weight conversion (requires ingredient density)
        const mlAmount = amount * volumeConversions[fromUnit];
        const gramAmount = mlAmount * densities[ingredientType];
        result = gramAmount / weightConversions[toUnit];
        conversionType = 'volume-to-weight';
      } else if (isWeightToVolume) {
        // Weight to volume conversion (requires ingredient density)
        const gramAmount = amount * weightConversions[fromUnit];
        const mlAmount = gramAmount / densities[ingredientType];
        result = mlAmount / volumeConversions[toUnit];
        conversionType = 'weight-to-volume';
      } else {
        throw new Error('Invalid unit conversion');
      }
      
      // Format result based on magnitude
      let displayResult: string;
      if (result >= 1000) {
        displayResult = result.toFixed(0);
      } else if (result >= 10) {
        displayResult = result.toFixed(1);
      } else {
        displayResult = result.toFixed(2);
      }
      
      return {
        results: [
          { value: displayResult, label: 'Converted Amount', unit: toUnit.replace('_', ' ') },
          { value: (1 / (result / amount)).toFixed(4), label: 'Conversion Factor', unit: `${fromUnit.replace('_', ' ')} per ${toUnit.replace('_', ' ')}` }
        ],
        explanation: [
          `Converting ${amount} ${fromUnit.replace('_', ' ')} to ${toUnit.replace('_', ' ')}`,
          conversionType.includes('weight') || conversionType.includes('volume') 
            ? `Using ${ingredientType} density for volume/weight conversion`
            : 'Direct measurement conversion'
        ],
        steps: [
          conversionType === 'volume' 
            ? `${amount} ${fromUnit.replace('_', ' ')} × ${volumeConversions[fromUnit]} ml per ${fromUnit.replace('_', ' ')} = ${(amount * volumeConversions[fromUnit]).toFixed(2)} ml`
            : conversionType === 'weight'
            ? `${amount} ${fromUnit.replace('_', ' ')} × ${weightConversions[fromUnit]} g per ${fromUnit.replace('_', ' ')} = ${(amount * weightConversions[fromUnit]).toFixed(2)} g`
            : `${amount} ${fromUnit.replace('_', ' ')} → ${displayResult} ${toUnit.replace('_', ' ')}`,
          `Final result: ${displayResult} ${toUnit.replace('_', ' ')}`
        ]
      };
    },
    tags: ['measurements', 'conversion', 'units', 'volume', 'weight'],
    complexity: 'Intermediate'
  },

  {
    id: 'baking-conversion',
    title: 'Baking Conversion Calculator',
    description: 'Convert between different baking measurements and adjust for ingredient substitutions in baking.',
    category: 'Cooking',
    inputs: [
      { id: 'recipe_type', label: 'Recipe Type', type: 'select', required: true, options: [
        { value: 'bread', label: 'Bread/Yeast Recipes' },
        { value: 'cakes', label: 'Cakes & Cupcakes' },
        { value: 'cookies', label: 'Cookies & Biscuits' },
        { value: 'pastry', label: 'Pastry & Pie Dough' },
        { value: 'muffins', label: 'Muffins & Quick Breads' }
      ]},
      { id: 'ingredient', label: 'Ingredient to Convert', type: 'select', required: true, options: [
        { value: 'flour', label: 'All-Purpose Flour' },
        { value: 'cake_flour', label: 'Cake Flour' },
        { value: 'bread_flour', label: 'Bread Flour' },
        { value: 'sugar', label: 'Granulated Sugar' },
        { value: 'brown_sugar', label: 'Brown Sugar (packed)' },
        { value: 'powdered_sugar', label: 'Powdered Sugar' },
        { value: 'butter', label: 'Butter' },
        { value: 'cocoa', label: 'Cocoa Powder' }
      ]},
      { id: 'amount', label: 'Amount', type: 'number', required: true, step: 0.01, placeholder: 'e.g., 2.5' },
      { id: 'unit', label: 'Unit', type: 'select', required: true, options: [
        { value: 'cups', label: 'Cups' },
        { value: 'ounces', label: 'Ounces' },
        { value: 'grams', label: 'Grams' }
      ]},
      { id: 'altitude', label: 'Altitude Adjustment', type: 'select', required: true, options: [
        { value: 'sea_level', label: 'Sea Level (0-1000 ft)' },
        { value: 'moderate', label: 'Moderate (1000-3000 ft)' },
        { value: 'high', label: 'High (3000-5000 ft)' },
        { value: 'very_high', label: 'Very High (5000+ ft)' }
      ]}
    ],
    formula: 'Weight conversions based on ingredient density + altitude adjustments for leavening',
    calculate: (inputs) => {
      const recipeType = inputs.recipe_type;
      const ingredient = inputs.ingredient;
      const amount = parseFloat(inputs.amount);
      const unit = inputs.unit;
      const altitude = inputs.altitude;
      
      // Standard weights in grams per cup for baking ingredients
      const ingredientWeights: { [key: string]: number } = {
        'flour': 120,
        'cake_flour': 115,
        'bread_flour': 125,
        'sugar': 200,
        'brown_sugar': 213,
        'powdered_sugar': 120,
        'butter': 226,
        'cocoa': 85
      };
      
      // Convert to grams first
      let gramsAmount: number;
      if (unit === 'cups') {
        gramsAmount = amount * ingredientWeights[ingredient];
      } else if (unit === 'ounces') {
        gramsAmount = amount * 28.35;
      } else {
        gramsAmount = amount;
      }
      
      // Calculate other units
      const cupsAmount = gramsAmount / ingredientWeights[ingredient];
      const ouncesAmount = gramsAmount / 28.35;
      
      // Altitude adjustments for baking
      let altitudeAdjustment = '';
      let adjustedAmount = gramsAmount;
      
      if (altitude !== 'sea_level') {
        if (ingredient === 'flour' || ingredient === 'cake_flour' || ingredient === 'bread_flour') {
          let flourFactor = 1;
          if (altitude === 'moderate') flourFactor = 1.02;
          else if (altitude === 'high') flourFactor = 1.04;
          else if (altitude === 'very_high') flourFactor = 1.06;
          
          adjustedAmount = gramsAmount * flourFactor;
          altitudeAdjustment = `Increase flour by ${((flourFactor - 1) * 100).toFixed(0)}% for altitude`;
        } else if (ingredient === 'sugar') {
          let sugarFactor = 1;
          if (altitude === 'moderate') sugarFactor = 0.98;
          else if (altitude === 'high') sugarFactor = 0.96;
          else if (altitude === 'very_high') sugarFactor = 0.94;
          
          adjustedAmount = gramsAmount * sugarFactor;
          altitudeAdjustment = `Decrease sugar by ${((1 - sugarFactor) * 100).toFixed(0)}% for altitude`;
        }
      }
      
      // Baking tips based on recipe type and ingredient
      let bakingTip = '';
      if (recipeType === 'bread' && ingredient.includes('flour')) {
        bakingTip = 'For bread, measure flour by weight for best consistency';
      } else if (recipeType === 'cakes' && ingredient === 'cake_flour') {
        bakingTip = 'Cake flour creates lighter, more tender cakes';
      } else if (recipeType === 'cookies' && ingredient === 'brown_sugar') {
        bakingTip = 'Brown sugar adds moisture and chewiness to cookies';
      }
      
      return {
        results: [
          { value: cupsAmount.toFixed(2), label: 'Cups', unit: 'cups' },
          { value: ouncesAmount.toFixed(1), label: 'Ounces', unit: 'oz' },
          { value: Math.round(gramsAmount), label: 'Grams', unit: 'g' },
          ...(altitude !== 'sea_level' ? [{ value: Math.round(adjustedAmount), label: 'Altitude Adjusted', unit: 'g' }] : [])
        ],
        explanation: [
          `Baking conversions for ${amount} ${unit} of ${ingredient.replace('_', ' ')} in ${recipeType.replace('_', ' ')}`,
          altitudeAdjustment || bakingTip || `Standard conversions with no altitude adjustments needed`
        ],
        steps: [
          unit === 'cups' 
            ? `${amount} cups × ${ingredientWeights[ingredient]}g per cup = ${Math.round(gramsAmount)}g`
            : unit === 'ounces'
            ? `${amount} oz × 28.35g per oz = ${Math.round(gramsAmount)}g`
            : `${amount}g (already in grams)`,
          `Cups: ${Math.round(gramsAmount)}g ÷ ${ingredientWeights[ingredient]}g per cup = ${cupsAmount.toFixed(2)} cups`,
          `Ounces: ${Math.round(gramsAmount)}g ÷ 28.35g per oz = ${ouncesAmount.toFixed(1)} oz`
        ]
      };
    },
    tags: ['baking', 'conversion', 'altitude', 'measurements', 'ingredients'],
    complexity: 'Intermediate'
  }
];

export default cookingCalculators;
