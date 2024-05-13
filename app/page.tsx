import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Fade } from "react-awesome-reveal";

export default async function Home() {
  const data = getKindeServerSession();
  const user = await data.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main>
      <h2>Home</h2>
      <ThemeToggle />
      <LoginLink
        authUrlParams={{
          connection_id: "conn_018f588303c9b00c4e3d56ecba18cfa5",
        }}
      >
        Login
      </LoginLink>
    </main>
  );
}
