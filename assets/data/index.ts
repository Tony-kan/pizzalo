import { Order } from "@/types/types";
// import products from "./products";
import dayjs from "dayjs";

const now = dayjs();

export const products = [
  {
    id: 1,
    name: "Ultimate Pepperoni",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png",
    price: 12.99,
  },
  {
    id: 2,
    name: "ExtravaganZZa",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png",
    price: 14.99,
  },
  {
    id: 3,
    name: "MeatZZa",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png",
    price: 13.47,
  },
  {
    id: 4,
    name: "Margarita",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/margarita.png",
    price: 9.9,
  },
  {
    id: 5,
    name: "Pacific Veggie",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png",
    price: 12.99,
  },
  {
    id: 6,
    name: "Hawaiian",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/hawaiin.png",
    price: 10.49,
  },
  {
    id: 7,
    name: "Deluxe",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/deluxe.png",
    price: 16.99,
  },
  {
    id: 8,
    name: "BBQ Chicken",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png",
    price: 12.89,
  },
  {
    id: 9,
    name: "Chicken Bacon Ranch",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png",
    price: 13.99,
  },
  {
    id: 10,
    name: "6 Cheese",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/6cheese.png",
    price: 13.29,
  },
];

export const orders: Order[] = [
  {
    id: 23123,
    created_at: now.subtract(1, "hour").toISOString(),
    total: 31.4,
    status: "Cooking",
    user_id: "1",
    order_items: [
      {
        id: 1,
        order_id: 23123,
        size: "M",
        quantity: 2,
        product_id: products[0].id,
        products: products[0],
      },
      {
        id: 2,
        order_id: 23123,
        size: "L",
        quantity: 1,
        product_id: products[1].id,
        products: products[1],
      },
    ],
  },
  {
    id: 32145,
    created_at: now.subtract(3, "days").toISOString(),
    total: 11.4,
    status: "Delivered",
    user_id: "1",
    order_items: [
      {
        id: 1,
        order_id: 32145,
        size: "M",
        quantity: 2,
        product_id: products[3].id,
        products: products[3],
      },
    ],
  },
  {
    id: 23445,
    created_at: now.subtract(3, "weeks").toISOString(),
    total: 11.4,
    status: "Delivered",
    user_id: "1",
    order_items: [
      {
        id: 1,
        order_id: 23445,
        size: "M",
        quantity: 1,
        product_id: products[3].id,
        products: products[3],
      },
      {
        id: 2,
        order_id: 23445,
        size: "M",
        quantity: 1,
        product_id: products[7].id,
        products: products[7],
      },
      {
        id: 3,
        order_id: 23445,
        size: "L",
        quantity: 1,
        product_id: products[8].id,
        products: products[8],
      },
    ],
  },
];
