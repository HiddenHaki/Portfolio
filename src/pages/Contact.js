import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com', label: 'GitHub', color: '#64ffda' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn', color: '#0077b5' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter', color: '#1da1f2' },
    { icon: <FaEnvelope />, url: 'mailto:your.email@example.com', label: 'Email', color: '#ea4335' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: '0 0 20px rgba(100, 255, 218, 0.2)' },
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
          <h2 className="text-4xl font-bold text-[#64ffda] mb-4">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: 'name', label: 'Name', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'subject', label: 'Subject', type: 'text' },
              ].map((field) => (
                <motion.div key={field.name}>
                  <label className="block text-sm font-medium mb-2" htmlFor={field.name}>
                    {field.label}
                  </label>
                  <motion.input
                    variants={inputVariants}
                    whileFocus="focus"
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[#1a3c6d] bg-opacity-30 rounded-lg border ${
                      errors[field.name] ? 'border-red-500' : 'border-[#64ffda] border-opacity-20'
                    } focus:outline-none focus:border-[#64ffda] transition-colors`}
                  />
                  {errors[field.name] && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors[field.name]}
                    </motion.p>
                  )}
                </motion.div>
              ))}

              <motion.div>
                <label className="block text-sm font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <motion.textarea
                  variants={inputVariants}
                  whileFocus="focus"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 bg-[#1a3c6d] bg-opacity-30 rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-[#64ffda] border-opacity-20'
                  } focus:outline-none focus:border-[#64ffda] transition-colors`}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg bg-[#64ffda] text-[#0a192f] font-bold transition-all duration-300 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {submitStatus && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center mt-4 ${
                    submitStatus === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {submitStatus === 'success'
                    ? 'Message sent successfully!'
                    : 'Failed to send message. Please try again.'}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Connect With Me</h3>
              <p className="text-gray-400 mb-6">
                Feel free to reach out for collaborations, security consultations,
                or just to say hello!
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Social Links</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#64ffda] transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ color: link.color }}
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#1a3c6d] bg-opacity-30 p-6 rounded-lg border border-[#64ffda] border-opacity-20"
            >
              <h4 className="text-xl font-bold mb-4">Location</h4>
              <p className="text-gray-400">Available for remote work worldwide</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#1a3c6d] bg-opacity-30 p-6 rounded-lg border border-[#64ffda] border-opacity-20"
            >
              <h4 className="text-xl font-bold mb-4">Availability</h4>
              <p className="text-gray-400">Open to new opportunities and collaborations</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact; 