import ProductInteraction from "@/components/ProductInteraction";
import { ProductsType } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

const products: ProductsType[] = [
  {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
  },
];

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata | undefined> => {
  const id = (await params).id;
  const product = products.find((item) => item.id.toString() === id);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "Product Not Found",
    };
  }
  return {
    title: `${product.name} | Buy More`,
    description: product.description,
  };
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const id = (await params).id;
  const { color, size } = await searchParams;

  // Find the product by ID
  const product = products.find((item) => item.id.toString() === id);

  // If product not found, return 404
  if (!product) {
    notFound();
  }

  const selectedSize = size || product.sizes[0];
  const selectedColor = color || product.colors[0];

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* PRODUCT IMAGE */}
      <div className="relative aspect-[2/3] w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* PRODUCT DETAILS */}
      <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
        <div className="flex items-center justify-center gap-2 mt-4">
          <Image
            src="/klarna.png"
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/cards.png"
            alt="cards"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/stripe.png"
            alt="stripe"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>
        <p className="text-gray-500 text-xs">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black">Terms & Conditions</span>{" "}
          and <span className="underline hover:text-black">Privacy Policy</span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-black">Refund Policies</span>.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
