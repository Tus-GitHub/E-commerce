'use client';

import { useEffect, useState } from "react";

interface Product {
    name: string;
    price: number;
    image: string;
    _id:string;
}

interface CartItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
    _id:string;
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
                console.log("Error fetching Products", error);
                setMessage("Error Fetching products");
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
            cartItems.push({ name: product.name, price: product.price, image: product.image, quantity: 1, _id:product._id });
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        setCart(cartItems);
        setDisable(false);
    };

    const increaseQuantity = (image: string) => {
        const updatedCart = cart.map(item =>
            item.image === image
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (image: string) => {
        const updatedCart = cart
            .map(item => {
                if (item.image === image) {
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
        <div className="min-h-screen flex bg-slate-200 p-4">

            <div className="w-2/3 pr-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Available Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="flex flex-col text-center bg-white p-4 border rounded-lg">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-24 mb-4 w-ful object-contain"
                                />
                                <h3 className="text-xl font-bold mb-2 uppercase">{product.name}</h3>
                                <p className="text-gray-700 mb-4">Rs.{product.price}</p>
                                <button
                                    disabled={disable}
                                    onClick={() => addToCart(product)}
                                    className="bg-red-400 text-white text-center disabled:opacity-80 mb-4 mx-auto p-2 border rounded-lg hover:shadow-lg uppercase"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-3xl text-red-800">{message || 'No Products available'}</p>
                    )}
                </div>
            </div>

            {/* Cart Section */}
            <div className="w-80 h-[calc(100%-4rem)] bg-white p-6 rounded-lg shadow-lg fixed right-0  overflow-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
                {cart.length > 0 ? (
                    <>
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 border-b mb-4 bg-white rounded-lg">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-28 h-28 object-cover mr-4"
                                />
                                <div className="flex-1 ml-4">
                                    <p className="mb-6 text-xl">{item.name}</p>
                                    <p className="mb-1">Rs.{item.price}</p>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => decreaseQuantity(item._id)}
                                            className="bg-red-500 text-white px-2 rounded"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(item._id)}
                                            className="bg-blue-500 text-white px-2 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between font-bold mt-4">
                            <span>Total Amount</span>
                            <span>Rs.{calculateTotal()}</span>
                        </div>
                    </>
                ) : (
                    <p className="text-center">Your Cart is Empty</p>
                )}
            </div>
        </div>
    );
}
