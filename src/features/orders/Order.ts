interface OrderItem {
  Id: number;
  OrderId: number;
  ProductName: string;
  Quantity: number;
  UnitPrice: number;
  TotalPrice: number;
}

export interface Order {
  Id: number;
  UserName: string;
  CourierName: string;
  Address: string;
  PhoneNumber: number;
  TotalAmount: number;
  Status: string;
  CreatedAt: string;
  Notes: string;
  PaymentMethod: string;
  Items: OrderItem[];
}
