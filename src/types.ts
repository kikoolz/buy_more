import { z } from "zod";

export type ProductsType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type ProductImageType = {
  [key: string]: string;
};

export type CartItemType = ProductsType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartStateType = CartItemType[];

// SHIPPING FORM SCHEMA

export const shippingFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits" })
    .max(10, { message: "Phone number must be less than 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only numbers" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

// PAYMENT FORM SCHEMA
export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, { message: "Card holder is required" }),
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be 16 digits" })
    .max(16, { message: "Card number must be 16 digits" }),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiration date must be in MM/YY format",
  }),
  cvv: z
    .string()
    .min(3, { message: "CVV must be 3 digits" })
    .max(3, { message: "CVV must be 3 digits" }),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;
