import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwt from "jsonwebtoken"; // Import the jwt library

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret"; // Provide a default secret for development

if (!process.env.JWT_SECRET) {
  console.warn("Warning: JWT_SECRET is not defined. Using default secret.");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login", // Define your sign-in page here
  },
  session: {
    strategy: "jwt",
    maxAge: 1800000,
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong during login');
        }

        if (!data.role) {
          throw new Error('User role is missing from the login response');
        }

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
      if (user) { 
        token.id = user.id; 
        token.uuid = user.uuid; 
        token.role = user.role;
        token.name = user.name; 
        token.jwt = jwt.sign(
          { id: user.id, uuid: user.uuid, role: user.role, name: user.name, email: user.email },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.uuid = token.uuid;
        session.user.role = token.role;
        session.user.jwt = token.jwt;
      }
      return session;
    },
  },
});
