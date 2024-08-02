'use client'
import { useState } from 'react';

interface SignInFormValues {
  email: string;
  password: string;
}

export function SignIn2() {
  const [formValues, setFormValues] = useState<SignInFormValues>({ email: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      // Handle error if login fails (e.g., display an error message)
      const errorData = await response.json();
      console.error('Login error:', errorData); 
    } else {
      // Redirect to a protected page or handle successful login
    }
  }

  return (
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
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
