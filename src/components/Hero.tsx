import React from 'react';
import { Phone, UtensilsCrossed, Navigation, Star, CalendarCheck, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/defaultData';

export const Hero: React.FC = () => {
  const { images, setIsReservationOpen, setIsImageManagerOpen } = useApp();

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center bg-[#e5e2dd] overflow-hidden pt-20"
    >
      {/* Background Image with Artisan Terracotta & Charcoal Scrim */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url('${images.heroBg}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c19]/95 via-[#1c1c19]/85 to-[#1c1c19]/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19] via-transparent to-transparent opacity-90"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-start gap-5 text-[#f3f0eb]">
        {/* Status and Location Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c84b31] text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Namibe, Angola • Pizzaria &amp; Restaurante
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium border border-white/10 shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-[#fdb56e] animate-pulse"></span>
            Aberto diariamente: {RESTAURANT_INFO.hoursDisplay}
          </span>
        </div>

        {/* Display Title */}
        <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white max-w-3xl tracking-tight leading-[1.08] drop-shadow-md">
          Will Pizzaria e Fahitas
        </h1>

        {/* Factual Subtitle */}
        <p className="text-base sm:text-lg text-white/90 max-w-2xl font-normal leading-relaxed drop-shadow-sm">
          Pizzaria e restaurante em Namibe com serviço presencial, take-away, entregas e reservas.
          Sabor preparado no forno tradicional a lenha para os seus melhores momentos.
        </p>

        {/* Google Reviews Badge */}
        <div className="flex items-center gap-3 py-2 px-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-sm">
          <div className="flex items-center text-[#fdb56e]">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <Star className="w-4 h-4 fill-current opacity-60" />
          </div>
          <span className="text-base font-bold text-white leading-none">
            {RESTAURANT_INFO.googleRating.toString().replace('.', ',')}
          </span>
          <span className="text-xs text-white/80">
            no Google ({RESTAURANT_INFO.reviewsCount} avaliações confirmadas)
          </span>
        </div>

        {/* Action Group */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#pedidos"
            className="inline-flex items-center gap-2 bg-[#c84b31] hover:bg-[#a6331b] text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <Phone className="w-4 h-4" />
            Fazer Pedido
          </a>

          <a
            href="#menu"
            className="inline-flex items-center gap-2 bg-white text-[#1c1c19] hover:bg-[#f6f3ee] font-semibold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#c84b31]" />
            Ver Menu Completo
          </a>

          <button
            onClick={() => setIsReservationOpen(true)}
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md font-semibold text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-[#fdb56e]" />
            Reservar Mesa
          </button>

          <a
            href="#localizacao"
            className="inline-flex items-center gap-2 bg-black/30 hover:bg-black/40 text-white/90 font-medium text-sm px-4 py-3.5 rounded-xl transition-all"
          >
            <Navigation className="w-4 h-4" />
            Como Chegar
          </a>
        </div>

        {/* Direct Link Attribution Tag */}
        <div className="pt-2 flex items-center gap-2 text-xs text-white/60">
          <Sparkles className="w-3.5 h-3.5 text-[#fdb56e]" />
          <span>Links diretos para imagens ativos no HTML</span>
          <button
            onClick={() => setIsImageManagerOpen(true)}
            className="underline text-[#ffb4a4] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <ImageIcon className="w-3 h-3" />
            Personalizar Links
          </button>
        </div>
      </div>
    </section>
  );
};
