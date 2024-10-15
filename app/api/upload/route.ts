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
    
    const product = new Product({
        name, price, image
    });

    await product.save();

    return NextResponse.json({
        message:"Product uploaded!",
        data:product
    },{status:200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:error
        },{status:500});
    }
};