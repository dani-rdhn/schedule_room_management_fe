'use client'

import { Button } from '@/components/ui/button';
import { Row, Table, Column } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// } from '../ui/dropdown-menu';
// import { DropdownMenuRuangan } from './dropdown';
import { DialogFormUpdate } from './formUpdate';
// import Room from '@/types/room';
import Prioritas from '@/types/prioritas';
import { useSession } from "next-auth/react";
import { AlertDialogDelete } from './alertDelete';
import { mutate } from 'swr';
import { notifySuccess, notifyError, notifyWarning } from "@/components/toast/toast"

interface DataTableRowActionsProps<TData extends Prioritas> { 
    table: Table<TData>
    column: Column<TData>
    row: Row<TData> 
} 

const DataTableRowActions = <TData extends Prioritas,>({ table, column, row }: DataTableRowActionsProps<TData>) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { data: session } = useSession(); // Use destructuring

  const onEdit = () => {
    // Add your edit logic here if you need to update your data.
    // alert(`localhost says edit pressed with id = ${(row.original as any).kebutuhan_id}`);
    setIsDialogOpen(true);
  };

  const onDelete = async () => {
    setIsDeleteDialogOpen(true); // Buka dialog konfirmasi hapus
    // alert(`localhost says delete pressed with id = ${(row.original as any).kebutuhan_id}`);
  };

  const handleConfirmDelete = async () => {
    const id = row.original.id;
    try {
      const res = await fetch(`http://localhost:5000/kebutuhan-modul/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.jwt}`,
        },
      });

      if (res.ok) {
        notifyError('Data Ruangan berhasil dihapus');
        mutate("http://localhost:5000/kebutuhan-modul-laboran");
        // window.location.reload();
      } else {
        console.error("Error deleting room:", res.statusText);
        notifyError('Terjadi kesalahan.');
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      notifyError('Terjadi kesalahan.');
    } finally {
      setIsDeleteDialogOpen(false); // Tutup dialog setelah selesai
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem> */}
          <button className="bg-blue-500 hover:bg-blue-600 px-8 py-2 rounded-lg font-medium text-white text-sm" onClick={onEdit}>Edit</button>
          {/* <DropdownMenuItem onClick={() => onEdit(row.original)}>Edit</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-medium text-white text-sm" onClick={onDelete}>Delete</button>
          {/* <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={() => onDelete(row.original)}>Delete</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogDelete
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete} // Panggil handleConfirmDelete jika user mengonfirmasi
        mutate={() => mutate("http://localhost:5000/kebutuhan-modul-laboran")}
      />
      <DialogFormUpdate 
        prioritasData={row.original} 
        isOpen={isDialogOpen} // Hubungkan state dengan prop open
        setIsOpen={setIsDialogOpen} // Hubungkan fungsi untuk mengubah state
        mutate={() => mutate("http://localhost:5000/kebutuhan-modul-laboran")}
      />
      {/* {isDialogOpen && ( // Tampilkan dialog jika isDialogOpen true
        <DialogFormUpdate roomData={row.original} /> 
      )} */}
    </>
  );
};

export default DataTableRowActions;