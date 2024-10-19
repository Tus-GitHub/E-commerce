'use client'

import Link from 'next/link';
import { FC } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar: FC = () => {
  return (
    <nav className="bg-gray-800 p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">My Store</Link>
        </div>

        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link href="/products" className="text-gray-300 hover:text-white">Products</Link>
          <Link href="/upload" className="text-gray-300 hover:text-white">Upload</Link>
        </div>

        <div className="text-white">
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-2xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
