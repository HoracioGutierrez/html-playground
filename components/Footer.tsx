function Footer() {
  return (
    <footer className='py-4'>
      <p className='text-center text-accent text-sm mb-2'>
        <span className='opacity-40'>Created by &nbsp;</span>
        <a href='https://x.com/horagutierrez' target='_blank'>
          @HoracioGutierrez
        </a>
      </p>
      <p className="text-center text-accent text-sm opacity-40">
        Do you have any improvement ideas? Fill an issue at{" "}
        <a
          href='https://github.com/HoracioGutierrez/html-playground/issues'
          target='_blank'
        >
          Github
        </a>
      </p>
    </footer>
  );
}
export default Footer;
