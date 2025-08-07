interface OrderItem {
  id: number;
  orderId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: number;
  userName: string;
  courierName: string;
  address: string;
  phoneNumber: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  notes: string;
  paymentMethod: string;
  items: OrderItem[];
}
