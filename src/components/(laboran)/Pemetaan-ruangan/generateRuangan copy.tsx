'use client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Schedule from '@/types/schedule';
import { format } from 'date-fns';
import { RotateCwSquare, CloudUpload, ChevronLeft, ChevronRight } from 'lucide-react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useSession } from 'next-auth/react';

interface Suggestion {
  jadwal_id: number;
  shift_id: number;
  tanggal: string;
  kebutuhan_id: number;
}

interface BestSolution {
  jadwal_id: number;
  bestSolution: {
    user: {
      id: number;
      name: string;
      role: number;
      lokasi: string;
    };
    room: {
      id: number;
      name: string;
      qty: number;
      pc: string;
      lokasi: string;
    };
    kebutuhanPraktikum: {
      id: number;
      status: string;
      select_pc: string;
      user_qty: number;
      priority_ruangan: number;
      nama_modul: string;
      user_id: string;
    };
    schedule: {
      jadwal_id: number;
      shift_id: number;
      tanggal: string;
      kebutuhan_id: number;
      user_id: string;
      nama_praktikum: string;
    };
    fitness: number;
    // conflict: string;
    conflict: boolean;
  };
}


function GenerateRuangan() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Menambahkan state isLoading
  const [jadwalData, setJadwalData] = useState<BestSolution[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Batasan jumlah baris data per halaman
  const [conflictFilter, setConflictFilter] = useState<string | null>(null); 
  const { data: session, status } = useSession();

  const rowsPerPageOptions = [5, 10, 20, 30, 40, 50, 100];

  const handleGenerate = async () => {
    try {
      const response = await fetch('http://localhost:5000/run-genetic-algorithm');
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      // Tampilkan pesan error kepada pengguna
    }
  };

  const handleSaveSuggestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/results/save', {
        method: 'POST',
      }); // Hapus bagian body

      if (response.ok) {
        alert('Results saved to database successfully');
      } else {
        // Handle error (e.g., show an error message)
        console.error('Error saving suggestions');
      }
    } catch (error) {
      console.error('Error saving suggestions:', error);
    }
  };


   useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const storedJWT = localStorage.getItem('jwt');

        // Use the stored JWT for the request if it exists and is valid
        let jwtForRequest = storedJWT;
        if (storedJWT) {
          try {
            const decodedToken = jwtDecode<JwtPayload>(storedJWT);
            if (typeof decodedToken.exp === 'number' && decodedToken.exp > Date.now() / 1000) {
              // JWT is valid and not expired
            } else {
              localStorage.removeItem('jwt');
              jwtForRequest = null;
            }
          } catch (error) {
            // Handle decoding errors
            console.error("Error decoding JWT:", error);
            localStorage.removeItem('jwt');
            jwtForRequest = null;
          }
        }

        // Fallback to session JWT if stored JWT is invalid or doesn't exist
        if (!jwtForRequest && session?.user?.jwt) {
          jwtForRequest = session.user.jwt;
        }

        const response = await fetch('http://localhost:5000/results', {
          headers: {
            Authorization: `Bearer ${jwtForRequest}`,
          },
        });

        const jsonData: BestSolution[] = await response.json();
        setJadwalData(Array.isArray(jsonData) ? jsonData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, conflictFilter, session?.user.jwt]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(jadwalData) ? jadwalData.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredItems = currentItems.filter((item) => {
    if (conflictFilter === null || conflictFilter === "") return true;
    return item.bestSolution?.conflict.toString() === conflictFilter;
  });

  return (
    <div>
      <div className='flex justify-between gap-3'> 
        <button onClick={handleGenerate} className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2 items-center justify-center font-medium py-2 px-4 sm:max-w-[425px] rounded-lg h-14 sm:h-12 text-[12px] sm:text-[16px]">
          <RotateCwSquare />
          Generate Pemetaan Ruangan
        </button>
        <button onClick={handleSaveSuggestions} className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2 items-center justify-center font-medium py-2 px-4 sm:max-w-[425px] rounded-lg h-14 sm:h-12 text-[12px] sm:text-[16px]">
          <CloudUpload />
          Gunakan Suggestion Ini
        </button>
      </div>

      <div className="mt-4">
        <label htmlFor="rowsPerPage">Rows per page</label>
        <select
          id="rowsPerPage"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="ml-2 border rounded-lg p-1"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="conflictFilter">Filter by Conflict:</label>
        <select
          id="conflictFilter"
          value={conflictFilter ?? ''} 
          onChange={(e) => setConflictFilter(e.target.value)} 
          className="ml-2 border rounded-lg p-1"
        >
          <option value="">All</option>
          <option value="true">True</option> 
          <option value="false">False</option> 
        </select>
      </div>

     {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto"> 
          <table className="min-w-full table-auto border-collapse mt-5 shadow-md rounded-lg">
            <thead className="bg-gray-200 text-black border-lg"> 
              <tr>
                <th className="border-b px-4 py-2 text-sm">Nama User</th>
                {/* <th className="border-b px-4 py-2 text-sm">ID User</th> */}
                <th className="border-b px-4 py-2 text-sm">Nama Ruangan</th>
                <th className="border-b px-4 py-2 text-sm">Shift ID</th>
                <th className="border-b px-4 py-2 text-sm">Tanggal</th>
                <th className="border-b px-4 py-2 text-sm">Nama Modul</th>
                {/* <th className="border-b px-4 py-2 text-sm">Kebutuhan ID</th> */}
                <th className="border-b px-4 py-2 text-sm">Status Praktikum</th>
                <th className="border-b px-4 py-2 text-sm">Conflict</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? ( // Conditionally render rows
               filteredItems.map((item) => ( 
                <tr key={item.jadwal_id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-sm">{item.bestSolution?.schedule.nama_praktikum ?? "-"}</td>
                  {/* <td className="border px-4 py-2 text-sm">{item.bestSolution?.schedule?.user_id ?? "-"}</td> */}
                  <td className="border px-4 py-2 text-sm">{item.bestSolution?.room?.name ?? "-"}</td>
                  {/* <td className="border px-4 py-2 text-sm">{item.bestSolution?.schedule?.shift_id ?? "-"}</td> */}
                  <td className="border px-4 py-2 text-sm">{item.bestSolution?.schedule?.shift_id ?? "-"}</td>
                  <td className="border px-4 py-2 text-sm">{item.bestSolution?.schedule?.tanggal ?? "-"}</td>
                  <td className="border px-4 py-2 text-sm">{item.bestSolution?.kebutuhanPraktikum?.nama_modul ?? "-"}</td>
                  {/* <td className="border px-4 py-2 text-sm">{item.bestSolution?.schedule?.kebutuhan_id ?? "-"}</td> */}
                  <td className="border px-4 py-2 text-sm">{item.bestSolution?.kebutuhanPraktikum?.status ?? "-"}</td>
                  {/* <td className="border px-4 py-2 text-center text-sm">{item.bestSolution?.conflict ?? "-"}</td>  */}
                  <td className="border px-4 py-2 text-center text-sm">{item.bestSolution?.conflict ? "true" : "false"}</td> 
                  {/* <td className="border px-4 py-2 text-center text-sm">{item.bestSolution?.conflict ? "✔️" : "❌"}</td>  */}
                </tr>
               ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">No results found</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      )}
       {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-transparent rounded-lg mr-2 border-black-100 border-2"
        >
          <ChevronLeft />
        </button>

        <span className="px-3 py-1 bg-white rounded-lg">
          Page {currentPage} of {Math.ceil(jadwalData.length / itemsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= jadwalData.length}
          className="px-3 py-1 bg-transparent rounded-lg ml-2 border-black-100 border-2"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default GenerateRuangan;
