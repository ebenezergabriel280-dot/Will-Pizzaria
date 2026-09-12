import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, ShoppingBag, MapPin, Bike, Store, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/defaultData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotalAoa,
    orderType,
    setOrderType,
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isCartOpen) return null;

  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let orderTypeText = 'Comida para Levar (Take-away)';
    if (orderType === 'delivery') orderTypeText = 'Entrega em Casa (Delivery no Namibe)';
    if (orderType === 'consumo') orderTypeText = 'Consumo no Local (Restaurante)';

    const itemsText = cart
      .map(
        (ci, i) =>
          `${i + 1}. *${ci.menuItem.name}* (x${ci.quantity})` +
          (ci.selectedOption ? ` - _${ci.selectedOption}_` : '') +
          (ci.notes ? `\n   Obs: ${ci.notes}` : '') +
          `\n   Subtotal: ${(ci.menuItem.priceAoa * ci.quantity).toLocaleString('pt-AO')} Kz`
      )
      .join('\n');

    const fullMessage =
      `🍕 *NOVO PEDIDO - WILL PIZZARIA E FAHITAS*\n` +
      `-----------------------------------------\n` +
      `👤 *Cliente:* ${customerName || 'Cliente Namibe'}\n` +
      `📞 *Telefone:* ${customerPhone || 'A confirmar'}\n` +
      `📦 *Modalidade:* ${orderTypeText}\n` +
      (orderType === 'delivery' ? `📍 *Endereço no Namibe:* ${customerAddress || 'A combinar'}\n` : '') +
      `-----------------------------------------\n` +
      `📋 *ITENS DO PEDIDO:*\n${itemsText}\n` +
      `-----------------------------------------\n` +
      `💰 *VALOR TOTAL:* *${subtotalAoa.toLocaleString('pt-AO')} Kz*\n` +
      `💳 *Forma de Pagamento:* Cartão de Crédito / Multicaixa (TPA) ou Numerário\n` +
      (customerNotes ? `📝 *Observações Gerais:* ${customerNotes}\n` : '') +
      `\nPor favor confirmem o tempo estimado de saída do forno. Obrigado!`;

    window.open(
      `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(fullMessage)}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-[#e5e2dd] bg-[#fcf9f4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#c84b31]" />
            <h3 className="font-serif-display text-xl font-bold text-[#1c1c19]">
              Seu Pedido
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-[#58413c] hover:bg-[#f0ede9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modalidade Selector */}
        <div className="p-4 bg-[#f6f3ee] border-b border-[#e5e2dd]">
          <span className="text-[11px] font-bold text-[#885213] uppercase tracking-wider block mb-2">
            Modalidade de Atendimento:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setOrderType('takeaway')}
              className={`py-2 px-1 text-xs font-bold rounded-xl flex flex-col items-center gap-1 transition-all ${
                orderType === 'takeaway'
                  ? 'bg-[#c84b31] text-white shadow-sm'
                  : 'bg-white text-[#58413c] hover:bg-[#f0ede9] border border-[#e5e2dd]'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Take-away</span>
            </button>
            <button
              onClick={() => setOrderType('delivery')}
              className={`py-2 px-1 text-xs font-bold rounded-xl flex flex-col items-center gap-1 transition-all ${
                orderType === 'delivery'
                  ? 'bg-[#c84b31] text-white shadow-sm'
                  : 'bg-white text-[#58413c] hover:bg-[#f0ede9] border border-[#e5e2dd]'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Delivery</span>
            </button>
            <button
              onClick={() => setOrderType('consumo')}
              className={`py-2 px-1 text-xs font-bold rounded-xl flex flex-col items-center gap-1 transition-all ${
                orderType === 'consumo'
                  ? 'bg-[#c84b31] text-white shadow-sm'
                  : 'bg-white text-[#58413c] hover:bg-[#f0ede9] border border-[#e5e2dd]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>No Local</span>
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#58413c] p-6">
              <ShoppingBag className="w-12 h-12 text-[#d5c3bd] mb-3" />
              <p className="font-bold text-base text-[#1c1c19]">
                O seu carrinho está vazio
              </p>
              <p className="text-xs text-[#58413c] mt-1">
                Explore o menu e adicione pizzas artesanais, fahitas ou bebidas refrescantes.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-[#e5e2dd] bg-[#fcf9f4] flex items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#1c1c19]">
                        {item.menuItem.name}
                      </h4>
                      {item.selectedOption && (
                        <span className="text-[11px] text-[#885213] block">
                          {item.selectedOption}
                        </span>
                      )}
                      {item.notes && (
                        <span className="text-[11px] text-[#58413c] italic block">
                          Obs: {item.notes}
                        </span>
                      )}
                      <span className="text-xs font-bold text-[#c84b31] mt-1 block">
                        {(item.menuItem.priceAoa * item.quantity).toLocaleString('pt-AO')} Kz
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#e5e2dd] rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-[#58413c] hover:text-[#c84b31]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1c1c19]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-[#58413c] hover:text-[#c84b31]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Details */}
              <div className="pt-4 border-t border-[#e5e2dd] space-y-3">
                <span className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block">
                  Informações para Entrega / Retirada:
                </span>
                <input
                  type="text"
                  placeholder="Seu Nome"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#e5e2dd] outline-none focus:border-[#c84b31]"
                />
                <input
                  type="tel"
                  placeholder="Seu Contacto Telefónico"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#e5e2dd] outline-none focus:border-[#c84b31]"
                />
                {orderType === 'delivery' && (
                  <input
                    type="text"
                    placeholder="Morada / Referência em Namibe"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#e5e2dd] outline-none focus:border-[#c84b31]"
                  />
                )}
                <input
                  type="text"
                  placeholder="Observação (ex: troco para 10.000 Kz)"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#e5e2dd] outline-none focus:border-[#c84b31]"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#e5e2dd] bg-[#fcf9f4] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#58413c]">
                Subtotal Estimado:
              </span>
              <span className="font-serif-display text-2xl font-bold text-[#1c1c19]">
                {subtotalAoa.toLocaleString('pt-AO')} Kz
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar Pedido pelo WhatsApp
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="w-full py-3 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19] font-bold text-xs flex items-center justify-center gap-2 transition-colors text-center"
              >
                <Phone className="w-4 h-4 text-[#c84b31]" />
                Ligar Direto (+244 924 197 565)
              </a>
            </div>

            <button
              onClick={clearCart}
              className="w-full text-[11px] text-gray-500 hover:text-red-600 text-center block pt-1"
            >
              Esvaziar Carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
