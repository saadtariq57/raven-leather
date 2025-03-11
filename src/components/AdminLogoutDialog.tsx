import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";

interface AdminLogoutDialogProps {
  adminUsername: string;
}

export default function AdminLogoutDialog({  adminUsername }: AdminLogoutDialogProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut({
        callbackUrl: "/admin/signin",
        redirect: true,
      });
    } catch (error) {
      console.error("Sign out error: ", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-[#292828] bg-slate-800">{adminUsername || "Admin"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Admin</DialogTitle>
          <DialogDescription>
            Username: {adminUsername}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" disabled={isSigningOut} onClick={handleSignOut} >Log out</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
