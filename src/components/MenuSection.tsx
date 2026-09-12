import React, { useState } from 'react';
import { Phone, Plus, Flame, Sparkles, Check, Info, Instagram, SlidersHorizontal } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/defaultData';
import { MenuItem } from '../types';
import { useApp } from '../context/AppContext';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const { addToCart, setIsCartOpen } = useApp();

  const categories = [
    { id: 'todos', label: 'Todos os Pratos' },
    { id: 'pizzas', label: 'Pizzas' },
    { id: 'fahitas', label: 'Fahitas & Especiais' },
    { id: 'bebidas', label: 'Bebidas & Acompanhamentos' },
    { id: 'sobremesas', label: 'Sobremesas' },
  ];

  const filteredItems = activeCategory === 'todos'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.options && item.options.length > 0) {
      setSelectedItemForModal(item);
      setSelectedOption(item.options[0].choices[0].label);
      setCustomNotes('');
    } else {
      addToCart(item);
      setAddedAnimationId(item.id);
      setTimeout(() => setAddedAnimationId(null), 1200);
    }
  };

  const handleOpenItem = (item: MenuItem) => {
    setSelectedItemForModal(item);
    if (item.options && item.options.length > 0) {
      setSelectedOption(item.options[0].choices[0].label);
    } else {
      setSelectedOption('');
    }
    setCustomNotes('');
  };

  const handleConfirmModalAdd = () => {
    if (!selectedItemForModal) return;
    addToCart(selectedItemForModal, selectedOption || undefined, customNotes || undefined);
    setSelectedItemForModal(null);
    setIsCartOpen(true);
  };

  return (
    <section id="menu" className="w-full py-20 bg-[#f6f3ee] border-b border-[#e5e2dd]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Header & Categories */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#c84b31] uppercase tracking-wider block mb-1">
                Cardápio &amp; Sabores
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight">
                Menu do Estabelecimento
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#58413c] flex items-center gap-1 font-medium bg-white px-3 py-1.5 rounded-full border border-[#e5e2dd]">
                <Flame className="w-3.5 h-3.5 text-[#c84b31]" />
                Ingredientes selecionados e massa fresca
              </span>
            </div>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#c84b31] text-white shadow-sm'
                    : 'bg-white text-[#58413c] hover:bg-[#f0ede9] border border-[#e5e2dd]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Informative Digitalization Banner */}
        <div className="p-6 rounded-2xl bg-[#e5e2dd] border border-[#d5c3bd]/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fcf9f4] flex items-center justify-center text-[#c84b31] shrink-0 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-base font-bold text-[#1c1c19]">
                Digitalização do Cardápio Oficial em Andamento
              </span>
              <p className="text-xs sm:text-sm text-[#58413c] max-w-2xl leading-relaxed">
                O nosso cardápio oficial completo, pratos da casa e preçário estão a ser catalogados e digitalizados com rigor. Em breve disponibilizaremos a consulta interativa de cada item e preço.
              </p>
            </div>
          </div>
          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            className="inline-flex items-center gap-2 whitespace-nowrap bg-[#c84b31] hover:bg-[#a6331b] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            Consultar Pratos de Hoje
          </a>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenItem(item)}
              className="rounded-2xl overflow-hidden bg-white border border-[#e5e2dd] shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between cursor-pointer"
            >
              {/* Dish Image container with direct URL */}
              <div className="relative w-full h-52 overflow-hidden bg-[#f0ede9]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

                {/* Badge */}
                {item.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#c84b31] text-white text-[11px] font-bold shadow-md">
                    {item.badge}
                  </span>
                )}

                {/* Quick Add Button */}
                <button
                  onClick={(e) => handleQuickAdd(item, e)}
                  className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                    addedAnimationId === item.id
                      ? 'bg-emerald-600 text-white scale-110'
                      : 'bg-[#c84b31] hover:bg-[#a6331b] text-white active:scale-95'
                  }`}
                  title="Adicionar ao pedido"
                >
                  {addedAnimationId === item.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Dish Content */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#1c1c19] group-hover:text-[#c84b31] transition-colors mb-1.5">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#58413c] line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* Ingredients Pills */}
                  {item.ingredients && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.ingredients.slice(0, 3).map((ing, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#f6f3ee] text-[#885213] border border-[#e5e2dd]"
                        >
                          {ing}
                        </span>
                      ))}
                      {item.ingredients.length > 3 && (
                        <span className="text-[10px] text-[#58413c]">
                          +{item.ingredients.length - 3} mais
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#f0ede9] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#885213] uppercase font-bold tracking-wider">
                      Valor Oficial
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#1c1c19]">
                      {item.priceAoa.toLocaleString('pt-AO')} Kz
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#c84b31] group-hover:underline flex items-center gap-1">
                    Pedir / Personalizar
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 4: Offers and Instagram Promotions banner */}
        <div className="p-6 rounded-2xl bg-white border border-[#e5e2dd] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ffdad3]/50 flex items-center justify-center text-[#c84b31] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-display text-lg font-bold text-[#1c1c19]">
                Ofertas &amp; Promoções da Semana
              </h3>
              <p className="text-xs sm:text-sm text-[#58413c]">
                Acompanhe as promoções do dia e novidades verificadas pelo Instagram ou consulte ao ligar.
              </p>
            </div>
          </div>
          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#f6f3ee] hover:bg-[#c84b31] text-[#c84b31] hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-[#e0bfb9] transition-all"
          >
            <Instagram className="w-4 h-4" />
            Seguir no Instagram
          </a>
        </div>
      </div>

      {/* Dish Detail / Customization Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="relative h-48 sm:h-56 bg-[#f0ede9]">
              <img
                src={selectedItemForModal.imageUrl}
                alt={selectedItemForModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#1c1c19]">
                  {selectedItemForModal.name}
                </h3>
                <p className="text-sm text-[#58413c] mt-1 leading-relaxed">
                  {selectedItemForModal.description}
                </p>
              </div>

              {/* Options selection if available */}
              {selectedItemForModal.options && selectedItemForModal.options.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block">
                    {selectedItemForModal.options[0].name}
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedItemForModal.options[0].choices.map((choice) => (
                      <label
                        key={choice.label}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                          selectedOption === choice.label
                            ? 'border-[#c84b31] bg-[#ffdad3]/20'
                            : 'border-[#e5e2dd] hover:bg-[#f6f3ee]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="item-choice"
                            checked={selectedOption === choice.label}
                            onChange={() => setSelectedOption(choice.label)}
                            className="accent-[#c84b31]"
                          />
                          <span className="text-sm font-medium text-[#1c1c19]">
                            {choice.label}
                          </span>
                        </div>
                        {choice.priceDelta > 0 && (
                          <span className="text-xs font-semibold text-[#885213]">
                            +{choice.priceDelta.toLocaleString('pt-AO')} Kz
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom notes */}
              <div>
                <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block mb-1">
                  Observações (ex: sem cebola, ponto da carne, etc.)
                </label>
                <input
                  type="text"
                  placeholder="Alguma preferência especial?"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-[#e5e2dd] focus:border-[#c84b31] outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#e5e2dd] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#58413c] block">Preço</span>
                  <span className="text-xl font-bold text-[#1c1c19]">
                    {selectedItemForModal.priceAoa.toLocaleString('pt-AO')} Kz
                  </span>
                </div>
                <button
                  onClick={handleConfirmModalAdd}
                  className="inline-flex items-center gap-2 bg-[#c84b31] hover:bg-[#a6331b] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar ao Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
