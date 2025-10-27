import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Calculator as CalculatorType } from '../types/calculator';

interface AppContextType {
  // Search functionality
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Favorites system
  favorites: string[];
  toggleFavorite: (calculatorId: string) => void;
  isFavorite: (calculatorId: string) => boolean;
  
  // Dark mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Sidebar state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Sidebar collapsed state for desktop
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Selected calculator
  selectedCalculator: CalculatorType | null;
  setSelectedCalculator: (calculator: CalculatorType | null) => void;
  

  
  // Category filtering
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Favorites state (persisted in localStorage)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('numera-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  // Dark mode state (persisted in localStorage)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('numera-dark-mode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Sidebar collapsed state (persisted in localStorage)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('numera-sidebar-collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  
  // Selected calculator state
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType | null>(null);
  

  
  // Category filtering state
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('numera-favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Persist dark mode to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('numera-dark-mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Persist sidebar collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('numera-sidebar-collapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);
  
  // Favorites functions
  const toggleFavorite = (calculatorId: string) => {
    setFavorites(prev => 
      prev.includes(calculatorId) 
        ? prev.filter(id => id !== calculatorId)
        : [...prev, calculatorId]
    );
  };
  
  const isFavorite = (calculatorId: string) => {
    return favorites.includes(calculatorId);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const value: AppContextType = {
    searchQuery,
    setSearchQuery,
    favorites,
    toggleFavorite,
    isFavorite,
    isDarkMode,
    toggleDarkMode,
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    selectedCalculator,
    setSelectedCalculator,

    selectedCategory,
    setSelectedCategory
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}