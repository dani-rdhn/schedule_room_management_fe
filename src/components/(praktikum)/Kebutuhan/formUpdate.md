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
  KebutuhanData: Prioritas;
  open: boolean; // Tambahkan prop open untuk mengatur status dialog
  onOpenChange: (open: boolean) => void; // Tambahkan prop untuk mengubah status dialog
}

interface RuanganOption {
    id: number;
    name: string;
}

// interface DialogFormUpdateProps {
//   roomData: Room;
//   open: boolean; // Tambahkan prop open untuk mengatur status dialog
//   onOpenChange: (open: boolean) => void; // Tambahkan prop untuk mengubah status dialog
// }

// export function DialogFormUpdate({ roomData }: { roomData: Room }) {
export function DialogFormUpdate({ KebutuhanData, open, onOpenChange }: DialogFormUpdateProps) {
  // const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const { data: session } = useSession(); // Use destructuring
  const [nama_modul, setNama_modul] = useState(KebutuhanData?.nama_modul || "");
  const [user_qty, setUser_qty] = useState(KebutuhanData?.user_qty || "");
  const [keterangan_modul, setKeterangan_modul] = useState(KebutuhanData?.keterangan_modul || "");
  const [status, setStatus] = useState(KebutuhanData?.status || "offline");
  const [select_pc, setSelect_pc] = useState(KebutuhanData?.status || "Pilih kebutuhan...");

  const [namaRuanganOptions, setRuanganOptions] = useState<RuanganOption[]>([]);

  // const openEditSheet = () => {
  //   setIsEditSheetOpen(true);
  // };

  const handleEditKebutuhan = async () => {
    console.log('handleEditKebutuhan called');
    try {
      const res = await fetch(`http://localhost:5000/kebutuhan-modul/${KebutuhanData.kebutuhan_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({ nama_modul, user_qty, keterangan_modul, status, select_pc}),
      });

      if (res.ok) {
        // Success handling (e.g., close dialog, refresh list)
        const data = await res.json(); // Ambil data dari respons jika ada
        console.log('Success:', data);
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
          <DialogTitle>Update Kebutuhan Modul Praktikum</DialogTitle>
          <DialogDescription>
           <div> Update kebutuhan yang akan dibutuhkan oleh setiap modul praktikum </div>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditKebutuhan();
          }}
        >
        <div className="">
          <div className="items-center my-3">
            <label htmlFor="name" className="font-medium">
              Nama Modul
            </label>
            <Input
              id="name"
              // defaultValue="@"
              className="h-[48px]"
              placeholder="@"
              value={nama_modul}
              onChange={(e) => setNama_modul(e.target.value)}
            />
          </div>
          <div className=" items-center my-3">
            <label htmlFor="qty" className="font-medium">
              Jumlah Praktikan
            </label>
            <Input
              id="qty"
              // defaultValue="@"
              className="h-[48px]"
              placeholder="@"
              value={user_qty}
              onChange={(e) => setUser_qty(e.target.value)}
            />
          </div>
          <div className=" items-center my-3">
            <label htmlFor="modul_name" className="font-medium">
              Keterangan Modul
            </label>
            <Input
              id="qty"
              // defaultValue="@"
              className="h-[48px]"
              placeholder="@"
              value={keterangan_modul}
              onChange={(e) => setKeterangan_modul(e.target.value)}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="pc" className="font-medium ">Kebutuhan PC</label>
            <select className="w-full border border-gray-300 h-[48px] rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="pc" value={select_pc} onChange={(e) => setSelect_pc(e.target.value)}>
              <option value="" style={{ color: "gray" }}>Pilih kebutuhan...</option> 
              <option value="Tanpa PC">Tanpa PC</option>
              <option value="Medium End">Medium End</option>
              <option value="High End">High End</option>
            </select>
          </div>

          <div>
            <label htmlFor="lokasi">Lokasi Praktikum:</label>
            <select className="w-full border border-gray-300 h-[48px] rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="lokasi" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="" style={{ color: "gray" }}>Pilih kebutuhan...</option> 
              <option value="online">online</option>
              <option value="offline">offline</option>
            </select>
          </div>
        </div>
        <DialogFooter className="mt-5">
          {/* <Button type="submit" variant="outline">Submit</Button> */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white md:h-[48px] h-[64px] md:text-md text-lg font-medium py-2 px-4 rounded-md">Submit</button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )

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
