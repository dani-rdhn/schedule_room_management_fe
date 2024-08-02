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

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);

  const [roles, setRoles] = useState<string[]>([]);
  const [lokasis, setLokasis] = useState<string[]>([]);

  const [newRole, setNewRole] = useState('');
  const [newLokasi, setNewLokasi] = useState('');

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
        notifySuccess('Data Akun berhasil disimpan.');
        mutate();
      } else {
        setPostMessage('Error creating shift');
        notifyError('Terjadi kesalahan.');
      }
    } catch (error) {
      console.error(error);
      notifyError('Terjadi kesalahan.');
    }
  };

  const addRole = () => {
    if (newRole && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
      setNewRole('');
    }
  };

  const addLokasi = () => {
    if (newLokasi && !lokasis.includes(newLokasi)) {
      setLokasis([...lokasis, newLokasi]);
      setNewLokasi('');
    }
  };

  const deleteRole = (roleToDelete: string) => {
    const updatedRoles = roles.filter((role) => role !== roleToDelete);
    setRoles(updatedRoles);
  };

  const deleteLokasi = (lokasiToDelete: string) => {
    const updatedLokasis = lokasis.filter((lokasi) => lokasi !== lokasiToDelete);
    setLokasis(updatedLokasis);
  };

  return (
    <div>
      <Card className="w-[350px] mb-4">
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
        </CardContent>
      </Card>

      <Card className="w-[350px] mb-4">
        <CardHeader>
          <CardTitle>Tambah Role</CardTitle>
          <CardDescription>Menambahkan role baru</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); addRole(); }} className="flex flex-col space-y-2">
            <Label htmlFor="newRole">Role Baru</Label>
            <Input id="newRole" value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="Role baru" />
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded-md">Tambah Role</button>
          </form>
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.map((r, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{r}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => deleteRole(r)} className="text-red-600 hover:text-red-900"><Trash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="w-[350px] mb-4">
        <CardHeader>
          <CardTitle>Tambah Lokasi</CardTitle>
          <CardDescription>Menambahkan lokasi baru</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); addLokasi(); }} className="flex flex-col space-y-2">
            <Label htmlFor="newLokasi">Lokasi Baru</Label>
            <Input id="newLokasi" value={newLokasi} onChange={(e) => setNewLokasi(e.target.value)} placeholder="Lokasi baru" />
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded-md">Tambah Lokasi</button>
          </form>
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lokasis.map((l, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{l}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => deleteLokasi(l)} className="text-red-600 hover:text-red-900"><Trash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
