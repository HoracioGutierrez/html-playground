"use client"
import { motion } from "framer-motion"
import { Copy, CheckCircleIcon } from "lucide-react"
import { Button } from "../ui/button"

type ActionButtonProps = {
  onClick?: VoidFunction
  title?: string
  variant?: "copy" | "check"
}

function ActionButton({ onClick, title, variant = "copy" }: ActionButtonProps) {

  const Icons: Record<string, any> = {
    copy: Copy,
    check: CheckCircleIcon
  }

  const Icon = Icons[variant]

  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <motion.div whileTap={{ scale: 0.8 }}>
      <Button variant="ghost" onClick={handleClick} size="icon" title="Copy HTML code">
        <Icon />
      </Button>
    </motion.div>
  )
}
export default ActionButton