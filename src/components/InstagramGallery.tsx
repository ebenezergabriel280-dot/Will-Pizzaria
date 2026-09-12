import React from 'react';
import { Instagram, ExternalLink, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/defaultData';

export const InstagramGallery: React.FC = () => {
  const { images, setSelectedGalleryImage } = useApp();

  const galleryItems = [
    {
      url: images.gallery1,
      tag: '#FornoALenha',
      title: 'Forno Tradicional a Lenha',
      desc: 'Chamas e brasas vivas preparando a massa crocante artesanal.',
    },
    {
      url: images.gallery2,
      tag: '#FahitasNamibe',
      title: 'Fahitas Fumegantes na Frigideira',
      desc: 'Pimentos frescos e carnes no ponto com tempero especial.',
    },
    {
      url: images.gallery3,
      tag: '#TakeAway',
      title: 'Embalagens Take-away & Entrega',
      desc: 'Praticidade e sabor quente entregue em qualquer ponto de Namibe.',
    },
    {
      url: images.gallery4,
      tag: '#IngredientesFrescos',
      title: 'Ingredientes Naturais Selecionados',
      desc: 'Tomates maduros, ervas frescas e queijo muçarela de primeira linha.',
    },
  ];

  return (
    <section id="instagram" className="w-full py-20 bg-[#fcf9f4] border-b border-[#e5e2dd]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-[#c84b31] uppercase tracking-wider">
              Redes Oficiais
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight">
              Siga-nos no Instagram
            </h2>
          </div>

          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c84b31] hover:underline font-bold text-sm"
          >
            <Instagram className="w-4 h-4" />
            <span>@{RESTAURANT_INFO.instagram}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedGalleryImage(item.url)}
              className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm border border-[#e5e2dd] bg-[#f0ede9] cursor-pointer"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center text-white">
                <Eye className="w-6 h-6 mb-1 text-[#fdb56e]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {item.tag}
                </span>
                <span className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                  Ver foto em alta
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Button */}
        <div className="text-center pt-2">
          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#f6f3ee] text-[#1c1c19] text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl border border-[#e5e2dd] shadow-sm transition-all"
          >
            <Instagram className="w-4 h-4 text-[#c84b31]" />
            Visitar Perfil @{RESTAURANT_INFO.instagram}
          </a>
        </div>
      </div>
    </section>
  );
};
