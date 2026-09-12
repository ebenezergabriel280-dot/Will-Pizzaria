export interface AppImages {
  logo: string;
  heroBg: string;
  pizzasCover: string;
  fahitasCover: string;
  drinksCover: string;
  mapPreview: string;
  gallery1: string;
  gallery2: string;
  gallery3: string;
  gallery4: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'pizzas' | 'fahitas' | 'bebidas' | 'sobremesas';
  description: string;
  priceAoa: number;
  imageUrl: string;
  badge?: string;
  featured?: boolean;
  ingredients?: string[];
  options?: {
    name: string;
    choices: { label: string; priceDelta: number }[];
  }[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOption?: string;
  notes?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tag: string;
  isWide?: boolean;
}

export interface Reservation {
  fullName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}
