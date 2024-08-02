'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState, useEffect } from "react"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"

import { ToastContainer, toast } from 'react-toastify';
import { notifySuccess, notifyError } from "@/components/toast/toast"
import 'react-toastify/dist/ReactToastify.css';

interface KebutuhanPraktikumOption {
    id: number;
    nama_modul: string;
}

interface ShiftOption {
    id: number;
    start_time: string;
    end_time: string;
    keterangan: string;
}

interface FormJadwalDialogProps {
  mutate: () => void;
}

export function FormJadwalDialog({ mutate }: FormJadwalDialogProps) {
  const [postMessage, setPostMessage] = useState('');
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const [kebutuhan_id, setKebutuhanId] = useState("");
  const [shift_id, setShiftId] = useState("");
  const [kode_asisten, setKodeAsisten] = useState("");
  const [tanggal, setTanggal] = useState("");

  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const [namaModulOptions, setNamaModulOptions] = useState<KebutuhanPraktikumOption[]>([]);
  const [shiftOptions, setShiftOptions] = useState<ShiftOption[]>([]);

  const handlePostJadwal = async () => {
    if (!kebutuhan_id || !shift_id || !kode_asisten || !tanggal) {
      notifyError('Semua field harus diisi!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/jadwal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({
          kebutuhan_id,
          shift_id,
          kode_asisten,
          tanggal,
        }),
      });

      if (res.ok) {
        setIsOpen(false);
        notifySuccess('Data Jadwal Praktikum berhasil disimpan.');
        mutate();
      } else {
        notifyError('Terjadi kesalahan.');
      }
    } catch (error) {
      console.error(error);
      notifyError('Terjadi kesalahan.');
    }
  };

  useEffect(() => {
    const userId = session?.user.uuid;
    if (userId) {
      fetch(`http://localhost:5000/kebutuhan-options-user?userId=${userId}`) // Kirim userId ke backend
        .then(res => res.json())
        .then(data => {
          console.log("Received data:", data); // Debug log
          setNamaModulOptions(data);
        })
        .catch(error => console.error("Error fetching kebutuhan-options:", error)); // Error handling

      fetch('http://localhost:5000/shifts-option')  // Sesuaikan dengan path endpoint Anda
        .then(res => res.json())
        .then(data => setShiftOptions(data))
        .catch(error => console.error("Error fetching shifts-option:", error)); // Error handling
    }
  }, [session?.user.uuid]);

  return (
    <>
      <ToastContainer />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="bg-blue-500 w-[180px] py-3 hover:bg-blue-700 text-white font-medium px-4 rounded-md">Input Jadwal</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Input Jadwal Praktikum</DialogTitle>
            <DialogDescription>
              Input jadwal pelaksanaan praktikum.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => { e.preventDefault(); handlePostJadwal(); }}>
            <div className="">
              {/* Nama Modul (Dropdown) */}
              <div className="items-center my-3">
                <label htmlFor="nama_modul" className="font-medium">Nama Modul:</label>
                <select 
                  id="nama_modul" 
                  value={kebutuhan_id} 
                  onChange={(e) => setKebutuhanId(e.target.value)}
                  className="w-full border border-gray-300 h-[48px] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                >
                  <option value="">Pilih Modul</option>
                  {Array.isArray(namaModulOptions) && namaModulOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.nama_modul}
                    </option>
                  ))}
                </select>
              </div>
              {/* Shift (Dropdown) */}
              <div className="items-center my-3">
                <label htmlFor="shift" className="font-medium">Shift:</label>
                <select 
                  id="shift"
                  value={shift_id} 
                  onChange={(e) => setShiftId(e.target.value)}
                  className="w-full border border-gray-300 h-[48px] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                >
                  <option value="">Pilih Shift</option>
                  {shiftOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.keterangan} ({option.start_time} - {option.end_time})
                    </option>
                  ))}
                </select>
              </div>
              <div className="items-center my-3">
                <label htmlFor="kapasitas" className="font-medium mb-2">
                  Tanggal
                </label>
                <Input
                  id="qty"
                  className="h-[48px]"
                  placeholder="@"
                  value={tanggal}
                  type="date"
                  onChange={(e) => setTanggal(e.target.value)}
                />
              </div>
              <div className="items-center my-3">
                <label htmlFor="kapasitas" className="font-medium mb-2">
                  Kode Asisten
                </label>
                <Input
                  id="kode_asisten"
                  className="h-[48px]"
                  placeholder="@"
                  value={kode_asisten}
                  onChange={(e) => setKodeAsisten(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="mt-5">
              <button className="bg-blue-500 hover:bg-blue-700 text-white md:h-[48px] h-[64px] md:text-md text-md font-medium py-2 px-4 rounded-md">Submit</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
