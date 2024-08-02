interface User {
  uuid: string;
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  lokasi: number;
  // cookie: string;
  password: string;
  confPassword: string;
  jwt: string;     // Include jwt in the User type
}

export default User;