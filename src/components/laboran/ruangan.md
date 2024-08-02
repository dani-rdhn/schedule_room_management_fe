'use client';
import React from 'react';
import { useRouter, redirect } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'; // Re-introduce useSession
import { useState, useEffect } from 'react';
import ProtectedPages from '../protected';
// import { Room } from '../../types/room';
import Room from '@/types/room'

const RoomsDashboard = () => {
  const { data: session, status } = useSession();
  const [rooms, setRooms] = useState<Room[]>([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchRooms = async () => {
      if (!session || session.user.role !== 'admin') return; // Early return if not allowed

      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/rooms', {
          headers: {
            'Authorization': `Bearer ${session.accessToken}` // Assuming NextAuth structure
          },
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch rooms data');
        }
        const data: Room[] = await response.json(); 
        setRooms(data);
      } catch (error) { 
        if (error instanceof Error) { 
          setError(error.message);
        } else {
          setError('An unknown error occurred'); 
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [session]); // Fetch when session changes

 if (status === 'loading') return <div>Loading...</div> 
 if (!session) {
   return <><ProtectedPages/></>
  }
  if (session && session.user.role !== 'admin') {
    return <p>Access Denied</p>
  }

  return (
    <>
        <div>Dashboard Admin - User logged in</div> 
        <button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button>

      {isLoading && <p>Loading rooms...</p>} 
      {error && <p>Error: {error}</p>} 
      {!isLoading && !error && rooms && ( 
        <ul>
          {rooms.map((room) => (
            <li key={room.uuid}>
              <h3>{room.name}</h3>
              <p>Quantity: {room.qty}</p>
              <p>PC Spec: {room.pc}</p>
            </li>
          ))}  
        </ul>
      )}
    </>
  )
};

export default RoomsDashboard;