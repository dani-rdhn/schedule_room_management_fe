interface Schedule {
  id: number;
  user_id: string; 
  nama_praktikum: string;
  room_id: string | null; 
  kebutuhan_id: number; 
  nama_modul: string; 
  shift_id: number; 
  tanggal?: string | number | Date; 
  kode_asisten: string | null; 
  createdAt: Date | string; 
  updatedAt: Date | string; 
  kebutuhan_praktikum: {
      nama_modul: string;
  };
  shift: {
      waktu_shift: string;
      start_time: string;
      end_time: string;
  }
  room: {
      name: string; // Nama ruangan sekarang ada di dalam objek Room
  };
    konflik: string;
}

export default Schedule;