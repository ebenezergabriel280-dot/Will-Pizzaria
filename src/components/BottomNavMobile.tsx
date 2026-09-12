import React from 'react';
import { Phone, MessageCircle, UtensilsCrossed, ShoppingBag, CalendarCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/defaultData';

export const BottomNavMobile: React.FC = () => {
  const { totalItems, setIsCartOpen, setIsReservationOpen } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fcf9f4]/95 backdrop-blur-md border-t border-[#e5e2dd] px-2 py-2 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      {/* Call */}
      <a
        href={`tel:${RESTAURANT_INFO.phoneRaw}`}
        className="flex flex-col items-center gap-0.5 text-[#58413c] hover:text-[#c84b31] p-1"
      >
        <Phone className="w-5 h-5 text-[#c84b31]" />
        <span className="text-[10px] font-bold">Ligar</span>
      </a>

      {/* Menu */}
      <a
        href="#menu"
        className="flex flex-col items-center gap-0.5 text-[#58413c] hover:text-[#c84b31] p-1"
      >
        <UtensilsCrossed className="w-5 h-5" />
        <span className="text-[10px] font-bold">Menu</span>
      </a>

      {/* WhatsApp center button */}
      <a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center -mt-5 w-12 h-12 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 hover:bg-emerald-700 active:scale-95 transition-all"
        title="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Reservar */}
      <button
        onClick={() => setIsReservationOpen(true)}
        className="flex flex-col items-center gap-0.5 text-[#58413c] hover:text-[#c84b31] p-1"
      >
        <CalendarCheck className="w-5 h-5 text-[#885213]" />
        <span className="text-[10px] font-bold">Reserva</span>
      </button>

      {/* Carrinho */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-0.5 text-[#58413c] hover:text-[#c84b31] p-1"
      >
        <ShoppingBag className="w-5 h-5 text-[#c84b31]" />
        <span className="text-[10px] font-bold">Pedido</span>
        {totalItems > 0 && (
          <span className="absolute -top-1 right-1 bg-[#c84b31] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
};
