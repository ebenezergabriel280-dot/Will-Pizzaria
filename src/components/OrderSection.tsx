import React from 'react';
import { Phone, MessageCircle, Clock, MapPin, CheckCircle2, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/defaultData';
import { useApp } from '../context/AppContext';

export const OrderSection: React.FC = () => {
  const { setIsCartOpen, totalItems } = useApp();

  const handleWhatsAppQuick = () => {
    const message = encodeURIComponent(
      `Olá Will Pizzaria e Fahitas! Gostaria de consultar os pratos disponíveis no forno e fazer um pedido no Namibe.`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${message}`, '_blank');
  };

  return (
    <section id="pedidos" className="w-full py-20 bg-[#c84b31] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Direct Call & Action */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ffdad3]">
            Canal Oficial de Atendimento
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
            Encomende a Sua Refeição
          </h2>
          <p className="text-base text-white/90 max-w-xl leading-relaxed">
            Os pedidos para entrega (delivery) e comida para levar (take-away) são recepcionados via linha telefónica direta e WhatsApp. Fale diretamente com a equipa para consultar o forno e o tempo de preparo.
          </p>

          <div className="flex flex-col gap-2.5 pt-1">
            <div className="flex items-center gap-2.5 text-white/95 text-sm font-medium">
              <Clock className="w-4 h-4 text-[#ffdad3]" />
              <span>Atendimento Diário: {RESTAURANT_INFO.hoursDisplay}</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/95 text-sm font-medium">
              <MapPin className="w-4 h-4 text-[#ffdad3]" />
              <span>Entregas e Levantamento no Namibe, Angola</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="inline-flex items-center gap-3 bg-white text-[#c84b31] hover:bg-[#f6f3ee] text-base font-bold px-6 py-4 rounded-xl shadow-xl transition-all active:scale-95"
            >
              <Phone className="w-5 h-5 text-[#c84b31]" />
              <span>Ligar Agora ({RESTAURANT_INFO.phone})</span>
            </a>

            <button
              onClick={handleWhatsAppQuick}
              className="inline-flex items-center gap-2.5 bg-[#1c1c19] hover:bg-[#31302d] text-white text-sm font-semibold px-5 py-4 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Canal WhatsApp</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 bg-[#a6331b] hover:bg-[#891e07] text-white text-sm font-semibold px-5 py-4 rounded-xl shadow border border-white/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Carrinho {totalItems > 0 ? `(${totalItems})` : ''}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Steps Card */}
        <div className="lg:col-span-5 bg-white text-[#1c1c19] p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 flex flex-col gap-5">
          <h3 className="font-serif-display text-2xl font-bold text-[#1c1c19]">
            Como Fazer o Seu Pedido
          </h3>

          <ol className="flex flex-col gap-4 text-sm text-[#58413c]">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-[#c84b31] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </span>
              <span>
                Ligue para <strong>{RESTAURANT_INFO.phone}</strong> ou monte seu carrinho para enviar mensagem formatada via WhatsApp.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-[#c84b31] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </span>
              <span>
                Indique a modalidade desejada: <strong>Consumo no local</strong>, <strong>Take-away</strong> ou <strong>Delivery no Namibe</strong>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-[#c84b31] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </span>
              <span>
                Efetue o pagamento com comodidade no local (aceitamos <strong>Cartão / Multicaixa</strong> e numerário) ou na entrega.
              </span>
            </li>
          </ol>

          <div className="p-3 rounded-xl bg-[#f6f3ee] text-[#885213] text-xs font-semibold text-center flex items-center justify-center gap-1.5 border border-[#e5e2dd]">
            <CheckCircle2 className="w-4 h-4 text-[#c84b31]" />
            <span>Atendimento transparente, direto e sem taxas intermediárias.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
