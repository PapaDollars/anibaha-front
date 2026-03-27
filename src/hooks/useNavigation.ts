
// hooks/useNavigation.ts
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  const navigateAndClose = useCallback((path: string) => {
    navigate(path);
    closeMenu();
  }, [navigate, closeMenu]);

  return {
    isMenuOpen,
    isSidebarCollapsed,
    toggleMenu,
    closeMenu,
    toggleSidebar,
    navigateAndClose
  };
};