interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: number;
  userId: number;
  courierId: number;
  address: string;
  phoneNumber: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  notes: string;
  paymentMethod: string;
  items: OrderItem[];
}
