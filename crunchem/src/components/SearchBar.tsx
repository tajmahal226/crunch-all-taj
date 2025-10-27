import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Filter, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { searchCalculators, calculatorCategories } from '../data/allCalculators';
import { Calculator } from '../types/calculator';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const { searchQuery, setSearchQuery } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Calculator[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchCalculators(query);
      const filteredResults = selectedCategory 
        ? results.filter(calc => calc.category === selectedCategory)
        : results;
      setSearchResults(filteredResults);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    setSelectedCategory('');
  };

  const popularSearches = [
    'quadratic formula',
    'compound interest', 
    'BMI calculator',
    'derivative',
    'area calculator'
  ];

  // Handle keyboard shortcuts (focus search on Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsExpanded(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search 200+ calculators..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-base md:text-sm min-h-[44px]"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="mr-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`mr-2 p-2.5 rounded transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center ${
              showFilters || selectedCategory
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
          <div className="p-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Filter by Category</h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  handleSearch(searchQuery);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  !selectedCategory
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                All Categories
              </button>
              {calculatorCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    handleSearch(searchQuery);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded transition-colors flex items-center justify-between ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-xs opacity-60">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          <div className="p-2">
            <div className="flex items-center justify-between px-3 py-2 mb-2">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Search Results ({searchResults.length})
              </h4>
              <button
                onClick={() => setShowResults(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-1">
              {searchResults.slice(0, 10).map((calculator) => (
                <div
                  key={calculator.id}
                  className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => {
                    // This would typically open the calculator
                    console.log('Selected calculator:', calculator.title);
                    setShowResults(false);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                        {calculator.title}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {calculator.description}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                          {calculator.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          calculator.complexity === 'Basic' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          calculator.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {calculator.complexity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {searchResults.length > 10 && (
              <div className="px-3 py-2 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 mt-2">
                Showing 10 of {searchResults.length} results
              </div>
            )}
          </div>
        </div>
      )}

      {/* Popular Searches (when focused but no query) */}
      {isExpanded && !searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
          <div className="p-3">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Popular Searches</h4>
            </div>
            <div className="space-y-1">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {(isExpanded || showResults || showFilters) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsExpanded(false);
            setShowResults(false);
            setShowFilters(false);
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;