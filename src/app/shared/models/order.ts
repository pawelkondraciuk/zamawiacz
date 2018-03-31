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
  orderItems?: any[];
  paymentMethod?: string;
  status?: string;
  user?: any;
}
