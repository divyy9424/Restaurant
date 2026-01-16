
export interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: string;
  imagePrompt?: string;
  imageUrl?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface MenuCategory {
  categoryName: string;
  items: MenuItem[];
  imageUrl?: string;
}

export interface MenuData {
  restaurantName: string;
  categories: MenuCategory[];
}

export interface Order {
  id: string;
  tableNumber: string | null;
  items: CartItem[];
  total: string;
  timestamp: string;
  status: 'New' | 'Served';
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export enum ViewMode {
  CUSTOMER = 'CUSTOMER',
  WAITER = 'WAITER',
  ADMIN = 'ADMIN'
}
