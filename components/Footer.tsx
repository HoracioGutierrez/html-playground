import { useTranslations } from "next-intl";

function Footer() {

  const t = useTranslations('HomePage');

  return (
    <footer className='py-4'>
      <p className='mb-2 text-accent text-center text-fluid-md'>
        <span className='opacity-40'>{t("footerCopyright")}</span>{" "}
        <a href='https://x.com/horagutierrez' target='_blank' rel="noopener">@HoracioGutierrez</a>
      </p>
      <p className="opacity-40 text-accent text-center text-fluid-md">
        {t("footerIssues")}{" "}
        <a href='https://github.com/HoracioGutierrez/html-playground/issues' target='_blank' rel="noopener">Github</a>
      </p>
    </footer>
  );
}
export default Footer;
