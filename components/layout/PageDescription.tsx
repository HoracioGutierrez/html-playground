"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl";

function PageDescription() {

  const t = useTranslations('HomePage');

  return (
    <motion.p
      className="mx-auto mb-20 max-w-[60ch] text-accent/70 text-center text-fluid-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {t("description")}
    </motion.p>
  )
}
export default PageDescription