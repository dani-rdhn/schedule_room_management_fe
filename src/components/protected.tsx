import React from 'react'
import { useRouter } from 'next/navigation';

export default function ProtectedPages() {
  const router = useRouter();
  
  return (
    <div>
      <div>
        <h1>Protected Pages, go back</h1>
        <button onClick={() => router.back()}>Back</button>
        {/* <button onClick={() => router.push('/login')}>Back</button> */}
      </div>
    </div>
  )
}
