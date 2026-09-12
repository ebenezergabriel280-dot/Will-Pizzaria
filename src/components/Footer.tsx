import React from 'react';
import { Phone, MapPin, Clock, Instagram, MessageCircle, Heart, Image as ImageIcon } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/defaultData';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { images, setIsImageManagerOpen } = useApp();

  return (
    <footer className="w-full bg-[#1c1c19] text-[#e5e2dd] pt-16 pb-28 md:pb-16 border-t border-[#31302d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={images.logo}
                alt="Logo Will Pizzaria"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#c84b31]"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-serif-display text-xl font-bold text-white leading-tight">
                  Will Pizzaria &amp; Fahitas
                </span>
                <span className="text-xs text-[#ffb4a4] font-medium tracking-wider uppercase">
                  Namibe • Angola
                </span>
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Tradição no preparo de pizzas em forno a lenha, fahitas no ponto e momentos especiais na cidade de Namibe.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#c84b31] flex items-center justify-center text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#c84b31] flex items-center justify-center text-white transition-colors"
                title="Telefone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Menu &amp; Pratos
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Serviços Confirmados
                </a>
              </li>
              <li>
                <a href="#pedidos" className="hover:text-white transition-colors">
                  Fazer Pedido (Telefone / WhatsApp)
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-white transition-colors">
                  Horário Oficial &amp; Localização
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-white transition-colors">
                  Avaliações Google Maps (4,2 ★)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contacto &amp; Atendimento
            </h4>
            <div className="space-y-2.5 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#c84b31] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Linha Direta:</strong>
                  {RESTAURANT_INFO.phone}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#c84b31] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Horário:</strong>
                  Diariamente das 08:00 às 22:00
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c84b31] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Plus Code:</strong>
                  {RESTAURANT_INFO.locationPlusCode} • Namibe
                </span>
              </div>
            </div>
          </div>

          {/* Direct HTML Images info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Recursos de Imagens HTML
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              O sistema suporta links diretos para qualquer elemento de imagem no HTML nativo e React.
            </p>
            <button
              onClick={() => setIsImageManagerOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/15 transition-colors cursor-pointer text-left"
            >
              <ImageIcon className="w-4 h-4 text-[#ffb4a4]" />
              <span>Gerenciar Links de Imagens</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 text-center sm:text-left">
          <span>
            © {new Date().getFullYear()} Will Pizzaria e Fahitas. Todos os direitos reservados. Namibe, Angola.
          </span>
          <span className="flex items-center gap-1">
            Feito com dedicação ao forno tradicional <Heart className="w-3 h-3 text-[#c84b31] fill-current" />
          </span>
        </div>
      </div>
    </footer>
  );
};
