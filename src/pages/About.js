import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinux, FaNetworkWired, FaShieldAlt, FaTerminal, FaFlag, FaServer } from 'react-icons/fa';
import { useRef } from 'react';

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const skills = [
    {
      title: 'Linux Systems',
      icon: <FaLinux className="text-3xl sm:text-4xl mb-4" />,
      description: 'Proficient in Linux environments for cybersecurity applications',
      level: 85,
    },
    {
      title: 'Networking',
      icon: <FaNetworkWired className="text-3xl sm:text-4xl mb-4" />,
      description: 'Understanding of network protocols and security concepts',
      level: 75,
    },
    {
      title: 'Security Fundamentals',
      icon: <FaShieldAlt className="text-3xl sm:text-4xl mb-4" />,
      description: 'Strong grasp of basic cybersecurity principles and best practices',
      level: 80,
    },
    {
      title: 'Command Line',
      icon: <FaTerminal className="text-3xl sm:text-4xl mb-4" />,
      description: 'Proficient in terminal usage and bash scripting',
      level: 85,
    },
    {
      title: 'CTF Challenges',
      icon: <FaFlag className="text-3xl sm:text-4xl mb-4" />,
      description: 'Experience in solving various CTF challenges and labs',
      level: 70,
    },
    {
      title: 'System Security',
      icon: <FaServer className="text-3xl sm:text-4xl mb-4" />,
      description: 'Basic understanding of system hardening and security measures',
      level: 75,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div 
      ref={sectionRef}
      style={{ opacity }}
      className="min-h-screen flex items-center py-12 sm:py-20"
    >
      <motion.div
        style={{ y }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 w-full"
      >
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-[#64ffda] mb-6 sm:mb-8"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            As a passionate cybersecurity enthusiast, I'm dedicated to learning and growing in the field
            of information security. With a strong foundation in Linux systems and a problem-solving mindset,
            I continuously explore new security concepts and challenges.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            My journey in cybersecurity is driven by curiosity and a desire to understand both offensive
            and defensive security practices. I actively participate in CTF challenges and hands-on labs
            to enhance my practical skills and knowledge.
          </p>
        </motion.div>

        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
        >
          Technical Skills
        </motion.h3>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 20px rgba(100, 255, 218, 0.2)'
              }}
              className="bg-[#1a3c6d] bg-opacity-30 p-4 sm:p-6 rounded-lg border border-[#64ffda] border-opacity-20 transform transition-all duration-300"
            >
              <div className="text-[#64ffda]">
                {skill.icon}
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-2">{skill.title}</h4>
              <p className="text-gray-400 text-sm sm:text-base mb-4">{skill.description}</p>
              <div className="w-full bg-[#0a192f] rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-[#64ffda] h-2 rounded-full"
                />
              </div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                className="text-xs sm:text-sm text-[#64ffda] mt-2 block"
              >
                {skill.level}%
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About; 