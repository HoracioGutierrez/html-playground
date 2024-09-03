import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

type BemErrorDescriptionProps = {
  errors: any[]
  onClose: () => void
}

function BemErrorDescription({ errors, onClose }: BemErrorDescriptionProps) {
  return (
    <motion.div
      className="relative flex flex-col gap-4 bg-gradient-to-br from-secondary to-secondary/50 p-6 rounded-md text-foreground transition-all"
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
        {errors.map((error, i) => {
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
              {error}
            </motion.p>
          )
        })}
        <X className="top-1 right-1 absolute cursor-pointer size-5" onClick={onClose} />
      </AnimatePresence>
    </motion.div>
  )
}
export default BemErrorDescription