'use client'

import Ruangan from ".";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pencil, Trash2 } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
// import { DialogRuangan } from "./dialog";
// import { SheetRuangan } from "./sheet";
import { DropdownMenuRuangan } from "./dropdown";
import DataTableRowActions from "./DataTableRowActions";
import Room from "@/types/room";

// interface DropdownMenuRuanganProps {
//   roomData?: Room; 
// }

export type RuanganType = {
    id: string;
    name: string;
    qty: number;
    pc: 'High End' | 'Middle End' | 'No PC' 
    lokasi: string;
}

// interface ColumnsProps {
//     onEdit: (ruangan: RuanganType) => void;
//     onDelete: (ruangan: RuanganType) => void;
// }

export const columns: ColumnDef<Room>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Ruangan ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => ( <div className="flex gap-2 items-center"> <span className="w-[20px]"> {row.getValue("id")} </span> </div> )
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Ruangan
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
            },
    },
    {
        accessorKey: 'qty',
        header: "Kapasitas Maksimal",
    },
    {
        accessorKey: 'pc',
        header: "Kebutuhan",
    },
    {
        accessorKey: 'lokasi',
        header: "Lokasi Praktikum",
    },
    {
        id: 'actions',
        header: "Action",
        enableHiding: false,
        cell: ({ table, column, row }) => <DataTableRowActions row={row} table={table} column={column}/>, 
        size: 50, // Adjust as needed
    },
    // {
    //     header: "Action",
    //     id: "actions",
    //     enableHiding: false,
    // },
    // {
    //     header: "Action",
    //     id: "actions",
    //     enableHiding: false,
    //     // cell: ({ row: Row < id: number, accountNumber... }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    //     // cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    //     // cell: ({ row }) => <DataTableRowActions />,
    // },
    // {
    //     accessorKey: 'action',  
    //     header: "Action",
    // },
    // {
    //   header: "Action",
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original
  
    //     return (
    //       //   <DialogRuangan />
    //       // <SheetRuangan />
    //       <DropdownMenuRuangan roomData={undefined} />
    //     );
    //   },
    // },
]

// export const columns = ({ onEdit, onDelete }: ColumnsProps) => {
//     const columnsInner: ColumnDef<RuanganType>[] = [
//      {
//         accessorKey: 'name',
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             >
//               Ruangan
//               <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//           )
//         },
//      },
//      {
//         accessorKey: 'qty',
//         header: "Kapasitas Maksimal",
//      },
//      {
//         accessorKey: 'pc',
//         header: "Kebutuhan",
//      },
//      {
//         accessorKey: 'lokasi',
//         header: "Lokasi Praktikum",
//      },
//      {
//         header: "Action",
//         id: "actions",
//         enableHiding: false,
//         cell: ({ row }) => (
//           <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} /> 
//         ),
//      },
//   ];

//   return columnsInner
// };