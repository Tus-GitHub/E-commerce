'use server'

import dbConnect from "@/app/lib/dbConnect"
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();

    try{
        const products = await Product.find({});
        return NextResponse.json({products}, {status: 200});
    }catch(error){
        console.log("Error fetching product", error);
        return NextResponse.json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unkown error"
        }, {status: 500});
    }
}