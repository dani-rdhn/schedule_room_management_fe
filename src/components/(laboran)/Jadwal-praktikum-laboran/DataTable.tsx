'use client';

import { Button } from "@/components/ui/button";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/shared/data-table/data-table-pagination";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { exportToExcel } from '@/utils/exportToExcel';
import { exportToExcel } from "../../../../utils/exportExcel";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  floatingBar?: React.ReactNode | null;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  floatingBar = null,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [konflikFilter, setKonflikFilter] = useState<"all" | "Iya" | "Tidak">("all");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    filterFns: {
      // ... (filterFns lainnya)
      konflik: (row, id, value) => {
        if (value === "all") return true;
        
        // Dapatkan nilai kolom "konflik" yang sudah dihitung
        const conflictingRows = row.original.konflik; // Menggunakan hasil perhitungan konflik dari data asli
        
        return conflictingRows === value; // Bandingkan dengan nilai yang diinginkan
      },
    },
  });

  // const handleExport = () => {
  //   exportToExcel(data, 'JadwalLaboran');
  // };

  return (
    <div>
      <div className="flex flex-col md:flex-row py-4 gap-4">
        {/* <div className="items-center mb-2">
          <h1 className="mb-2">Filter Konflik</h1>
          <select // Gunakan elemen <select> standar HTML
            value={konflikFilter}
            onChange={(e) => {
              setKonflikFilter(e.target.value as "all" | "Iya" | "Tidak");
              table.getColumn("konflik")?.setFilterValue(e.target.value);
            }}
          >
            <option value="all">Semua</option>
            <option value="Iya">Iya</option>
            <option value="Tidak">Tidak</option>
          </select>
        </div> */}
        <div className="items-center mb-2">
          <h1 className="mb-2">Filter Modul</h1>
          <Input
            placeholder="Filter.."
            value={(table.getColumn("nama_modul")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("nama_modul")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="items-center mb-2">
          <h1 className="mb-2">Filter Nama Praktikum</h1>
          <Input
            placeholder="Filter.."
            value={(table.getColumn("nama_praktikum")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("nama_praktikum")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="items-center mb-2">
          <h1 className="mb-2">Filter Ruangan</h1>
          <Input
            placeholder="Filter.."
            value={(table.getColumn("room_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("room_name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="items-center mb-2">
          <h1 className="mb-2">Filter Tanggal</h1>
          <Input
            placeholder="Filter.."
            value={(table.getColumn("tanggal")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("tanggal")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
         <div className="items-center mb-2">
          <h1 className="mb-2">Filter Shift</h1>
          <Input
            placeholder="Filter.."
            value={(table.getColumn("waktu_shift")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("waktu_shift")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5 mt-3">
        <DataTablePagination table={table} />
        {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
      </div>
      <div className="mt-4">
        {/* <Button
          onClick={handleExport}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Export to Excel
        </Button> */}
      </div>
    </div>
  );
}
