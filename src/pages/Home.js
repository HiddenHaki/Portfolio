import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 25, 47, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(100, 255, 218, 0.35)';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const socialVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.3,
      },
    }),
  };

  const handleScroll = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="relative w-full h-screen">
        {/* Matrix Background */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />

        {/* Content Background Overlay */}
        <div className="absolute inset-0 bg-[#0a192f] bg-opacity-90" />

        {/* Social Links */}
        <motion.div 
          className="fixed left-4 bottom-0 flex flex-col items-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[
            { icon: <FaGithub size={22} />, href: "https://github.com" },
            { icon: <FaLinkedin size={22} />, href: "https://linkedin.com" },
            { icon: <FaTwitter size={22} />, href: "https://twitter.com" },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 text-gray-400 hover:text-[#64ffda] transition-colors duration-300"
              custom={i}
              variants={socialVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2 }}
            >
              {social.icon}
            </motion.a>
          ))}
          <motion.div 
            className="h-24 w-[1px] bg-gray-400"
            initial={{ height: 0 }}
            animate={{ height: 96 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          />
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-4 sm:px-8 lg:px-16">
          <div className="max-w-screen-lg mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[#64ffda] font-mono mb-4 block"
            >
              Hi, my name is
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-4xl sm:text-7xl font-bold text-gray-200 mb-4"
            >
              Harsh D.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-8"
            >
              <div className="text-3xl sm:text-5xl font-bold text-gray-400 w-[280px] sm:w-[600px] whitespace-nowrap">
                <TypeAnimation
                  sequence={[
                    'Fresher',
                    2000,
                    'Cybersecurity Enthusiast',
                    2000,
                    'Linux Lover',
                    2000,
                  ]}
                  wrapper="div"
                  speed={50}
                  repeat={Infinity}
                  style={{ 
                    minHeight: '1.5em',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-gray-400 text-lg sm:text-xl max-w-[600px] mb-12"
            >
              A passionate cybersecurity enthusiast with a strong foundation in Linux systems
              and a dedication to learning and growing in the field of information security.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-[#64ffda] text-[#64ffda] rounded-lg hover:bg-[#64ffda] hover:bg-opacity-10 transition-all duration-300"
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#64ffda] text-[#0a192f] rounded-lg hover:bg-opacity-90 transition-all duration-300"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-20"
          onClick={handleScroll}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <HiArrowDown className="text-[#64ffda] text-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Home; 