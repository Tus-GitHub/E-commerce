'use client'
import { storage } from "@/app/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";


export default function Page() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File |null>(null);
    const [message, setMessage] = useState('');

    const handleUpload = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!image){
            setMessage("Please select atleast 2 images.");
            return;
        }
        const fileName = new Date().getTime() + image.name;
        const imageRef = ref(storage, fileName);
        try {
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            const res = await fetch('/api/upload', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    name,
                    price: parseFloat(price),
                    image: imageUrl,
                }),
            });
            const data = await res.json();
            if(res.ok){
                setMessage("Product upload succesfully.");
            } else{
                setMessage(data.message || "Error Uplaoding Product.")
            }

            setName('');
            setPrice('');
            setImage(null);
        } catch (error) {
            console.error('Error uploading file',error);
            setMessage("Error uploading Product.");
        }
    };


    return (
        <div className="min-h-screen flex p-24 justify-center bg-slate-200">
        <div className="mx-auto ">
            <h1 className="tex-2xl font-bold mb-4 text-center">
                Upload Item
            </h1>
            <form onSubmit={handleUpload} className="w-full max-w-md">
                <div className="flex flex-col mb-4">
                    <label className="block mb-1">Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}
                        required
                        className="border p-2 w-full"
                    />
                    <label>price</label>
                    <input 
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e)=>{
                            setPrice(e.target.value)
                        }}
                        required
                        className="border p-2 w-full"
                    />
                    <label>Image</label>
                    <input 
                        type="file"
                        className="border p-2 w-full"
                        required
                        onChange={(e)=>{
                            if(e.target.files){
                                setImage(e.target.files[0]);
                            }
                        }}
                    />
                </div>
                <button 
                type="submit" 
                className=" bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                Upload
                </button>
            </form>
            {message && <p className="mt-2 text-green-500">{message}</p>}
        </div>
        </div>
    );
}