"use client"
import { Button } from "./ui/button";
import { CheckCircleIcon, Copy, Edit, X } from "lucide-react";
import { motion } from "framer-motion"
import { cn, SidebarProps } from "@/lib/utils";
import { useSidebarStore } from "@/stores/SidebarStore";
import { useTranslations } from "next-intl";

function Sidebar({ className = "" }: SidebarProps) {

  const { isOpen, closeSidebar } = useSidebarStore((state) => state);
  const t = useTranslations('HomePage');

  return (
    <>
      <motion.div
        className={cn("overflow-y-auto xl:overflow-hidden box-border p-6 bg-accent flex flex-col xl:bg-[rgba(0,0,0,0.4)] text-white max-w-[40ch] row-span-3 fixed xl:static h-full -right-full transition-[right] z-10", className, {
          "right-0": isOpen,
        })}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: "0%" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className='font-bold text-fluid-lg text-primary'>{t("sidebarTitle")}</h2>
          <X className="xl:hidden cursor-pointer" onClick={closeSidebar} />
        </div>
        <div className="flex flex-col gap-4 mb-6 text-fluid-md dark:text-secondary-foreground">
          <p>{t("sidebarIdea")}</p>
          <p>{t("sidebarErrors")}</p>
          <p>{t("sidebarDropzone")} <span className="font-thin italic"> &apos;{"<!DOCTYPE html>"}&apos;</span> {t("sidebarLeadingHTML")} <Copy className="inline-block mx-2"/> {t("sidebarTrailingHTML")}</p>
          <p>{t("sidebarLeadingBEM")} <CheckCircleIcon className="inline-block mx-2"/> {t("sidebarTrailingBEM")}</p>
          <p>{t("sidebarLeadingRemove")} <span className="font-thin italic">&apos;x&apos;</span> {t("sidebarTrailingRemove")}</p>
          <p>{t("sidebarLeadingEdit")} <Edit className="inline-block mx-2"/> {t("sidebarMiggleEdit")} <span className="font-thin italic">&apos;save&apos;</span> {t("sidebarTrailingEdit")}</p>
        </div>
        <p className="font-bold text-center text-primary text-xl">{t("sidebarEnjoy")} 🚀</p>
        <Button className="xl:hidden bg-primary drop-shadow-md shadow-md mt-auto w-full text-xl uppercase" onClick={closeSidebar}>
          Close
        </Button>
      </motion.div>
      <div className={cn(
        "fixed pointer-events-none inset-0 w-full h-full bg-black/50 backdrop-blur-sm opacity-0 transition-[opacity]",
        { "opacity-100 pointer-events-auto": isOpen }
      )}
        onClick={closeSidebar}
      ></div>
    </>
  )
}

export default Sidebar