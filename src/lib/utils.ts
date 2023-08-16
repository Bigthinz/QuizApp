import clsx, { ClassValue } from 'clsx';
import { NextResponse } from "next/server";
import { twMerge } from 'tailwind-merge';


/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function createErrorResponse(
  message: string,
  statusCode: number
): NextResponse {
  const errorResponse = {
    status: statusCode >= 500 ? "error" : "fail",
    message,
  };

  return new NextResponse(JSON.stringify(errorResponse), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}