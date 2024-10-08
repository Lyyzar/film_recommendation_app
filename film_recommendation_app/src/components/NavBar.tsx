const NavBar = () => {
  return (
    <header className="bg-white text-black">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <div className="text-lg font-bold">Film App</div>
        <ul className="flex space-x-6 mx-2">
          <li>
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
