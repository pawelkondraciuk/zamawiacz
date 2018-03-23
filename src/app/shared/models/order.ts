export interface OrderInputData {
  name: String;
  deliveryCost: Number;
  paymentMethod: String;
}

export interface Order {
  completedAt: string;
  createdAt: string;
  deliveryCost: number;
  id: string;
  name: string;
  orderItems: any[];
  paymentMethod: string;
  status: string;
  user: any;
}
