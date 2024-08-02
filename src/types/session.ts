// types.ts
export interface User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  role: string;
  lokasi: boolean; // Assuming lokasi is a boolean
}

export interface UserSession {
  user: User;
}
