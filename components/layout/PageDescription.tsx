"use client"
import { motion } from "framer-motion"

function PageDescription() {
  return (
    <motion.p
      className="opacity-60 mb-20 text-accent text-center text-fluid-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      This playground was created with the intention of having a tool for beginners to better learn
    </motion.p>
  )
}
export default PageDescription