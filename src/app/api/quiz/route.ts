import { NextRequest, NextResponse } from "next/server";

import { createErrorResponse } from "@/lib/utils";

import connectDB from "@/config/db-config"
import QuizModel from "@/models/quiz-model";


export const GET = async () => {

  try{
    await connectDB();

    const quiz = await QuizModel.find();

    return NextResponse.json({ questions:quiz }, { status: 200 });
    
  }catch(error:any){

    createErrorResponse(error.message, 500)

  }
  
};


export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json()

  try {
    await connectDB();
    const user = await QuizModel.create(body);
  
    return new Response(JSON.stringify(user), { status: 201 })


  } catch (error: any) {
    return createErrorResponse(error.message, 500); // Return the error response
  }
};