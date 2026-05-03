function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-[var(--text-light)] p-6 border-t border-[var(--color-accent1)]">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-md">
            &copy; {new Date().getFullYear()} Quick Dish. All rights reserved.
          </p>
          <div className="text-[10px] tracking-wider uppercase">
              <span className="opacity-40 text-stone-500">Design de</span>{" "}
              <a
                href="https://candystudio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 font-medium hover:text-white transition-colors"
              >
                Candy Studio
              </a>
            </div>
        </div>

        <div className="flex gap-4">
          <a
            href="/about"
            className="text-md hover:text-black transition-colors"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-md hover:text-black transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
