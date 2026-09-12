import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppImages, CartItem, MenuItem, Reservation } from '../types';
import { DEFAULT_IMAGES, RESTAURANT_INFO } from '../data/defaultData';

interface AppContextType {
  images: AppImages;
  updateImage: (key: keyof AppImages, url: string) => void;
  resetImages: () => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, option?: string, notes?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  subtotalAoa: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isImageManagerOpen: boolean;
  setIsImageManagerOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  selectedGalleryImage: string | null;
  setSelectedGalleryImage: (url: string | null) => void;
  orderType: 'consumo' | 'takeaway' | 'delivery';
  setOrderType: (type: 'consumo' | 'takeaway' | 'delivery') => void;
  makeReservation: (res: Reservation) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_IMAGES = 'will_pizzaria_custom_images';
const STORAGE_KEY_CART = 'will_pizzaria_cart';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<AppImages>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_IMAGES);
      if (saved) {
        return { ...DEFAULT_IMAGES, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_IMAGES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<'consumo' | 'takeaway' | 'delivery'>('takeaway');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(images));
    } catch {
      // ignore
    }
  }, [images]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const updateImage = (key: keyof AppImages, url: string) => {
    setImages((prev) => ({
      ...prev,
      [key]: url.trim() || DEFAULT_IMAGES[key],
    }));
  };

  const resetImages = () => {
    setImages(DEFAULT_IMAGES);
    localStorage.removeItem(STORAGE_KEY_IMAGES);
  };

  const addToCart = (item: MenuItem, option?: string, notes?: string) => {
    const id = `${item.id}-${option || 'default'}-${notes || ''}`;
    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === id);
      if (existing) {
        return prev.map((ci) =>
          ci.id === id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { id, menuItem: item, quantity: 1, selectedOption: option, notes }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotalAoa = cart.reduce((sum, item) => {
    let price = item.menuItem.priceAoa;
    if (item.selectedOption && item.menuItem.options) {
      for (const opt of item.menuItem.options) {
        const choice = opt.choices.find((c) => c.label === item.selectedOption);
        if (choice) {
          price += choice.priceDelta;
        }
      }
    }
    return sum + price * item.quantity;
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const makeReservation = (res: Reservation) => {
    // Generate preformatted WhatsApp confirmation
    const message = encodeURIComponent(
      `Olá Will Pizzaria e Fahitas! Gostaria de confirmar uma reserva de mesa no Namibe:\n\n` +
      `👤 *Nome:* ${res.fullName}\n` +
      `📞 *Contacto:* ${res.phone}\n` +
      `📅 *Data:* ${res.date}\n` +
      `⏰ *Horário:* ${res.time}\n` +
      `👥 *Pessoas:* ${res.guests} pessoa(s)\n` +
      (res.notes ? `📝 *Observações:* ${res.notes}\n` : '') +
      `\nAguardando confirmação. Obrigado!`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${message}`, '_blank');
    setIsReservationOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        images,
        updateImage,
        resetImages,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotalAoa,
        totalItems,
        isCartOpen,
        setIsCartOpen,
        isImageManagerOpen,
        setIsImageManagerOpen,
        isReservationOpen,
        setIsReservationOpen,
        selectedGalleryImage,
        setSelectedGalleryImage,
        orderType,
        setOrderType,
        makeReservation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
