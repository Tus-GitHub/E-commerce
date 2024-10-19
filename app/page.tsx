'use client';

import { useEffect, useState } from "react";

interface Product {
    name: string;
    price: number;
    image: string;
    _id: string;
}

interface CartItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
    _id: string;
}

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [message, setMessage] = useState('');
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await res.json();
                setProducts(data.products.slice(0, 10));
            } catch (error) {
                console.error("Error fetching products", error);
                setMessage("Error fetching products");
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCart(JSON.parse(cartData));
        }
    }, []);

    const addToCart = (product: Product) => {
        setDisable(true);
        const cartData = localStorage.getItem('cart');
        let cartItems: CartItem[] = cartData ? JSON.parse(cartData) : [];
        const existingItem = cartItems.find(item => item._id === product._id);
        
        if (existingItem) {
            cartItems = cartItems.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            cartItems.push({ name: product.name, price: product.price, image: product.image, quantity: 1, _id: product._id });
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        setCart(cartItems);
        setDisable(false);
    };

    const increaseQuantity = (_id: string) => {
        const updatedCart = cart.map(item =>
            item._id === _id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (_id: string) => {
        const updatedCart = cart
            .map(item => {
                if (item._id === _id) {
                    const newQuantity = item.quantity - 1;
                    return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
                }
                return item;
            })
            .filter(item => item.quantity > 0);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full bg-blue-50"> {/* Changed background color */}
            <div className="flex-1 mb-12 lg:mb-0 p-6 overflow-auto">
                <h2 className="text-4xl font-bold mb-4 text-blue-600 text-center">Available Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="border border-blue-200 rounded-lg shadow-lg p-3 transition-transform transform hover:scale-105 bg-white"> {/* Adjusted border color */}
                                <img src={product.image} alt={product.name} className="h-36 object-contain mb-4 rounded-lg transition-transform duration-300 hover:scale-110" />
                                <h3 className="text-xl font-semibold text-blue-700">{product.name}</h3>
                                <p className="text-gray-700 mb-2">Rs.{product.price.toFixed(2)}</p>
                                <button
                                    disabled={disable}
                                    onClick={() => addToCart(product)}
                                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300 disabled:bg-gray-400" // Changed button color
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-red-500 text-center">{message || 'No products available'}</p>
                    )}
                </div>
            </div>
            <div className="hidden lg:block lg:w-px bg-gray-300 mx-6"></div>
            <div className="lg:w-1/4 lg:pl-4 p-6 overflow-auto">
                <h2 className="text-4xl font-bold mb-4 text-blue-600">Your Cart</h2>
                {cart.length > 0 ? (
                    <>
                        {cart.map((item) => (
                            <div key={item._id} className="flex items-center border-b py-4 bg-white shadow-sm rounded mb-2">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded mr-4" />
                                <div className="flex-1">
                                    <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-gray-700">Rs.{item.price.toFixed(2)}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => decreaseQuantity(item._id)}
                                            disabled={item.quantity <= 1}
                                            className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 disabled:bg-gray-200 transition duration-200"
                                        >
                                            -
                                        </button>
                                        <span className="mx-4 text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(item._id)}
                                            className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 transition duration-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center font-bold text-lg mt-6">
                            <span>Total Amount:</span>
                            <span>Rs.{calculateTotal().toFixed(2)}</span>
                        </div>
                    </>
                ) : (
                    <p className="text-center">Your Cart is Empty</p>
                )}
            </div>
        </div>
    );
}
