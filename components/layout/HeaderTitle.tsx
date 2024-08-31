"use client"
import { HeaderTitleProps } from "@/lib/utils"
import { motion } from "framer-motion"

function HeaderTitle({ children = "DOM Playground" }: HeaderTitleProps) {
  return (
    <motion.h1
      className='font-bold text-fluid-base text-muted'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.h1>
  )
}
export default HeaderTitle