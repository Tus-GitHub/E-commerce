'use client'

import { useEffect, useState } from "react";

interface Product{
    name: string;
    price: number;
    image: string;
    _id:string;
}

interface CartItem{
    name: string;
    price: number;
    quantity:number;
    image: string;
    _id:string;
}

export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const [message, setMessage] = useState('');
    const [disable, setDisable] = useState(false);

    useEffect(()=>{
        const fetchProducts = async ()=>{
            try{
                const res = await fetch('https://e-commerce-ajr6.onrender.com/api/products');
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                  }
                const data = await res.json();
                setProducts(data.products);
            }catch(error){
                console.log("Error fetching Products", error);
                setMessage("Error Fetching products");
            }
        }
        fetchProducts();
    },[]);

    const addToCart = (product:Product)=> {
        setDisable(true);
        const cartData = localStorage.getItem('cart');
        let cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

        const existingItem = cart.find(item=> item._id === product._id);

        if(existingItem){
            cart = cart.map(item => 
                item._id === product._id 
                ? {...item , quantity: item.quantity + 1}
                : item
            )
        } else {
            cart.push({name: product.name, price: product.price, image: product.image, quantity: 1, _id:product._id});
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        setDisable(false);
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-slate-200">
            <h1 className="text-3xl font-bold mb-16 text-center ">Available Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                    products.map((product, index) =>(
                        <div key={index} className="flex flex-col text-center">
                            <img 
                                src={product.image}
                                alt={product.name}
                                className="h-48 mb-4 w-full object-cover"
                            />
                            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                            <p className="text-gray-700 mb-4">Price: Rs.{product.price.toFixed(2)}</p>
                            <button
                            disabled={disable}
                            onClick={()=>addToCart(product)} 
                            className="bg-red-400 text-white text-center disabled:opacity-80 
                            mb-4 mx-auto p-2 border rounded-lg hover:shadow-lg uppercase">
                                Add to Cart
                            </button>
                        </div>
                    ))
                ):(
                    <p className="text-center text-3xl text-red-800">{message || 'No Product available'}</p>
                )}
            </div>
        </div>
    );
}