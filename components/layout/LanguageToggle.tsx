"use client"
import { Switch } from "@/components/ui/switch";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

function LanguageToggle() {

  const { push } = useRouter()
  const locale = useLocale()

  const handleRedirect = () => {
    if (locale === 'en') {
      push('es')
    } else {
      push('en')
    }
  }

  return (
    <div className="flex items-center gap-2">
      <p className={cn(
        "text-accent text-fluid-md",
        { "text-accent/30": locale === 'en' },
      )}>es</p>
      <Switch onClick={handleRedirect} />
      <p className={cn(
        "text-accent text-fluid-md",
        { "text-accent/30": locale === 'es' },
      )}>en</p>
    </div>
  )
}

export default LanguageToggle