import { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import NavigationDots from './components/NavigationDots';
import './App.css';

function App() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-[#0a192f] text-white overflow-x-hidden">
      <NavigationDots />
      
      <section id="home" className="h-screen">
        <Home />
      </section>
      
      <section id="about" className="min-h-screen">
        <About />
      </section>
      
      <section id="projects" className="min-h-screen">
        <Projects />
      </section>
      
      <section id="experience" className="min-h-screen">
        <Experience />
      </section>
      
      <section id="contact" className="min-h-screen">
        <Contact />
      </section>

      {/* Mobile Navigation Menu */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 sm:hidden">
        <div className="flex items-center justify-center space-x-4 bg-[#1a3c6d] bg-opacity-80 px-4 py-2 rounded-full backdrop-blur-sm">
          {['home', 'about', 'projects', 'experience', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                section === 'home' ? 'bg-[#64ffda]' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
