import React, { useState, useMemo } from 'react';
import { Calculator, Star, Zap, Filter, Grid, List } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { allCalculators, searchCalculators, calculatorCategories } from '../data/allCalculators';
import { Calculator as CalculatorType } from '../types/calculator';
import CalculatorModal from './CalculatorModal';

interface CalculatorGridProps {
  className?: string;
}

const CalculatorGrid: React.FC<CalculatorGridProps> = ({ className = '' }) => {
  const { 
    searchQuery, 
    favorites, 
    toggleFavorite, 
    isFavorite, 
    selectedCalculator,
    setSelectedCalculator,
    selectedCategory,
    setSelectedCategory
  } = useApp();
  
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'complexity'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  // Filter and sort calculators
  const filteredCalculators = useMemo(() => {
    let calculators = searchQuery ? searchCalculators(searchQuery) : allCalculators;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      calculators = calculators.filter(calc => calc.category === selectedCategory);
    }
    
    // Filter by favorites
    if (showOnlyFavorites) {
      calculators = calculators.filter(calc => isFavorite(calc.id));
    }
    
    // Sort calculators
    calculators.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'complexity':
          const complexityOrder = { 'Basic': 1, 'Intermediate': 2, 'Advanced': 3 };
          return (complexityOrder[a.complexity || 'Intermediate'] || 2) - (complexityOrder[b.complexity || 'Intermediate'] || 2);
        default:
          return 0;
      }
    });
    
    return calculators;
  }, [searchQuery, selectedCategory, sortBy, showOnlyFavorites, isFavorite]);
  
  const getCategoryGradient = (category: string) => {
    const categoryColors = {
      'Mathematics': 'from-blue-600 to-blue-700',
      'Physics': 'from-purple-600 to-purple-700',
      'Chemistry': 'from-green-600 to-green-700',
      'Algebra': 'from-red-600 to-red-700',
      'Geometry': 'from-yellow-600 to-yellow-700',
      'Trigonometry': 'from-pink-600 to-pink-700',
      'Calculus': 'from-indigo-600 to-indigo-700',
      'Statistics': 'from-teal-600 to-teal-700',
      'Finance': 'from-emerald-600 to-emerald-700',
      'Conversion': 'from-orange-600 to-orange-700',
      'Engineering': 'from-gray-600 to-gray-700',
      'Computer Science': 'from-cyan-600 to-cyan-700',
      'Health/Fitness': 'from-rose-600 to-rose-700',
      'Cooking': 'from-amber-600 to-amber-700'
    };
    return categoryColors[category as keyof typeof categoryColors] || 'from-blue-600 to-blue-700';
  };
  
  const CalculatorCard: React.FC<{ calculator: CalculatorType }> = ({ calculator }) => {
    const gradient = getCategoryGradient(calculator.category);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg group cursor-pointer"
           onClick={() => setSelectedCalculator(calculator)}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-200`}>
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(calculator.id);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite(calculator.id)
                    ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
                    : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                title={isFavorite(calculator.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star className={`h-4 w-4 ${isFavorite(calculator.id) ? 'fill-current' : ''}`} />
              </button>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {calculator.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {calculator.description}
            </p>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                {calculator.category}
              </span>
              <span className={`px-2 py-1 text-xs rounded ${
                calculator.complexity === 'Basic' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                calculator.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {calculator.complexity || 'Intermediate'}
              </span>
            </div>
            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
              Calculate →
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const CalculatorListItem: React.FC<{ calculator: CalculatorType }> = ({ calculator }) => {
    const gradient = getCategoryGradient(calculator.category);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md cursor-pointer"
           onClick={() => setSelectedCalculator(calculator)}>
        <div className="p-4 flex items-center space-x-4">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} flex-shrink-0`}>
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                {calculator.title}
              </h3>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(calculator.id);
                  }}
                  className={`p-1.5 rounded transition-colors ${
                    isFavorite(calculator.id)
                      ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                      : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Star className={`h-4 w-4 ${isFavorite(calculator.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
              {calculator.description}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                {calculator.category}
              </span>
              <span className={`px-2 py-1 text-xs rounded ${
                calculator.complexity === 'Basic' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                calculator.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {calculator.complexity || 'Intermediate'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`${className} safe-area-bottom`}>
      {/* Filters and Controls */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Categories</option>
                {calculatorCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                showOnlyFavorites
                  ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Star className={`h-4 w-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">Favorites Only</span>
            </button>
          </div>
          
          {/* Sort and View Controls */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'category' | 'complexity')}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
              <option value="complexity">Sort by Complexity</option>
            </select>
            
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
                title="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
                title="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {showOnlyFavorites && ' (favorites only)'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </div>
      
      {/* Calculator Grid/List */}
      <div className="p-6">
        {filteredCalculators.length === 0 ? (
          <div className="text-center py-12">
            <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No calculators found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              {searchQuery ? `Try adjusting your search terms or filters.` :
               showOnlyFavorites ? 'Add some calculators to your favorites to see them here.' :
               'Try adjusting your filters or search terms.'}
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6'
            : 'space-y-3 sm:space-y-4'
          }>
            {filteredCalculators.map((calculator) => (
              viewMode === 'grid' ? (
                <CalculatorCard key={calculator.id} calculator={calculator} />
              ) : (
                <CalculatorListItem key={calculator.id} calculator={calculator} />
              )
            ))}
          </div>
        )}
      </div>
      
      {/* Calculator Modal */}
      {selectedCalculator && (
        <CalculatorModal 
          calculator={selectedCalculator}
          onClose={() => setSelectedCalculator(null)}
        />
      )}
    </div>
  );
};

export default CalculatorGrid;