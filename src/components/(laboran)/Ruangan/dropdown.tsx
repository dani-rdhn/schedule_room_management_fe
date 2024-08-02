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
import { SheetRuangan } from "./sheet";
// import { DialogRuangan } from "./dialog";
import Room from "@/types/room";

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

export function DropdownMenuRuangan({ roomData }: { roomData: Room }) {
  // const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const { data: session } = useSession(); // Use destructuring
  const [name, setName] = useState(roomData?.name || ""); // Initialize with existing data
  const [qty, setQty] = useState(roomData?.qty || "");
  const [pc, setPc] = useState(roomData?.pc || "no pc");
  const [lokasi, setLokasi] = useState(roomData?.lokasi || "ruangan");

  // const openEditSheet = () => {
  //   setIsEditSheetOpen(true);
  // };

  const handleEditRoom = async () => {
    try {
      const res = await fetch(`http://localhost:5000/rooms/${roomData.id}`, { // Use roomData.id from the prop
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({ name, qty, pc, lokasi }),
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
    <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-3 bg-indigo-500 text-white rounded-md" onClick={() => setIsOpen(true)}>
                <Pencil className="mr-2 h-4 w-4"/>
                <span> Edit </span>
                {/* <SheetRuangan /> */}
                {/* <DialogRuangan /> */}
            </DropdownMenuItem>
            <DropdownMenuItem className="py-3 mt-1 bg-rose-500 text-white rounded-md">
                <Trash2 className="mr-2 h-4 w-4"/>
                <span> Delete </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  <span>Make changes to your profile here. Click save when you done.</span>
                </DialogDescription>
              </DialogHeader>
               <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditRoom();
                  }}
                >
                <div className="">
                  <div className="items-center my-3">
                    <Label htmlFor="name" className="text-right">
                      Nama Ruangan
                    </Label>
                    <Input
                      id="name"
                      // defaultValue="@"
                      className="h-[48px]"
                      placeholder="@"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className=" items-center my-3">
                    <Label htmlFor="username" className="text-right">
                      Kapasitas Ruangan
                    </Label>
                    <Input
                      id="qty"
                      // defaultValue="@"
                      className="h-[48px]"
                      placeholder="@"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="pc" className="font-medium ">Kebutuhan PC</label>
                    <select className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="pc" value={pc} onChange={(e) => setPc(e.target.value)}>
                      <option value="Tanpa PC">Tanpa PC</option>
                      <option value="Medium End">Medium End</option>
                      <option value="High End">High End</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="lokasi">Lokasi Praktikum:</label>
                    <select className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
                      <option value="bengkel">Bengkel</option>
                      <option value="ruangan">Ruangan</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  {/* <Button type="submit" variant="outline">Submit</Button> */}
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">Submit</button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
      </>
  )
}
