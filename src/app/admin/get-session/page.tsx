"use client"
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const { status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return <h1>Welcome Admin</h1>;
};

export default AdminPage;
