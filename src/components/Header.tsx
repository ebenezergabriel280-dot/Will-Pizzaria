import React, { useState } from 'react';
import { Phone, ShoppingBag, Menu, X, Image as ImageIcon, CalendarCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/defaultData';

export const Header: React.FC = () => {
  const { images, totalItems, setIsCartOpen, setIsImageManagerOpen, setIsReservationOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Menu', href: '#menu' },
    { label: 'Serviços', href: '#sobre' },
    { label: 'Pedidos', href: '#pedidos' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Avaliações', href: '#avaliacoes' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#fcf9f4]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(36,26,23,0.06)] border-b border-[#e0bfb9]/40">
      {/* Top Bar for Desktop */}
      <div className="hidden lg:block bg-[#f0ede9] text-[#58413c] text-xs font-semibold py-1.5 px-6 border-b border-[#e5e2dd]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#885213] animate-pulse"></span>
            <span>Namibe, Angola • Aberto diariamente: 08:00–22:00</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsImageManagerOpen(true)}
              className="text-[#a6331b] hover:underline flex items-center gap-1.5 cursor-pointer font-medium"
              title="Gerenciar links diretos para as imagens do HTML"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Links de Imagens HTML</span>
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="text-[#58413c] hover:text-[#a6331b] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Telefone: {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <img
            src={images.logo}
            alt="Logo Will Pizzaria e Fahitas"
            className="w-11 h-11 rounded-full object-cover shadow-[0_2px_8px_rgba(36,26,23,0.12)] ring-2 ring-[#c84b31]/20 group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-serif-display text-xl sm:text-2xl font-bold text-[#1c1c19] tracking-tight leading-none">
              Will Pizzaria & Fahitas
            </span>
            <span className="text-[11px] font-bold text-[#a6331b] tracking-wider uppercase mt-0.5">
              Namibe • Forno a Lenha
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-sm font-semibold text-[#58413c] hover:text-[#1c1c19] hover:bg-white/80 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Reservation Button */}
          <button
            onClick={() => setIsReservationOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19] transition-colors"
            title="Reservar Mesa"
          >
            <CalendarCheck className="w-4 h-4 text-[#885213]" />
            <span>Reservar</span>
          </button>

          {/* Image Link Manager CTA */}
          <button
            onClick={() => setIsImageManagerOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#f0ede9] hover:bg-[#ffdad3] text-[#a6331b] transition-colors border border-[#e0bfb9]/60"
            title="Adicionar ou editar links diretos das imagens HTML"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Links Imagens</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-lg bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19] transition-colors cursor-pointer"
            aria-label="Carrinho de Pedidos"
          >
            <ShoppingBag className="w-5 h-5 text-[#a6331b]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#c84b31] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                {totalItems}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <a
            href="#pedidos"
            className="hidden md:inline-flex items-center justify-center bg-[#c84b31] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-[0_4px_16px_rgba(200,75,49,0.25)] hover:bg-[#a6331b] active:scale-95 transition-all"
          >
            Fazer Pedido
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1c1c19] hover:bg-[#f0ede9]"
            aria-label="Menu de Navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fcf9f4] border-b border-[#e5e2dd] px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-medium text-[#1c1c19] hover:bg-[#f0ede9]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#e5e2dd] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-semibold text-[#885213] bg-[#f0ede9] flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              Reservar Mesa
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsImageManagerOpen(true);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-semibold text-[#a6331b] bg-[#ffdad3]/40 flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Editar Links Diretos de Imagens
            </button>
            <a
              href="#pedidos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg font-semibold bg-[#c84b31] text-white shadow"
            >
              Fazer Pedido Agora
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
