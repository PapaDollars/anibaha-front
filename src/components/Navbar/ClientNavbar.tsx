// components/Navigation/ClientNavbar.tsx
import React from 'react';
import BaseNavbar from '@/components/Navbar/BaseNavbar';
import { BaseNavbarProps } from '@/types/navigation';

const ClientNavbar: React.FC<BaseNavbarProps> = (props) => {
  return (
    <BaseNavbar
      {...props}
      showSearch={true}
      showTopBar={true}
      logoText="ANIBAHA"
      logoSubtext="Marketplace"
    />
  );
};

export default ClientNavbar;