import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="p-4 flex flex-col">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Container for logo and collapse/close button */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-10 w-10 mr-2 block"
              draggable="false"
            />
            <h1 className="ml-3 font-bold text-lg hidden md:block">
              EarthHopper
            </h1>
          </div>

          {/* Collapse/Close button */}
          <button
            className={`md:hidden text-2xl focus:outline-none transition-transform ${
              isNavOpen ? "rotate-180" : "rotate-0"
            }`}
            onClick={toggleNav}
          >
            {isNavOpen ? <AiOutlineCloseCircle /> : <FaBars />}
          </button>
        </div>

        {/* Navbar */}
        <nav
          className={`md:flex md:items-center ${
            isNavOpen ? "block" : "hidden"
          } mt-4 md:mt-0 ${isNavOpen ? "space-y-4" : "md:space-x-4"} text-center md:text-left`}
        >
          <ul className={`md:flex ${isNavOpen ? "space-x-0" : "space-x-4 md:space-x-4"} text-lg uppercase md:capitalize`}>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
