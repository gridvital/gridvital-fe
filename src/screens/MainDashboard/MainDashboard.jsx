import React from 'react';
import useDeviceCheck from '../../utils/useDeviceCheck';
import DesktopDashboard from './DesktopDashboard/DesktopDashboard';
import MobileDashboard from './MobileDashboard/MobileDashboard';

const MainDashboard = () => {
  const { isDesktopUtils } = useDeviceCheck();

  return isDesktopUtils ? <DesktopDashboard /> : <MobileDashboard />;
};

export default MainDashboard;
