"use client"
import { motion } from "framer-motion"
import { Copy, CheckCircleIcon, Trash, Edit } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

type ActionButtonProps = {
  onClick?: any
  title?: string
  variant?: "copy" | "check" | "edit" | "delete",
  isSmall?: boolean
  id ?: string
}

function ActionButton({ onClick, title, variant = "copy", isSmall = false , id }: ActionButtonProps) {

  const Icons: Record<string, any> = {
    copy: Copy,
    check: CheckCircleIcon,
    edit: Edit,
    delete: Trash,
  }

  const Icon = Icons[variant]

  const handleClick = () => {
    onClick && onClick(id)
  }

  return (
    <motion.div whileTap={{ scale: 0.8 }} className="flex justify-center items-center">
      <Button variant="ghost" onClick={handleClick} size="icon" title={title} className={cn({ "p-1" : isSmall , "size-6": isSmall })}>
        <Icon  />
      </Button>
    </motion.div>
  )
}
export default ActionButton