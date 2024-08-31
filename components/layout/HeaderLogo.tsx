"use client"
import { motion } from "framer-motion"

function HeaderLogo() {
  return (
    <motion.img
      src='/logo.png'
      alt='logo'
      width={40}
      height={40}
      className="dark:invert"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    />
  )
}
export default HeaderLogo