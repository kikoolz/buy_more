import Link from "next/link";
import Image from "next/image";

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
        <p className="text-xl font-bold tracking-wider">BUY MORE</p>
      </Link>
      {/* RIGHT */}
      <div className="right">right</div>
    </nav>
  );
};

export default Navbar;
