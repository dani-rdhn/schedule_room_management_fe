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

import { ToastContainer} from 'react-toastify';
import { notifySuccess, notifyError } from "@/components/toast/toast"
import 'react-toastify/dist/ReactToastify.css';

interface FormShiftDialogProps {
  mutate: () => void;
}

export function FormShiftDialog({ mutate }: FormShiftDialogProps) {
  const [postMessage, setPostMessage] = useState('');
  const [startTime, setStartTime] = useState(""); // HH:mm format
  const [endTime, setEndTime] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handlePostShift = async () => {
    try {
      const res = await fetch('http://localhost:5000/shifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({
          start_time: startTime,
          end_time: endTime,
          keterangan: keterangan,
        }),
      });

      if (res.ok) {
        setIsOpen(false);
        notifySuccess('Data Shift berhasil disimpan.');
        mutate();
        // window.location.reload(); // Or update your shift data using SWR
      } else {
        // setPostMessage('Error creating shift');
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
    <ToastContainer/>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-500 w-[180px] py-3 hover:bg-blue-700 text-white font-medium px-4 rounded-md">Input Shift</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Input Shift Praktikum</DialogTitle>
          <DialogDescription>
            Input shift waktu untuk praktikum.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => { e.preventDefault(); handlePostShift(); }}>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="startTime">Waktu Mulai (HH:mm)</Label>
              <Input 
                id="startTime" 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)} 
              />
            </div>
            <div>
              <Label htmlFor="endTime">Waktu Selesai (HH:mm)</Label>
              <Input 
                id="endTime" 
                type="time" 
                value={endTime} 
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
    </>
  );
}
