import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { GithubIcon, Instagram, TwitterIcon } from "lucide-react";

const Header = async () => {
  const data = getKindeServerSession();
  const user = await data.getUser();

  return (
    <header className='flex items-center justify-between p-4'>
      <div className='flex items-center gap-2'>
        <Image src='/logo.png' alt='logo' width={40} height={40} className="invert"/>
        <h1 className='text-xl font-bold text-accent opacity-75'>DOM PLayground</h1>
      </div>
      <nav className='flex items-center gap-4 text-accent opacity-75'>
        <a href='https://github.com/HoracioGutierrez' target="_blank">
          <GithubIcon size={20} />
        </a>
        <a href='https://www.instagram.com/horagutierrez/' target="_blank">
          <Instagram size={20} />
        </a>
        <a href='https://x.com/horagutierrez' target="_blank">
          <TwitterIcon size={20} />
        </a>
      </nav>
    </header>
  );
};
export default Header;
