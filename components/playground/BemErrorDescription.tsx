import { AnimatePresence, motion } from "framer-motion"

type BemErrorDescriptionProps = {
  errors: any[]
}

function BemErrorDescription({ errors }: BemErrorDescriptionProps) {
  return (
    <motion.div
      className="flex flex-col gap-4 bg-gradient-to-br from-secondary to-secondary/50 p-4 rounded-md text-foreground transition-all"
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
      </AnimatePresence>
    </motion.div>
  )
}
export default BemErrorDescription