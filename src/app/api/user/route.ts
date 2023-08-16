// export async function GET(req: NextRequest, res: NextResponse ) {
//   await connectDB();
//   return NextResponse.json({ message:"success" }, { status: 200 });
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import {NextRequest, NextResponse } from "next/server";

import { createSendToken } from '@/lib/helper';
import { createErrorResponse } from "@/lib/utils";

import connectDB from "@/config/db-config"
import UserModel from "@/models/user";



export const GET = async () => {

  try{
    await connectDB();
    const user = await UserModel.find();

  return NextResponse.json({ data:user }, { status: 200 });
    
  }catch(error:any){

    createErrorResponse(error.message, 500)

  }
  
};



export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json()
  // bodyParser.json()(req, res);
  console.log(body)
  try {
    await connectDB();
    const user = await UserModel.create(body);
    createSendToken(user, 201, res); // Uncomment this line if needed


    const token = signToken(user._id);

 
    const oneDay = 24 * 60 * 60 * 1000
  
    cookies().set('auth', token, { expires:  Date.now() - oneDay })
  
  
    // // Removing password from output when user signs up
    user.password = undefined;
  
    
    return new Response(JSON.stringify(user), { status: 201 })

    // return res.json({ data: user}, { status: 200 });
    // createSendToken(user, 201, res); // Uncomment this line if needed

  } catch (error: any) {
    return createErrorResponse(error.message, 500); // Return the error response
  }
};


export const signToken = (id: string | number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_EXPIRE_IN || '1d',
  });
};


// export default async function handler(req: NextRequest, res: NextResponse) {
//   if (req.method === 'POST') {
//     // Process a POST request
//     try {
//       await connectDB();
//       const user = await UserModel.create(req.body);
//       // createSendToken(user, 201, res); // Uncomment this line if needed
  
//       return res.json({ data: user}, { status: 200 });
//     } catch (error: any) {
//       return createErrorResponse(error.message, 500); // Return the error response
//     }
//   } else {
//     // Handle any other HTTP method
//     // return createErrorResponse(error.message, 500); // Return the error response
//     return res.json({ message: 'error'}, { status: 500 });


//   }
// }

