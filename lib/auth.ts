// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Email and Password",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = { id: "1", name: "Admin", email: "admin@admin.com" };
//         return user;
//       },
//     }),
//   ],
// };
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type Credentials = {
  email: string;
  password: string;
};

async function authenticate(credentials: Credentials): Promise<boolean> {
  const user = await fetchUserFromDatabase(credentials.email);
  return user !== null && user.password === credentials.password;
}

async function fetchUserDetails(email: string): Promise<User | null> {
  return await fetchUserFromDatabase(email);
}

async function fetchUserFromDatabase(email: string): Promise<User | null> {
  // Placeholder logic to simulate fetching a user from a database.
  const users: User[] = [
    { id: "1", name: "Admin", email: "admin@admin.com", password: "adminpass" },
    { id: "2", name: "User", email: "user@user.com", password: "userpass" },
  ];
  return users.find(user => user.email === email) || null;
}

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string>): Promise<User | null> {
        // Authenticate the user with the provided credentials
        const isAuthenticated = await authenticate({
          email: credentials.email,
          password: credentials.password,
        });

        if (isAuthenticated) {
          // Fetch the user details from your database
          return await fetchUserDetails(credentials.email);
        } else {
          // If authentication fails, return null
          return null;
        }
      },
    }),
  ],
};
