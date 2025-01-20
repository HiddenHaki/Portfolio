import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaLock, FaShieldAlt, FaServer } from 'react-icons/fa';
import { useRef } from 'react';

const Projects = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const projects = [
    {
      title: 'Security Scanner',
      description: 'Automated vulnerability scanner for web applications with detailed reporting and remediation suggestions.',
      technologies: ['Python', 'Docker', 'REST APIs', 'PostgreSQL'],
      image: '/project1.jpg',
      github: '#',
      live: '#',
      category: 'Security Tool',
      icon: <FaShieldAlt className="text-3xl" />
    },
    {
      title: 'Threat Intelligence Platform',
      description: 'Real-time threat intelligence aggregation and analysis platform with machine learning capabilities.',
      technologies: ['React', 'Node.js', 'TensorFlow', 'MongoDB'],
      image: '/project2.jpg',
      github: '#',
      live: '#',
      category: 'Platform',
      icon: <FaServer className="text-3xl" />
    },
    {
      title: 'Secure File Vault',
      description: 'End-to-end encrypted file storage system with zero-knowledge architecture.',
      technologies: ['Go', 'React', 'AWS', 'Encryption'],
      image: '/project3.jpg',
      github: '#',
      live: '#',
      category: 'Application',
      icon: <FaLock className="text-3xl" />
    },
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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="min-h-screen flex items-center py-20"
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
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#64ffda] mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of cybersecurity tools and platforms I've developed to enhance digital security.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#1a3c6d] bg-opacity-30 rounded-lg overflow-hidden border border-[#64ffda] border-opacity-20"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-[#64ffda]"
                    >
                      {project.icon}
                    </motion.div>
                    <span className="text-sm text-[#64ffda]">{project.category}</span>
                  </div>

                  <motion.h3
                    whileHover={{ x: 10 }}
                    className="text-2xl font-bold mb-3 group-hover:text-[#64ffda] transition-colors"
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-gray-400 mb-6"
                  >
                    {project.description}
                  </motion.p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + techIndex * 0.1 }}
                        className="px-3 py-1 text-sm bg-[#0a192f] rounded-full text-[#64ffda] border border-[#64ffda] border-opacity-20"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-2xl text-gray-400 hover:text-[#64ffda] transition-colors"
                    >
                      <FaGithub />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-2xl text-gray-400 hover:text-[#64ffda] transition-colors"
                    >
                      <FaExternalLinkAlt />
                    </motion.a>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-[#64ffda] bg-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Projects; 