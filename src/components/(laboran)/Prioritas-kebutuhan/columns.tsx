'use client'

import Ruangan from ".";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import DataTableRowActions from "./DataTableRowActions";
import Prioritas from "@/types/prioritas";

// export type PrioritasType = {
//     // kebutuhan_id: string;
//     kebutuhan_id: number;
//     user_id: string;
//     user_qty: number;
//     nama_modul: string;
//     nama_praktikum: string;
//     keterangan_modul: string;
//     status: string;
//     select_pc: 'High End' | 'Middle End' | 'Tanpa PC'
//     rooms: {
//         name: string;
//     };
// }

export const columns: ColumnDef<Prioritas>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Kebutuhan ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => ( <div className="flex gap-2 items-center"> <span className="w-[50px]"> {row.getValue("id")} </span> </div> )
    },
    {
        accessorKey: 'nama_modul',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Nama Modul
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
            },
    },
    {
        accessorKey: 'nama_praktikum',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Praktikum
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
            },
    },
    // {
    //     accessorKey: 'nama_praktikum',
    //     header: "Praktikum",
    // },
    {
        accessorKey: 'keterangan_modul',
        header: "Keterangan",
    },
    {
        accessorKey: 'status',
        header: "status",
    },
    {
        accessorKey: 'select_pc',
        header: "kebutuhan",
    },
    {
        accessorKey: 'room.name',
        header: "Prioritas Ruangan",
    },
    // {
    //     accessorKey: 'priority_ruangan',
    //     header: "Prioritas Ruangan",
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