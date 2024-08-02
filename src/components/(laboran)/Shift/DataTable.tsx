"use client"

import { Button } from "@/components/ui/button"
import * as React from "react"
import { Input } from "@/components/ui/input"
// import { DataTablePagination } from "./data-table-pagination"
import { DataTablePagination } from "@/components/shared/data-table/data-table-pagination"

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
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  floatingBar?: React.ReactNode | null
}

export function DataTable<TData, TValue>({
  columns,
  data,
  floatingBar = null,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )


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
  })

  return (
    <div>
      <div className=" py-4 flex gap-4">
          <div className="items-center mb-2">
            <h1 className="mb-2">Filter Nama Shift</h1>
            <Input
              placeholder="Filter.."
              value={(table.getColumn("keterangan")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("keterangan")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="items-center mb-2">
            <h1 className="mb-2">Filter Waktu Mulai</h1>
            <Input
              placeholder="Filter.."
              value={(table.getColumn("start_time")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("start_time")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="items-center mb-2">
            <h1 className="mb-2">Filter Waktu Selesai</h1>
            <Input
              placeholder="Filter.."
              value={(table.getColumn("end_time")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("end_time")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
        {/* <div className="flex items-center py-4">
            <Input
            placeholder="Nama shift..."
            value={(table.getColumn("keterangan")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("keterangan")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
        </div> */}
        <div className="rounded-md border">
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
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
        {/* <div className="flex items-center justify-end space-x-2 py-4">
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            Previous
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            Next
            </Button>
        </div> */}
    </div>
  )
}
