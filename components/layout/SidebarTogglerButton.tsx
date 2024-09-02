"use client"

import { useSidebarStore } from "@/stores/SidebarStore";
import { Button } from "../ui/button"
import { Menu } from "lucide-react";



function SidebarTogglerButton() {

  const { toggleIsOpen } = useSidebarStore((state) => state);

  return (
    <Button className="xl:hidden text-primary" onClick={toggleIsOpen} variant="ghost" size="icon" title="Toggle sidebar">
      <Menu/>
    </Button>
  )
}
export default SidebarTogglerButton