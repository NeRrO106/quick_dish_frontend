function Footer() {
  return (
    <footer className="bg-red-500 text-white p-4 text-center">
      <p className="text-sm text-white">
        &copy; {new Date().getFullYear()} Quick Dish. All rights reserved.
      </p>
      <p className="text-xs text-white">Made by NeRrO</p>
    </footer>
  );
}
export default Footer;
