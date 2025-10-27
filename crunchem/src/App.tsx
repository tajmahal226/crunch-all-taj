import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { useApp } from './contexts/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CalculatorGrid from './components/CalculatorGrid';


function MainContent() {
  const { setSelectedCategory, sidebarCollapsed } = useApp();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 safe-area-top">
      {/* Skip Link for Accessibility */}
      <a 
        href="#calculators" 
        className="skip-link"
        onFocus={(e) => e.target.style.top = '6px'}
        onBlur={(e) => e.target.style.top = '-40px'}
      >
        Skip to calculators
      </a>
      {/* Header */}
      <Header />
      
      {/* Main Layout */}
      <div className="flex relative">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className={`flex-1 min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'
        }`}>
          {/* Hero Section */}
          <div className="bg-gray-50 dark:bg-gray-800 py-12 md:py-20 lg:py-32 pb-20 md:pb-20 hero-section">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-6xl font-light text-gray-900 dark:text-white mb-6 tracking-tight">
                crush every calculation
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                144+ tools across 16 categories from calculus to cooking to daily life
              </p>
              
              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto mb-12 md:mb-16">
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">144+</div>
                  <div className="text-gray-600 dark:text-gray-300">calculators</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">16</div>
                  <div className="text-gray-600 dark:text-gray-300">categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">Mobile</div>
                  <div className="text-gray-600 dark:text-gray-300">optimized</div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="flex items-center justify-center mb-8 md:mb-0">
                <button 
                  onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-lg font-medium text-lg transition-colors touch-friendly"
                >
                  explore calculators
                </button>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-light text-gray-900 dark:text-white mb-6">
                  everything you need
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  from basic arithmetic to advanced calculus, clean design meets powerful functionality.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {/* Feature 1 */}
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Advanced Calculations</h3>
                  <p className="text-gray-600 dark:text-gray-300">Instant results with step-by-step explanations for complex mathematical operations.</p>
                </div>
                
                {/* Feature 2 */}
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mobile Optimized</h3>
                  <p className="text-gray-600 dark:text-gray-300">Designed specifically for iPhone and mobile devices with touch-friendly interfaces.</p>
                </div>
                
                {/* Feature 3 */}
                <div className="text-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Personalized Experience</h3>
                  <p className="text-gray-600 dark:text-gray-300">Save favorites, track history, and customize your learning experience.</p>
                </div>
                
                {/* Feature 4 */}
                <div className="text-center">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                  <p className="text-gray-600 dark:text-gray-300">Optimized algorithms deliver instant results with precision and reliability.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Categories Preview */}
          <div className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-light text-gray-900 dark:text-white mb-6">
                  16 categories available
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  comprehensive coverage from basic arithmetic to advanced calculations to daily life helpers.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 responsive-grid">
                {[
                  { name: 'Daily Life', count: 24, icon: '🏠' },
                  { name: 'Finance', count: 80, icon: '💰' },
                  { name: 'Health/Fitness', count: 4, icon: '🏃' },
                  { name: 'Cooking', count: 8, icon: '👨‍🍳' },
                  { name: 'Sports', count: 8, icon: '⚽' },
                  { name: 'Conversion', count: 8, icon: '🔄' },
                  { name: 'Mathematics', count: 37, icon: '📐' },
                  { name: 'Physics', count: 53, icon: '⚛️' },
                  { name: 'Chemistry', count: 71, icon: '🧪' },
                  { name: 'Engineering', count: 5, icon: '⚙️' },
                  { name: 'Algebra', count: 15, icon: '📊' },
                  { name: 'Geometry', count: 74, icon: '📏' },
                  { name: 'Trigonometry', count: 57, icon: '📐' },
                  { name: 'Calculus', count: 68, icon: '∫' },
                  { name: 'Statistics', count: 52, icon: '📈' },
                  { name: 'Computer Science', count: 4, icon: '💻' }
                ].map((category) => (
                  <div 
                    key={category.name} 
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 md:p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer touch-feedback calculator-card"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {category.count} tools
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
            
            {/* Calculator Grid Section */}
            <div id="calculators" className="bg-white dark:bg-gray-900">
              <CalculatorGrid />
            </div>
            
            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-black text-white py-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-3 mb-8">
                    <h3 className="text-2xl font-light">gotta crunch them all</h3>
                  </div>
                  <div className="text-center mb-8">
                    <p className="text-gray-400 text-lg mb-6">
                      144+ tools across 16 categories
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                      <span>mathematics</span>
                      <span>•</span>
                      <span>physics</span>
                      <span>•</span>
                      <span>chemistry</span>
                      <span>•</span>
                      <span>engineering</span>
                      <span>•</span>
                      <span>finance</span>
                      <span>•</span>
                      <span>sports</span>
                      <span>•</span>
                      <span>daily life</span>
                      <span>•</span>
                      <span>mobile optimized</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-800 pt-8">
                    <p className="text-gray-400 text-sm text-center">
                      © 2025 gotta crunch them all. simple calculations, clean design.
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </div>
        

      </div>
    );
}

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;