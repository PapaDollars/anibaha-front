
import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseNavbar from '@/components/Navbar/BaseNavbar';
import { BaseNavbarProps } from '@/types/navigation';

const CompanyNavbar: React.FC<BaseNavbarProps> = (props) => {
  const { t } = useTranslation();

  return (
    <BaseNavbar
      {...props}
      showSearch={false}
      showTopBar={false}
    />
  );
};

export default CompanyNavbar;