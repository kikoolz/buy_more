"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { CartItemType, ShippingFormInputs } from "@/types";
import {
  ArrowRight,
  CreditCard,
  MapPin,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import useCartStore from "@/stores/cartStore";

const steps = [
  {
    id: 1,
    name: "Shopping Cart",
    href: "/cart",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "Shipping Address",
    href: "/cart/shipping-address",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "Payment Method",
    href: "/cart/payment-method",
    icon: <CreditCard className="w-5 h-5" />,
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const { cart, removeFromCart } = useCartStore();
  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 border-b-2 pb-2 ${
              activeStep === step.id ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full text-white flex items-center justify-center ${
                activeStep === step.id ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              {step.icon}
            </div>
            <p
              className={`text-sm font-medium ${
                activeStep === step.id ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.name}
            </p>
          </div>
        ))}
      </div>

      {/* ITEMS & DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* CART ITEMS */}
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.map((item) => (
              // SINGLE ITEM
              <div
                className="flex items-center justify-between"
                key={item.id + item.selectedSize + item.selectedColor}
              >
                {/* IMAGE AND DETAILS */}

                <div className="flex  gap-8">
                  <div className="relative w-32 h-32 bg-gray-50 overflow-hidden">
                    <Image
                      src={item.images[item.selectedColor]}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* DETAILS */}
                  <div className="flex flex-col justtify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                      <p className="text-xs text-gray-500">
                        Color: {item.selectedColor}
                      </p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* DELETE BUTTON */}
                <button
                  onClick={() => removeFromCart(item)}
                  className="w-8 h-8 rounded-full bg-red-100 text-red-400 hover:bg-red-200 items-center justify-center flex cursor-pointer transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p>Please fill in the shipping form to continue</p>
          )}
        </div>
        {/* CART DETAILS */}
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Discount(10%)</p>
              <p className="font-medium">$10.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">$10.00</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex items-center justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">
                $
                {(
                  cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  ) + 10
                ).toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer"
            >
              Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
