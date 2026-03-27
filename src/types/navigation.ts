import { User } from "@/types/user";

export interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: any;
  badge?: number;
  submenu?: NavItem[];
}

export interface BaseNavbarProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onSearch?: (query: string) => void;
  onVoiceSearch?: () => void;
  onImageSearch?: () => void;
  cartItems?: number;
  notifications?: number;
  customNavItems?: NavItem[];
  showSearch?: boolean;
  showTopBar?: boolean;
  logoText?: string;
  logoSubtext?: string;
}