import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Bell, Home, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center border-b border-gray-200 pb-4">
      {/* LEFT */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-xl font-bold tracking-wider">
          BUY MORE
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="w-6 h-6 text-gray-600" />
        </Link>
        <Bell className="w-6 h-6 text-gray-600" />
        <ShoppingCartIcon />
        <Link href="/login">
          <User className="w-6 h-6 text-gray-600" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
