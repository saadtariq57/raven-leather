import { auth } from "@/auth";
import Account from "@/components/account/Account";
import { getUserAddress } from "@/lib/address";
import { getUserOrder } from "@/lib/userOrders";

export default async function AccountPage(){
  const res = await auth();
  const userId = Number(res?.user.id)
  console.log("User ID: ", userId);
  
  const userOrders = await getUserOrder(userId);
  const address = await getUserAddress(userId);

  // console.log("userOrders: ", userOrders);  

    return (
      <Account orders={userOrders} address={address}/>
    );
  };
  