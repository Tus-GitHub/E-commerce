'use client';

import Link from 'next/link';
import { FC } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar: FC = () => {
  return (
    <nav className="bg-blue-500 p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">My Store</Link>
        </div>

        <div className="flex space-x-4">
          <Link href="/" className="text-white transition-transform duration-200 transform hover:scale-110"> 
            Home
          </Link>
          <Link href="/products" className="text-white transition-transform duration-200 transform hover:scale-110"> 
            Products
          </Link>
          <Link href="/upload" className="text-white transition-transform duration-200 transform hover:scale-110"> 
            Upload
          </Link>
        </div>

        <div className="text-white transition-transform duration-200 transform hover:scale-110">
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-2xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
