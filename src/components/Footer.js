import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-4 shadow md:p-6 bg-darkgreen">
      <div className="md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center">
          © {new Date().getFullYear() + " "}
          <Link href="/" className="hover:underline">
            EarthHopper.
          </Link>
        </span>
        <span className="text-white ml-2">Made with ❤️ in Mexico.</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
          <li className="lg:inline-block">
            <Link className="mr-4 hover:underline md:mr-6" href="/">
              Home
            </Link>
          </li>
          <li className="lg:inline-block">
            <Link className="mr-4 hover:underline md:mr-6" href="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
