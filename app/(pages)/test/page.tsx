'use client'

import { useState } from "react";

interface FormData{
    name: string;
    age: string;
};

export default function Page() {
    const [formData, setFormData] = useState<FormData>({
        name:'',
        age:''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/test',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log(result);
          } else {
            console.error('Failed to submit data');
          }
    }

    return (
        <div >
            <form onSubmit={handleSubmit} method="post" className="flex flex-col bg-slate-100">
                <label htmlFor="name">
                    Enter Name
                </label>
                    <input 
                        type="text" 
                        name="name" 
                        id ="name" 
                        className="border m-2 max-w-sm"
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />

                <label htmlFor="age">
                    Enter Age
                </label >
                    <input 
                        type="text" 
                        name="age" 
                        id ="age" 
                        className="border m-2 max-w-sm"
                        required
                        onChange={handleChange}
                        value={formData.age}
                    />

                <input 
                    type="submit" 
                    value="submit" 
                    className="border m-2 text-white bg-black p-2 max-w-32 text-center"
                />

            </form>
        </div>
    );
}