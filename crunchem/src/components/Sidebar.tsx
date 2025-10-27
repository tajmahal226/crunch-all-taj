import React from 'react';
import { Calculator, X, Star, Folder, ChevronRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { calculatorCategories, getCalculatorsByCategory } from '../data/allCalculators';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed, favorites, isFavorite, setSelectedCalculator } = useApp();
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  const [showFavorites, setShowFavorites] = React.useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleCalculatorSelect = (calculator: any) => {
    setSelectedCalculator(calculator);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        sidebarCollapsed ? 'w-16 lg:w-16' : 'w-80'
      } ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <Calculator className="h-6 w-6 text-blue-600" />
            {!sidebarCollapsed && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h2>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className={`${sidebarCollapsed ? 'p-2 space-y-2' : 'p-4 space-y-2'}`}>
            {/* Favorites Section */}
            <div className="mb-4">
              {sidebarCollapsed ? (
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => setShowFavorites(!showFavorites)}
                    className="p-3 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors w-full flex items-center justify-center"
                    title={`${favorites.length} favorites`}
                  >
                    <Star className="h-6 w-6" />
                  </button>
                  <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                    {favorites.length}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="w-full flex items-center justify-between p-3 text-left bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Favorites</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({favorites.length})</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${
                    showFavorites ? 'rotate-90' : ''
                  }`} />
                </button>
              )}
              
              {showFavorites && !sidebarCollapsed && favorites.length > 0 && (
                <div className="mt-2 space-y-1">
                  {favorites.slice(0, 5).map((calcId) => {
                    // In a real app, you'd get the calculator by ID
                    return (
                      <div key={calcId} className="pl-8 py-2 text-sm text-gray-600 dark:text-gray-300">
                        Favorited Calculator
                      </div>
                    );
                  })}
                  {favorites.length > 5 && (
                    <div className="pl-8 py-1 text-xs text-gray-500 dark:text-gray-400">
                      +{favorites.length - 5} more favorites
                    </div>
                  )}
                </div>
              )}
              
              {showFavorites && !sidebarCollapsed && favorites.length === 0 && (
                <div className="mt-2 pl-8 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No favorites yet. Click the star icon on any calculator to add it here.
                </div>
              )}
            </div>

            {/* Calculator Categories */}
            <div className="space-y-2">
              {calculatorCategories.map((category) => {
                const isExpanded = expandedCategory === category.id;
                const categoryCalculators = getCalculatorsByCategory(category.id);
                
                return (
                  <div key={category.id}>
                    {sidebarCollapsed ? (
                      <div className="flex flex-col items-center space-y-2">
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className={`p-3 rounded-lg transition-colors w-full flex items-center justify-center group hover:bg-gray-50 dark:hover:bg-gray-700`}
                          title={`${category.name} (${category.count} calculators)`}
                        >
                          <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                            <Folder className="h-5 w-5 text-white" />
                          </div>
                        </button>
                        <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          {category.count}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                            <Folder className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {category.count} calculators
                            </p>
                          </div>
                        </div>
                        <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`} />
                      </button>
                    )}
                    
                    {isExpanded && !sidebarCollapsed && (
                      <div className="mt-2 ml-4 space-y-1 max-h-60 overflow-y-auto">
                        {categoryCalculators.slice(0, 10).map((calculator) => ( // Show first 10
                          <button
                            key={calculator.id}
                            onClick={() => handleCalculatorSelect(calculator)}
                            className="w-full flex items-center justify-between p-2 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors group"
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <Calculator className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                                  {calculator.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {calculator.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Toggle favorite functionality would go here
                                }}
                                className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                                  isFavorite(calculator.id) 
                                    ? 'text-yellow-500' 
                                    : 'text-gray-400 hover:text-yellow-500'
                                }`}
                              >
                                <Star className="h-3 w-3" />
                              </button>
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                calculator.complexity === 'Basic' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                calculator.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              }`}>
                                {calculator.complexity?.charAt(0) || 'I'}
                              </span>
                            </div>
                          </button>
                        ))}
                        {categoryCalculators.length > 10 && (
                          <div className="p-2 text-center text-xs text-gray-500 dark:text-gray-400">
                            +{categoryCalculators.length - 10} more calculators
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                200+ Calculators Available
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Math & Student Tools Website
              </p>
            </div>
          </div>
        )}
        
        {sidebarCollapsed && (
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center space-y-1">
              <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
                200+
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
                tools
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;