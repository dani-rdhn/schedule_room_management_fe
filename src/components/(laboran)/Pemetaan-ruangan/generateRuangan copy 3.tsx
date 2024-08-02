'use client';
import React, { useState, useEffect, useRef } from 'react';
import Schedule from '@/types/schedule';
import { RotateCwSquare, CloudUpload, ChevronLeft, ChevronRight } from 'lucide-react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useSession } from 'next-auth/react';
import { LoaderCircle } from 'lucide-react';

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
    conflict: string;
    conflictReason: string;
  };
}

type TooltipId = 'generate' | 'save'; // Define valid tooltip IDs

function LoadingSpinnerGenerate() {
  return (
    <div className="spinner flex space-x-2 mt-2">
      <div className="spinner border-4 border-t-4 border-blue-500 border-r-transparent rounded-full w-8 h-8 animate-spin"></div>
    </div>
  );
}

function LoadingSpinnerSave() {
  return (
    <div className="spinner flex space-x-2">
      <div className="spinner border-4 border-t-4 border-white border-r-transparent rounded-full w-6 h-6 animate-spin"></div>
    </div>
  );
}

function GenerateRuangan() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jadwalData, setJadwalData] = useState<BestSolution[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [conflictFilter, setConflictFilter] = useState<string | null>('Ya'); // Set default value to 'Ya'
  const [searchTerm, setSearchTerm] = useState<string>('');
  const generateButtonRef = useRef<HTMLButtonElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const [activeTooltip, setActiveTooltip] = useState<TooltipId | null>(null); 
  const { data: session, status } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const rowsPerPageOptions = [5, 10, 20, 30, 40, 50, 100];

  const handleGenerate = async () => {
    setIsLoading(true); // Mulai loading
    try {
      const response = await fetch('http://localhost:5000/run-genetic-algorithm');
      const data = await response.json();
      setSuggestions(data);

      // Fetch hasil JSON setelah generate selesai
      const resultResponse = await fetch('http://localhost:5000/results');
      const resultData = await resultResponse.json();
      setJadwalData(Array.isArray(resultData) ? resultData : []);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsLoading(false); // Akhiri loading
    }
  };

  const handleSaveSuggestions = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:5000/results/save', {
        method: 'POST',
      });

      if (response.ok) {
        alert('Results saved to database successfully');
      } else {
        console.error('Error saving suggestions');
      }
    } catch (error) {
      console.error('Error saving suggestions:', error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const storedJWT = localStorage.getItem('jwt');
        let jwtForRequest = storedJWT;
        if (storedJWT) {
          try {
            const decodedToken = jwtDecode<JwtPayload>(storedJWT);
            if (typeof decodedToken.exp === 'number' && decodedToken.exp > Date.now() / 1000) {
              // Token masih valid
            } else {
              localStorage.removeItem('jwt');
              jwtForRequest = null;
            }
          } catch (error) {
            console.error("Error decoding JWT:", error);
            localStorage.removeItem('jwt');
            jwtForRequest = null;
          }
        }

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
  }, [session?.user.jwt]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, conflictFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = jadwalData.filter((item) => {
    if (conflictFilter !== null && conflictFilter !== "") {
      const conflictValue = item.bestSolution?.conflict ? 'Tidak' : 'Ya';
      if (conflictValue !== conflictFilter) {
        return false;
      }
    }
    if (searchTerm !== "") {
      return item.bestSolution?.schedule.nama_praktikum.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const showTooltip = (tooltipId: TooltipId) => { // Change parameter type to TooltipId
    setActiveTooltip(tooltipId); 
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  const tooltips: Record<TooltipId, string> = { // Use Record type
    generate: 'Melakukan pemetaan ruangan praktikum dengan algoritma.',
    save: 'Menyimpan suggestion ke database',
  };

  return (
    <div>
      <div className="flex justify-between gap-3">
        <button
          ref={generateButtonRef}
          onClick={handleGenerate}
          className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2 items-center justify-center font-medium py-2 px-4 sm:max-w-[425px] rounded-lg h-14 sm:h-12 text-[12px] sm:text-[16px]"
          onMouseEnter={() => showTooltip('generate')}
          onMouseLeave={hideTooltip}
        >
          <RotateCwSquare />
          Generate Pemetaan Ruangan
        </button>

        <button
          ref={saveButtonRef}
          onClick={handleSaveSuggestions}
          className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2 items-center justify-center font-medium py-2 px-4 sm:max-w-[425px] rounded-lg h-14 sm:h-12 text-[12px] sm:text-[16px]"
          onMouseEnter={() => showTooltip('save')}
          onMouseLeave={hideTooltip}
          disabled={isLoading} // Disable button saat loading
        >
          {isSaving ? <LoadingSpinnerSave /> : <CloudUpload />}
          Gunakan Suggestion Ini
        </button>
      </div>

      {activeTooltip && (
        <div
          className="absolute z-10 bg-gray-800 text-white p-2 rounded-md shadow-md"
          style={{
            top: (activeTooltip === 'generate' ? generateButtonRef.current : saveButtonRef.current)?.offsetTop! + 
                 (activeTooltip === 'generate' ? generateButtonRef.current : saveButtonRef.current)?.offsetHeight! + 5,
            left: (activeTooltip === 'generate' ? generateButtonRef.current : saveButtonRef.current)?.offsetLeft,
          }}
        >
          {tooltips[activeTooltip]}
        </div>
      )}

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
          <option value="Ya">Ya</option> 
          <option value="Tidak">Tidak</option> 
        </select>
      </div>


      <div className="mt-4">
        <label htmlFor="searchTerm">Search Nama Praktikum:</label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-2 border rounded-lg p-2"
        />
      </div>

      {isLoading ? (
        <p className='text-lg mt-5'>Loading <LoadingSpinnerGenerate /></p>
      ) : (
        <div className="overflow-x-auto"> 
          <table className="min-w-full table-auto border-collapse mt-5 shadow-md rounded-lg border">
            <thead className="bg-white text-gray-600 border"> 
              <tr>
                <th className="border-b px-4 py-2 text-sm">Nama Praktikum</th>
                <th className="border-b px-4 py-2 text-sm">Nama Ruangan</th>
                <th className="border-b px-4 py-2 text-sm">Shift ID</th>
                <th className="border-b px-4 py-2 text-sm">Tanggal</th>
                <th className="border-b px-4 py-2 text-sm">Nama Modul</th>
                <th className="border-b px-4 py-2 text-sm">Status Praktikum</th>
                <th className="border-b px-4 py-2 text-sm">Konflik</th>
                <th className="border-b px-4 py-2 text-sm">Alasan Konflik</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? ( 
                currentItems.map((item) => ( 
                  <tr key={item.jadwal_id} className="hover:bg-gray-100 border-b border-l border-r">
                    <td className="px-4 py-2 text-sm">{item.bestSolution?.schedule.nama_praktikum ?? "-"}</td>
                    <td className="px-4 py-2 text-sm">{item.bestSolution?.room?.name ?? "-"}</td>
                    <td className="px-4 py-2 text-sm">{item.bestSolution?.schedule?.shift_id ?? "-"}</td>
                    <td className="px-4 py-2 text-sm">{item.bestSolution?.schedule?.tanggal ?? "-"}</td>
                    <td className="px-4 py-2 text-sm">{item.bestSolution?.kebutuhanPraktikum?.nama_modul ?? "-"}</td>
                    <td className="px-4 py-2 text-sm">{item.bestSolution?.kebutuhanPraktikum?.status ?? "-"}</td>
                    <td className="px-4 py-2 text-center text-sm"
                        style={{ color: item.bestSolution?.conflict ? 'blue' : 'red' }}>
                        {item.bestSolution?.conflict ? "Tidak" : "Ya"}
                    </td>
                    <td className="px-4 py-2 text-center text-sm"
                        style={{ color: item.bestSolution?.conflictReason ? 'blue' : 'red' }}>
                        {item.bestSolution?.conflictReason ?? "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-l border-r">
                  <td colSpan={7} className="text-center py-4">No results found</td>
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
          Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= filteredItems.length}
          className="px-3 py-1 bg-transparent rounded-lg ml-2 border-black-100 border-2"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default GenerateRuangan;
