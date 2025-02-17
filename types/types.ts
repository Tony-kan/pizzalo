import { Database } from "./database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type sizes = {
  size: PizzaSize;
  price: number;
};

export type ProductProps = {
  id: string;
  image: string | null;
  name: string;
  description: string | null;
  sizes?: sizes[];
};

export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product: ProductProps;
  product_id: string;
  size: PizzaSize;
  price?: number;
  // sizes: { size: PizzaSize; price: number }[];
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export type Order = {
  id: string;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus | string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  product_id: string;
  products: ProductProps;
  order_id: string;
  size: PizzaSize | string;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};
