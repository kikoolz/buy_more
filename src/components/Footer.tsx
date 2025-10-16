import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center justify-between md:flex-row md:items-start bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <p className="hidden md:block text-xl font-bold tracking-wider text-white">
            BUY MORE
          </p>
        </Link>
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Buy More.
        </p>
        <p className="text-gray-500 text-sm">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-amber-50 text-sm">Links</p>
        <Link href="/">Home</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Terms of Service</Link>
        <Link href="/">Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-amber-50 text-sm">Products</p>
        <Link href="/">All Products</Link>
        <Link href="/">New Arrivals</Link>
        <Link href="/">Best Sellers</Link>
        <Link href="/">Sale</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-amber-50 text-sm">Company</p>
        <Link href="/">About Us</Link>
        <Link href="/">Contact Us</Link>
        <Link href="/">Blog</Link>
        <Link href="/">Affiliate Program</Link>
      </div>
    </div>
  );
};

export default Footer;
