"use client"
import Image from "next/image";
import { GithubIcon, Instagram, Menu, TwitterIcon } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

const Header = () => {

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <header className='flex justify-between items-center p-4'>
      <div className='flex items-center gap-2'>
        <Image src='/logo.png' alt='logo' width={40} height={40} className="dark:invert" />
        <h1 className='font-bold text-muted text-xl'>DOM PLayground</h1>
      </div>
      <nav className='flex items-center gap-2 text-accent'>
        <Button asChild variant="ghost" size="icon">
          <a href='https://github.com/HoracioGutierrez/html-playground' target="_blank" className="text-muted" rel="noopener" title="Github Link">
            <GithubIcon size={20} />
          </a>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <a href='https://www.instagram.com/horagutierrez/' target="_blank" className="text-muted" rel="noopener" title="Instagram Link">
            <Instagram size={20} />
          </a>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <a href='https://x.com/horagutierrez' target="_blank" className="text-muted" rel="noopener" title="Twitter Link">
            <TwitterIcon size={20} />
          </a>
        </Button>
        <ModeToggle />
        <Menu className="xl:hidden text-muted cursor-pointer" onClick={handleOpen} />
        <div className={cn("left-shadow fixed z-20  top-0 -right-full h-[100dvh] transition-all duration-300 pointer-events-none flex", open && "right-0 pointer-events-auto xl:pointer-events-none")}>
          <Sidebar className="xl:hidden min-h-fit" handleClose={handleClose} />
        </div>
      </nav>
    </header>
  );
};
export default Header;
