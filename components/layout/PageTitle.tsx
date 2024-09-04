"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl";

function PageTitle() {

  const t = useTranslations('HomePage');

  return (
    <h2 className="mb-3 font-bold text-accent text-center text-fluid-xl">
      <motion.span
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="inline-block"
      >
        {t("leadingTitle")} &nbsp;
      </motion.span>
      <motion.span
        className="inline-block text-muted"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {t("finalTitle")}
      </motion.span>
    </h2>
  )
}
export default PageTitle