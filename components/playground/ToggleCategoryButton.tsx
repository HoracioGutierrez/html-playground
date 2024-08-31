"use client"
import { motion } from "framer-motion"
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react"

type ToggleCategoryButtonProps = {
  onClick: () => void
  variant?: "previous" | "next"
}

function ToggleCategoryButton({ onClick, variant = "previous" }: ToggleCategoryButtonProps) {

  const Icons : Record<string, any> = {
    previous: ArrowLeftCircle,
    next: ArrowRightCircle
  }

  const Icon = Icons[variant]

  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <motion.button
      whileTap={{ scale: 1 }}
      whileHover={{ scale: 1.2, opacity: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.5, scale: 1 }}
    >
      <Icon onClick={handleClick} className="flex justify-center items-center bg-accent rounded-full text-xl size-8" />
    </motion.button>
  )
}
export default ToggleCategoryButton