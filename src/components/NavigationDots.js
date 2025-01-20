import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const NavigationDots = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [previousSection, setPreviousSection] = useState('home');
  const sections = ['home', 'about', 'projects', 'experience', 'contact'];

  useEffect(() => {
    const observers = [];
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPreviousSection(activeSection);
          setActiveSection(entry.target.id);
        }
      });
    };

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [activeSection]);

  const handleClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      setPreviousSection(activeSection);
      setActiveSection(section);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dotVariants = {
    initial: { scale: 1, backgroundColor: '#4a5568' },
    hover: { scale: 1.2 },
    active: { 
      scale: [1, 1.3, 1.2],
      backgroundColor: '#64ffda',
      transition: {
        scale: {
          duration: 0.3,
          ease: "easeOut"
        },
        backgroundColor: {
          duration: 0.2
        }
      }
    },
    inactive: {
      scale: 1,
      backgroundColor: '#4a5568',
      transition: {
        duration: 0.3
      }
    }
  };

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, x: 20 }
  };

  const lineVariants = {
    initial: { height: 0 },
    animate: { 
      height: '100%',
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="fixed right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden sm:block"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex flex-col items-center space-y-3 sm:space-y-4 relative">
        <motion.div
          className="absolute left-1/2 top-0 w-[1px] bg-[#64ffda] opacity-20 origin-top"
          style={{ height: 'calc(100% - 12px)' }}
          variants={lineVariants}
        />
        {sections.map((section) => (
          <div
            key={section}
            className="group relative flex items-center"
            onMouseEnter={() => {
              const tooltip = document.getElementById(`tooltip-${section}`);
              if (tooltip) tooltip.style.opacity = '1';
            }}
            onMouseLeave={() => {
              const tooltip = document.getElementById(`tooltip-${section}`);
              if (tooltip) tooltip.style.opacity = '0';
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer relative z-10"
                variants={dotVariants}
                initial="initial"
                whileHover="hover"
                animate={activeSection === section ? 'active' : 'inactive'}
                onClick={() => handleClick(section)}
              >
                {activeSection === section && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#64ffda]"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <div
              id={`tooltip-${section}`}
              className="absolute right-6 sm:right-8 px-2 py-1 bg-[#1a3c6d] text-[#64ffda] text-xs sm:text-sm rounded opacity-0 transition-opacity duration-200 whitespace-nowrap"
              style={{ pointerEvents: 'none' }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NavigationDots; 