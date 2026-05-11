export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  is_featured: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  client_avatar: string;
  message: string;
  rating: number;
  is_active: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
