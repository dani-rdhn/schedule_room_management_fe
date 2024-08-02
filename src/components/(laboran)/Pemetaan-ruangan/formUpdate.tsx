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

interface DialogFormUpdateProps {
  scheduleData: Schedule;
  open: boolean; // Tambahkan prop open untuk mengatur status dialog
  onOpenChange: (open: boolean) => void; // Tambahkan prop untuk mengubah status dialog
}

interface KebutuhanPraktikumOption {
    kebutuhan_id: number;
    nama_modul: string;
}

interface RoomOption {
    id: number;
    name: string;
}

interface ShiftOption {
    shift_id: number;
    start_time: string;
    end_time: string;
    keterangan: string;
}

interface ScheduleWithOptions extends Schedule {
  modulOptions: KebutuhanPraktikumOption[];
  shiftOptions: ShiftOption[];
  roomOptions: RoomOption[];
}

export function DialogFormUpdate({ scheduleData, open, onOpenChange }: DialogFormUpdateProps) {
  // const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const { data: session } = useSession(); // Use destructuring
  const [jwt, setJwt] = useState<string | null>(null);

  const [kebutuhan_id, setKebutuhanId] = useState(scheduleData?.kebutuhan_id || "");
  const [shift_id, setShiftId] = useState(scheduleData?.shift_id || "");
  const [kode_asisten, setKodeAsisten] = useState(scheduleData?.kode_asisten || "");
  const [tanggal, setTanggal] = useState(scheduleData?.tanggal || "");
  // const [room_id, setRoomId] = useState(scheduleData?.room_id || "");
  const [room_id, setRoomId] = useState<string | null>(scheduleData?.room_id || null);

  const [modulOptions, setModulOptions] = useState<KebutuhanPraktikumOption[]>(
    (scheduleData as ScheduleWithOptions)?.modulOptions || []
  );
  const [shiftOptions, setShiftOptions] = useState<ShiftOption[]>(
    (scheduleData as ScheduleWithOptions)?.shiftOptions || []
  );
  const [roomOptions, setRoomOptions] = useState<RoomOption[]>(
    (scheduleData as ScheduleWithOptions)?.roomOptions || []
  );

  const handleEditJadwal = async () => {
    try {
      console.log("Nilai kebutuhan_id sebelum dikirim:", kebutuhan_id);
      const res = await fetch(`http://localhost:5000/jadwal/${scheduleData.jadwal_id}`, { // Use roomData.id from the prop
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({ kebutuhan_id, shift_id, room_id, kode_asisten, tanggal}),
      });

      if (res.ok) {
        // Success handling (e.g., close dialog, refresh list)
        const responseData = await res.json();
        console.log("Response data untuk liat kebutuhan:", responseData);
        setIsOpen(false);
        window.location.reload();
      } else {
        const errorData = await res.json(); // Tangkap data error dari response
        console.error("Error editing jadwal:", errorData); 
      }
    } catch (error) {
      console.error("Error editing room:", error);
    }
  };

   useEffect(() => {
    if (session?.user.jwt) {
      setJwt(session.user.jwt);
    }

    const fetchData = async () => {  // Wrap fetches in an async function
      try {
        const modulResponse = await fetch('http://localhost:5000/kebutuhan-options-laboran');
        const modulData = await modulResponse.json();
        setModulOptions(modulData);

        const shiftResponse = await fetch('http://localhost:5000/shifts-option');
        const shiftData = await shiftResponse.json();
        setShiftOptions(shiftData);

        const roomResponse = await fetch('http://localhost:5000/rooms-options');
        const roomData = await roomResponse.json();
        setRoomOptions(roomData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function

  }, [session?.user.jwt, kebutuhan_id, shift_id, kode_asisten, tanggal, room_id]); // Add dependencies

  // useEffect(() => {
  //   if (session?.user.jwt) {
  //     setJwt(session.user.jwt);
  //   }
  // }, [session]);

  // useEffect(() => {
  //   //  const userId = session?.user.id;
    
  //   fetch('http://localhost:5000/kebutuhan-options-laboran') // Sesuaikan dengan path endpoint Anda
  //     .then(res => res.json())
  //       .then(data => setModulOptions(data));

  //   fetch('http://localhost:5000/shifts-option')  // Sesuaikan dengan path endpoint Anda
  //     .then(res => res.json())
  //     .then(data => setShiftOptions(data));
  // },);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Jadwal Praktikum</DialogTitle>
          <DialogDescription>
            Edit jadwal waktu untuk praktikum.
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
                <option key={option.kebutuhan_id} value={option.kebutuhan_id}>
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
                <option key={option.shift_id} value={option.shift_id}>
                  {option.keterangan} ({option.start_time} - {option.end_time})
                </option>
              ))}
            </select>
          </div>
          <div className="items-center my-3">
            <label htmlFor="room" className="font-medium">Room:</label>
            <select 
              id="shift"
              value={room_id || ""} 
              onChange={(e) => {
                const selectedValue = e.target.value === "" ? null : e.target.value;
                setRoomId(selectedValue); 
              }}
              className="w-full border border-gray-300 h-[48px] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
            >
              <option value="">Pilih Ruangan</option>
              {roomOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
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
