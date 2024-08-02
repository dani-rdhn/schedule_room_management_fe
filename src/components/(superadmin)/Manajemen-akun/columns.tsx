'use client'

import Ruangan from ".";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import DataTableRowActions from "./DataTableRowActions";
import Schedule from "@/types/schedule";
import User from "@/types/user";

// export type JadwalType = {
//     jadwal_id: string;
//     user_id: string;
//     kebutuhan_id: string;
//     shift_id: string;
//     tanggal: string;
//     kode_asisten: string;
//     kebutuhan_praktikum: {
//         nama_modul: string;
//     };
//     shift: {
//         waktu_shift: string;
//     }
// }

export const columns: ColumnDef<User>[] =[
    {
        accessorKey: "name", // Akses nama_modul dari objek kebutuhan_praktikum
        header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Nama Akun
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        ),
        // cell: (info) => ((info.getValue() as JadwalType).kebutuhan_praktikum?.nama_modul ?? ''),
    },
    {
        accessorKey: 'username',
        header: "Username",
    },
    {
        accessorKey: 'role',
        header: "Role",
    },
    // {
    //     accessorKey: 'kode_asisten',
    //     header: "Kode Asisten",
    //     cell: ({ row }) => ( <div className="flex gap-2 items-center"> <span className="w-[300px]"> {row.getValue("kode_asisten")} </span> </div> )
    // },
    // { accessorKey: "title", header: () => ( <div className="text-right w-10">Title</div> ), cell: ({ row }) => ( <div className="flex gap-2 items-center"> <span className="truncate w-10 font-medium"> {row.getValue("title")} </span> </div> ) },
    // {
    //     accessorKey: 'shift_id',
    //     header: "Shift",
    // },
    {
        id: 'actions',
        header: "Action",
        enableHiding: false,
        cell: ({ table, column, row }) => <DataTableRowActions row={row} table={table} column={column}/>, 
        size: 50, // Adjust as needed
    },
    // {
    //     accessorKey: 'action',
    //     header: "Action",
    // },
]