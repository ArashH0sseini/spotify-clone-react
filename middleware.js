import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'



const secret = process.env.JWT_SECRET

export async function middleware(req) {

    //Token will exist if user is logged in
    const token = await getToken({ req, secret });

    const { pathname, origin } = req.nextUrl


    //Allow the requests if the following is true...
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // // Redirect them to login if they dont have token AND are requesting a protected route
    // if (!token) {
    //     return NextResponse.redirect(`http://localhost:3000/login/`)
    // }
}