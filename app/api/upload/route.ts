'use server'

import dbConnect from "@/app/lib/dbConnect"
import Product from "@/app/models/Product";
import { NextRequest, NextResponse } from "next/server";

interface ProductData{
    name:string;
    price:number;
    image:string;
}

export async function POST(req:NextRequest){
    await dbConnect();

    try{

    const body = await req.json() as ProductData;

    const {name, price, image} = body;

    if(!name || !price || !image){
        return NextResponse.json({message:"Missing Required field"}, {status:400});
    }
    
    const product = new Product({
        name, price, image
    });

    await product.save();

    return NextResponse.json({
        message:"Product uploaded!",
        data:product
    },{status:200});

    } catch (error) {
        console.error("Error saving product:", error);
        return NextResponse.json({
            message: "Internal server error. Please try again later.",
            error: error instanceof Error ? error.message : "Unknown error"
        },{status:500});
    }
};