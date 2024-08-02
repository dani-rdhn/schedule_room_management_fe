import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    uuid?: string;
    name?: string;
    email?: string;
    role?: string; // Add the role property
    accessToken?: string;
    // cookie: string | null;
  }

  interface Session {
    user: {
      jwt?: string;
      name?: string | null; // Or any other properties from your User object
      email?: string | null;
      image?: string | null;
      role?: string; // Make sure this matches your actual property
    } & DefaultSession["user"];
  }

  // interface Session {
  //   user: User;   
  //   accessToken: string;
  //   role: string;
  //   // cookie: string;
  // }

  interface JWT {
    role: string; // Example of extending the JWT
    // Add any other properties you need
  }

  interface User extends DefaultUser {
    uuid?: string; // Or any other properties from your User object
    role?: string; // Make sure this matches your actual property
  }

  // interface UserWithCookie extends User {
  //     cookie: string | null;    
  // }
}

// declare module "next-auth" {
//     interface Session {
//         user: {
//             uuid?: string;
//             name?: string;
//             email?: string;
//             role?: string;
//             accessToken?: string; // Add accessToken here
//         } & DefaultSession["user"]; // Include default user properties
//     }

//     interface JWT {
//         accessToken?: string; // Add accessToken here
//     }
// }

// import NextAuth, { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//     interface Session {
//     user: {
//       id: string;
//       name?: string;
//       email?: string;
//       role?: string;
//     } & DefaultSession["user"];
//   }

//   interface User {
//     id: string;
//     uuid?: string;
//     name?: string;
//     email?: string;
//     role?: string;
//     accessToken?: string;
//   }
// }