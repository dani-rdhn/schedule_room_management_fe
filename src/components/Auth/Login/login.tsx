'use client'
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SignInFormValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [formValues, setFormValues] = useState<SignInFormValues>({ username: '', password: '' });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error message

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
    setError(null); // Clear any previous error message on input change
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false, // Prevent automatic redirection
        ...formValues
      });

      if (result && !result.error) {
        // Login successful, handle it here  (e.g., redirect)
        router.push('/');
        console.log('Login successful!');
        // setIsLoading(false);
      } else {
        // Handle errors here
        // console.error('Login error:', result && !result.error);
        setError('Invalid username or password. Please try again.');
      }

      setIsLoading(false);
    } catch (error) {
      // Handle unexpected errors
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-10 md:p-16'>
      <div className='backdrop-blur-xl' style={{
        zIndex:-1,
        position: "fixed", 
        width: "100vw", 
        height: "100vh" 
      }}>
        <Image src="/images/tult_bg.png" fill style={{ objectFit: 'cover' }} alt='tult'/>
        {/* <Image src="/images/tult_bg.png" alt='tult' layout='fill' objectFit='cover' /> */}
      </div>
      <div className="flex flex-col justify-center px-12 py-12 bg-white border-4 lg:px-24 lg:py-24 rounded-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img className="w-auto h-10 mx-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/> */}
          <h2 className="text-3xl font-bold leading-9 tracking-tight text-center text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <form className="space-y-6" onSubmit={Auth}> */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* {isError && <p className="has-text-centered">{message}</p>} */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">username</label>
              <div className="mt-2">
                <input 
                  id="username" 
                  name="username" 
                  type="username" 
                  // value={username}
                  // onChange={(e) => setusername(e.target.value)}
                  value={formValues.username}
                  onChange={handleChange}
                  placeholder='isi username praktikum' 
                  autoComplete="username" 
                  required 
                  className="block w-full p-2 py-3 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input 
                  id="Password" 
                  name="password" 
                  type="password" 
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="******" 
                  autoComplete="current-password" 
                  required 
                  className="block w-full p-2 py-3 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                />
              </div>
            </div>
            <div>
                <div className="mt-10">
                <button type="submit" 
                        className="flex justify-center w-full px-3 py-5 text-xl font-semibold leading-6 text-white bg-indigo-500 rounded-md shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? 'Loading...' : 'Login'} 
                </button>
                </div>
            </div>
            {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
          </form>
        </div>
      </div>
    </main>
    )
}