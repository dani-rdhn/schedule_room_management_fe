'use client';
import React from 'react';
import { useRouter, redirect } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'; // Re-introduce useSession
import { useState, useEffect } from 'react';
import ProtectedPages from '../protected';
// import { Room } from '../../types/room';
// import Room from '@/types/room'
import axios from 'axios';
// import axios from '@/lib/axios';

interface Room {
  uuid: string; 
  name: string; 
  qty: number; 
  pc: string; 
}

const RoomsDashboard = () => {
  const { data: session, status } = useSession();
  const [rooms, setRooms] = useState<Room[]>([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchRooms = async () => {
      if (!session || session.user.role !== 'admin') return; 

      setIsLoading(true);
      setError(null);

      try {
        // No need for userId here anymore
        const response = await axios.get<Room[]>("http://localhost:5000/rooms", {withCredentials: true}); 
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error); 
        setError('Failed to fetch rooms.'); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [session]); // Dependency array for useEffect

  if (status === 'loading') return <div>Loading...</div> 
  if (!session) {
    return <><ProtectedPages/></>
  }
  if (session && session.user.role !== 'admin') {
    return <p>Access Denied</p>
  }

  return (
    <>
      <div>Ruangan Admin - User logged in</div> 
      <button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button>
      {JSON.stringify(session?.user)}
      {/* {console.log('Session Data:', session)}  */}

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