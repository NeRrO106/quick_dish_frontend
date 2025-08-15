function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-[var(--text-light)] p-4 text-center">
      <p className="text-sm text-[var(--text-light)]">
        &copy; {new Date().getFullYear()} Quick Dish. All rights reserved.
      </p>
      <p className="text-xs text-[var(--text-light)]">Made by NeRrO</p>
    </footer>
  );
}
export default Footer;
