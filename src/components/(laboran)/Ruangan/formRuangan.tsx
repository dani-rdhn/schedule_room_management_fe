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
import { useState } from "react"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from 'next/navigation';

import { ToastContainer} from 'react-toastify';
import { notifySuccess, notifyError } from "@/components/toast/toast"
import 'react-toastify/dist/ReactToastify.css';

interface FormRuanganDialogProps {
  mutate: () => void;
}

// export function FormRuanganDialog() {
export function FormRuanganDialog({ mutate }: FormRuanganDialogProps) {
  const [postMessage, setPostMessage] = useState('');
  const pathname = usePathname();
  
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [pc, setPc] = useState('Tanpa PC'); // Default value for the select
  const [lokasi, setLokasi] = useState('Ruangan'); // Default value for the select

  const [nameError, setNameError] = useState('');
  const [qtyError, setQtyError] = useState('');
  const [serverError, setServerError] = useState('')

  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  // const [refreshKey, setRefreshKey] = useState(0);

  const handlePostRoom = async () => {
    setNameError(name ? '' : 'Nama ruangan harus diisi');
    setQtyError(qty ? '' : 'Jumlah PC harus diisi');
    setServerError('');

    if (nameError || qtyError) {
      return; // Stop submission if there are local errors
    }

    try {
      const res = await fetch('http://localhost:5000/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({
          name,
          qty,
          pc,
          lokasi
        }),
      });

      if (res.ok) {
        setPostMessage('Room created successfully');
        setIsOpen(false);
        // toast('berhasil');
        notifySuccess('Data Ruangan berhasil disimpan.');

        // Update data table without refresh
        mutate();

        // window.location.reload();

      } else {
        const data = await res.json();
        setServerError(data.error || 'Error creating room'); // Get error message from backend
      }
    } catch (error) {
      setServerError('An error occurred');
      console.error(error);
      notifyError('Terjadi kesalahan.');
    }
  };
  
  return (
    <>
    <ToastContainer />
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="input">Input Ruangan</Button> */}
        <button className="bg-blue-500 w-[180px] py-3 hover:bg-blue-700 text-white font-medium px-4 rounded-md">Input Ruangan</button>
      </DialogTrigger>  
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Input Ruangan</DialogTitle>
          <DialogDescription>
           <div> Input Ruangan yang akan digunakan untuk praktikum </div>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); handlePostRoom(); }}>
        <div className="">
          <div className="items-center my-3">
            <label htmlFor="name" className="font-medium ">
              Nama Ruangan
            </label>
            <Input
              id="name"
              // defaultValue="@"
              className="h-[48px]"
              placeholder="@"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(''); // Clear error when input changes
              }}
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>
          <div className=" items-center my-3">
            <label htmlFor="kapasitas" className="font-medium mb-2">
              Kapasitas Ruangan
            </label>
            <Input
              id="qty"
              // defaultValue="@"
              className="h-[48px]"
              placeholder="@"
              value={qty}
              onChange={(e) => {
                setQty(e.target.value);
                setQtyError(''); // Clear error when input changes
              }}
            />
            {qtyError && (
              <p className="text-red-500 text-sm mt-1">{qtyError}</p>
            )}
          </div>
          <div className="mb-3">
          <label htmlFor="pc" className="font-medium">Kebutuhan PC</label>
            <select className="w-full border border-gray-300 h-[48px] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="pc" value={pc} onChange={(e) => setPc(e.target.value)}>
              <option value="Tanpa PC">Tanpa PC</option>
              <option value="Medium End">Medium End</option>
              <option value="High End">High End</option>
            </select>
          </div>

          <div>
            <label htmlFor="lokasi" className="font-medium">Lokasi Praktikum:</label>
            <select className="w-full border border-gray-300 h-[48px] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
              <option value="ruangan">Ruangan</option>
              <option value="bengkel">Bengkel</option>
            </select>
          </div>
        </div>
        <DialogFooter className="mt-5">
          {/* <Button type="submit" variant="outline">Submit</Button> */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white md:h-[48px] h-[64px] md:text-md text-md font-medium py-2 px-4 rounded-md">Submit</button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}
