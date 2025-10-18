"use client";

import { ProductsType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Plus, ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductsType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const handleTypeChange = (type: "size" | "color", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: quantity,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => {
            return (
              <div
                onClick={() => handleTypeChange("size", size)}
                key={size}
                className={`cursor-pointer border-1 p-[2px] ${
                  selectedSize === size ? "border-gray-600" : "border-gray-300"
                } `}
              >
                <div
                  className={`w-8 h-8 text-center flex items-center justify-center ${
                    size === selectedSize
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {size.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* COLOR */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => {
            return (
              <div
                key={color}
                onClick={() => handleTypeChange("color", color)}
                className={`cursor-pointer border-1 p-[2px] ${
                  selectedColor === color ? "border-gray-300" : "border-white"
                }`}
              >
                <div
                  className={`w-8 h-8`}
                  style={{ backgroundColor: color }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange("decrement")}
            className="w-8 h-8 text-center flex items-center justify-center border-1 border-gray-300 rounded-md px-2 py-1"
          >
            -
          </button>
          <input
            type="number"
            className="w-12 text-center border-1 border-gray-300 rounded-md px-2 py-1"
            value={quantity}
            onChange={(e) =>
              handleQuantityChange(
                Number(e.target.value) > 1 ? "increment" : "decrement"
              )
            }
          />
          <button
            onClick={() => handleQuantityChange("increment")}
            className="w-8 h-8 text-center flex items-center justify-center border-1 border-gray-300 rounded-md px-2 py-1"
          >
            +
          </button>
        </div>
      </div>

      {/* ADD TO CART */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-gray-800 text-white rounded-md px-4 py-2 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
      <button className="ring-1 ring-gray-400 text-gray-800 rounded-md px-4 py-2 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300">
        <ShoppingCart className="w-4 h-4" />
        Buy this Item
      </button>
    </div>
  );
};

export default ProductInteraction;
