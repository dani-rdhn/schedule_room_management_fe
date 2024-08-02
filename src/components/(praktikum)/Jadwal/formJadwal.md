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

export function FormJadwalDialog() {
  const [postMessage, setPostMessage] = useState('');
  const [nama_modul, setNama_modul] = useState("");
  const [user_qty, setUser_qty] = useState("");
  const [keterangan_modul, setKeterangan_modul] = useState(''); // Default value for the select
  const [status, setStatus] = useState('Onsite'); // Default value for the select
  const [select_pc, setSelect_pc] = useState('Pilih kebutuhan...'); // Default value for the select
  const router = useRouter();
//   const { data: session, status } = useSession();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  // const [refreshKey, setRefreshKey] = useState(0);

  const handlePostJadwal = async () => {
    try {
      const res = await fetch('http://localhost:5000/jadwal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.jwt}`,
        },
        body: JSON.stringify({
          nama_modul,
          user_qty,
          keterangan_modul,
          status,
          select_pc,
          nama_praktikum: session?.user.name,
        }),
        // console.log(JSON.stringify);
      });

      console.log(JSON.stringify);

      if (res.ok) {
        setPostMessage('Room created successfully');
        // setRefreshKey(prevKey => prevKey + 1);
        // router.push('/ruangan');
        // Optionally clear form fields here
        window.location.reload();
      } else {
        setPostMessage('Error creating room');
      }
      setIsOpen(false); // Close the dialog
    //   window.location.reload();
      
    } catch (error) {
      setPostMessage('An error occurred');
      console.error(error);
    }
    // setIsOpen(false); // Close the dialog
    // router.push('/ruangan');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="input">Input Ruangan</Button> */}
        <button className="bg-blue-500 w-[180px] py-3 hover:bg-blue-700 text-white font-medium px-4 rounded-md">Input Jadwal Praktikum</button>
      </DialogTrigger>  
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Input Kebutuhan Modul Praktikum</DialogTitle>
          <DialogDescription>
           <div> Input kebutuhan yang akan dibutuhkan oleh setiap modul praktikum </div>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); handlePostJadwal(); }}>
        <div className="">
          <div className="items-center my-3">
            <Label htmlFor="name" className="text-right">
              Nama Modul
            </Label>
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
            <Label htmlFor="username" className="text-right">
              Jumlah praktikan
            </Label>
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
            <Label htmlFor="username" className="text-right">
              Keterangan Modul
            </Label>
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
            <select className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="pc" value={select_pc} onChange={(e) => setSelect_pc(e.target.value)}>
              <option value="" style={{ color: "gray" }}>Pilih kebutuhan...</option> 
              <option value="Tanpa PC">Tanpa PC</option>
              <option value="Medium End">Medium End</option>
              <option value="High End">High End</option>
            </select>
          </div>

          <div>
            <label htmlFor="lokasi">Lokasi Praktikum:</label>
            <select className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500" id="lokasi" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="" style={{ color: "gray" }}>Pilih kebutuhan...</option> 
              <option value="online">online</option>
              <option value="offline">offline</option>
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
  )
}
