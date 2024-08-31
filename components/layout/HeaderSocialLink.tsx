"use client"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { Button } from "../ui/button"
import { motion } from "framer-motion"

export type HeaderSocialLinkProps = {
  variant?: "github" | "twitter" | "instagram" | "linkedin",
  url?: string,
  title?: string
}

function HeaderSocialLink({ variant = "github", url = "#", title = "Social Link Tooltip" }: HeaderSocialLinkProps) {

  const SocialIcons = {
    github: Github,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin
  }

  const Icon = SocialIcons[variant]

  return (
    <Button asChild variant="ghost" size="icon">
      <motion.a
        href={url}
        target="_blank"
        className="text-muted"
        rel="noopener"
        title={title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Icon size={20} />
      </motion.a>
    </Button>
  )
}
export default HeaderSocialLink