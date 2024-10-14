'use client'
import { ChangeEvent, useState } from "react";

interface FormData {
    name: string;
    price: number;
}

export default function Page() {

    const[formData, setFormData] = useState<FormData>({
        name:'',
        price:0,
    });

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
        });
    };

    return (
        <div className="min-h-screen flex p-24 justify-center bg-slate-200">
        <div className="mx-auto ">
            <h1 className="tex-2xl font-bold mb-4 text-center">
                Upload Item
            </h1>
            <form className="w-full max-w-md">
                <div className="flex flex-col mb-4">
                    <label className="block mb-1">Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                    <label>price</label>
                    <input 
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                    <label>Image</label>
                    <input 
                        type="file"
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className=" bg-blue-500 text-white py-2 px-4 rounded w-full
                ">Upload</button>
            </form>
        </div>
        </div>
    );
}