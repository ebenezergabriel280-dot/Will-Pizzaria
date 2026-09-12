import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { MenuSection } from './components/MenuSection';
import { OrderSection } from './components/OrderSection';
import { HoursAndLocationSection } from './components/HoursAndLocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramGallery } from './components/InstagramGallery';
import { AdminStructureSection } from './components/AdminStructureSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { ImageManagerModal } from './components/ImageManagerModal';
import { GalleryLightboxModal } from './components/GalleryLightboxModal';
import { BottomNavMobile } from './components/BottomNavMobile';

export function AppContent() {
  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans selection:bg-[#ffdad3] selection:text-[#3e0400]">
      {/* Top Header */}
      <Header />

      {/* Main Page Flow matching user design */}
      <main className="flex-1 flex flex-col w-full">
        {/* Hero Section */}
        <Hero />

        {/* Confirmed Services Section */}
        <ServicesSection />

        {/* Menu & Dishes with Direct Images */}
        <MenuSection />

        {/* Order Channel Section (Terracotta Hero Callout) */}
        <OrderSection />

        {/* Schedule & Interactive Location */}
        <HoursAndLocationSection />

        {/* Confirmed Reviews from Google */}
        <ReviewsSection />

        {/* Instagram Gallery */}
        <InstagramGallery />

        {/* Admin and Extensibility Structure Section */}
        <AdminStructureSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <CartDrawer />
      <ReservationModal />
      <ImageManagerModal />
      <GalleryLightboxModal />
      <BottomNavMobile />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
