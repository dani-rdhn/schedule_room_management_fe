import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, EyeOff } from 'lucide-react';
import User from "@/types/user"
import { useState, useEffect } from "react"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { ToastContainer, toast } from 'react-toastify';
import { notifySuccess, notifyError } from "@/components/toast/toast"
import 'react-toastify/dist/ReactToastify.css';

interface FormAkunDialogProps {
  mutate: () => void;
}

export function FormCreateAkun({ mutate }: FormAkunDialogProps) {
  const [postMessage, setPostMessage] = useState('');
  const { data: session } = useSession();
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("admin"); 
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [lokasi, setLokasi] = useState("0");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfPasswordVisibility = () => {
    setConfPasswordVisible(!confPasswordVisible);
  };

  const handlePostAkun = async () => {
    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({
          name,
          username,
          role,
          password,
          confPassword,
          lokasi,
        }),
      });

      if (res.ok) {
        // setIsOpen(false);
        notifySuccess('Data Akun berhasil disimpan.');
        mutate();

      } else {
        setPostMessage('Error creating shift');
        notifyError('Terjadi kesalahan.');
      }
    } catch (error) {
      // setPostMessage('An error occurred');
      console.error(error);
      notifyError('Terjadi kesalahan.');
    }
  };
    
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Buat Akun Baru</CardTitle>
        <CardDescription>Membuat akun baru untuk praktikum</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handlePostAkun(); }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" placeholder="Nama akun" value={name} onChange={(e) => {
                setName(e.target.value);
              }} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">username</Label>
              <Input id="name" placeholder="username akun, digunakan untuk login" value={username} onChange={(e) => {
                setUsername(e.target.value);
              }} />
            </div>
            <div className="flex flex-col space-y-1.5">
                <label htmlFor="pc" className="font-medium text-sm">Role</label>
                <select className="w-full border border-gray-300 h-[48px] text-sm rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="pc" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="laboran">Laboran</option>
                    <option value="praktikum">Praktikum</option>
                </select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <label htmlFor="pc" className="font-medium text-sm">Lokasi</label>
                <select className="w-full border border-gray-300 h-[48px] text-sm rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="pc" value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
                    <option value="-">-</option>
                    <option value="ruangan">Ruangan</option>
                    <option value="bengkel">Bengkel</option>
                </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={passwordVisible ? "text" : "password"} 
                  placeholder="Password" 
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confPassword">Konfirmasi Ulang Password</Label>
              <div className="relative">
                <Input 
                  id="confPassword" 
                  type={confPasswordVisible ? "text" : "password"} 
                  placeholder="Konfirmasi ulang password" 
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
            <div className="mt-5 mr-4">
                {/* <Button variant="outline">Cancel</Button> */}
                {/* <Button variant="outline">Submit</Button> */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white md:h-[48px] h-[64px] md:text-md text-md font-medium py-2 px-4 rounded-md">Submit</button>
            </div>
        </form>
      </CardContent>
    </Card>
  )
}
