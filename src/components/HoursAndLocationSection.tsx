import React from 'react';
import { Clock, MapPin, Navigation, CheckCircle2, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/defaultData';
import { useApp } from '../context/AppContext';

export const HoursAndLocationSection: React.FC = () => {
  const { images } = useApp();

  const daysOfWeek = [
    { day: 'Segunda-feira', hours: '08:00 – 22:00' },
    { day: 'Terça-feira', hours: '08:00 – 22:00' },
    { day: 'Quarta-feira', hours: '08:00 – 22:00' },
    { day: 'Quinta-feira', hours: '08:00 – 22:00' },
    { day: 'Sexta-feira', hours: '08:00 – 22:00' },
    { day: 'Sábado', hours: '08:00 – 22:00' },
    { day: 'Domingo', hours: '08:00 – 22:00' },
  ];

  // Current day index (0 is Sunday in JS, let's map to Portuguese days)
  const currentDayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday
  const dayHighlightIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  return (
    <section id="localizacao" className="w-full py-20 bg-[#fcf9f4] border-b border-[#e5e2dd]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Detailed Schedule Table */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[#c84b31] uppercase tracking-wider">
                Disponibilidade
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight">
                Horário Oficial
              </h2>
              <p className="text-sm text-[#58413c] leading-relaxed">
                Estamos operacionais 7 dias por semana, servindo pequeno-almoço, almoço e jantar contínuo no forno a lenha.
              </p>
            </div>

            {/* Schedule List */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-[#e5e2dd] flex flex-col gap-2">
              {daysOfWeek.map((item, index) => {
                const isToday = index === dayHighlightIndex;
                return (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm transition-colors ${
                      isToday
                        ? 'bg-[#ffdad3]/30 border border-[#c84b31]/30 font-semibold'
                        : index % 2 === 0
                        ? 'bg-[#f6f3ee]'
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#1c1c19]">{item.day}</span>
                      {isToday && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#c84b31] text-white">
                          Hoje
                        </span>
                      )}
                    </div>
                    <span className="text-[#c84b31] font-bold">{item.hours}</span>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-[#f0ede9] text-[#58413c] text-xs flex items-center gap-2 border border-[#e5e2dd]">
              <CheckCircle2 className="w-4 h-4 text-[#c84b31] shrink-0" />
              <span>Atendimento telefónico, take-away e presencial ininterrupto dentro do horário comercial.</span>
            </div>
          </div>

          {/* Location Block with Map and Plus Code */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[#c84b31] uppercase tracking-wider">
                Onde nos Encontrar
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight">
                Localização no Namibe
              </h2>
              <p className="text-sm text-[#58413c] leading-relaxed">
                Fácil acesso na cidade de Namibe, com referências para navegação GPS e recolha pontual de pedidos.
              </p>
            </div>

            {/* Plus Code and Address Card */}
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#e5e2dd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f0ede9] flex items-center justify-center text-[#c84b31] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#885213] uppercase tracking-wider">
                    Plus Code Google Maps
                  </span>
                  <span className="font-bold text-lg text-[#1c1c19]">
                    {RESTAURANT_INFO.locationPlusCode}
                  </span>
                  <span className="text-xs text-[#58413c]">
                    Namibe, Angola (próximo à zona central e orla marítima)
                  </span>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  RESTAURANT_INFO.locationPlusCode + ' ' + RESTAURANT_INFO.city
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#c84b31] hover:bg-[#a6331b] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-sm transition-all"
              >
                <Navigation className="w-4 h-4" />
                Abrir no Google Maps
              </a>
            </div>

            {/* Embedded Interactive Map */}
            <div className="w-full h-80 rounded-2xl shadow-sm border border-[#e5e2dd] overflow-hidden relative bg-[#e5e2dd]">
              <iframe
                title="Mapa de Namibe - Will Pizzaria e Fahitas"
                src="https://maps.google.com/maps?q=-15.196,12.152&z=15&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#e5e2dd] text-[11px] text-[#1c1c19] font-medium shadow-sm flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c84b31]" />
                <span>Namibe • Coordenadas: -15.196, 12.152</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
