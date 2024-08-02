import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import type { NextAuthConfig } from "next-auth";
// import { UserWithCookie } from "next-auth";
import jwt from "jsonwebtoken"; // Import the jwt library

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login", // Define your sign-in page here
  },
   session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // maxAge: 5 * 60 * 1000 //5 menit
    maxAge: 1800000,
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
    //   authorize: async (credentials): Promise<UserWithCookie | null> => {
      async authorize(credentials) {
      // authorize: async (credentials) => {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log('Login API Response Data:', data);
        // console.log('Response Data headerss:', response.headers.get('set-cookie'))


        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong during login');
        }

        if (!data.role) {
          throw new Error('User role is missing from the login response');
        }

        // const rawCookie = response.headers.get('set-cookie');

        // If login is successful, return the necessary user data
        return {
          id: data.id,
          uuid: data.uuid,
          name: data.name,
          email: data.email,
          role: data.role,
        };
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      // Assuming your JWT token is used to store session data on the backend
      // console.log('User data in JWT callback:', user);
      if (user) { 
        token.id = user.id; 
        token.uuid = user.uuid; 
        token.role = user.role;
        token.name = user.name; 
        token.jwt = jwt.sign(
        { id: user.id, uuid: user.uuid, role: user.role, name: user.name, email: user.email },
            // process.env.JWT_SECRET
          "3234ewfubfeukksbdei783dbbasb3h38bcbschsbazmv2d",
            // { expiresIn: '24h' }
        );
      } else {
        // Pada panggilan selanjutnya, ambil data pengguna dari token yang sudah ada:
        // console.log("Using existing token data:", token);
      }
      // console.log('JWT Token:', token);
      return token;
    },
    async session({ session, token }) { // Updated from 'session({session, user})'

      if (token) { // Check if the token exists
          session.user.id = token.id as string; 
          session.user.uuid = token.uuid as string; 
          session.user.role = token.role as string; 
          session.user.jwt = token.jwt;
        //   session.cookie = token.cookie as string;
      }
      // console.log('session:', session); 
      return session;
    },
  },
//   secret: process.env.NEXTAUTH_SECRET
//   secret: process.env.AUTH_SECRET
//   secret: process.env.JWT_SECRET
});