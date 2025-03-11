import AdminLogoutDialog from "./AdminLogoutDialog";

interface AdminProfileProps {
  adminUsername: string;
}

export default function AdminProfileButton({ adminUsername }: AdminProfileProps) {

  return (
    <div className="">
      <AdminLogoutDialog adminUsername={adminUsername} />
    </div>
  );
}
