import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials"


// export const authOptions: AuthOptions = {
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    async authorize(credentials)  {
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
  session: {
    // strategy: "jwt", // Meskipun menggunakan cookie, JWT tetap dibutuhkan untuk menyimpan data user
    strategy: "jwt",
    maxAge: 5 * 60 * 1000 // 30 minutes
  },
  callbacks: {
  async jwt({ token, user }) {
      // Assuming your JWT token is used to store session data on the backend
      if (user) { 
        // token.id = user.id; 
        token.uuid = user.uuid; 
        token.role = user.role;
        token.name = user.name; 
        // token.cookie = user.cookie;
        // token.cookie = cookie;
      }
      console.log('JWT Token:', token);
      return token;
    },
  async session({ session, token }) {
    try {
      // Ambil data pengguna dari API backend (endpoint /me)
      const userResponse = await fetch("http://localhost:5000/me", {
        headers: {
          Cookie: `connect.sid=${token.sessionToken}`, 
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        session.user = userData; // Simpan data pengguna di session
        return {
          ...session, // Menyimpan data session yang sudah ada
          user: {
            ...session.user, // Menyimpan data user yang sudah ada
            uuid: userData.uuid,
            role: userData.role,
          },
        };
      }
     if (token) { // Check if the token exists
          // session.user.id = token.id as string; 
          session.user.uuid = token.uuid as string; 
          session.user.role = token.role as string; 
          // session.cookie = token.cookie as string;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Tangani error jika terjadi masalah saat mengambil data
    }
    
    console.log('session:', session); 
    return session;
  },
},
});

// export default NextAuth(authOptions);
