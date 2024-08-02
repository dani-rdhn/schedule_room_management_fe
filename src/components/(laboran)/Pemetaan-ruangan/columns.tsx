'use client'

import Ruangan from ".";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import Schedule from "@/types/schedule";
import DataTableRowActions from "./DataTableRowActions";

export const columnsJadwalLaboran: ColumnDef<Schedule>[] = [
    {
        accessorKey: "kebutuhan_praktikum.nama_modul", // Akses nama_modul dari objek kebutuhan_praktikum
        header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Nama Modul
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        ),
        // cell: (info) => ((info.getValue() as JadwalType).kebutuhan_praktikum?.nama_modul ?? ''),
    },
    {
        accessorKey: 'nama_praktikum',
        header: "Nama Praktikum",
    },
    {
        accessorKey: 'tanggal',
        header: "Tanggal Praktikum",
    },
    {
        accessorKey: 'kode_asisten',
        header: "Kode Asisten",
        cell: ({ row }) => ( <div className="flex gap-2 items-center"> <span className="w-[300px]"> {row.getValue("kode_asisten")} </span> </div> )
    },
    {
        accessorKey: 'room.name',
        header: "Ruangan",
    },
    // {
    //     accessorKey: 'shift_id',
    //     header: "Shift",
    // },
    {
        accessorKey: "shift.waktu_shift", // Akses waktu_shift dari objek shift
        header: "Shift",
    },
    {
        id: 'actions',
        header: "Action",
        enableHiding: false,
        cell: ({ table, column, row }) => <DataTableRowActions row={row} table={table} column={column}/>, 
        size: 50, // Adjust as needed
    },
]