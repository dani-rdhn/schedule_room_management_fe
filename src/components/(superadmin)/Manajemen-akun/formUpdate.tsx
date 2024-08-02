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
import User from "@/types/user";
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
import { Eye, EyeOff } from 'lucide-react';

import { notifySuccess, notifyError, notifyWarning } from "@/components/toast/toast"
import 'react-toastify/dist/ReactToastify.css';

interface DialogFormUpdateProps {
  userData: User;
  isOpen: boolean; // Tambahkan prop open untuk mengatur status dialog
  setIsOpen: (open: boolean) => void; // Tambahkan prop untuk mengubah status dialog
  mutate: () => void;
}

export function DialogFormUpdate({ userData, isOpen, setIsOpen, mutate }: DialogFormUpdateProps) {
  const { data: session } = useSession(); // Use destructuring
  const [jwt, setJwt] = useState<string | null>(null);

  const [name, setName] = useState(userData?.name || "");
  const [username, setUsername] = useState(userData?.username || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [role, setRole] = useState(userData?.role || "admin"); 
  const [password, setPassword] = useState(userData?.password || "");
  const [confPassword, setConfPassword] = useState(userData?.confPassword || "");
  const [lokasi, setLokasi] = useState(userData?.lokasi || "ruangan");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);

  const [roles, setRoles] = useState<string[]>([]);
  const [lokasis, setLokasis] = useState<string[]>([]);

  useEffect(() => {
    // Ambil roles dan lokasis dari localStorage saat komponen dimuat
    const storedRoles = localStorage.getItem('roles');
    const storedLokasis = localStorage.getItem('lokasis');
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    }
    if (storedLokasis) {
      setLokasis(JSON.parse(storedLokasis));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfPasswordVisibility = () => {
    setConfPasswordVisible(!confPasswordVisible);
  };

  const handleEditAkun = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/${userData.uuid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({ name, username, email, role, password, confPassword, lokasi }),
      });

      if (res.ok) {
        setIsOpen(false);
        notifyWarning('Data Akun berhasil diubah.');
        mutate();
      } else {
        const errorData = await res.json();
        console.error("Error editing jadwal:", errorData);
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Akun Praktikum</DialogTitle>
          <DialogDescription>
            Edit akun praktikum.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditAkun();
          }}
        >
          <div className="">
            <div className="items-center my-3">
              <Label htmlFor="name" className="text-right">
                Nama Akun
              </Label>
              <Input
                id="name"
                className="h-[48px]"
                placeholder="@"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="items-center my-3">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                className="h-[48px]"
                placeholder="@"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="items-center my-3">
              <Label htmlFor="role" className="font-medium text-sm">Role</Label>
              <select
                className="w-full border border-gray-300 h-[48px] text-sm rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((r, index) => (
                  <option key={index} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="items-center my-3">
              <Label htmlFor="lokasi" className="font-medium text-sm">Lokasi Praktikum</Label>
              <select
                className="w-full border border-gray-300 h-[48px] text-sm rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                id="lokasi"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
              >
                {lokasis.map((l, index) => (
                  <option key={index} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="items-center my-3">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  className="h-[48px]"
                  placeholder="@"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <EyeOff color="gray" /> : <Eye color="gray" />}
                </button>
              </div>
            </div>
            <div className="items-center my-3">
              <Label htmlFor="confPassword" className="text-right">
                Konfirmasi Ulang Password
              </Label>
              <div className="relative">
                <Input
                  id="confPassword"
                  type={confPasswordVisible ? "text" : "password"}
                  className="h-[48px]"
                  placeholder="@"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleConfPasswordVisibility}
                >
                  {confPasswordVisible ? <EyeOff color="gray" /> : <Eye color="gray" />}
                </button>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white md:h-[48px] h-[64px] md:text-md text-lg font-medium py-2 px-4 rounded-md">Submit</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}