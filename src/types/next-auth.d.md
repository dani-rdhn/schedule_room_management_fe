import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      uuid?: string;
      name?: string;
      email?: string;
      role?: string;
    } & DefaultSession["user"];
    accessToken?: string; // Ini opsional, tergantung pada implementasi Anda
  }

  interface User {
    id: string;
    uuid?: string;
    name?: string;
    email?: string;
    role?: string;
    accessToken?: string;
  }

  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    accessToken?: string; // Ini opsional, tergantung pada implementasi Anda
  }
}


// import NextAuth from 'next-auth';

// declare module 'next-auth' {
//   interface User {
//     id: string;
//     uuid?: string;
//     name?: string;
//     email?: string;
//     role?: string; // Add the role property
//     accessToken?: string;
//     cookie: string | null;
//   }

//   interface Session {
//     user: User;   
//     accessToken: string;
//     role: string;
//     cookie: string;
//   }

//   interface JWT {
//     role: string; // Example of extending the JWT
//     // Add any other properties you need
//   }

//   interface UserWithCookie extends User {
//       cookie: string | null;    
//   }
// }