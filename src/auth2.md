import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import type { NextAuthConfig } from "next-auth";
import { UserWithCookie } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login", // Define your sign-in page here
  },
   session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 5 * 60 * 1000
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<UserWithCookie | null> => {
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

        const rawCookie = response.headers.get('set-cookie');

        // If login is successful, return the necessary user data
        return {
          // id: data.id,
          uuid: data.uuid,
          name: data.name,
          email: data.email,
          role: data.role,
          cookie: rawCookie,
          // session: {
          //   user: data,
          //   // cookie: cookie
          // }
        };
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      // Assuming your JWT token is used to store session data on the backend
      if (user) { 
        // token.id = user.id; 
        token.uuid = user.uuid; 
        token.role = user.role;
        token.name = user.name; 
        token.cookie = user.cookie;
        // token.cookie = cookie;
      }
      console.log('JWT Token:', token);
      return token;
    },
    async session({ session, token }) { // Updated from 'session({session, user})'

      if (token) { // Check if the token exists
          // session.user.id = token.id as string; 
          session.user.uuid = token.uuid as string; 
          session.user.role = token.role as string; 
          session.cookie = token.cookie as string;
      }
      console.log('session:', session); 
      return session;
    },

    // async session({ session, token, user }) {
    //   if (token && typeof token.role === 'string') { 
    //     // session.user.name = token.name; 
    //     session.user.uuid = token.uuid as string; 
    //     session.user.role = token.role; 
    //     session.user.name = token.name; 
    //     // session.user.role = token.role; 
    //  } 
    //   return session;
    // }
    
    // async session({ session, user }) {
    //   if (session.user) { // Or a more specific check like session.user.id
    //     const response = await fetch('http://localhost:5000/me', { // Use the correct URL
    //       method: 'GET', // Change to GET if necessary
    //       headers: { 
    //         'Authorization': `Bearer ${session.accessToken || session.user.accessToken}` // Assuming your token is available in the session object 
    //       }
    //     });

    //     if (response.ok) {
    //       const data = await response.json(); 
    //       session.user.uuid = data.uuid;
    //       session.user.name = data.name;
    //       session.user.email = data.email;
    //       session.user.role = data.role; 
    //     } else {
    //       console.error('Backend API error:', response.status); // Log errors
    //     }
    //   }
    //   return session;
    // }
  //   async session({ session, token, user }: any) {
  //     // Send properties to the client, like an access_token and user id from a provider.
  //     session.accessToken = token.accessToken
  //     session.user.id = token.id
  //     session.user.role = token.role
      
  //     console.log('session:', session); 
  //     console.log('JWT Token (if used):', token); 
  //   return session
    
  // }
  },
});

// const config = {
//   providers: [Credentials],
//   callbacks: {
//     authorized({ request, auth }) {
//       const { pathname } = request.nextUrl;
//       if (pathname === "/middlewareProtected") return !!auth;
//       return true;
//     },
//   },
// } satisfies NextAuthConfig;