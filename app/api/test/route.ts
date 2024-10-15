'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

interface UserData {
  name: string;
  age: number;
}

// POST method handler
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json() as UserData; // Parse JSON body from the request
    const { name, age } = body;

    // Validate input
    if (!name || !age) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Create a new User document
    const person = new User({ name, age });
    await person.save();

    // Return success response
    return NextResponse.json({ 
      done: true, 
      data: person, 
      message: 'User details submitted successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
