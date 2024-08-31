"use client"
import { refactorInitialElements } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect } from "react"

type CategoryTitleProps = {
  selectedBadgeIndex: number,
  controls: any
}

function CategoryTitle({ selectedBadgeIndex, controls }: CategoryTitleProps) {

  useEffect(() => {
    animateCategoryTitle()
  }, [])

  const categoryVariants = {
    animate: {
      opacity: 1,
    },
    initial: {
      opacity: 0,
    }
  }

  const animateCategoryTitle = async () => {
    await controls.start({ y: -20, opacity: 0 })
    await controls.start({ y: 0, opacity: 1 })
  }

  return (
    <motion.p
      className="font-bold text-center text-primary/50 text-xl"
      variants={categoryVariants}
      animate={controls}
      initial="initial"
    >
      {refactorInitialElements[selectedBadgeIndex].title}
    </motion.p>
  )
}
export default CategoryTitle