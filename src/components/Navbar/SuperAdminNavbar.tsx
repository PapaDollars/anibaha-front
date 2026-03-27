
// components/Navigation/SuperAdminNavbar.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseNavbar from '@/components/Navbar/BaseNavbar';
import { BaseNavbarProps } from '@/types/navigation';

const SuperAdminNavbar: React.FC<BaseNavbarProps> = (props) => {
  const { t } = useTranslation();

  return (
    <BaseNavbar
      {...props}
      showSearch={true}
      showTopBar={false}
    />
  );
};

export default SuperAdminNavbar;