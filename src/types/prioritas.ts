interface Prioritas {
  // kebutuhan_id: number;
  id: number;
  user_id: string;
  user_qty: number;
  nama_modul: string;
  nama_praktikum: string;
  keterangan_modul: string;
  status: string;
  select_pc: string,
  priority_ruangan: string,
  user: {
    name: string;
    email: string;
  }
}

// interface Prioritas {
//   id: number;
//   uuid: string;
//   name: string;
//   nama_praktikum: string;
//   qty: number;
//   pc: string;
//   lokasi: string;
//   user: {
//     name: string;
//     email: string;
//   }
// }

interface User {
  name: string;
  email: string;
}

export default Prioritas;