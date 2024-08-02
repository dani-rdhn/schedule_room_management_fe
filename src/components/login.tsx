'use client'
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

interface SignInFormValues {
  email: string;
  password: string;
}

export function Login() {
  const [formValues, setFormValues] = useState<SignInFormValues>({ email: '', password: '' });
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await signIn('credentials', { 
      redirect: false, // Prevent automatic redirection
      ...formValues
    });

    if (result && !result.error) {
      // Login successful, handle it here  (e.g., redirect)
      router.push('/dashboard');
      console.log('Login successful!');
    } else {
      // Handle errors here
      console.error('Login error:', result && !result.error);
    }
  }

  // Conditional Rendering based on Session
  if (status === "loading") {
    return <div>Loading...</div> 
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email || 'Unknown User'} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  // Login form
  return (
    // Add your Tailwind CSS form container and styling here 
     <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-xs p-6 rounded-md shadow-md bg-gray-50">
        <h2 className="text-black text-2xl font-semibold text-center mb-4">Sign In</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formValues.email}
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formValues.password}
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

