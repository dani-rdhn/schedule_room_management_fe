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
import { Trash2 } from 'lucide-react';

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

  const [roles, setRoles] = useState<string[]>([]);
  const [lokasis, setLokasis] = useState<string[]>([]);
  const [newRole, setNewRole] = useState("");
  const [newLokasi, setNewLokasi] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfPasswordVisibility = () => {
    setConfPasswordVisible(!confPasswordVisible);
  };

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

  const handleAddRole = () => {
    const updatedRoles = [...roles, newRole];
    setRoles(updatedRoles);
    setNewRole("");
    // Simpan roles ke localStorage
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
  };

  const handleAddLokasi = () => {
    const updatedLokasis = [...lokasis, newLokasi];
    setLokasis(updatedLokasis);
    setNewLokasi("");
    // Simpan lokasis ke localStorage
    localStorage.setItem('lokasis', JSON.stringify(updatedLokasis));
  };

  const handleDeleteRole = (index: number) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    setRoles(updatedRoles);
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
  };

  const handleDeleteLokasi = (index: number) => {
    const updatedLokasis = lokasis.filter((_, i) => i !== index);
    setLokasis(updatedLokasis);
    localStorage.setItem('lokasis', JSON.stringify(updatedLokasis));
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
    <>
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
              <Input id="name" placeholder="Nama akun" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="username akun, digunakan untuk login" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role" className="font-medium text-sm">Role</Label>
              <select className="w-full border border-gray-300 h-[48px] text-sm rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                {roles.map((r, index) => <option key={index} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lokasi" className="font-medium text-sm">Lokasi</Label>
              <select className="w-full border border-gray-300 h-[48px] text-sm rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
                {lokasis.map((l, index) => <option key={index} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={passwordVisible ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <EyeOff color="gray" /> : <Eye color="gray" />}
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confPassword">Konfirmasi Ulang Password</Label>
              <div className="relative">
                <Input id="confPassword" type={confPasswordVisible ? "text" : "password"} placeholder="Konfirmasi ulang password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={toggleConfPasswordVisibility}>
                  {confPasswordVisible ? <EyeOff color="gray" /> : <Eye color="gray" />}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5 mr-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white md:h-[48px] h-[64px] md:text-md text-md font-medium py-2 px-4 rounded-md">Submit</button>
          </div>
        </form>
        <div className="mt-5">
          <Card className="mt-10">
            <CardHeader>
              <CardTitle>Tambah Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Input value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="Nama Role" />
                <button onClick={handleAddRole} className="bg-blue-500 hover:bg-blue-700 text-white h-[48px] text-md font-medium py-2 px-4 rounded-md">Tambah Role</button>
              </div>
              <table className="mt-5 w-full text-center">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr key={index} className={`h-10 ${index < roles.length - 1 ? 'border-b' : ''}`}> 
                      <td>{role}</td>
                      <td>
                        <button 
                          onClick={() => handleDeleteRole(index)} 
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Card className="mt-5">
            <CardHeader>
              <CardTitle>Tambah Lokasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Input value={newLokasi} onChange={(e) => setNewLokasi(e.target.value)} placeholder="Nama Lokasi" />
                <button onClick={handleAddLokasi} className="bg-blue-500 hover:bg-blue-700 text-white h-[48px] text-md font-medium py-2 px-4 rounded-md">Tambah Lokasi</button>
              </div>
             <table className="mt-5 w-full text-center">
              <thead>
                <tr>
                  <th>Lokasi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lokasis.map((lokasi, index) => (
                  <tr key={index} className={`h-10 ${index < lokasis.length - 1 ? 'border-b' : ''}`}> 
                    <td>{lokasi}</td>
                    <td>
                      <button 
                        onClick={() => handleDeleteLokasi(index)} 
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
    </>
  );
}