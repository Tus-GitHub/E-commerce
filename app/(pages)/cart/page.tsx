'use client'

import { useEffect, useState } from "react";

interface CartItem {
    name : string;
    price: number;
    quantity: number;
    image: string;
    _id:string;
}

export default function Page() {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(()=>{
        const cartData =localStorage.getItem('cart');
        if(cartData){
            setCart(JSON.parse(cartData));
        } 
    }, []);

    const increaseQuantity = (_id:string) => {
        const updatedCart = cart.map(item => 
            item._id === _id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const decreaseQuantity = (_id:string) => {
        const updatedCart = cart.map(item => {
            if(item._id === _id){
                const newQuantity = item.quantity - 1;
                return {...item, quantity: newQuantity > 0 ?  newQuantity : 0 }; 
            }
            return item;
        }).filter(item => item.quantity > 0);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-slate-200">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
            <div className="w-full max-w-md">
                {cart.length > 0 ? (
                    <>
                        {cart.map((item, index) => (
                            <div key ={index} className="flex justify-between items-center p-2 border-b">
                                <img 
                                src={item.image}
                                alt={item.name}
                                className="w-28 h-28 object-cover mr-4"
                                />
                                <div className="flex-1 ml-4">
                                    <p className="mb-6 text-xl">{item.name}</p>
                                    <p className="mb-1 ">RS.{item.price}</p>
                                    <div className="flex items-center">
                                        <button
                                        onClick={()=> decreaseQuantity(item._id)}
                                        className="bg-red-500 text-white px-2 rounded"
                                        disabled ={item.quantity <= 0}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                        onClick={()=> increaseQuantity(item._id)}
                                        className="bg-blue-500 text-white px-2 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between font-bold mt-4">
                            <span>Toatl Amount</span>
                            <span>Rs.{calculateTotal()}</span>
                        </div>
                    </>
                ): (
                    <p className="text-center">Your Cart is Empty</p>
                )}
            </div>
        </div>
    );
}