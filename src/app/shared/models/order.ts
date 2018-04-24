import { OrderItem } from './orderItem';

export interface NewOrderInputData {
  name: string;
  deliveryCost: number;
  paymentMethod: string;
}

export interface Order {
  id: string;
  name: string;
  completedAt?: string;
  createdAt?: string;
  deliveryCost?: number;
  orderItems?: OrderItem[];
  paymentMethod?: string;
  status?: string;
  user?: any;
}
