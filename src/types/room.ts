interface Room {
  id: number;
  uuid: string;
  name: string;
  qty: number;
  pc: string;
  lokasi: string;
  user: {
    name: string;
    email: string;
  }
}

interface User {
  name: string;
  email: string;
}

export default Room;