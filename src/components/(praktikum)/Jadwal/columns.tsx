'use client'

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";
import DataTableRowActions from "./DataTableRowActions";
import Schedule from "@/types/schedule";

export const columns: ColumnDef<Schedule>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Jadwal ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => ( <div className="flex gap-2 items-center"> <span className="w-[10px]"> {row.getValue("id")} </span> </div> )
    },
    {
        accessorFn: row => row.kebutuhan_praktikum.nama_modul,
        id: "nama_modul",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nama Modul
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'tanggal',
        header: "Tanggal Praktikum",
    },
    {
        accessorFn: row => row.shift.waktu_shift,
        id: "waktu_shift",
        header: "Shift",
    },
    {
        accessorKey: 'kode_asisten',
        header: "Kode Asisten",
        cell: ({ row }) => ( 
            <div className="flex gap-2 items-center">
                <span className="min-w-[100px]">
                    {row.getValue("kode_asisten")}
                </span>
            </div> 
        )
    },
    {
        accessorFn: row => row.room?.name ?? "", // Menggunakan optional chaining
        id: "room_name",
        header: "Ruangan",
    },
    {
        id: 'actions',
        header: "Action",
        enableHiding: false,
        cell: ({ table, column, row }) => (
            <DataTableRowActions row={row} table={table} column={column} />
        ),
        size: 50,
    },
]
