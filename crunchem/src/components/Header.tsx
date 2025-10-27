import React from 'react';
import { Calculator, Menu, Moon, Sun, Star, Keyboard, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import SearchBar from './SearchBar';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    sidebarOpen, 
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    favorites 
  } = useApp();
  
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'd':
            e.preventDefault();
            toggleDarkMode();
            break;
          case '/':
            e.preventDefault();
            setSidebarOpen(!sidebarOpen);
            break;
          case 'c':
            e.preventDefault();
            setSidebarCollapsed(!sidebarCollapsed);
            break;

        }
      }
      
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed, toggleDarkMode]);

  const keyboardShortcuts = [
    { key: 'Ctrl+K', description: 'Focus search bar' },
    { key: 'Ctrl+D', description: 'Toggle dark mode' },
    { key: 'Ctrl+/', description: 'Toggle sidebar' },
    { key: 'Ctrl+C', description: 'Collapse sidebar' },
    { key: 'Esc', description: 'Close overlays' }
  ];

  return (
    <header className={`sticky top-0 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 safe-area-top ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Toggle Sidebar (Ctrl+/)"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Sidebar Collapse Button - Hidden on Mobile */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-w-[44px] min-h-[44px] items-center justify-center"
              title={`${sidebarCollapsed ? 'Expand' : 'Collapse'} Sidebar (Ctrl+C)`}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-6 w-6" />
              ) : (
                <ChevronLeft className="h-6 w-6" />
              )}
            </button>
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  gotta crunch them all
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                  crush every calculation
                </p>
              </div>
            </div>
          </div>

          {/* Center Section - Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Mobile Search Button */}
            <button className="md:hidden p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
              <Search className="h-6 w-6" />
            </button>
            
            {/* Favorites Counter */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                {favorites.length}
              </span>
            </div>



            {/* Keyboard Shortcuts - Hidden on Mobile */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                className="p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Keyboard Shortcuts"
              >
                <Keyboard className="h-6 w-6" />
              </button>
              
              {showKeyboardShortcuts && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Keyboard Shortcuts</h3>
                    <div className="space-y-2">
                      {keyboardShortcuts.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {shortcut.description}
                          </span>
                          <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded border">
                            {shortcut.key}
                          </kbd>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode (Ctrl+D)`}
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
      
      {/* Click outside to close keyboard shortcuts */}
      {showKeyboardShortcuts && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowKeyboardShortcuts(false)}
        />
      )}
    </header>
  );
};

export default Header;