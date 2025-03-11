"use client"
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const AdminPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session: ", session);
    
  }, [status, session]);

  if (status === "loading") return <p>Loading...</p>;

  return <h1>Welcome Admin</h1>;
};

export default AdminPage;
