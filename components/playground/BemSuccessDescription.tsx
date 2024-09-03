"use client"
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type BemSuccessDescriptionProps = {
  onClose: () => void
}

function BemSuccessDescription({ onClose }: BemSuccessDescriptionProps) {
  return (
    <motion.div
      className="relative flex flex-col gap-4 bg-gradient-to-br from-green-600 to--green-600/50 p-6 rounded-md text-foreground transition-all"
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
        <motion.p
          className="text-center text-fluid-md"
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 }
          }}
        >
          The elements you have nested are valid according to the BEM standard.
        </motion.p>
        <motion.p
          className="text-center text-fluid-md"
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
          }}
          transition={{ delay: 0.3 }}
        >
          BEMmisimo 🤌!!! (Everything good)
        </motion.p>
        <X className="top-1 right-1 absolute cursor-pointer size-5" onClick={onClose} />
      </AnimatePresence>
    </motion.div>
  )
}
export default BemSuccessDescription