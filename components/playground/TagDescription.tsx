"use client"
import { motion, AnimatePresence } from "framer-motion"

type TagDescriptionProps = {
  description: string[]
}

function TagDescription({ description }: TagDescriptionProps) {
  return (
    <motion.div
      className="flex flex-col gap-4 bg-gradient-to-br from-accent to-accent/50 p-4 rounded-md text-foreground transition-all"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0, },
        animate: { opacity: 1, },
        exit: { opacity: 0, }
      }}
    >
      <AnimatePresence>
        {!description ? (
          <motion.p
            className="text-center text-fluid-md"
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 20 }
            }}
          >
            Click or drag a badge to get more information about it!
          </motion.p>
        ) : description.map((paragraph, i) => {
          return (
            <motion.p
              key={i}
              className="text-center text-fluid-md"
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
            >
              {paragraph}
            </motion.p>
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}
export default TagDescription