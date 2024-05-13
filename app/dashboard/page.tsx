import DragElement from "@/components/DragElement";
import NewDragElement from "@/components/NewDragElement";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function page() {
  const data = getKindeServerSession();
  const user = await data.getUser();

  if (!user) return redirect("/");

  return (
    <div className="p-4">
      <LogoutLink>logout</LogoutLink>
      {/* <DragElement/> */}
      <NewDragElement/>
    </div>
  );
}
export default page;
