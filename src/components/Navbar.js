import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleClick = () => setNav(!nav);

  return (
    <nav className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#0a192f] text-gray-300 border-b border-[#1a3c6d]">
      <motion.div
        initial={{ x: -500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/">
          <h1 className="text-2xl font-bold text-[#64ffda]">&lt;SecureCode /&gt;</h1>
        </Link>
      </motion.div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        {links.map(({ name, path }) => (
          <motion.li
            key={name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-4"
          >
            <Link
              to={path}
              className={`hover:text-[#64ffda] ${
                location.pathname === path ? 'text-[#64ffda]' : ''
              }`}
            >
              {name}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10 cursor-pointer">
        {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
      </div>

      {/* Mobile Menu */}
      <motion.ul
        className={`${
          !nav ? 'hidden' : 'absolute'
        } top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center`}
        initial={{ x: '-100%' }}
        animate={{ x: nav ? 0 : '-100%' }}
        transition={{ duration: 0.5 }}
      >
        {links.map(({ name, path }) => (
          <li key={name} className="py-6 text-4xl">
            <Link
              onClick={handleClick}
              to={path}
              className={`hover:text-[#64ffda] ${
                location.pathname === path ? 'text-[#64ffda]' : ''
              }`}
            >
              {name}
            </Link>
          </li>
        ))}
      </motion.ul>
    </nav>
  );
};

export default Navbar; 