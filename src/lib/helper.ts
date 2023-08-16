// import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'


export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export const signToken = (id: string | number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_EXPIRE_IN || '1d',
  });
};

export const createSendToken = (user: any, statusCode: number, res:any) => {
  const token = signToken(user._id);

 
  const oneDay = 24 * 60 * 60 * 1000

  cookies().set('auth', token, { expires:  Date.now() - oneDay })


  // Removing password from output when user signs up
  user.password = undefined;



    return new Response(user, { status: 201 })
  // return new NextResponse(JSON.stringify(user), { status: 201 })


};


