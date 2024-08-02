"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
// type Checked = DropdownMenuCheckboxItemProps["checked"]
import { useState, useEffect } from 'react';
// import { SheetRuangan } from "./sheet";
// import { DialogRuangan } from "./dialog";
import Room from "@/types/room";
import Prioritas from "@/types/prioritas";
// import Shift from "@/types/shift";
import Schedule from "@/types/schedule";
// import { format } from 'date-fns';
import { format } from 'date-fns';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react";

import { ToastContainer} from 'react-toastify';
import { notifySuccess, notifyError, notifyWarning } from "@/components/toast/toast"
import 'react-toastify/dist/ReactToastify.css';

interface DialogFormUpdateProps {
  scheduleData: Schedule;
  isOpen: boolean; // Tambahkan prop open untuk mengatur status dialog
  setIsOpen: (open: boolean) => void; // Tambahkan prop untuk mengubah status dialog
  mutate: () => void;
}

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

interface ScheduleWithOptions extends Schedule {
  modulOptions: KebutuhanPraktikumOption[];
  shiftOptions: ShiftOption[];
}

export function DialogFormUpdate({ scheduleData, isOpen, setIsOpen, mutate }: DialogFormUpdateProps) {
  // const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false); 
  const { data: session } = useSession(); // Use destructuring
  const [jwt, setJwt] = useState<string | null>(null);

  const [kebutuhan_id, setKebutuhanId] = useState(scheduleData?.kebutuhan_id || "");
  const [shift_id, setShiftId] = useState(scheduleData?.shift_id || "");
  const [kode_asisten, setKodeAsisten] = useState(scheduleData?.kode_asisten || "");
  const [tanggal, setTanggal] = useState(scheduleData?.tanggal || "");

  const [modulOptions, setModulOptions] = useState<KebutuhanPraktikumOption[]>(
    (scheduleData as ScheduleWithOptions)?.modulOptions || []
  );
  const [shiftOptions, setShiftOptions] = useState<ShiftOption[]>(
    (scheduleData as ScheduleWithOptions)?.shiftOptions || []
  );

  const handleEditJadwal = async () => {
    try {
      console.log("Nilai kebutuhan_id sebelum dikirim:", kebutuhan_id);
      const res = await fetch(`http://localhost:5000/jadwal/${scheduleData.id}`, { // Use roomData.id from the prop
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({kebutuhan_id, shift_id, kode_asisten, tanggal}),
      });

      if (res.ok) {
        // Success handling (e.g., close dialog, refresh list)
        setIsOpen(false);
        notifyWarning('Data Jadwal berhasil diubah.');
        mutate();
        // window.location.reload();

      } else {
        // const errorData = await res.json(); // Tangkap data error dari response
        // console.error("Error editing jadwal:", errorData); 
        notifyError('Terjadi kesalahan');
      }
    } catch (error) {
      console.error("Error editing room:", error);
      notifyError('Terjadi kesalahan');
    }
  };

  useEffect(() => {
    if (session?.user.jwt) {
      setJwt(session.user.jwt);
    }
  }, [session]);

  useEffect(() => {
    const userId = session?.user.uuid;
    if (userId) {
      fetch(`http://localhost:5000/kebutuhan-options-user?userId=${userId}`) // Kirim userId ke backend
        .then(res => res.json())
        .then(data => {
          console.log("Received data:", data); // Debug log
          setModulOptions(data);
        })
        .catch(error => console.error("Error fetching kebutuhan-options:", error)); // Error handling

      fetch('http://localhost:5000/shifts-option')  // Sesuaikan dengan path endpoint Anda
        .then(res => res.json())
        .then(data => setShiftOptions(data))
        .catch(error => console.error("Error fetching shifts-option:", error)); // Error handling
    }
  }, [session?.user.uuid]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Jadwal Praktikum</DialogTitle>
          <DialogDescription>
            Edit jadwal untuk praktikum.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditJadwal();
          }}
        >
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
              {modulOptions.map(option => (
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
          <div className=" items-center my-3">
            <label htmlFor="kapasitas" className="font-medium mb-2">
              Tanggal
            </label>
           <Input
              id="qty"
              className="h-[48px]"
              placeholder="@"
              value={tanggal ? format(tanggal, 'yyyy-MM-dd') : ''} // Konversi tanggal ke string
              type="date"
              onChange={(e) => setTanggal(new Date(e.target.value))} // Ubah string kembali ke Date saat onChange
            />
          </div>
          <div className=" items-center my-3">
            <label htmlFor="kapasitas" className="font-medium mb-2">
              Kode Asisten
            </label>
            <Input
              id="kode_asisten"
              // defaultValue="@"
              className="h-[48px]"
              placeholder="@"
              value={kode_asisten}
              onChange={(e) => setKodeAsisten(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="mt-5">
          {/* <Button type="submit" variant="outline">Submit</Button> */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white md:h-[48px] h-[64px] md:text-md text-md font-medium py-2 px-4 rounded-md">Submit</button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  // return (
  //   <>
  //     {/* <Dialog open={isOpen} onOpenChange={setIsOpen}> */}
  //       <Dialog open={open} onOpenChange={onOpenChange}>
  //           <DialogContent className="sm:max-w-[425px]">
  //             <DialogHeader>
  //               <DialogTitle>Edit profile</DialogTitle>
  //               <DialogDescription>
  //                 <span>Make changes to your profile here. Click save when you done.</span>
  //               </DialogDescription>
  //             </DialogHeader>
  //              <form
  //                 onSubmit={(e) => {
  //                   e.preventDefault();
  //                   handleEditRoom();
  //                 }}
  //               >
  //               <div className="">
  //                 <div className="items-center my-3">
  //                   <Label htmlFor="name" className="text-right">
  //                     Nama Ruangan
  //                   </Label>
  //                   <Input
  //                     id="name"
  //                     // defaultValue="@"
  //                     className="h-[48px]"
  //                     placeholder="@"
  //                     value={name}
  //                     onChange={(e) => setName(e.target.value)}
  //                   />
  //                 </div>
  //                 <div className=" items-center my-3">
  //                   <Label htmlFor="username" className="text-right">
  //                     Kapasitas Ruangan
  //                   </Label>
  //                   <Input
  //                     id="qty"
  //                     // defaultValue="@"
  //                     className="h-[48px]"
  //                     placeholder="@"
  //                     value={qty}
  //                     onChange={(e) => setQty(e.target.value)}
  //                   />
  //                 </div>
  //                 <div className="mb-3">
  //                 <label htmlFor="pc" className="font-medium ">Kebutuhan PC</label>
  //                   <select className="w-full border border-gray-300 h-[48px] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="pc" value={pc} onChange={(e) => setPc(e.target.value)}>
  //                     <option value="Tanpa PC">Tanpa PC</option>
  //                     <option value="Medium End">Medium End</option>
  //                     <option value="High End">High End</option>
  //                   </select>
  //                 </div>

  //                 <div>
  //                   <label htmlFor="lokasi">Lokasi Praktikum:</label>
  //                   <select className="w-full border border-gray-300 h-[48px] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
  //                     <option value="bengkel">Bengkel</option>
  //                     <option value="ruangan">Ruangan</option>
  //                   </select>
  //                 </div>
  //               </div>
  //               <DialogFooter className="mt-5">
  //                 {/* <Button type="submit" variant="outline">Submit</Button> */}
  //                 <button className="bg-blue-500 hover:bg-blue-700 text-white md:h-[48px] h-[64px] md:text-md text-lg font-medium py-2 px-4 rounded-md">Submit</button>
  //               </DialogFooter>
  //             </form>
  //           </DialogContent>
  //         </Dialog>
  //     </>
  // )
}
