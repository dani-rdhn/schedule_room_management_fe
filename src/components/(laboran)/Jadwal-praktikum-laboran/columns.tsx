'use client'

import Ruangan from ".";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import Schedule from "@/types/schedule";
import DataTableRowActions from "./DataTableRowActions";

export const columnsJadwalLaboran: ColumnDef<Schedule>[] = [
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
        size: 80,
        cell: ({ row }) => ( <div className="flex gap-2 items-center"> <span className="min-w-[100px]"> {row.getValue("id")} </span> </div> )
    },
    {
        accessorFn: row => row.kebutuhan_praktikum.nama_modul, // Menggunakan optional chaining
        id: "nama_modul",
        header: "Nama Modul",
        cell: ({ row }) => ( <div className="flex gap-2 items-center"> <span className="min-w-[100px]"> {row.getValue("nama_modul")} </span> </div> )
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
        accessorFn: row => row.room?.name ?? "", // Menggunakan optional chaining
        id: "room_name",
        header: "Ruangan",
    },
    {
        accessorFn: row => row.shift.waktu_shift,
        id: "waktu_shift",
        header: "Shift",
    },
    {
        id: "konflik",
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Konflik
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row, table }) => {
      const currentRow = row.original;
      const allRows = table.getFilteredRowModel().rows.map((row) => row.original);

      // Periksa apakah room_name kosong
      if (!currentRow.room?.name) {
        return <span style={{ color: "blue" }}>Tidak</span>; // Langsung tampilkan "Tidak" jika room_name kosong
      }

      const conflictingRows = allRows.filter(
        (otherRow: Schedule) => // Tambahkan tipe data Schedule untuk otherRow
          otherRow.tanggal === currentRow.tanggal &&
          otherRow.room?.name === currentRow.room?.name &&
          otherRow.shift.waktu_shift === currentRow.shift.waktu_shift &&
          otherRow.id !== currentRow.id
      );

      return (
            <span
            style={{
                color: conflictingRows.length > 0 ? "red" : "blue",
            }}
            >
            {conflictingRows.length > 0 ? "Iya" : "Tidak"}
            </span>
        );
        },
    },
    {
        id: 'actions',
        header: "Action",
        enableHiding: false,
        cell: ({ table, column, row }) => <DataTableRowActions row={row} table={table} column={column}/>, 
        size: 50, // Adjust as needed
    },
]