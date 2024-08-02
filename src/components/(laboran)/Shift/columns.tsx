'use client'

// import Shift from ".";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import DataTableRowActions from "./DataTableRowActions";
import Shift from "@/types/shift";

export type ShiftType = {
    // id: string;
    // name: string;
    // qty: number;
    // pc: 'High End' | 'Middle End' | 'No PC' 
    // lokasi: string;
    shift_id: string;
    // start_time: string;
    start_time: Date | string | number;
    // end_time: string;
    end_time: Date | string | number;
    keterangan: string;
}

export const columns: ColumnDef<Shift>[] =[
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Shift ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => ( <div className="flex gap-2 items-center"> <span className="w-[20px]"> {row.getValue("id")} </span> </div> )
    },
    {
        accessorKey: 'keterangan',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Shift
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
            },
    },
    {
        accessorKey: 'start_time',
        header: "Start Time",
    },
    {
        accessorKey: 'end_time',
        header: "End Time",
    },
    {
        id: 'actions',
        header: "Action",
        enableHiding: false,
        cell: ({ table, column, row }) => <DataTableRowActions row={row} table={table} column={column}/>, 
        size: 50, // Adjust as needed
    },
//      {
//     accessorKey: "event_status",
//     header: "Event Status",
//     cell: ({ cell }) => {
//       const value: string = cell.getValue();
//       const color = (status: string) => {
//         if (status === "FINISHED") {
//           return "bg-green-600";
//         } else if (status === "REFUSED") {
//           return "bg-red-500";
//         } else if (status === "WAITING") {
//           return "bg-yellow-500";
//         } else {
//           return "bg-blue-500";
//         }
//       };

//       return (
//         <div className={cn("rounded-full px-2 text-white", color(value))}>{value}</div>
//       );
//     },
//   },

    // {
    //     accessorKey: 'lokasi',
    //     header: "Lokasi Praktikum",
    // },
]