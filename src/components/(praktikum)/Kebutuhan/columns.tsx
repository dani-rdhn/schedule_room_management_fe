'use client'

import Ruangan from ".";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import Prioritas from "@/types/prioritas";
import DataTableRowActions from "./DataTableRowActions";

export const columns: ColumnDef<Prioritas>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Kebutuhan Praktikum ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                <span style={{ width: '80px', textAlign: 'center' }}>
                    {row.getValue("id")}
                </span>
            </div>
        ),
        size: 100, // You can keep this to provide a hint to the table configuration
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
        accessorKey: 'keterangan_modul',
        header: "Keterangan",
    },
    {
        accessorKey: 'user_qty',
        header: "Jumlah Praktikan",
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
        id: 'actions',
        header: "Action",
        enableHiding: false,
        cell: ({ table, column, row }) => <DataTableRowActions row={row} table={table} column={column} />,
        size: 50,
    },
]
