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
import { useState } from 'react';
// import { SheetRuangan } from "./sheet";
// import { DialogRuangan } from "./dialog";
import Room from "@/types/room";
import Prioritas from "@/types/prioritas";
import Shift from "@/types/shift";
// import { format } from 'date-fns';

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
  shiftData: Shift;
  open: boolean; // Tambahkan prop open untuk mengatur status dialog
  onOpenChange: (open: boolean) => void; // Tambahkan prop untuk mengubah status dialog
}

// interface DialogFormUpdateProps {
//   roomData: Room;
//   open: boolean; // Tambahkan prop open untuk mengatur status dialog
//   onOpenChange: (open: boolean) => void; // Tambahkan prop untuk mengubah status dialog
// }

// export function DialogFormUpdate({ roomData }: { roomData: Room }) {
export function DialogFormUpdate({ shiftData, open, onOpenChange }: DialogFormUpdateProps) {
  // const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const { data: session } = useSession(); // Use destructuring
  const [start_time, setStartTime] = useState(shiftData?.start_time || ""); // HH:mm format
  const [end_time, setEndTime] = useState(shiftData?.end_time || "");
  const [keterangan, setKeterangan] = useState(shiftData?.keterangan || "");

  // const openEditSheet = () => {
  //   setIsEditSheetOpen(true);
  // };

  const handleEditShift = async () => {
    try {
      const res = await fetch(`http://localhost:5000/shifts/${shiftData.id}`, { // Use roomData.id from the prop
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({ start_time, end_time, keterangan }),
      });

      if (res.ok) {
        // Success handling (e.g., close dialog, refresh list)
        setIsOpen(false);
        window.location.reload();
      } else {
        // Error handling
      }
    } catch (error) {
      console.error("Error editing room:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Shift Praktikum</DialogTitle>
          <DialogDescription>
            Edit shift waktu untuk praktikum.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditShift();
          }}
        >
          <div className="grid gap-4">
            <div>
              <Label htmlFor="startTime">Waktu Mulai (HH:mm)</Label>
              <Input 
                id="startTime" 
                type="time" 
                // value={start_time} 
                value={start_time instanceof Date ? start_time.toLocaleTimeString() : start_time}
                onChange={(e) => setStartTime(e.target.value)} 
              />
            </div>
            <div>
              <Label htmlFor="endTime">Waktu Selesai (HH:mm)</Label>
              <Input 
                id="endTime" 
                type="time" 
                // value={end_time} 
                value={end_time instanceof Date ? end_time.toLocaleTimeString() : end_time}
                onChange={(e) => setEndTime(e.target.value)} 
              />
            </div>
            <div>
              <Label htmlFor="keterangan">Keterangan</Label>
              <Input 
                id="keterangan" 
                value={keterangan} 
                onChange={(e) => setKeterangan(e.target.value)} 
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">Submit</button>
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
