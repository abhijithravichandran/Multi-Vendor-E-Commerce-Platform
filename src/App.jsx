import React from 'react';
import { StoreProvider, useStore } from './store/store';
import { LandingPage } from './features/landing/LandingPage';
import { CustomerPortal } from './features/customer/CustomerPortal';
import { SellerDashboard } from './features/seller/SellerDashboard';
import { DeliveryApp } from './features/delivery/DeliveryApp';
import { AdminConsole } from './features/admin/AdminConsole';

const MainRouter = () => {
  const { isLoggedIn, currentRole, highContrast } = useStore();

  if (!isLoggedIn) {
    return <LandingPage />;
  }

  return (
    <div className={`min-h-screen bg-slate-900 text-slate-100 font-serif ${highContrast ? 'high-contrast' : ''}`}>
      {currentRole === 'customer' && <CustomerPortal />}
      {currentRole === 'seller' && <SellerDashboard />}
      {currentRole === 'delivery' && <DeliveryApp />}
      {currentRole === 'admin' && <AdminConsole />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
