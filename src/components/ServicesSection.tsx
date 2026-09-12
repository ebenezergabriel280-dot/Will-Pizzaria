import React from 'react';
import { Utensils, ShoppingBag, Bike, CalendarDays, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/defaultData';
import { useApp } from '../context/AppContext';

export const ServicesSection: React.FC = () => {
  const { setOrderType, setIsCartOpen, setIsReservationOpen } = useApp();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'table_restaurant':
        return <Utensils className="w-6 h-6 text-[#c84b31]" />;
      case 'takeout_dining':
        return <ShoppingBag className="w-6 h-6 text-[#c84b31]" />;
      case 'moped':
        return <Bike className="w-6 h-6 text-[#c84b31]" />;
      case 'event_seat':
        return <CalendarDays className="w-6 h-6 text-[#c84b31]" />;
      case 'credit_card':
      default:
        return <CreditCard className="w-6 h-6 text-[#c84b31]" />;
    }
  };

  const handleServiceClick = (id: string) => {
    if (id === 'reserva') {
      setIsReservationOpen(true);
    } else if (id === 'delivery') {
      setOrderType('delivery');
      setIsCartOpen(true);
    } else if (id === 'take-away') {
      setOrderType('takeaway');
      setIsCartOpen(true);
    } else if (id === 'consumo-local') {
      setOrderType('consumo');
      setIsCartOpen(true);
    }
  };

  return (
    <section id="sobre" className="w-full py-20 bg-[#fcf9f4] border-b border-[#e5e2dd]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-[#c84b31] uppercase tracking-wider">
              Tradição &amp; Atendimento no Namibe
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight">
              Serviços Confirmados
            </h2>
          </div>
          <p className="text-sm text-[#58413c] max-w-md leading-relaxed">
            A 'Will Pizzaria e Fahitas' oferece comodidade integral para o cliente através de modalidades presenciais, takeaway e entregas no centro urbano e orla do Namibe.
          </p>
        </div>

        {/* 5 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={`p-6 rounded-2xl bg-white shadow-sm border border-[#e5e2dd] hover:border-[#c84b31]/40 hover:shadow-md transition-all group flex flex-col justify-between gap-4 cursor-pointer ${
                service.isWide ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f0ede9] flex items-center justify-center group-hover:bg-[#ffdad3]/50 transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#f6f3ee] text-[#885213] border border-[#e5e2dd]">
                    {service.tag}
                  </span>
                </div>

                <span className="text-xs font-bold text-[#885213] uppercase tracking-wider block mb-1">
                  {service.subtitle}
                </span>
                <h3 className="font-serif-display text-xl font-bold text-[#1c1c19] mb-2 group-hover:text-[#c84b31] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[#58413c] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#c84b31] group-hover:translate-x-1 transition-transform">
                <span>{service.id === 'reserva' ? 'Fazer Reserva Online' : 'Selecionar Modalidade'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Verification Note */}
        <div className="p-4 rounded-xl bg-[#f0ede9] text-[#58413c] text-xs sm:text-sm flex items-center gap-3 border border-[#e5e2dd]">
          <ShieldCheck className="w-5 h-5 text-[#c84b31] shrink-0" />
          <span>
            <strong>Informações de serviços confirmadas oficialmente.</strong> Pagamentos aceites por Multicaixa / Cartão e numerário.
          </span>
        </div>
      </div>
    </section>
  );
};
