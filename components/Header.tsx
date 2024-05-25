"use client"
import Image from "next/image";
import { GithubIcon, Instagram, Menu, TwitterIcon } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

const Header = () => {

  const [open, setOpen] = useState(true)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <header className='flex items-center justify-between p-4'>
      <div className='flex items-center gap-2'>
        <Image src='/logo.png' alt='logo' width={40} height={40} className="invert" />
        <h1 className='text-xl font-bold text-accent opacity-75'>DOM PLayground</h1>
      </div>
      <nav className='flex items-center gap-4 text-accent '>
        <a href='https://github.com/HoracioGutierrez/html-playground' target="_blank" className="opacity-75">
          <GithubIcon size={20} />
        </a>
        <a href='https://www.instagram.com/horagutierrez/' target="_blank" className="opacity-75">
          <Instagram size={20} />
        </a>
        <a href='https://x.com/horagutierrez' target="_blank" className="opacity-75">
          <TwitterIcon size={20} />
        </a>
        <Menu className="xl:hidden" onClick={handleOpen} />
        <div className={cn("left-shadow fixed z-20 w-3/4 md:w-2/4 xl:w-1/3 top-0 -right-full h-full transition-all duration-300",open && "right-0")}>
          <Sidebar className="xl:hidden h-full" handleClose={handleClose} />
        </div>
      </nav>
    </header>
  );
};
export default Header;
