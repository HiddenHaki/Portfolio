import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGraduationCap, FaAward } from 'react-icons/fa';
import { SiTryhackme, SiCisco } from 'react-icons/si';
import { useRef } from 'react';

const Experience = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const achievements = [
    {
      year: '2024',
      title: 'Intro to Cybersecurity',
      organization: 'TryHackMe',
      description: 'Completed comprehensive introduction to cybersecurity fundamentals',
      icon: <SiTryhackme className="text-2xl" />,
      category: 'Certification',
      color: '#c11111'
    },
    {
      year: '2024',
      title: 'Advent of Cyber 2024',
      organization: 'TryHackMe',
      description: 'Participated in and completed the Advent of Cyber challenge',
      icon: <SiTryhackme className="text-2xl" />,
      category: 'Achievement',
      color: '#c11111'
    },
    {
      year: '2024',
      title: 'Intro to Cybersecurity',
      organization: 'Cisco Networking Academy',
      description: 'Completed Cisco\'s foundational cybersecurity course',
      icon: <SiCisco className="text-2xl" />,
      category: 'Certification',
      color: '#049fd9'
    },
    {
      year: '2024',
      title: 'Linux Enthusiast',
      organization: 'Self-Learning',
      description: 'Developed strong proficiency in Linux systems and command line',
      icon: <FaGraduationCap className="text-2xl" />,
      category: 'Skill Development',
      color: '#64ffda'
    },
    {
      year: '2024',
      title: 'CTF Participant',
      organization: 'Various Platforms',
      description: 'Active participation in CTF challenges and security labs',
      icon: <FaAward className="text-2xl" />,
      category: 'Achievement',
      color: '#ffd700'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="min-h-screen flex items-center py-12 sm:py-16"
    >
      <motion.div
        style={{ y }}
        className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-4xl font-bold text-[#64ffda] mb-4">Achievements</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A timeline of my learning journey, certifications, and achievements in cybersecurity.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-[#64ffda] bg-opacity-20"
          />

          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`flex flex-col md:flex-row gap-6 mb-8 relative ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot with ripple effect */}
              <motion.div
                className="absolute left-[-8px] md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className="w-4 h-4 rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  style={{ backgroundColor: achievement.color }}
                />
                <motion.div
                  className="absolute w-4 h-4 rounded-full"
                  style={{ backgroundColor: achievement.color }}
                  animate={{
                    scale: [1, 2],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </motion.div>

              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${achievement.color}33` }}
                  className="bg-[#1a3c6d] bg-opacity-30 p-4 sm:p-6 rounded-lg border border-opacity-20"
                  style={{ borderColor: achievement.color }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <motion.span
                      className="text-2xl"
                      style={{ color: achievement.color }}
                    >
                      {achievement.icon}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="text-sm"
                      style={{ color: achievement.color }}
                    >
                      {achievement.category}
                    </motion.span>
                  </div>

                  <div className="flex justify-between items-start mb-3">
                    <motion.h3
                      whileHover={{ x: 10 }}
                      className="text-xl font-bold"
                    >
                      {achievement.title}
                    </motion.h3>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="font-mono"
                      style={{ color: achievement.color }}
                    >
                      {achievement.year}
                    </motion.span>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 mb-2"
                  >
                    {achievement.organization}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="text-sm"
                  >
                    {achievement.description}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Experience; 