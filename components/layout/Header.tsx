"use client"
import HeaderSocialLink from "./HeaderSocialLink";
import { ModeToggle } from "../ModeToggle";
import HeaderTitle from "./HeaderTitle";
import { motion } from "framer-motion"
import HeaderLogo from "./HeaderLogo";
import { useSidebarStore } from "@/stores/SidebarStore";
import SidebarTogglerButton from "./SidebarTogglerButton";
import LanguageToggle from "./LanguageToggle";

const Header = () => {

  

  return (
    <header className='flex justify-between items-center p-4'>
      <div className='flex items-center gap-2'>
        <HeaderLogo />
        <HeaderTitle />
      </div>
      <motion.nav className='flex items-center gap-2 text-accent' initial="initial" animate="animate">
        <HeaderSocialLink
          variant="github"
          url="https://github.com/HoracioGutierrez/html-playground"
          title="Github Link"
        />
        <HeaderSocialLink
          variant="instagram"
          url="https://www.instagram.com/horagutierrez/"
          title="Instagram Link"
        />
        <HeaderSocialLink
          variant="twitter"
          url="https://x.com/horagutierrez"
          title="Twitter Link"
        />
        <ModeToggle />
        <LanguageToggle/>
        <SidebarTogglerButton/>      
      </motion.nav>
    </header>
  );
};
export default Header;
